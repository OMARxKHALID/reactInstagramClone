import React, { useState, useEffect } from 'react';
import users from '../data/users';

const OtherSide = () => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const isMedium = window.matchMedia("(max-width: 768px)").matches;
        setIsMediumScreen(isMedium);

        const handleResize = () => {
            setIsMediumScreen(window.matchMedia("(max-width: 768px)").matches);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (isMediumScreen) {
        return null; 
    }

    const user = users[0];

    return (
        <div className="pl-4 right mt-6 p-4 max-w-xs" style={{ minWidth: '220px' }}>
            <div className="flex items-center mb-4">
                <div className="rounded-full overflow-hidden mr-3">
                    <img src={user.url} alt={user.username} className='h-14 w-14 rounded-full object-cover border-2 border-pink-500'/>
                </div>
                <div >
                    <span className="text-lg font-semibold">{user.username}</span>
                    <span className="text-sm block">{user.name}</span>
                </div>
            </div>
            <div >
                <div className="flex w-full justify-between text-sm">
                    <div className="left">
                        <h1 className="font-bold">Suggestions For You</h1>
                    </div>
                    <div className="right">
                        <span>See All</span>
                    </div>
                </div>
                {users.slice(1, 4).map((user) => (
                    <div key={user.id} className="mt-4 flex w-full justify-between items-center">
                        <div className="flex flex-row pl-2">
                            <div className="h-10 w-10 rounded-full object-cover border-1 border-pink-500 overflow-hidden mr-2">
                                <img alt={user.username} src={user.url} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user.username}</span>
                                <span className="text-xs -mt-1">popular</span>
                            </div>
                        </div>
                        <a href="#" className=" text-blue-600 text-sm font-semibold">follow</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherSide;
