import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileView from "../../pages/user/userdetail/ProfileView";
import ProfileEdit from "../../pages/user/userdetail/ProfileEdit";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setUser(res.data);
    });
  }, [userId]);

  const handleSave = (updatedData) => {
    const token = localStorage.getItem('jwt_token');
    axios.put(`/api/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data);
        setEditing(false);
      })
      .catch(err => console.error(err));
  };

  if (!user) return <div>Loading...</div>;

  return editing ? (
    <ProfileEdit user={user} onSave={handleSave} onCancel={() => setEditing(false)} />
  ) : (
    <ProfileView user={user} onEdit={() => setEditing(true)} />
  );
};

export default ProfilePage;