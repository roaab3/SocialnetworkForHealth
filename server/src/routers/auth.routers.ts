import { Router } from "express";

import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/getUsers", AuthController.getUsers);
router.get("/getUserByUsername", AuthController.getUserByUsername);
router.get("/getUserById/:id", AuthController.getUserById);
router.post("/addFriend", AuthController.addFriend);
router.delete("/removeFriend", AuthController.removeFriend);
router.post("/updateProfile/:userId", AuthController.updateProfile);
router.post("/updatePointsNumber",AuthController.updatePointsNumber );

export default router;
