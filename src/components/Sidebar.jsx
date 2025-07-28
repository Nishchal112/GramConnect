import React from "react";
import menuItems from "../utils/NavbarLinks";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
    const location = useLocation();

    return (
        <div className="flex h-screen">
            <div className="w-64 h-screen bg-white shadow-lg p-4 flex flex-col justify-between">
                <div className="space-y-2 ">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.url;

                        return (
                            <Link
                                key={item.name}
                                to={item.url}
                                className={`flex items-center gap-3 px-4 py-2 rounded-full font-medium transition duration-200
                  ${isActive ? "bg-gray-200 shadow-md" : "hover:bg-gray-100"}`}
                            >
                                <IconComponent
                                    className={`w-5 h-5 transition ${isActive ? "text-violet-700" : "text-gray-600"}`}
                                />
                                <span className={isActive ? "text-violet-700" : "text-black"}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="h-screen w-2.5 bg-gray-300" />

            <div className="flex-1 gridbar overflow-y-auto w-full">{children}</div>
        </div>
    );
};

export default Sidebar;
