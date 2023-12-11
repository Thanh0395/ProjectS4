import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserAdmin(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/project4/nhan/users/list') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        if (!Array.isArray(data)) {
          throw new Error('Data received is not an array');
        }
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Active</th>
            <th>Avatar</th>
            <th>User Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td>
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <ul>
                  {user.userRoles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button>Delete</button>
                <Link to={`detail/${user.userId}`}>View Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAdmin;
