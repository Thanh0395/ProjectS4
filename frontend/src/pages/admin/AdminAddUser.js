import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from 'axios';


function AdminAddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [roles, setRoles] = useState([]);

  const handleRoleChange = (role) => {
    setRoles(prev => {
        if (prev.includes(role)) {
          return prev.filter(r => r !== role); // Remove role if already included
        } else {
          return [...prev, role]; // Add role if not included
        }
      });
  };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    isActive: false,
    listNameRole: [],
  });

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/project4/auth/admin-add-user', formData);
            console.log(response.data);
            // Handle success (clear form, show message, etc.)
        } catch (error) {
            console.error(error);
            // Handle error (show error messages, etc.)
        }
    }

  return (
    <div>
      <Typography variant="h4">Add New User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Is Active"
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.includes("USER")}
                onChange={() => handleRoleChange("USER")}
              />
            }
            label="USER"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.includes("TEACHER")}
                onChange={() => handleRoleChange("TEACHER")}
              />
            }
            label="TEACHER"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.includes("ADMIN")}
                onChange={() => handleRoleChange("ADMIN")}
              />
            }
            label="ADMIN"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>
    </div>
  );
}

export default AdminAddUser;
