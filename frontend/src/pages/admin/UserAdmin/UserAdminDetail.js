import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Avatar
} from '@mui/material';





const UserAdminDetail = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const mediaUrl ="http://localhost:8080/";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/project4/nhan/user/detail/${userId}`);
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      {userDetails ? (
        <div>
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            User Details
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar src={`${mediaUrl}${userDetails.avatar}`} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
            <Typography variant="h6">{userDetails.userName}</Typography>
          </div>
          <List>
            <ListItem>User ID: {userDetails.userId}</ListItem>
            <ListItem>Email: {userDetails.email}</ListItem>
            <ListItem>Date of Birth: {userDetails.dateOfBirth}</ListItem>
            <ListItem>Roles: {userDetails.userRoles.join(', ')}</ListItem>
            {/* Add other user details here as needed */}
          </List>
        </div>
      ) : (
        <CircularProgress style={{ display: 'block', margin: 'auto' }} />
      )}
    </Paper>
  );
};

export default UserAdminDetail;
