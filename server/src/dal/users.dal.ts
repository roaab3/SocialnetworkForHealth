import { clubsSchema } from "../db/models/clubs";
import { postsSchema } from "../db/models/posts";
import users from "../db/models/users";
//import { usersSchema } from "../db/models/users";
import mongoose, { Document, FilterQuery } from "mongoose";
import { IUser } from "../db/models/users";

export class UsersDal {
  public async createUser(user: any) {
    const newUser = new users({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      interests: user.interests,
      clubs: user.clubs,
      imageUrl: user.imageUrl,
      posts: user.posts,
      description: user.description,
      points: user.points,
      publicationDate: user.publicationDate,
      type: user.type,
      country: user.country,
      city: user.city,
      region: user.region,
      industry: user.industry,
      position: user.position,
      friends: user.friends,
    });
    const response = await users.create(newUser);
    return response;
  }

  public async getUserPassword(user: any) {
    const data = await users.findOne({
      username: user.username,
    });

    return data?.password;
  }

  public async checkUser(user: any) {
    const data = await users.findOne({
      username: user.username,
    });
    return data?.username === user.username;
  }

  public findAll(query: any = null) {
    return users.find(query);
  }

  public async getUserById(userId: string) {
    const data = await users.findById(userId);
    return data;
  }

  public async getUserByUsername(username: string) {
    const user = await users.findOne({ username: username });
    return user;
  }
  
  // UpdateProfile function
  public async updateProfile(userId: string, updatedFields: Partial<IUser>) {
    try {
      const existingUser = await users.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      }
      // Check which fields are different from the original user
      const updatedUser: Partial<IUser> = {};
      for (const key in updatedFields) {
        if (
          existingUser[key as keyof IUser] !== updatedFields[key as keyof IUser]
        ) {
          updatedUser[key as keyof IUser] = updatedFields[key as keyof IUser];
        }
      }

      if (Object.keys(updatedUser).length === 0) {
        // If no fields are different, return the existing user
        return existingUser;
      }

      // Update only the fields that have changed
      const user = await users.findByIdAndUpdate(
        userId,
        { $set: updatedUser },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  

  public async addFriend(args: any) {
    try {
      const { username, friendId } = args;
      const existingUser = await users.findOne({ username: username });

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Update the user document to add the friendId to the friends array
      existingUser.friends.push(friendId);
      await existingUser.save();
    } catch (error) {
      console.error("Error adding friend:", error);
      throw error;
    }
  }

  public async removeFriend(params: any) {
    try {
      const { id, username } = params;

      await users
        .findOne({
          username: username,
        })
        .updateOne({
          $pull: {friends: id },
        });
    } catch (error) {
      console.error("Error removing friend:", error);
      throw error;
    }
  }

  public async updatePointsNumber(args: any) {
    try {
      const { username, points } = args;

      await users
        .findOne({
          username: username,
        })
        .updateOne({ $set: { points: points } });
    } catch (error) {
      console.error("Error updating points:", error);
      throw error;
    }
  }
}
