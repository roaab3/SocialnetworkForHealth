import { Router } from "express";

import { ClubsController } from "../controllers/clubsController";

const router = Router();

router.get("/getClubs", ClubsController.getClubs);
router.get("/getClubsOfUser", ClubsController.getClubsOfUser);
router.post("/createClub", ClubsController.createClub);
router.delete("/deleteClubById", ClubsController.deleteClubById);
router.get("/getClubById", ClubsController.getClubById);
router.post("/clubsSubscribtion", ClubsController.clubsSubscribtion);
router.delete("/deleteClubSubscribtion", ClubsController.deleteClubSubscribtion);
router.post("/addPostToClub", ClubsController.addPostToClub);
router.post("/updateClub/:clubId", ClubsController.updateClub);

export default router;
