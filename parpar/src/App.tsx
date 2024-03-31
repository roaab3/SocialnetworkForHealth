import { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import axios from "axios";
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

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/");
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

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
          <Route path="/addPost" element={<Authors />} />
          <Route path="/addClub" element={<AddClub />} />
          <Route path="/editClubSettings/:clubId" element={<EditClubSettings />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
