import React from 'react'

const InitLoader = () => {
    return (
        <div className="mx-1 my-5 h-full animate-pulse">
            <div className="flex">
                <div className="rounded-full min-w-[7%]">
                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                </div>
                <div className="w-full ml-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="mt-2 h-36 bg-gray-200 rounded-2xl aspect-video" />
                    <div className="flex justify-start space-x-20 mt-2">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitLoader


//
