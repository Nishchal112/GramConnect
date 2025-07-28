import React, { useState } from "react";
import initiatives from "../utils/InitiveData";
import { ChevronDown, ChevronRight } from "lucide-react";

const RightBar = () => {

    return (
        <div className="w-full bg-white py-2 px-1 shadow-md rounded-lg">
            <div>
                <div
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h2 className="text-lg font-semibold flex">Approved Initiatives <ChevronRight className="mt-[5px]" /></h2>
                </div>
                <p className="text-gray-500 text-sm">These initiatives are verified and approved.</p>
                <ul className="mt-2">
                    {initiatives.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 py-1">
                            <ChevronRight size={14} />
                            <a href="#" className="text-gray-800 text-sm">{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-b my-3" />

            <div>
                <div
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h2 className="text-lg font-semibold flex">Surveys <ChevronRight className="mt-[7px]" /></h2>
                </div>
                <p className="text-gray-500 text-sm">These surveys are made by the government.</p>
                <ul className="mt-2">
                    {initiatives.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 py-1">
                            <ChevronRight size={14} />
                            <span className="text-gray-800 text-sm">{item.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightBar;
