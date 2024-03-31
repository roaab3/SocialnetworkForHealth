import React, { useEffect, useState } from 'react'
import EditClub from '../../components/clubs/editClub/editClub'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getClubByID } from '../../services/fetchData';
import { setClubPage } from '../../redux/Slicers';

const EditClubSettings = () => {
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

  return (
    <div>
        <EditClub club={clubData}/>
    </div>
  )
}

export default EditClubSettings