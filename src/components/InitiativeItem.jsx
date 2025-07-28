import React, { useState } from 'react';
import { ArrowBigUp, MessageCircle, Share2, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { voteInitiative } from '../Reducers/InitiativeSlice.js';
import Comment from './Comment.jsx';
import { toast } from 'react-hot-toast';

const InitiativeItem = React.memo(({ initiative, currUser }) => {
    // Destructure using the new S3 URL field for the initiative image.
    const { _id, user, likedBy, voteCount, title, description, imageUrl } = initiative;
    const isLiked = likedBy?.includes(currUser?._id);
    const [showComment, setShowComment] = useState(false);
    const dispatch = useDispatch();

    const handleVote = (initiativeId) => {
        if (!currUser) {
            toast.error('You must be logged in to vote!');
            return;
        }
        // Dispatch the vote; the optimistic update happens in the slice.
        dispatch(voteInitiative({ initiativeId, userId: currUser._id }));
    };

    const handleShare = async () => {
        if (!navigator.share) {
            console.warn('Web Share API is not supported in your browser.');
            return;
        }
        try {
            const shareData = { title, text: description };
            if (imageUrl) {
                // Use the S3 URL directly for sharing.
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const file = new File([blob], 'initiative-image.jpg', { type: blob.type });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    shareData.files = [file];
                } else {
                    console.warn('File sharing is not supported on this device.');
                    shareData.url = imageUrl;
                }
            }
            await navigator.share(shareData);
            console.log('Initiative shared successfully');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    // Use the new S3 field for user profile picture.
    const profilePicUrl = user?.profilePicUrl ? user.profilePicUrl : null;
    const initiativeImageUrl = imageUrl ? imageUrl : null;

    return (
        <div className="mx-1 my-5 h-full" id={_id}>
            <div className="flex">
                <div className="rounded-full min-w-[7%]">
                    {profilePicUrl ? (
                        <img src={profilePicUrl} alt="profile" className="size-9 rounded-full object-cover" />
                    ) : (
                        <User className="size-9" />
                    )}
                </div>
                <div className="ml-2">
                    <h3 className="font-bold">{user?.fullname}</h3>
                    <div>
                        <h2 className="font-semibold text-xl">{title}</h2>
                        <p className="whitespace-pre-wrap break-words text-sm font-sans">{description}</p>
                    </div>
                    {initiativeImageUrl && (
                        <div className="mt-2">
                            <img
                                src={initiativeImageUrl}
                                alt={title}
                                className="h-36 aspect-video object-cover rounded-2xl"
                            />
                        </div>
                    )}
                    <div className="flex justify-start space-x-20 mt-2">
                        <button className="flex h-10 items-center gap-1.5" onClick={() => handleVote(_id)}>
                            <ArrowBigUp size={29} fill={isLiked ? 'black' : 'white'} />
                            <span>{voteCount || 0}</span> Vote
                        </button>
                        <button onClick={() => setShowComment(!showComment)}>
                            <span className="flex h-10 items-center gap-1.5">
                                <MessageCircle fill={showComment ? 'black' : 'white'} /> Comment
                            </span>
                        </button>
                        <button onClick={handleShare}>
                            <span className="flex h-10 items-center gap-1.5">
                                <Share2 /> Share
                            </span>
                        </button>
                    </div>
                    {showComment && <Comment initiativeId={_id} currUser={currUser} />}
                </div>
            </div>
        </div>
    );
});

export default InitiativeItem;
