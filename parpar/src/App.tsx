import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./pages/layout";
import Clubs from "./pages/clubs";
import ClubPage from "./pages/[club_id]/clubPage";
import Authors from "./pages/authors";
import UserPage from "./pages/[user_id]/userPage";
import EditUserProfile from "./pages/[user_id]/editUserProfile";
import AddClub from "./pages/addClub";
import EditClubSettings from "./pages/[club_id]/editClubSettings"
import AddPost from "./pages/addPost";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:clubId" element={<ClubPage />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:userId" element={<UserPage />} />
          <Route path="/editProfile/:userId" element={<EditUserProfile />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/addClub" element={<AddClub />} />
          <Route path="/editClubSettings/:clubId" element={<EditClubSettings />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
