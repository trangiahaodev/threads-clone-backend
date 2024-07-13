import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({ message: "Please fill all the fields!" });
    }

    const user = await User.findById(postedBy);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to create post" });
    }

    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxLength} characters` });

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Created post successfully", data: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in createPost: ", err.message);
  }
};

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in getPost: ", err.message);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized to delete post" });

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Deleted post successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in deletePost: ", err.message);
  }
};

export { createPost, getPost, deletePost };
