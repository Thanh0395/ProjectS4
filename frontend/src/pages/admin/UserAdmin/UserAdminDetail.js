import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const UserAdminDetail = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  // Replace this with actual roles fetched from your backend or defined in your system
  const userRoles = ["Admin", "User", "Moderator", "Guest"];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/project4/nhan/users/detail/${userId}`
        );
        setUserDetails(response.data);
        setUpdatedUserDetails(response.data); // Initialize form with existing data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleRoleChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      userRoles: [e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      formData.append("userDetails", JSON.stringify(updatedUserDetails));

      await axios.put(
        `http://localhost:8080/api/project4/nhan/users/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserDetails(updatedUserDetails);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      {userDetails ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            Edit User Details
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src={userDetails.avatar}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
            <input type="file" onChange={handleAvatarChange} />
          </div>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={updatedUserDetails.userName}
                onChange={handleInputChange}
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={updatedUserDetails.email}
                disabled
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <Select
                labelId="test-select-label"
                label={"Label1233333"}
                fullWidth
                name="User Role"
                value={
                  updatedUserDetails.userRoles
                    ? updatedUserDetails.userRoles[0]
                    : ""
                }
                onChange={handleRoleChange}
              >
                {userRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
            {/* Other fields can be added similarly */}
          </List>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Update Profile
          </Button>
        </form>
      ) : (
        <CircularProgress style={{ display: "block", margin: "auto" }} />
      )}
    </Paper>
  );
};

export default UserAdminDetail;
