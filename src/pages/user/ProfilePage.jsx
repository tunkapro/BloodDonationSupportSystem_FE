import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileView from "./userdetail/ProfileView";
import ProfileEdit from "./userdetail/ProfileEdit";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    axios.get(`/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setUser(res.data);
    });
  }, [userId]);

  const handleSave = (updatedData) => {
    const token = localStorage.getItem('jwt_token');
    axios.put(`/api/user/profile`, updatedData, {
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