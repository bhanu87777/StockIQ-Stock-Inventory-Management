import Product from '../models/productModel.js';
import products from '../utils/data.js';

// get products
export const getProductController = async (req, res) => {
    try {
        const { createdBy, search } = req.query;
        
        const query = { createdBy };
        
        // Add name search if search parameter exists
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
};

//for add
export const addProductController = async (req, res) => {
    try {
        const newProducts = new Product(req.body);
        await newProducts.save();
        res.status(200).send('Products Created Successfully!');
    } catch (error) {
        console.log(error);
    }
};

//for update
export const updateProductController = async (req, res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body, { new: true });
        res.status(201).json('Product Updated!');
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

//for delete
export const deleteProductController = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId });
        res.status(200).json('Product Deleted!');
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

//for seeds
export const seedsProductController = async (req, res) => {
    try {
        const data = await Product.insertMany(products);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};
