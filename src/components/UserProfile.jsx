import React from 'react';
import ProfileHeader from './ProfileHeader';
import UserPosts from './UserPosts';
import MiddleHeader from './MiddleHeader';

const UserProfile = () => {
  return (
    <div>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <ProfileHeader />
          <MiddleHeader/>
          <UserPosts />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

