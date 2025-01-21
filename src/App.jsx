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
        const isCurrentRowValid = rows.every(
            (row) => row.singleSelect && row.multiSelect.length > 0
        );
        if (!isCurrentRowValid) {
            alert("Both fields are required before adding a new row.");
            return;
        }
        setRows([...rows, { singleSelect: "", multiSelect: [] }]);
    };

    // Get filtered options for single select
    const getAvailableSingleSelectOptions = () => {
        return ["Option 1", "Option 2", "Option 3", "Option 4"]
    };

    return (
        <div className="container w-full m-auto mt-8 bg-white pb-4 border border-gray-600 rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-300 p-4">
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
                                    {getAvailableSingleSelectOptions().map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="w-[60%] border border-gray-300 px-4 py-2">
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
                    className="mt-4 px-4 py-2 mr-4 bg-black text-white rounded flex items-center justify-start gap-4"
                    onClick={handleAddNewRow}
                >
                    <span><TiPlus /></span><span>Add New Row</span>
                </button>
            </div>
        </div>
    );
};

export default App;
