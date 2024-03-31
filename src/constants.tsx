export const url = "http://localhost:3001";

// Function to generate URLs with userId
const withUserId = (baseURL: string, userId?: string) => {
    return userId ? `${baseURL}/${userId}` : baseURL;
};

const withClubId = (baseURL: string, clubId?: string) => {
    return clubId ? `${baseURL}/${clubId}` : baseURL;
};

// User
export const loginUrl = `${url}/auth/login`;
export const registerUrl = `${url}/auth/register`;
export const getUsersUrl = `${url}/auth/getUsers`;
export const getUserByIDUrl = `${url}/auth/getUserByID`;
export const getUserByUsernameUrl = `${url}/auth/getUserByUsername`;
export const addFriendUrl = `${url}/auth/addFriend`;
export const removeFriendUrl = `${url}/auth/removeFriend`;
export const updateProfileUrl = (userId?: string) => withUserId(`${url}/auth/updateProfile`, userId);
export const updatePointsNumberUrl = `${url}/auth/updatePointsNumber`;

// Posts
export const createPostUrl = `${url}/posts/createPost`;
export const getPostsUrl = `${url}/posts/getPosts`;
export const getPostsOfUserUrl = `${url}/posts/getPostsOfUser`;
export const deletePostByIDUrl = `${url}/posts/deletePostById`;
export const updateLikesNumberUrl = `${url}/posts/updateLikesNumber`;

// Clubs
export const createClubUrl = `${url}/clubs/createClub`;
export const getClubsUrl = `${url}/clubs/getClubs`;
export const getClubsOfUserUrl = `${url}/clubs/getClubsOfUser`;
export const deleteClubByIDUrl = `${url}/clubs/deleteClubById`;
export const getClubByIDUrl = `${url}/clubs/getClubById`;
export const clubsSubscribtionsUrl = `${url}/clubs/clubsSubscribtion`;
export const deleteClubSubscribtionsUrl = `${url}/clubs/deleteClubSubscribtion`;
export const addPostToClubUrl = `${url}/clubs/addPostToClub`;
export const updateClubUrl = (clubId?: string) => withClubId(`${url}/clubs/updateClub`, clubId);

//Comment
export const createCommentUrl = `${url}/comments/createComment`;
export const deleteCommentUrl = `${url}/comments/deleteComment`;