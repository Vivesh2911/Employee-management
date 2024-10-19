import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });

      // Retain the original avatar URL from the fetched user data
      const updatedUser = { 
        id, 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        avatar: user.avatar // Keep the original avatar
      };

      // Save updated user data to local storage
      localStorage.setItem(`user_${id}`, JSON.stringify(updatedUser));

      navigate('/users'); // Redirect back to users list
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
