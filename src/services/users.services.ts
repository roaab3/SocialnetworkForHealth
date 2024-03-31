import { UsersDal } from "../dal/users.dal";
const bcrypt = require("bcrypt");

export class UsersService {
  public async login(user: any) {
    const dal = new UsersDal();
    const hashedPasswordFromDB = await dal.getUserPassword(user);
    if (!hashedPasswordFromDB)
      return { status: "failure", message: "User doesn't exist!!" };
    const response = await bcrypt.compare(user.password, hashedPasswordFromDB);
  }

  public async register(user: any) {
    const dal = new UsersDal();
    const saltRounds = 10; //num of rimes we perform that hashing process
    const isUserExist = await dal.checkUser(user);
    if (isUserExist)
      return { status: "failure", message: "Username already used!" };

    bcrypt.hash(user.password, saltRounds, async (err: any, hash: any) => {
      user["password"] = hash;
      const respond = await dal.createUser(user);
      return respond;
    });
  }

  public async getUsers() {
    const dal = new UsersDal();
    const res = await dal.findAll();
    return res;
  }

  public async createProfile(user: any) {
    const dal = new UsersDal();
    const res = dal.createUser(user);
    return res;
  }

  public async updateProfile(userId: any, updatedUser:any) {
    const dal = new UsersDal();
    const res = await dal.updateProfile(userId, updatedUser);
    return res;
  }

  public async addFriend(args:any) {
    const dal = new UsersDal();
    const res = await dal.addFriend(args);
    return res;
  }

  public async removeFriend(params: any) {
    const dal = new UsersDal();
    const res = await dal.removeFriend(params);
    return res;
  }

  public async getUserById(userId: string) {
    const dal = new UsersDal();
    const res = await dal.getUserById(userId);
    return res;
  }

  public async getUserByUsername(username: string) {
    const dal = new UsersDal();
    const res = await dal.getUserByUsername(username);
    return res;
  }

  public async updatePointsNumber(params: any) {
    const dal = new UsersDal();
    const res = await dal.updatePointsNumber(params);
    return res;
  }
}
