import { Request, Response } from "express";
import { ClubsService } from "../services/clubs.services";

export class ClubsController {
  public static async getClubs(req: Request, res: Response) {
    try {
      const service = new ClubsService();
      const clubs = await service.getClubs();
      return res.send(clubs);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async getClubsOfUser(req: Request, res: Response) {
    try {
      const params = req.body;
      console.log(params);
      const service = new ClubsService();
      const clubs = await service.getClubsOfUser(params);
      return res.send(clubs);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async createClub(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const clubs = await service.createClub(params);
      return res.status(200).send(clubs);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async deleteClubById(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const club = await service.deleteClubById(params);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async getClubById(req: Request, res: Response) {
    try {
      const clubId = req.query.clubId as string;
      const service = new ClubsService();
      const club = await service.getClubById(clubId);
      return res.send(club);
    } catch (error) {
      console.error("Error processing request:", error);
      return res.send(error);
    }
  }

  public static async clubsSubscribtion(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const user = await service.clubsSubscribtion(params);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async deleteClubSubscribtion(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const club = await service.deleteClubSubscribtion(params);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async addPostToClub(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const club = await service.addPostToClub(params);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }
  public static async deletePostfromClub(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const club = await service.deletePostfromClub(params);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }
  
  public static async updatePostForClub(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new ClubsService();
      const club = await service.updatePostForClub(params);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }
  public static async updateClub(req: Request, res: Response) {
    try {
      const clubId = req.params.clubId;
      const updatedClub = req.body;
      const service = new ClubsService();
      const club = await service.updateClub(clubId, updatedClub);
      return res.send(club);
    } catch (error) {
      return res.send(error);
    }
  }
}
