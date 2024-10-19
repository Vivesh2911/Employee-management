import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        const fetchedUsers = response.data.data;

        const updatedUsers = fetchedUsers.map(user => {
          const storedUser = localStorage.getItem(`user_${user.id}`);
          return storedUser ? JSON.parse(storedUser) : user;
        });

        setUsers(updatedUsers);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove deleted user
      localStorage.removeItem(`user_${id}`); // Remove from local storage
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <img src={user.avatar} alt={user.first_name} />
              </td>
              <td>
                <User user={user} onDelete={handleDelete} onUpdate={handleUpdate} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
