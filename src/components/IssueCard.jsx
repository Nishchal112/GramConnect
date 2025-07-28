import React from "react";
import CreateIssue from "./CreateIssue";
import { ArrowBigUp, MessageCircle, Share2, User } from 'lucide-react';

export default function IssueCard() {

    return (
        <>
            <div className="w-full max-w-full p-2.5 m-1.5 bg-white rounded-lg border-none shadow-md">
                <CreateIssue />
                <div className="mb-4 bg-white shadow-lg rounded-lg p-4">
                    <div className="flex items-center gap-2.5">
                        <img
                            className="h-6 w-6 rounded-full"
                            src="data:image/png;base64,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"
                            alt="Profile"
                        />
                        <h2 className="text-xs font-semibold">Username here</h2>
                    </div>
                    <div className="my-2">
                        <h2 className="text-xl font-semibold text-purple-700">Issue title here</h2>
                        <p className="py-1">description here..</p>
                        <img
                            className="rounded-lg"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMo2KrCHXHr5iLfMwa0pkeikbtST6AQsE2w&s"
                            alt=""
                        />
                    </div>
                    <div className='flex justify-start space-x-20'>
                        <button
                            className='flex h-10 justify-start items-center gap-1.5'
                        >
                            <ArrowBigUp size={29} />
                            <span>{0}</span> Vote
                        </button>
                        <span className='flex h-10 justify-start items-center gap-1.5'>
                            <MessageCircle /> Comment
                        </span>
                        <span className='flex h-10 justify-start items-center gap-1.5'>
                            <Share2 /> Share
                        </span>
                    </div>
                </div>

            </div >


        </>
    )
}
