const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

// Controller function to create a new post
const createPost = async (req, res) => {
  try {
    // Extract data from the request body
    const author = req.user._id;
    const { title, description, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({ error: "Title and image are required" });
    }

    let imageUrl = null;

    if (image) {
      //Check if the imageData is a valid base64 image

      if (!image.startsWith("data:image")) {
        return res.status(400).json({ error: "Invalid image format" });
      }

      console.log("Checking image");

      // Extract the file type from the base64 string
      //   const fileType = image.split(";")[0].split("/")[1];

      // List of allowed image types
      //   const allowedTypes = ["jpeg", "jpg", "png"];

      //   if (!allowedTypes.includes(fileType)) {
      //     return res.status(400).json({ error: "Invalid image type" });
      //   }

      // Upload image to Cloudinary
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "Craft",
        });
        imageUrl = uploadResponse.secure_url;
        console.log(imageUrl);
      } catch (uploadError) {
        return res.status(500).json({ error: "Failed to upload an image" });
      }
    }

    // Create a new Plant instance
    const newPost = new Post({
      title,
      description,
      author,
      imageUrl,
      timestamp: new Date(), // This will use the default if not provided
    });

    // Save the plant to the database
    await newPost.save();

    // Respond with the created plant object
    res.status(201).json({ msg: "post added" }); // 201 Created
  } catch (error) {
    res.status(400).json({ error: error.message }); // 400 Bad Request
  }
};

// Controller function to get all plants
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name ")
      .sort({ timestamp: -1 });
    res.status(200).json(posts); // 200 OK
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

//delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

module.exports = { createPost, getAllPosts, deletePost };
