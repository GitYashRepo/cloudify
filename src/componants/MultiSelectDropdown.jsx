/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";


export const MultiSelectDropdown = ({ options, selectedOptions, onOptionChange, onAddNewOption }) => {
    const [newOption, setNewOption] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Handle adding a new option
    const handleAddOption = () => {
        if (newOption.trim()) {
            onAddNewOption(newOption.trim());
            setNewOption("");
        }
    };

    // Handle selecting/deselecting an option
    const handleToggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            onOptionChange(selectedOptions.filter((item) => item !== option));
        } else {
            onOptionChange([...selectedOptions, option]);
        }
    };

    return (
        <div className="relative">
            {/* Input Field */}
            <div
                className="flex items-center flex-wrap gap-2 p-2 border border-gray-300 rounded cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedOptions.length > 0 ? (
                    selectedOptions.map((option) => (
                        <span
                            key={option}
                            className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
                        >
                            {option}
                            <button
                                className="ml-1 text-neutral-900"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleOption(option);
                                }}
                            >
                                ×
                            </button>
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500">Select options</span>
                )}
                <button
                    className="ml-auto px-2 py-1 text-black rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                >
                    <RiArrowDownSLine />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                    <div className="max-h-40 overflow-y-auto p-2">
                        {options.map((option) => (
                            <label key={option} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleToggleOption(option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex items-center p-2 border-t border-gray-300">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded"
                            placeholder="Add new item"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddOption();
                                    setIsOpen(true);
                                }
                            }}
                        />
                        <button
                            className="ml-2 px-4 py-2 bg-black text-white rounded flex justify-center items-center gap-2"
                            onClick={() => {
                                handleAddOption();
                                setIsOpen(true);
                            }}
                        >
                            <span><TiPlus /></span><span>Add</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
