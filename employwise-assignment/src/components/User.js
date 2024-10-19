import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`); // Navigate to edit page with user ID
  };

  return (
    <div>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default User;
