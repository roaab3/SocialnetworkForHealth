
import users from "../db/models/users";
import { IUser } from "../db/models/users";
const bcrypt = require("bcrypt");
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
      googleId: user.googleId,
    });
    const response = await users.create(user);
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
  public async checkGoogleID(user: any) {
    const data = await users.findOne({
      googleId: user.googleId,
    });
    console.log("data:" + data);
    console.log("data2: " + user);
    return data?.googleId === user.googleId;
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

  public async changePassword(
    userId: string,
    currentPass: string,
    newPass: string
  ) {
    try {
      const existingUser = await users.findById(userId);
      if (!existingUser) {
        throw new Error("User not found");
      } else {
        console.log(existingUser);
        // Check if the current password matches;
        const IsMatch = await bcrypt.compare(
          currentPass,
          existingUser.password
        );
        console.log("IsMatch: " + IsMatch);
        if (!IsMatch) {
          return {
            status: "failure",
            message: "Current password is incorrect",
          };
        }
        const saltRounds = 10;
        const newPassHash = bcrypt.hashSync(newPass, saltRounds);

        // Update only the password property
        const user = await users.findByIdAndUpdate(
          userId,
          { password: newPassHash },
          { new: true }
        );
        // Check if the user was found and updated successfully
        if (!user) {
          throw new Error("User not found");
        }
        // Return the updated user
        return user;
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
  // function aimmed to adde friend to the current user how did subsicribe to other user then update number of followers how want to follow him
  public async addFriend(args: any) {
    try {
      const { username, friendId } = args;
      console.log(args);
      const existingUser = await users.findOne({ username: username });

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Update the user document to add the friendId to the friends array
      await users
        .findOne({
          username: username,
        })
        .updateOne({
          $push: { friends: friendId },
        });
      const updateFriend = await users.findByIdAndUpdate(
        { _id: friendId },
        { $push: { followers: existingUser._id } }
      );

      if (!updateFriend) {
        throw new Error("User friend not found ");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      throw error;
    }
  }
// function aimmed to remove friend to the current user how did subsicribe to other user then update number of followers how want to unfollow him
  public async removeFriend(params: any) {
    try {
      const { id, username } = params;

      const existingUser = await users.findOne({ username: username });
      if (!existingUser) {
        throw new Error("User not found");
      }
      await users
        .findOne({
          username: username,
        })
        .updateOne({
          $pull: { friends: id },
        });
    
      const updateFriend = await users.findByIdAndUpdate(
        { _id: id },
        { $pull: { followers: existingUser._id} }

      );
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
