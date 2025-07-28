import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchUser, updateProfile } from "../Reducers/AuthSlice";

const EditProfile = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            reset({
                fullname: user.fullname,
                email: user.email,
                phoneNo: user.phoneNo,
                gender: user.gender || "",
                dob: user.dob ? user.dob.substring(0, 10) : "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("email", data.email);
        formData.append("phoneNo", data.phoneNo);
        formData.append("gender", data.gender);
        formData.append("dob", data.dob);

        if (data.password) {
            formData.append("password", data.password);
        }

        if (data.profilePic && data.profilePic[0]) {
            formData.append("profilePic", data.profilePic[0]);
        }

        try {
            await dispatch(updateProfile(formData));
            toast.success("Profile updated successfully");
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            toast.error(
                "Error updating profile: " +
                (error.response?.data?.message || error.message)
            );
        }
    };

    const handleDeleteProfilePic = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:3000/api/auth/delete-profile-pic"
            );
            if (response.status === 200) {
                toast.success("Profile picture deleted successfully!");
                dispatch(fetchUser());
            }
        } catch (error) {
            toast.error(
                "Error deleting profile picture: " +
                (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <label className="block">
                        <span className="text-gray-700">Full Name</span>
                        <input
                            type="text"
                            {...register("fullname", {
                                required: "Full Name is required",
                                minLength: {
                                    value: 6,
                                    message: "Full Name must be at least 6 characters",
                                },
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            placeholder="Enter your full name"
                        />
                        {errors.fullname && (
                            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Phone Number</span>
                        <input
                            type="tel"
                            {...register("phoneNo", {
                                required: "Phone number is required",
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            placeholder="Enter your phone number"
                        />
                        {errors.phoneNo && (
                            <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Gender</span>
                        <select
                            {...register("gender")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Date of Birth</span>
                        <input
                            type="date"
                            {...register("dob")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">
                            New Password (leave blank to keep unchanged)
                        </span>
                        <input
                            type="password"
                            {...register("password")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            placeholder="Enter new password"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Profile Picture</span>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("profilePic")}
                            className="mt-1 block w-full"
                        />
                    </label>

                    {user?.profilePicUrl && (
                        <div className="mt-2">
                            <p className="text-gray-700">Current Profile Picture:</p>
                            <img
                                src={user.profilePicUrl}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleDeleteProfilePic}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete Profile Picture
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
