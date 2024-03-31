import clubs, { IClub } from "../db/models/clubs";
import users from "../db/models/users";
import post from "../db/models/posts"

export class ClubsDal {
// Functions to create, update delete and find clubs

  public async createClub(club: any) {

    const newClub = new clubs({
      name: club.name,
      description: club.description,
      imageUrl: club.imageUrl,
      author: club.author,
      type: club.type,
      domain: club.domain,
    });

    const response = await clubs.create(newClub);
    newClub.save();

    await users
      .findOne({
        author: response.author,
      })
      .updateOne({
        $push: { clubs: response },
      });
    return response;
  }

  public async deleteClubById(params: any) {
    const { id, username } = params;
    const clubData = await clubs.findByIdAndDelete(id);

    console.log(clubData);

    await users
      .findOne({
        username: clubData?.author,
      })
      .updateOne({
        $pull: { clubs: { _id: id } },
      });

    if (clubData) return { status: "success", message: "Delete successfully" };
    else return { status: "failure", message: "Doesn't delete!" };
  }

  public findAll(query: any = null) {
    return clubs.find(query);
  }

  public async getClubsOfUser(user: any) {
    const data = await clubs.find({
      userName: user.username,
    });
    return data;
  }

  public async getClubById(clubId: string) {
    const data = await clubs.findById(clubId);
    return data;
  }

  public async clubsSubscribtion(args: any) {
    try {
      const { username, clubsSubscribtion } = args;

      await users
        .findOne({
          username: username,
        })
        .updateOne({
          $push: { clubsSubscribtion: clubsSubscribtion },
        });
    } catch (error) {
      console.error("Error adding club:", error);
      throw error;
    }
  }

  public async deleteClubSubscribtion(params: any) {
    const { id, username } = params;
    const clubData = await clubs.findById(id);

    await users
      .findOne({
        username: username,
      })
      .updateOne({
        $pull: { clubsSubscribtion: { _id: id } },
      });

    if (clubData) return { status: "success", message: "Delete successfully" };
    else return { status: "failure", message: "Doesn't delete!" };
  }

  public async addPostToClub(args: any) {
    try {
      const { name, posts } = args;

      await clubs
        .findOne({
          name: name,
        })
        .updateOne({
          $push: { posts: posts },
        });

        await post.updateOne(
          { _id: posts._id }, 
          { $set: { "club": name } }
      );

    } catch (error) {
      console.error("Error adding post to club:", error);
      throw error;
    }
  }

  public async updateClub(clubId: string, updatedFields: Partial<IClub>) {
    try {
      const existingClub = await clubs.findById(clubId);
      if (!existingClub) {
        throw new Error("Club not found");
      }

      // Check which fields are different from the original club
      const updatedClub: Partial<IClub> = {};
      for (const key in updatedFields) {
        if (
          existingClub[key as keyof IClub] !== updatedFields[key as keyof IClub]
        ) {
          updatedClub[key as keyof IClub] = updatedFields[key as keyof IClub];
        }
      }

      if (Object.keys(updatedClub).length === 0) {
        // If no fields are different, return the existing user
        return existingClub;
      }

      // Update only the fields that have changed
      const club = await clubs.findByIdAndUpdate(
        clubId,
        { $set: updatedClub },
        { new: true }
      );

      if (!club) {
        throw new Error("Club not found");
      }
      return club;
    } catch (error) {
      console.error("Error updating club settings:", error);
      throw error;
    }
  }
}
