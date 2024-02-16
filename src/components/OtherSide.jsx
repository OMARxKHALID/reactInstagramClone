import React, { useState, useEffect } from 'react';
import users from '../data/users';

const OtherSide = () => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [seeAll, setSeeAll] = useState(false);

    const HandleSeeAll = () => {
        setSeeAll(!seeAll)
    }

    useEffect(() => {
        const isMedium = window.matchMedia("(max-width: 900px)").matches;
        setIsMediumScreen(isMedium);

        const handleResize = () => {
            setIsMediumScreen(window.matchMedia("(max-width: 900px)").matches);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (isMediumScreen) {
        return null;
    }

    const user = users[7];

    return (
        <div className="pl-4 right mt-6 p-4 max-w-xs" style={{ minWidth: '220px' }}>
            <div className="flex items-center mb-4">
                <div className="rounded-full overflow-hidden mr-2">
                    <img src={user.url} alt={user.username} className='h-12 w-12 rounded-full object-cover border-2 border-pink-500' />
                </div>
                <div>
                    <span className="text-sm font-semibold">{user.username}</span>
                    <span className="text-sm -mt-1 text-gray-500 block">{user.name}</span>
                </div>
                <div className="flex flex-col ml-auto">
                    <span className="text-sm font-semibold text-blue-600">Switch</span>
                </div>

            </div>
            <div >
                <div className="flex w-full justify-between text-sm">
                    <div className="left">
                        <h1 className="font-semibold text-gray-400">Suggestions For You</h1>
                    </div>
                    {users.length > 4 && (
                        <div className="right">
                            <button onClick={HandleSeeAll} className='text-sm text-black font-semibold'>
                                {seeAll ? 'hide' : `See all`}
                            </button>
                        </div>
                    )}
                </div>
                {users.slice(0, seeAll ? undefined : 5).map((user) => (
                    <div key={user.id} className="mt-4 flex w-full justify-between items-center">
                        <div className="flex flex-row pl-2">
                            <div className="h-10 w-10 rounded-full object-cover border-2 border-pink-500 overflow-hidden mr-2">
                                <img alt={user.username} src={user.url} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user.username}</span>
                                <span className="text-xs text-gray-400 ">Suggestions For You</span>
                            </div>
                        </div>
                        <a href="#" className="text-blue-600 text-sm font-semibold">follow</a>
                    </div>
                ))}
            </div>
            <div className="text-xs text-gray-400 mt-6 ml-2">© 2024 INSTAGRAM FROM META</div>
        </div>
    );
}

export default OtherSide;
