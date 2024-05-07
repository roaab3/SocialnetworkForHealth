import { Router } from "express";

import { PostsController } from "../controllers/postsController";

const router = Router();

router.get("/getPosts", PostsController.getPosts);
router.get("/getPostsOfUser", PostsController.getPostsOfUser);
router.post("/createPost", PostsController.createPost);
router.delete("/deletePostById", PostsController.deletePostById);
router.post("/updateLikesNumber",PostsController.updateLikesNumber );
router.get("/getLikesForPost",PostsController.getLikesForPost );
router.post("/updatePost",PostsController.updatePost );


export default router;
