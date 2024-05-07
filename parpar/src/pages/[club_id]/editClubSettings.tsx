import React, { useEffect, useState } from 'react'
import EditClub from '../../components/clubs/editClub/editClub'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getClubByID } from '../../services/fetchData';
import { setClubPage } from '../../redux/Slicers';
import LoggedUserHeader from '../../components/header/loggedUser/loggedUserHeader';
import NotLoggedHeader from '../../components/header/notLoggedHeader/notLoggedHeader';

// Dislay edit club page (dynamic page)
const EditClubSettings = () => {
  const dispatch = useDispatch();
  const { clubId } = useParams<{ clubId: string }>(); // Extract clubId from URL params
  const clubData = useSelector((state: any) => state.clubs.clubPage);
  let currentUser = localStorage.getItem("username");
  
  const userData = useSelector((state: any) => state.currentUser.userPage);
  //fatch club data by club id
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

  return (
    <div>
      {currentUser ? <LoggedUserHeader user={userData} /> : <NotLoggedHeader />}
        <EditClub club={clubData}/>
    </div>
  )
}

export default EditClubSettings