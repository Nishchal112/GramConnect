import React, { useState } from "react";

const CreatePoll = () => {
    const [choices, setChoices] = useState(["", ""]);
    const [pollLength, setPollLength] = useState({ days: 1, hours: 0, minutes: 0 });

    const addChoice = () => {
        setChoices([...choices, ""]);
    };

    const removeChoice = (index) => {
        setChoices(choices.filter((_, i) => i !== index));
    };

    const updateChoice = (index, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = value;
        setChoices(updatedChoices);
    }; return (
        <div className="mx-2 px-4 py-2 border border-slate-200 rounded-xl shadow-lg bg-white flex flex-col justify-center">
            <input type="text" className="text-lg font-semibold mb-2"
                placeholder="Ask question " />
            {choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        value={choice}
                        onChange={(e) => updateChoice(index, e.target.value)}
                        placeholder={`Choice ${index + 1}`}
                        className="w-full p-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    {index >= 2 && (
                        <button onClick={() => removeChoice(index)} className="text-red-500">✖</button>
                    )}
                </div>
            ))}
            <button onClick={addChoice} className="text-blue-400 text-sm mb-3">+ Add choice</button>

            <div className="border-t border-gray-700 pt-3">
                <h3 className="text-sm font-semibold mb-2">Poll length</h3>
                <div className="flex gap-2">
                    <select
                        className="p-2 rounded-md border border-gray-700"
                        value={pollLength.days}
                        onChange={(e) => setPollLength({ ...pollLength, days: e.target.value })}
                    >
                        {[...Array(8)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1} Days</option>
                        ))}
                    </select>
                    <select
                        className="p-2 rounded-md border border-gray-700"
                        value={pollLength.hours}
                        onChange={(e) => setPollLength({ ...pollLength, hours: e.target.value })}
                    >
                        {[...Array(24)].map((_, i) => (
                            <option key={i} value={i}>{i} Hours</option>
                        ))}
                    </select>
                    <select
                        className="p-2 rounded-md border border-gray-700"
                        value={pollLength.minutes}
                        onChange={(e) => setPollLength({ ...pollLength, minutes: e.target.value })}
                    >
                        {[0, 15, 30, 45].map((val) => (
                            <option key={val} value={val}>{val} Minutes</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CreatePoll;
