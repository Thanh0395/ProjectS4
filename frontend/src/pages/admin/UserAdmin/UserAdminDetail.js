import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const  UserAdminDetail = () => {
  const { userId } = useParams();
  console.log(userId);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
      // Fetch user details when the component mounts
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/project4/nhan/users/detail/${userId}`);
          console.log(response);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    }, [userId]);
  
    return (
      <div>
        {userDetails ? (
          <div>
            <h1>User Details</h1>
            <div>
              <img src={userDetails.avatar} alt="User Avatar" />
              <p>User Name: {userDetails.userName}</p>
              <p>Email: {userDetails.email}</p>
              <p>Date of Birth: {userDetails.dateOfBirth}</p>
              <p>User Roles: {userDetails.userRoles.join(', ')}</p>
              <p>Amount of Posts: {userDetails.amountOfPosts}</p>
              <p>Amount of Gems: {userDetails.amountOfGems}</p>
              <p>Amount of User Achievements: {userDetails.amountOfUserAchievements}</p>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    );
}

export default UserAdminDetail;