import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import RegisterLogo from '../assets/RegisterLogo-removebg-preview.png';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../Reducers/AuthSlice';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', data);
            if (response.status === 200) {
                toast.success('User Registered Successfully!');
                reset();
                dispatch(fetchUser());
                navigate("/");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error Registering User!';
            toast.error(errorMessage);
        }
    }

    return (
        <div className='flex flex-col md:flex-row w-screen h-screen justify-center items-center gap-2'>
            <div className='w-full md:w-[50%] h-1/3 md:h-screen flex justify-center items-center bg-gray-100'>
                <img src={RegisterLogo} alt="Register page logo" className='max-h-[80%]' />
            </div>
            <div className="w-full md:w-[50%] max-w-full mx-auto px-4 py-8 flex flex-col justify-between items-center">
                <h2 className="text-3xl font-semibold mb-8 text-center">Create your Account</h2>
                <form className="w-full md:w-[80%] space-y-2 border-[2px] border-slate-200 py-3 px-6 rounded-md" onSubmit={handleSubmit(submitForm)}>
                    {/* Full Name Input */}
                    <div>
                        <label htmlFor="Fullname" className='font-[400]'>Full Name</label>
                        <input
                            type="text"
                            id='Fullname'
                            placeholder="Full Name"
                            {...register("fullname", {
                                required: "Please Enter fullname",
                                minLength: {
                                    value: 6,
                                    message: "Fullname must contain at least 6 characters"
                                }
                            })}
                            className="w-full px-2 py-[10px] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        {errors.fullname && <p className='text-red-500 text-sm'>{errors.fullname.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            placeholder="Email"
                            {...register("email", {
                                required: "Please Enter email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full px-2 py-[10px] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label htmlFor="phoneNo">Phone number</label>
                        <div className="flex items-center border border-slate-300 rounded-md p-2 mt-1">
                            <span className="mr-2">+91</span>
                            <input
                                type="tel"
                                id='phoneNo'
                                placeholder="Phone number"
                                {...register("phoneNo", {
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Invalid Indian phone number"
                                    }
                                })}
                                className="w-full focus:outline-none"
                            />
                        </div>
                        {errors.phoneNo && <p className='text-red-500 text-sm'>{errors.phoneNo.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                id='password'
                                {...register("password", {
                                    required: "Please Enter password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must contain uppercase, lowercase, number, and special character"
                                    }
                                })}
                                className="w-full px-2 py-[10px] border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>

                    {/* Terms and Conditions */}
                    <p className="text-xs text-gray-500">
                        By continuing you agree to our
                        <Link to="#" className="text-blue-500 hover:underline"> Terms of use </Link>
                        and
                        <Link to="#" className="text-blue-500 hover:underline"> Privacy Policy</Link>.
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-violet-600 text-white p-2 rounded-lg hover:bg-violet-800 transition-colors duration-200"
                    >
                        Create account
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
