import React, { useState } from "react";

const WaitModal = ({ isOpen, onClose, onInsert }) => {
    if (!isOpen) return null;
    const [waitFor, setWaitFor] = useState("");
    const [waitType, setWaitType] = useState("Days");

    const handleInsert = () => {
        if (waitFor) {
            onInsert({ waitFor, waitType });
        } else {
            alert("Please specify a value for 'Wait For'.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" >
            <div className="bg-white rounded-lg shadow-lg w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Wait</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-600 transition"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-4">
                    <p className="text-sm text-gray-600 mb-4">Add a delay between blocks.</p>

                    {/* Wait For */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Wait For
                        </label>
                        <input
                            type="number"
                            value={waitFor}
                            onChange={(e) => setWaitFor(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter delay"
                        />
                    </div>

                    {/* Wait Type */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Wait Type
                        </label>
                        <select
                            value={waitType}
                            onChange={(e) => setWaitType(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Seconds">Seconds</option>
                            <option value="Minutes">Minutes</option>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                        </select>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 flex justify-end border-t">
                    <button
                        onClick={handleInsert}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Insert
                    </button>
                </div>
            </div>
        </div >
    );
};

export default WaitModal;