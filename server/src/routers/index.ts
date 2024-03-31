const express = require("express");
import authRoutes from "./auth.routers";
import postsRoutes from "./posts.routers";
import clubsRoutes from "./clubs.routers";
import commentsRoutes from "./comments.routers";

const router = express.Router();

router.use("/auth/", authRoutes);
router.use("/posts/", postsRoutes);
router.use("/clubs/", clubsRoutes);
router.use("/comments/", commentsRoutes);

export default router;
