import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import users from '../data/users';
import postsData from '../data/data'; 
import UserPosts from './UserPosts';

const UserProfile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = () => {
      const foundUser = users.find(user => user.username === username);
      setUserProfile(foundUser);
      const userPosts = postsData.filter(post => post.user.username === foundUser.username);
      setUserPosts(userPosts);
    };

    fetchUserProfile();
  }, [username]);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center items-center my-8">
        <div className="w-32 h-32 relative overflow-hidden rounded-full">
          <img src={userProfile.url} alt={userProfile.username} className="object-cover w-full h-full" />
        </div>
        <div className="ml-8">
          <h2 className="text-2xl font-semibold">{userProfile.username}</h2>
          <p className="text-gray-600">{userProfile.name}</p>
        </div>
      </div>
      <div className="flex flex-col jusfify-center" style={{minWidth: "370px"}}>
        {userPosts.map(post => <UserPosts key={post.created_at} post={post} />)}
      </div>
    </div>
  );
};

export default UserProfile;
