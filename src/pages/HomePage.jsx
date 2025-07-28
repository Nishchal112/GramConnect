import React from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import ShowInitiative from '../components/ShowInitiative';
import RightBar from '../components/RightBar';
import { useSelector } from 'react-redux';

const HomePage = () => {

    const user = useSelector((state) => state.auth.user);

    return (
        <div className='ml-6'>
            <Topbar />
            <Sidebar>
                <ShowInitiative />
                <div className="h-full w-2.5 bg-gray-300" />
                <RightBar />
            </Sidebar>
        </div>
    );
};

export default HomePage;
