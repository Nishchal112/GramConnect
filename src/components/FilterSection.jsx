import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="border-b pb-2">
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between w-full font-semibold py-2"
            >
                {title}
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open && <div className="space-y-2">{children}</div>}
        </div>
    );
};


export default FilterSection
