const express = require('express');
const router = express.Router();
const ProductModel = require('../model/product');

router.post('/', async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const product = new ProductModel({ name, price, description });
    await product.save();
    res.status(201).json({ message: 'Product saved successfully', product });
  } catch (err) {
    next(err);
  }
});

// Define a route to fetch products
router.get("/", async (req, res) => {
  try {
    
    // Retrieve products from the database
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});


module.exports = router;
