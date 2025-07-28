import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import Mstyle from '../style/main.module.css';
import Topbar from '../components/Topbar'
import RightBar from '../components/RightBar';
import ShowInitiative from '../components/ShowInitiative';
import { useDispatch } from 'react-redux';
import { fetchInitiative } from '../Reducers/InitiativeSlice';


function Initiative() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitiative());
    }, [])

    return (
        <div className='ml-6'>
            <Topbar />
            <div className={`${Mstyle.maindiv}`}>
                <div className={Mstyle.left}>
                    <Sidebar>
                        {/* <Card /> */}
                        <ShowInitiative />
                        <div className="h-full w-2.5 bg-gray-300" />
                        <RightBar />
                    </Sidebar>
                </div>
            </div>

        </div>
    )
}

export default Initiative
