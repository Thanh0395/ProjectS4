import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Switch,
  Chip,
  Button,
  Modal,
  Box,
  Typography,
  Pagination
} from "@mui/material";

import env from "../../environment.json";
import AdminAddUser from "./AdminAddUser";
import AdminAddUserForm2 from "./UserAdmin/AdminAddUserForm2";
import { AdminDeleteUserAPI } from "../../services/api/AuthApi";
import AdminAddRoleForm from "./UserAdmin/AdminAddRoleForm";

function UserAdmin(props) {
  const [users, setUsers] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    column: "userId",
    direction: "asc",
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const userHasAdminRole = (userRoles) => userRoles.includes("ADMIN");
  const urlMedia = env.urls.media;
  const loggedInUserId = JSON.parse(localStorage.getItem("currentUser")).userId;



  const buttonLinkStyle = {
    display: "inline-block",
    padding: "9px 6px",
    backgroundColor: "#007bff", // Change this to your desired button color
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
  };

  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  const handleOpenModal = () => {
    setIsAddRole(false);
    setActionForm("Create New User");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Fetch users data
  useEffect(() => {
    fetch("http://localhost:8080/api/project4/nhan/users/list")
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Network response was not ok")
      )
      .then((data) => {
        if (Array.isArray(data)) {
          // const processedData = data.map((user) => ({
          //   ...user,
          //   isActive: user.isActive === "true", // Convert string to boolean if necessary
          // }));
          const sortedData = data.sort((a, b) => a.userId - b.userId); // Example using 'userId'
          setUsers(sortedData);
          setFilteredUsers(sortedData);
          console.log("List User :", sortedData);
          // Extract and set unique role options from user data
          const extractedRoles = new Set();
          data.forEach((user) => {
            user.userRoles.forEach((role) => {
              extractedRoles.add(role); // Assuming 'role' is a string
            });
          });
          setRoleOptions(Array.from(extractedRoles));
          setRerender(false);
          setIsLoad(false);
          setEmailAddRole('');
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [reRender, isLoad]);

  //Handle search functionality
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filteredData);
  };

  // Handle sorting functionality
  const handleSort = (column) => {
    const isAsc =
      sortCriteria.column === column && sortCriteria.direction === "asc";
    setSortCriteria({ column, direction: isAsc ? "desc" : "asc" });

    const sortedData = [...filteredUsers].sort((a, b) => {
      let comparison = 0;
      if (column === "isActive") {
        comparison = a.isActive === b.active ? 0 : a.active ? -1 : 1;
      } else if (column === "userRoles") {
        const userRolesA = a.userRoles.join(", ");
        const userRolesB = b.userRoles.join(", ");
        comparison = userRolesA.localeCompare(userRolesB);
      } else {
        const valueA = a[column];
        const valueB = b[column];

        if (typeof valueA === "string") {
          comparison = valueA.localeCompare(valueB);
        } else {
          comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        }
      }

      return sortCriteria.direction === "asc" ? comparison : -comparison;
    });

    setFilteredUsers(sortedData);
  };

  // Unified function to handle updates for isActive and userRoles
  const handleUserUpdate = (userId, updatedData) => {
    fetch(`http://localhost:8080/api/project4/nhan/users/update`, {
      method: "PUT", // Use 'PUT' or 'POST' as per your API specification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: updatedData.isActive, userId }),
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not ok, throw an error to catch it later
          console.log("errrrrrrr:", response);
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming your API sends back the updated user data
      })
      .then((updatedUser) => {
        // Update the local state to reflect the change
        const updatedUsers = users.map((user) => {
          if (user.userId === userId) {
            // Merge the updated data from the response
            return { ...user, ...updatedUser };
          }
          return user;
        });
        setUsers(updatedUsers);
        setRerender((prev) => !prev);

        // setFilteredUsers(updatedUsers);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Function to delete a user by ID
  const deleteUser = (userId) => {
    AdminDeleteUserAPI(userId)
      .then(rs => {
        console.log("delete user res :", rs);
        setMessage("Delete user successfully");
        setRerender(true);
      })
      .catch(error => {
        const errorObj = error.response ? error.response.data : error.message;
        setMessage(errorObj['Error Message'] || 'An error occurred.');
      })
  };

  // Render the component
  const [message, setMessage] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const [isAddRole, setIsAddRole] = useState(true);
  const [actionForm, setActionForm] = useState('');
  const [emailAddRole, setEmailAddRole] = useState('');
  const handleAddRole = (email) => {
    setIsAddRole(true);
    setActionForm("Add Role Form");
    setEmailAddRole(email);
    setOpenModal(true);
  }
  return (
    <div>
      <h1>User List</h1>
      <Button
        align="center"
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
      >
        Create New User
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="create-user-modal-title"
        aria-describedby="create-user-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="create-user-modal-title" variant="h6" component="h2">
            {actionForm}
          </Typography>
          {/* <AdminAddUser onClose={handleCloseModal} /> */}
          {isAddRole === true ? (
            <AdminAddRoleForm setOpenModal={setOpenModal} setIsLoad={setIsLoad} setMessage={setMessage} emailAddRole={emailAddRole}/>
          ) : (
            <AdminAddUserForm2 setOpenModal={setOpenModal} setIsLoad={setIsLoad} setMessage={setMessage} />
          )}
        </Box>
      </Modal>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      {message && (
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible className="text-center">
          {message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Sorting for User ID, Email, Name, Active status, User Roles */}
              {[
                "userId",
                "email",
                "name",
                "avatar",
                "isActive",
                "userRoles",
              ].map((header) => (
                <TableCell key={header}>
                  <TableSortLabel
                    active={sortCriteria.column === header}
                    direction={
                      sortCriteria.column === header
                        ? sortCriteria.direction
                        : "asc"
                    }
                    onClick={() => handleSort(header)}
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.userId}>
                {/* Render user data */}
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.avatar && (
                    <img
                      src={`${urlMedia}${user.avatar}`}
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.active}
                    onChange={(e) =>
                      handleUserUpdate(user.userId, {
                        isActive: e.target.checked,
                      })
                    }
                    disabled={user.userId === loggedInUserId || userHasAdminRole(user.userRoles)} // Disabled if it's the current user or if the user has an 'ADMIN' role
                  />
                </TableCell>
                <TableCell>
                  {user.userRoles.map((role, index) => (
                    <Chip key={index} label={role} style={{ margin: "2px" }} />
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => handleAddRole(user.email)}
                  >
                    Add Role
                  </Button>
                  <Link style={buttonLinkStyle} to={`detail/${user.userId}`}>
                    View Detail
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredUsers.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </div>
  );
}

export default UserAdmin;
