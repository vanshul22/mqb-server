const Order = require('../models/order');

// Controller methods for order routes
const orderController = {
    createOrder: async (req, res) => {
        // Create a new order in the database
        const { userId, productId, status } = req.body;

        try {
            // Check if an order already exists for the same user
            const existingOrder = await Order.findOne({ userId, productId });

            if (existingOrder) return res.status(400).json({ success: false, message: 'An order already exists for the User' });

            // Insert a new order into the database
            const newOrder = new Order({ status });
            const savedOrder = await newOrder.save();

            res.status(201).json({ success: true, message: 'Order created successfully', order: savedOrder });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    getAllOrders: async (req, res) => {
        // Retrieve and send a list of orders from the database
        try {
            // Retrieve a list of orders from the database, excluding the password field
            const orders = await Order.find();

            // Check if there are no orders found
            if (orders.length === 0) return res.status(404).json({ success: false, message: 'No orders found' });

            // Send the list of orders as a response
            return res.status(200).json({ success: true, result: orders, message: 'Successfully Fetched' });
        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    getOrderById: async (req, res) => {
        // Retrieve and send a order by ID from the database
        const orderId = req.params.id;

        try {
            // Check if the order with the provided ID exists
            const order = await Order.findById(orderId);

            if (!order) return res.status(404).json({ success: false, message: 'The requested order was not found.' });

            res.json({ success: true, order, message: "Successfully Find the Order" });
        }
        catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    updateOrder: async (req, res) => {
        const orderId = req.params.id;
        const { userId, productId, status } = req.body;

        try {
            // Check if the order with the given ID exists in the database
            const existingOrder = await Order.findById(orderId);

            // Order does not exist
            if (!existingOrder) return res.status(404).json({ success: false, message: 'Order not found' });

            // Order name already in use
            if (status === existingOrder.status) return res.status(400).json({ success: false, message: 'Order Status already in use' });

            // Update the order in the database
            // existingOrder.userId = userId;
            // existingOrder.productId = productId;
            existingOrder.status = status;

            const updatedOrder = await existingOrder.save();

            // Order updated successfully 
            if (updatedOrder) return res.status(200).json({ success: true, message: 'Order updated successfully' });
            // Failed to update order
            else return res.status(500).json({ success: false, message: 'Failed to update order' });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
    deleteOrder: async (req, res) => {
        const orderId = req.params.id;

        try {
            // Check if the order with the provided ID exists
            const order = await Order.findById(orderId);

            if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

            // Delete the order from the database
            await Order.findByIdAndDelete(orderId);

            // Use a 204 status code for a successful deletion (No Content)
            res.status(204).send({ success: true, message: "Successfully Deleted." });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};

module.exports = orderController;