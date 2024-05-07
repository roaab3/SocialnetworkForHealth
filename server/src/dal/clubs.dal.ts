import clubs, { IClub } from "../db/models/clubs";
import users from "../db/models/users";
import post from "../db/models/posts";


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

    const response = await clubs.create(club);
    //newClub.save();
    console.log(response.name);
    await users
      .findOne({
        username: response.author,
      })
      .updateOne({
        $push: { clubs: response },
      });
    return response;
  }

  public async deleteClubById(params: any) {
    const { id, username } = params;
    const clubData = await clubs.findByIdAndDelete(id);
    console.log(username);
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
  //add club to user array club he follow
  public async clubsSubscribtion(args: any) {
    try {
      const { username, clubsSubscribtion } = args;
      console.log(args);

      const user= await users.findOne({username: username});
       console.log(user);
       //if(user){
      //   const existingClub =user.clubsSubscribtion?.find({_id:club._id});
      //   console.log(existingClub);
      //   if(!existingClub){
      //     await users.updateOne(
      //       { _id: user._id },
      //       { $push: { clubsSubscribtion: club } }
      //   );
      //     await clubs.findOneAndUpdate({_id:club._id}, {$inc: { followers: 1}});
      //     return { status: "success", message: "add it successfully" };
      //   }
      //  return { status: "failure", message: "already a member in this club" }; ;
      // }
      //check if the club already in clubsSubscribtion----------------------

      await users
        .findOne({
          username: username,
        })
        .updateOne({
          $push: { clubsSubscribtion: clubsSubscribtion },
        });
        //update number of users that subcribe to this club and become member on it
      await clubs.findOneAndUpdate(
        { _id: clubsSubscribtion._id},
        { $inc: { followers: 1 } }
      );
    } catch (error) {
      console.error("Error adding club:", error);
      throw error;
    }
  }
  
//delete club to user array club he follow
  public async deleteClubSubscribtion(params: any) {
    const { id, username } = params;
    const clubData = await clubs.findById(id);
    //find user then remove the culb from clubsSubscribtion
    await users
      .findOne({
        username: username,
      })
      .updateOne({
        $pull: { clubsSubscribtion: { _id: id } },
      });

    if (clubData) return { status: "success", message: "UnSbscribe  successfully" };
    else return { status: "failure", message: "Doesn't delete!" };
  }

  public async addPostToClub(args: any) {
    try {
      const { name, posts } = args;
      console.log(posts);
      await clubs
        .findOne({
          name: name,
        })
        .updateOne({
          $push: { posts: posts },
        });

      await post.updateOne({ _id: posts._id }, { $set: { club: name } });
    } catch (error) {
      console.error("Error adding post to club:", error);
      throw error;
    }
  }
  public async deletePostfromClub(args: any) {
    try {
      const { id, posts } = args;
      console.log(id);
      console.log(posts);

      const updateclubResult = await clubs.findOneAndUpdate(
        { _id: id },
        { $pull: { posts: { _id: posts._id } } }
      );
      console.log(updateclubResult);

      if (!updateclubResult) {
        throw new Error(
          "club not found or post not present in club's posts array"
        );
      }
    } catch (error) {
      console.error("Error adding post to club:", error);
      throw error;
    }
  }
  //update post in club manually after add comment or like
  public async updatePostForClub(arg: any) {
    const { name, id } = arg;
    console.log(name);
    console.log(id);
    const updateclubResult = await clubs.findOneAndUpdate(
      { name: name },
      { $pull: { posts: { _id: id } } }
    );
    console.log(updateclubResult);
    if (!updateclubResult) {
      throw new Error(
        "club not found or post not present in club's posts array"
      );
    }
    // find the update post for collection Posts
    const findPost= await post.findById(id);
    console.log(findPost);
    //add it to the club's post array
    const clubAfterupdate = await clubs.findOneAndUpdate(
      { name: name },
      { $push: { posts: findPost} }
    );
    console.log(clubAfterupdate);
    if (!clubAfterupdate) {
      throw new Error(
        "club not found or post not present in club's posts array"
      );
    }
    return { status: "success", message: "Update Club's posts array successful" };
    
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
