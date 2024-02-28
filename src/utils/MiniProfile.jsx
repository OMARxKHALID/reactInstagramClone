import React from 'react';

const MiniProfile = ({ userProfile }) => {
    if (!userProfile) {
        return null; 
    }
    return (
        <div>
            <div className="flex items-center">
                <div className="rounded-full overflow-hidden mr-2">
                    <img
                        loading="lazy"
                        src={userProfile.profilePicUrl} 
                        alt={userProfile.username}
                        className="h-9 w-9 rounded-full object-cover border-2 border-pink-500"
                    />
                </div>
                <div>
                    <div className="text-md font-semibold">
                        {userProfile.username} 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MiniProfile;
