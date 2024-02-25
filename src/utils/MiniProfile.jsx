import React from 'react';

const MiniProfile = ({ currentUser }) => {
    return (
        <div>
            <div className="flex items-center">
                <div className="rounded-full overflow-hidden mr-2">
                    <img
                        src={
                            currentUser.profilePicUrl
                        }
                        alt={currentUser.username}
                        className="h-9 w-9 rounded-full object-cover border-2 border-pink-500"
                    />
                </div>
                <div>
                    <div className="text-md font-semibold">
                        {currentUser.username}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MiniProfile
