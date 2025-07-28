import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllScheme } from '../Reducers/SchemeSlice';

const ShowSchemes = () => {

    const [order, setOrder] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatcher = useDispatch();
    const schemes = useSelector((state) => state.schemes.Schemes);
    const [sortedSchemes, setSortedScheme] = useState(schemes)

    useEffect(() => {
        setIsLoading(true);
        dispatcher(getAllScheme());
    }, [])

    useEffect(() => {
        if (schemes.length > 0) {
            setSortedScheme([...schemes].sort((a, b) => {
                return order ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }))
        }
        setIsLoading(false);
    }, [order, schemes])


    if (schemes.length === 0) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <h2 className='text-2xl font-semibold'>No Schemes Available</h2>
            </div>
        )
    }

    return (
        <div className='scroll_hide mt-1.5 px-2'>
            <div className='flex justify-between shadow-neutral-500'>
                <h2>
                    Total <span className='text-fuchsia-600'>{schemes.length}</span> Schemes Available
                </h2>
                <div className='flex gap-1 justify-center items-center'>
                    <span>sort : scheme </span>
                    <button className='' onClick={() => setOrder(!order)}>
                        {order ? "A → Z" : "Z → A"}
                    </button>
                </div>
            </div>
            {isLoading ? "Loading . . ." : null}
            <div className='flex flex-col space-y-3 '>
                {
                    sortedSchemes.map((scheme) => {
                        return (
                            <div key={scheme._id} className='border-2 border-gray-300 rounded-md px-6 py-3 m-2 shadow-xl space-y-[2px]'>
                                <h3 className='text-md font-bold '>
                                    {scheme.domain}
                                </h3>
                                <h1 className='text-xl font-bold text-violet-700'>
                                    {scheme.name}
                                </h1>
                                <p className='text-sm font-semibold line-clamp-2'>
                                    {scheme.description}
                                </p>
                                <div className='space-x-5 mt-3'>
                                    {
                                        scheme.tags.map((tag) => {
                                            return (
                                                <span key={tag} className='text-[16px] text-violet-600 font-semibold px-4 py-1 bg-slate-300 rounded-sm'>
                                                    {tag}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ShowSchemes
