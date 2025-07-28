import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X, Image, AlignEndHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CreatePoll from './Poll';
import { addInitiative } from '../Reducers/InitiativeSlice';

const CreateInit = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [posting, setPosting] = useState(false);
    const [poll, setPoll] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const submit = async (data) => {
        if (!user) {
            toast.error('Please login to create initiative');
            return;
        }
        const formData = new FormData();
        formData.append("id", user._id);
        formData.append('name', data.title);
        formData.append('description', data.description);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            dispatch(addInitiative(formData));
            setPosting(true);
            setTimeout(() => {
                setPosting(false);
                reset();
                setSelectedImage(null);
                setIsVisible(false);
                toast('Initiative created successfully', { icon: '👏' });
            }, 700);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className={`bg-[#565DE9] rounded-3xl ${isVisible ? "px-1.5 pb-2" : "p-0"} sticky`}>
            <button
                className='w-full px-4 py-2 my-2 flex justify-between rounded-full items-center text-2xl text-white'
                onClick={() => setIsVisible(!isVisible)}
            >
                <span>💡 Post new Initiative</span>
                {isVisible ? <X /> : <Plus />}
            </button>
            {isVisible && (
                poll ? (
                    <>
                        <CreatePoll />
                        <div className='my-3 flex justify-evenly'>
                            <button
                                className='rounded-full px-12 py-4 bg-amber-200 cursor-pointer text-xl hover:bg-amber-400'
                                onClick={() => setPoll(false)}
                            >
                                Close Poll
                            </button>
                            <button className='rounded-full px-12 py-4 bg-amber-200 hover:bg-amber-400 text-xl'>
                                Add Poll
                            </button>
                        </div>
                    </>
                ) : (
                    <form
                        onSubmit={handleSubmit(submit)}
                        className='flex flex-col p-3 bg-gray-50 rounded-2xl transition-all duration-200'
                    >
                        <span className='px-2 text-[18px] font-semibold'>Title</span>
                        <input
                            type="text"
                            placeholder='Title'
                            className='w-full px-4 py-2 border-2 border-black rounded-xl'
                            {...register("title", { required: true })}
                        />
                        {errors.title && <span className="text-red-500 px-2">Title is required</span>}
                        <span className='px-2 text-[18px] font-semibold'>Description</span>
                        <textarea
                            placeholder='Description'
                            className='w-full px-4 py-2 border-2 border-black rounded-xl'
                            rows={5}
                            {...register("description", { required: true })}
                        />
                        {errors.description && <span className="text-red-500 px-2">Description is required</span>}
                        <div className='flex justify-between items-center'>
                            <div className='flex mt-3 items-center'>
                                <span className='font-semibold'>Add: </span>
                                <label className="cursor-pointer px-2">
                                    <Image />
                                    <input type="file" className="hidden" onChange={handleImageChange} />
                                </label>
                                <span className="mr-2">Image</span>
                                <AlignEndHorizontal onClick={() => setPoll(true)} className='cursor-pointer' />
                                <span className='ml-2'>Poll</span>
                            </div>
                            <input
                                type="submit"
                                value={posting ? "Posting..." : "Post"}
                                className='bg-[#565DE9] hover:bg-violet-800 px-6 py-2 mx-2 mt-1.5 rounded-xl w-24 text-xl font-bold cursor-pointer text-white'
                            />
                        </div>
                        {selectedImage && (
                            <div className="mt-2">
                                <span className="text-sm font-semibold">Preview:</span>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Preview"
                                    className="mt-2 w-32 h-auto rounded-xl"
                                />
                            </div>
                        )}
                    </form>
                )
            )}
        </div>
    );
};

export default CreateInit;
