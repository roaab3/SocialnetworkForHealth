import { Router } from "express";

import { CommentsController } from "../controllers/commentController";

const router = Router();
router.post("/createComment", CommentsController.createComment);
router.delete("/deleteComment", CommentsController.deleteComment);

export default router;
