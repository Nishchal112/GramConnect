import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateInit from './CreateInit';
import InitLoader from './InitLoader.jsx';
import InitiativeItem from './InitiativeItem.jsx';
import { fetchInitiative } from '../Reducers/InitiativeSlice.js';

const ShowInitiative = () => {
    const dispatch = useDispatch();
    const initiatives = useSelector((state) => state.initiative.initiativeData);
    const currUser = useSelector((state) => state.auth.user);
    const status = useSelector((state) => state.initiative.status);
    // Only show the loader if no initiatives have been fetched yet
    const isInitialLoading = initiatives.length === 0 && status === 'loading';

    useEffect(() => {
        dispatch(fetchInitiative());
    }, [dispatch]);

    return (
        <div className="scroll_hide">
            <CreateInit />
            <div className="grid grid-cols-1 space-y-1.5 mx-2 mt-2">
                {isInitialLoading ? (
                    <InitLoader />
                ) : (
                    initiatives.map((initiative) => (
                        <InitiativeItem
                            key={initiative._id}
                            initiative={initiative}
                            currUser={currUser}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowInitiative;
