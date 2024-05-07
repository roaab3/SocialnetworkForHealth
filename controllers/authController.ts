import { Request, Response } from "express";
import { UsersService } from "../services/users.services";

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new UsersService();
      const user = await service.login(params);
      return res.status(200).send(user);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async register(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new UsersService();
      const user = await service.register(params);
      return res.status(200).send(user);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async getUsers(req: Request, res: Response) {
    try {
      const service = new UsersService();
      const users = await service.getUsers();
      return res.send(users);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id ;
      console.log(userId);
      const service = new UsersService();
      const user = await service.getUserById(userId);
      return res.send(user);
    } catch (error) {
      console.error("Error processing request:", error);
      return res.send(error);
    }
  }

  public static async getUserByUsername(req: Request, res: Response) {
    try {
      const username = req.query.username as string;
      const service = new UsersService();
      const user = await service.getUserByUsername(username);
      return res.send(user);
    } catch (error) {
      console.error("Error processing request:", error);
      return res.send(error);
    }
  }

  public static async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const updatedUser = req.body;

      console.log(userId);
      console.log(updatedUser);

      const service = new UsersService();
      
      if (
        "currentPass" in updatedUser &&
        "newPass" in updatedUser &&
        "confirmPass" in updatedUser
      ) {
        console.log("change Password");
        // This is a password change request
        const { currentPass, newPass, confirmPass } = updatedUser; 
        // Implement logic to change the password
        // Ensure to validate the current password, new password, and confirm password
        const user = await service.changePassword(userId, currentPass, newPass);
        return res.send(user);
        // Return appropriate response
      } else {
        const user = await service.updateProfile(userId, updatedUser);
        return res.send(user);
      }
    } catch (error) {
      return res.send(error);
    }
  }

  public static async addFriend(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new UsersService();
      const user = await service.addFriend(params);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async removeFriend(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new UsersService();
      const user = await service.removeFriend(params);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  }
  public static async updatePointsNumber(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new UsersService();
      const user = await service.updatePointsNumber(params);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  }
}
