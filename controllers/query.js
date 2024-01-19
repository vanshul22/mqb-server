const { Product } = require('../models/product');
const { Order } = require('../models/order');
const { User } = require('../models/user');

const productController = {
    getQuery: async (req, res) => {
        // Create a new product in the database
        // const magicQuery = req.body;
        let magicQuery = `orders.created_at > "2023-10-26" __AND__ orders.status = "shipped"`
        try {

            const jsonObject = await convertMagicQueryToJSON(magicQuery);

            // Format the response to match the provided JSON structure
            res.status(200).json({ success: true, message: 'Query Fetched Successfully', jsonObject });

        } catch (error) {
            // Handle database errors or other exceptions
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};

module.exports = productController;

const convertMagicQueryToJSON = async (query) => {
    const queryArray = query.split(" ");

    let jsonObject = { "__query__": {} };
    let currentObject = jsonObject.__query__;

    for (let i = 0; i < queryArray.length; i++) {
        const item = queryArray[i];

        if (item.includes(".")) {
            const [table, column] = item.split(".");
            const newObject = { [`__${table}__`]: { "__match__": { [column]: {} } } };

            currentObject[`__${table}__`] = newObject[`__${table}__`];
            currentObject = newObject[`__${table}__`]["__match__"][column];
        } else if (item === "__AND__") {
        } else {
        }
    }

    return jsonObject;
}




let keys = {
    ".": "__match__",
    ">": "__gt__",
    "=": "__eq__",
}