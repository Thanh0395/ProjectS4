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
} from "@mui/material";

function UserAdmin(props) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    column: "userId",
    direction: "asc",
  });

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
          setUsers(data);
          setFilteredUsers(data); // Set filteredUsers after users is set
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle search functionality
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
        comparison = a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
      } else if (column === "userRoles") {
        comparison = a.userRoles.join().localeCompare(b.userRoles.join());
      } else {
        comparison = a[column].toString().localeCompare(b[column].toString());
      }

      return (sortCriteria.direction === "asc" ? 1 : -1) * comparison;
    });

    setFilteredUsers(sortedData);
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
              {["userId", "email", "name","avatar", "isActive", "userRoles"].map(
                (header) => (
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
                )
              )}
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
                      src={user.avatar}
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell>{user.isActive ? "Inactive" : "Active"}</TableCell>
                <TableCell>
                  <ul>
                    {user.userRoles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <button>Delete</button>
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
