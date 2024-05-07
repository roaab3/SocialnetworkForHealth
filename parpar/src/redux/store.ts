import { configureStore } from "@reduxjs/toolkit";

import { userSlice, postSlice, clubSlice} from "./Slicers";

export default configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    posts: postSlice.reducer,
    clubs: clubSlice.reducer,

  },
});


