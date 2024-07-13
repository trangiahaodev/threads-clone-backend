import express from "express";

import {
  createPost,
  getPost,
  deletePost,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:postId", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/:postId", protectRoute, deletePost);

export default router;
