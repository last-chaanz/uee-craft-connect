const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsController");
const upload = require("../middleware/MulterConfig");

// Create a Product
router.post(
  "/products",
  upload.single("image"),
  ProductController.createProduct
);

// Update a Product
router.put(
  "/products/:id",
  upload.single("image"),
  ProductController.updateProduct
);

// Delete a Product
router.delete("/products/:id", ProductController.deleteProduct);

// Get a Single Product
router.get("/products/:id", ProductController.getProduct);

// Get All Products
router.get("/products", ProductController.getAllProducts);

module.exports = router;
