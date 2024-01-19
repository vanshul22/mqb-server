const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Assuming you have a User model defined
const JWT_SECRET = process.env.JWT_SECRET || "";

// Controller methods for user routes
const userController = {
    createUser: async (req, res) => {
        // Create a new user in the database
        const { username, email, password, orders } = req.body;

        // Validate the request body
        if (!username || !email || !password || !Array.isArray(orders)) return res.status(400).json({ success: false, error: 'Invalid request body' });

        try {
            // Check if the username and email already exist in the database concurrently
            const [existingUsername, existingEmail] = await Promise.all([User.findOne({ username }), User.findOne({ email })]);

            // User already exists
            if (existingUsername) return res.status(400).json({ success: false, message: 'User already in use' });
            if (existingEmail) return res.status(400).json({ success: false, message: 'Email already in use' });

            // Hash the user's password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

            // Insert a new user into the database
            const newUser = new User({ email, username, password: hashedPassword });
            const savedUser = await newUser.save();

            const userId = savedUser._id; // Assuming your model uses MongoDB's default ObjectId
            // Create a JWT token for the newly registered user
            const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 hour

            res.status(201).json({ success: true, message: 'User created successfully', token });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    signinUser: async (req, res) => {
        // Create a new user in the database
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'Email is missing' });
        if (!password) return res.status(400).json({ success: false, message: 'Password is missing' });

        try {
            // Fetch user data based on the provided username
            const user = await User.findOne({ email });

            // User not found
            if (!user) return res.status(401).json({ success: false, message: 'Invalid Credentials' });

            // Check if the provided password matches the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Password is incorrect
            if (!passwordMatch) return res.status(401).json({ success: false, message: 'Invalid Credentials' });

            // Create a JWT token for the authenticated user...
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 hour

            res.status(200).json({ success: true, message: 'Login Successful', user: { id: user._id, username: user.username, email: user.email, token } });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    checkSignin: async (req, res) => {
        try {
            // The user is authenticated, and you can access user information using req.user
            const userId = req.user ? req.user.userId : null;
            return res.json({ success: true, message: 'Authenticated route', userId });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    getAllUsers: async (req, res) => {
        // Retrieve and send a list of users from the database
        try {
            // Retrieve a list of users from the database, excluding the password field
            const users = await User.find({}, { password: 0 });

            // Check if there are no users found
            if (users.length === 0) return res.status(404).json({ success: false, message: 'No users found' });

            // Send the list of users as a response
            return res.status(200).json({ success: true, result: users, message: 'Successfully Fetched' });
        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    getUserById: async (req, res) => {
        // Retrieve and send a user by ID from the database
        const userId = req.params.id;

        if (!userId) return res.status(400).json({ success: false, message: 'User Id is missing' });

        try {
            // Check if the user with the provided ID exists
            const user = await User.findById(userId, { password: 0 }); // excluding the password field

            if (!user) return res.status(404).json({ success: false, message: 'The requested user was not found.' });

            res.json({ success: true, user });
        }
        catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    updateUser: async (req, res) => {
        let { username, email, password, orders } = req.body;
        const userId = req.params.id;

        // Validate the request body
        if (!userId || !username || !email || !password || !Array.isArray(orders)) return res.status(400).json({ success: false, error: 'Invalid request body' });

        try {
            // Check if the user with the given ID exists in the database
            const existingUser = await User.findById(userId);

            // User does not exist
            if (!existingUser) return res.status(404).json({ success: false, message: 'User not found' });

            // Hash the new password before updating it in the database
            password = await bcrypt.hash(password, 10); // 10 is the number of salt rounds          

            const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, orders }, { new: true });

            // User updated successfully 
            if (!updatedUser) return res.status(500).json({ success: true, message: 'User updated successfully' });
            // Failed to update user
            return res.status(200).json({ success: true, message: 'User updated successfully' });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.params.id;
        if (!userId) return res.status(400).json({ success: false, message: 'user Id is missing' });

        try {
            // Check if the user with the provided ID exists
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) return res.status(404).json({ success: false, message: 'User not found' });

            // Use a 204 status code for a successful deletion (No Content)
            res.status(204).json({ success: true, message: 'Successfully Deleted user' });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};

module.exports = userController;