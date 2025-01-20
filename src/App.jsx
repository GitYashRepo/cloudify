/* eslint-disable react/prop-types */
import { useState } from "react";
import { MultiSelectDropdown } from "./componants/MultiSelectDropdown";
import { TiPlus } from "react-icons/ti";


const App = () => {
    const [rows, setRows] = useState([{ singleSelect: "", multiSelect: [] }]);
    const [multiSelectOptions, setMultiSelectOptions] = useState([
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ]);

    // Handle single select change
    const handleSingleSelectChange = (value, rowIndex) => {
        const updatedRows = rows.map((row, index) =>
            index === rowIndex ? { ...row, singleSelect: value } : row
        );
        setRows(updatedRows);
    };

    // Handle adding new multi-select option
    const handleAddNewMultiSelectOption = (newOption) => {
        if (newOption && !multiSelectOptions.includes(newOption)) {
            setMultiSelectOptions([...multiSelectOptions, newOption]);
        }
    };

    // Handle changes to selected options in multi-select
    const handleMultiSelectChange = (selectedOptions, rowIndex) => {
        const updatedRows = rows.map((row, index) =>
            index === rowIndex ? { ...row, multiSelect: selectedOptions } : row
        );
        setRows(updatedRows);
    };

    // Add new row
    const handleAddNewRow = () => {
        setRows([...rows, { singleSelect: "", multiSelect: [] }]);
    };

    // Get filtered options for single select
    const getAvailableSingleSelectOptions = (rowIndex) => {
        const selectedOptions = rows
            .filter((_, index) => index !== rowIndex)
            .map((row) => row.singleSelect);
        return ["Option 1", "Option 2", "Option 3", "Option 4"].filter(
            (option) => !selectedOptions.includes(option)
        );
    };

    return (
        <div className="container mx-auto p-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Label 1</th>
                        <th className="border border-gray-300 px-4 py-2">Label 2</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="w-[40%] border border-gray-300 px-4 py-2">
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={row.singleSelect}
                                    onChange={(e) =>
                                        handleSingleSelectChange(e.target.value, index)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Option
                                    </option>
                                    {getAvailableSingleSelectOptions(index).map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="w-[60%] border border-gray-300 px-4 py-2">
                                {/* Multi-Select Dropdown Component */}
                                <MultiSelectDropdown
                                    options={multiSelectOptions}
                                    selectedOptions={row.multiSelect}
                                    onOptionChange={(updatedOptions) =>
                                        handleMultiSelectChange(updatedOptions, index)
                                    }
                                    onAddNewOption={handleAddNewMultiSelectOption}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full flex justify-end">
                <button
                    className="mt-4 px-4 py-2 bg-black text-white rounded flex items-center justify-start gap-4"
                    onClick={handleAddNewRow}
                >
                    <span><TiPlus /></span><span>Add New Row</span>
                </button>
            </div>
        </div>
    );
};

export default App;
