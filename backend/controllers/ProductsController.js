const Product = require("../models/Products");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, sellType, price, quantity, categories, description } = req.body;

    // Check if an image file is uploaded
    const image = req.file ? req.file.path : null;

    const newProduct = new Product({
      name,
      image, // image can be null if not provided
      sellType,
      price,
      quantity,
      categories,
      description,
      state: "started", // Automatically set state to "started"
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If an image file is uploaded, include it in the updates, otherwise leave it unchanged
    if (req.file) {
      updates.image = req.file.path;
    }

    // Update the product with only the provided fields
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Product by name
// Get a Single Product by name
exports.getProductByname = async (req, res) => {
  const { name } = req.params;
  
  try {
    const product = await Product.findOne({ name });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products by product name:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};




// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
