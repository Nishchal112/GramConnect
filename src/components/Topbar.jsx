import React, { useState, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiUserPlus } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { fetchUser, logoutUser } from '../Reducers/AuthSlice';
import logo from '../assets/logo.svg'
import { UserPen, LogOut } from 'lucide-react'

const Topbar = () => {

    const [keyword, setKeyword] = useState('');
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])


    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    }

    return (
        <>
            <div className='flex justify-between items-center '>
                <div className=''>
                    <img src={logo} alt="Website logo" />
                </div>

                <div className='w-1/2 bg-slate-300 rounded-4xl p-2 flex items-center space-x-1.5'>
                    <IoSearchOutline className='text-2xl' />
                    <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search Scheme or initiative or policy'
                        className='w-full focus:outline-none focus:ring-0 focus:border-transparent' />
                </div>

                <div className='flex items-center justify-center object-contain space-x-4 mx-7'>
                    <div className='group flex items-center '>
                        {user?.profilePicUrl ? <img src={user.profilePicUrl}
                            className='size-9 rounded-full object-cover' /> : <HiUserPlus className='size-9' />}
                        <div className="relative w-0 h-0 before:content-[''] before:absolute block hover:hidden before:border-x-8 before:border-x-transparent before:border-t-8 before:border-t-black" />
                        <div className="relative w-0 h-0 before:content-[''] before:absolute hidden hover:block before:border-x-8 before:border-x-transparent before:border-t-8 before:border-t-black translate-[90deg]" />
                        <div className='absolute p-2 right-4 top-12 bg-gray-100 hidden group-hover:flex flex-col space-y-1 z-20' >
                            {
                                user ? (<>
                                    <div className='flex items-center relative'>
                                        <div className='p-3 rounded-full'>
                                            {user?.profilePicUrl ? <img src={user.profilePicUrl}
                                                className='size-9 object-cover rounded-full' /> : <HiUserPlus className='size-9' />}
                                        </div>
                                        <div className='flex flex-col'>
                                            <span>{user?.fullname}</span>
                                            <span className='text-sm'>{user?.description || "Some static desc"}</span>
                                        </div>
                                        <div className='border-b border-slate-400 w-full absolute bottom-0' />
                                    </div>
                                    <div className='flex flex-col justify-between items-center'>
                                        <Link to='/edit-profile' className='flex space-x-2 justify-center items-center'>
                                            <UserPen size={20} />
                                            <div className='text-sm font-semibold p-1'>
                                                Profile
                                            </div>
                                        </Link>
                                        <div className='flex space-x-2 justify-center items-center'>
                                            <LogOut size={20} />
                                            <button className='text-sm font-semibold p-1 cursor-pointer' onClick={handleLogout}>
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                </>) : <>
                                    <Link to='/login' className='text-2xl font-semibold p-1'>
                                        Log in
                                    </Link>
                                    <Link to='/register' className='text-2xl font-semibold p-1'>
                                        Register
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-2 bg-gray-300 w-full' />
        </>
    )
}

export default Topbar
