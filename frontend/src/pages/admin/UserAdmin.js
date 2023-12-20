import React, { useEffect, useState } from "react";
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
} from "@mui/material";

import env from '../../environment.json'


function UserAdmin(props) {
  const [users, setUsers] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    column: "userId",
    direction: "asc",
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const userHasAdminRole = (userRoles) => userRoles.includes("ADMIN");
  const urlMedia = env.urls.media;
  const loggedInUserId = JSON.parse(localStorage.getItem('currentUser')).userId;


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
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [reRender]);

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
    // Find the user by ID
    const user = users.find((user) => user.userId === userId);
    // Check if the user has the 'Admin' role
    if (userHasAdminRole(user.userRoles)) {
      alert("Cannot delete an admin user."); // Alert, or handle this message appropriately in your UI
      return; // Prevent deletion
    }
    fetch(`http://localhost:8080/api/project4/nhan/users/delete/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        // Filter out the deleted user and update the state
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Render the component
  return (
    <div>
      <h1>User List</h1>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
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
            {filteredUsers.map((user) => (
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
                    disabled={user.userId === loggedInUserId}
                  />
                </TableCell>
                <TableCell>
                  {user.userRoles.map((role, index) => (
                    <Chip key={index} label={role} style={{ margin: "2px" }} />
                  ))}
                </TableCell>
                <TableCell>
                  {user.userRoles && !userHasAdminRole(user.userRoles) && (
                    <button onClick={() => deleteUser(user.userId)}>
                      Delete
                    </button>
                  )}
                  <Link to={`detail/${user.userId}`}>View Detail</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserAdmin;
