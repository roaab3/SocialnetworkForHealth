import { ClubsDal } from "../dal/clubs.dal";

export class ClubsService {
  public async getClubs() {
    const dal = new ClubsDal();
    const res = await dal.findAll();
    return res;
  }

  public async getClubsOfUser(user: any) {
    const dal = new ClubsDal();
    const res = dal.getClubsOfUser(user);
    return res;
  }

  public async createClub(club: any) {
    const dal = new ClubsDal();
    const res = dal.createClub(club);
    return res;
  }

  public async deleteClubById(params: any) {
    const dal = new ClubsDal();
    const res = await dal.deleteClubById(params);
    return res;
  }

  public async getClubById(clubId: string) {
    const dal = new ClubsDal();
    const res = await dal.getClubById(clubId);
    return res;
  }

  public async clubsSubscribtion(args: any) {
    const dal = new ClubsDal();
    const res = await dal.clubsSubscribtion(args);
    return res;
  }

  public async deleteClubSubscribtion(params: any) {
    const dal = new ClubsDal();
    const res = await dal.deleteClubSubscribtion(params);
    return res;
  }

  public async addPostToClub(args: any) {
    const dal = new ClubsDal();
    const res = await dal.addPostToClub(args);
    return res;
  }

  public async updateClub(clubId: any, updatedClub: any) {
    const dal = new ClubsDal();
    const res = await dal.updateClub(clubId, updatedClub);
    return res;
  }
}
