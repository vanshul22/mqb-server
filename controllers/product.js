const { Product } = require('../models/product');

const productController = {
    createProduct: async (req, res) => {
        // Create a new product in the database
        const { name, price, category, brand } = req.body;

        // Validate the request body
        if (!name || !price || !category || !brand) return res.status(400).json({ error: 'Invalid request body' });

        try {
            // Check if the product name already exists in the database
            const existingProduct = await Product.findOne({ name });

            // Product already exists
            if (existingProduct) return res.status(400).json({ success: false, message: 'Product name already in use' });

            // Insert a new product into the database
            const newProduct = new Product({ name, price, category, brand });
            const savedProduct = await newProduct.save();

            res.status(201).json({ success: true, message: 'Product created successfully', product: savedProduct });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getAllProducts: async (req, res) => {
        // Retrieve and send a list of products from the database
        try {
            // Retrieve a list of products from the database
            const products = await Product.find();

            // Check if there are no products found
            if (products.length === 0) return res.status(404).json({ success: false, message: 'No products found' });

            // Send the list of products as a response
            res.status(200).json({ success: true, result: products, message: 'Successfully Fetched' });
        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getProductById: async (req, res) => {
        // Retrieve and send a product by ID from the database
        const productId = req.params.id;

        try {
            // Check if the product with the provided ID exists
            const product = await Product.findById(productId);

            if (!product) return res.status(404).json({ success: false, message: 'The requested product was not found.' });

            res.json({ success: true, product, message: "Successfully Find the Product" });
        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const { name, price, category, brand } = req.body;

        // Validate the request body
        if (!name || !price || !category || !brand) return res.status(400).json({ error: 'Invalid request body' });

        try {
            // Check if the product with the given ID exists in the database
            const existingProduct = await Product.findByIdAndUpdate(productId, { name, price, category, brand }, { new: true });

            // Product does not exist
            if (!existingProduct) return res.status(404).json({ success: false, message: 'Product not found' });

            return res.status(200).json({ success: true, message: 'Product updated successfully' })

        } catch (error) {
            // Handle database errors or other exceptions
            // console.error(error);
            res.status(500).json({ success: false, message: error.codeName });
        }
    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;

        try {
            // Check if the product with the provided ID exists
            const deletedProduct = await Product.findByIdAndDelete(productId);

            if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' })

            // Use a 204 status code for a successful deletion (No Content)
            res.status(204).send({ success: true, message: "Successfully Deleted." });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
};

module.exports = productController;
