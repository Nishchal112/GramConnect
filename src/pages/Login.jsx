import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Reducers/AuthSlice';
import { Eye, EyeOff, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import RegisterLogo from '../assets/RegisterLogo-removebg-preview.png';

const Login = () => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identity || !password) {
            toast.error('Please fill all the fields');
            return;
        }
        const resultAction = await dispatch(loginUser({ identity, password }));
        if (loginUser.fulfilled.match(resultAction)) {
            toast.success("Login successfully");
            navigate('/');
        } else {
            toast.error("Please enter correct login credentials");
            console.error(resultAction.error);
        }
    };

    return (
        <div className='flex w-screen h-screen'>
            <div className='w-1/2 h-screen flex justify-center items-center bg-gray-100'>
                <img src={RegisterLogo} alt="Register page logo" />
            </div>
            <div className="w-1/2 h-screen flex flex-col justify-center items-center px-4 py-8">
                <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>
                <form onSubmit={handleSubmit} className='w-full space-y-4'>
                    <label htmlFor="identity" className='font-normal'>
                        Email or Phone number
                    </label>
                    <input
                        id="identity"
                        type="text"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        className="w-full px-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-2 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible((prev) => !prev)}
                            className="absolute right-3 top-3 text-sm text-gray-500"
                        >
                            {passwordVisible ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                        <label className="flex items-center space-x-2 relative">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="appearance-none w-5 h-5 border border-gray-300 rounded-md"
                            />
                            {rememberMe && <Check className="absolute top-0 left-0 pointer-events-none" />}
                            <span className="ml-8 text-sm text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button type="submit" className="w-1/2 bg-violet-600 text-white p-2 rounded-lg hover:bg-violet-800">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
