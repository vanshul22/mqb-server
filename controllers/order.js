const { Order } = require('../models/order');

// Controller methods for order routes
const orderController = {
    createOrder: async (req, res) => {
        // Create a new order in the database
        const { status, products } = req.body;

        try {

            // Validate the request body
            if (!status || !products || !Array.isArray(products)) return res.status(400).json({ success: false, message: 'Invalid request body' });

            // Insert a new order into the database
            const newOrder = new Order({ status, products });

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
        const { status, products } = req.body;

        try {
            // Validate the request body
            if (!status || !products || !Array.isArray(products)) return res.status(400).json({ success: false, message: 'Invalid request body' });

            const updatedOrder = await Order.findByIdAndUpdate(orderId, { status, products }, { new: true });

            // Failed to update order
            if (!updatedOrder) return res.status(404).json({ success: false, message: 'Failed to update order' });

            // Order updated successfully 
            return res.status(200).json({ success: true, message: 'Order updated successfully' });

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
            const deletedOrder = await Order.findByIdAndDelete(orderId);

            if (!deletedOrder) return res.status(404).json({ success: false, message: 'Order not found' });

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