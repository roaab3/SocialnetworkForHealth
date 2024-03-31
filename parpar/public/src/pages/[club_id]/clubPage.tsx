import { useDispatch, useSelector } from "react-redux";
import ClubDetails from "../../components/clubs/clubDetails/clubDetails";
import { useEffect, useState } from "react";
import { IClubs } from "../../interfaces/clubs";
import { getClubByID } from "../../services/fetchData";
import { setClubPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import Publications from "../../components/clubs/publications/publications";
import ClubsModeratores from "../../components/clubs/clubsModeratores/clubsModeratores";

const ClubPage = () => {
  const dispatch = useDispatch();
  const { clubId } = useParams<{ clubId: string }>(); // Extract clubId from URL params
  const clubData = useSelector((state: any) => state.clubs.clubPage);

  useEffect(() => {
    const fetchClubData = async () => {
      if (clubId) {
        try {
          const club = await getClubByID(clubId);
          dispatch(setClubPage(club));
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchClubData();
  }, [clubId, dispatch]);

  const [activeTab, setActiveTab] = useState("details");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ClubDetails club={clubData} />
    </>
  );
};

export default ClubPage;
