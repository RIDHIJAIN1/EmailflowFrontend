import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { createMapping, getListById } from "../utils/api"; // Import postMapping for API calls
import { toast } from "react-toastify";

const Mapping = () => {
  const { id } = useParams();
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const response = await getListById(id);
        setListData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchListDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure `file_data` exists and is an array
  const fileData = listData?.file_data || [];
  const rows = fileData.map((row) =>
    Object.entries(row).map(([key, value]) => ({
      column: key.replace(/^\ufeff/, ""), // Remove BOM if present
      preview: value,
    }))
  );

  const availableOptions = ["First Name", "Last Name", "Email Address", "Phone Number"];

  const handleSelectChange = (rowIndex, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [rowIndex]: value,
    }));
  };

  const getFilteredOptions = (rowIndex) => {
    const selectedValuesArray = Object.values(selectedValues);
    return availableOptions.filter(
      (option) => !selectedValuesArray.includes(option) || selectedValues[rowIndex] === option
    );
  };

  const handleSubmit = async () => {
    const payload = Object.entries(selectedValues).map(([rowIndex, variableName]) => ({
      list_id: id,
      variable_name: variableName,
      column_index: parseInt(rowIndex, 10),
   
    }));

    try {
        console.log(payload)
      const response = await createMapping(payload); // POST the data to the API
      console.log("Mapping data submitted successfully:", response.data);
        toast.success ("Mapping data submitted successfully!");
        setTimeout(()=>{
            navigate(`//${newList.data._id}`);
          }, 2000)
    } catch (error) {
      console.error("Error submitting mapping data:", error);
      alert("Failed to submit mapping data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          {listData?.name || "List Name"}
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Map the variables for your leads to personalize emails. Start typing to create a new variable.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b">Column from CSV</th>
                <th className="py-3 px-4 border-b">Data Preview</th>
                <th className="py-3 px-4 border-b">Variables</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) =>
                row.map((cell, cellIndex) => (
                  <tr key={`${index}-${cellIndex}`} className="border-b">
                    <td className="py-3 px-4">{cell.column}</td>
                    <td className="py-3 px-4">{cell.preview}</td>
                    <td className="py-3 px-4">
                      <select
                        className="w-full px-3 py-2 border rounded text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                        onChange={(e) => handleSelectChange(cellIndex, e.target.value)}
                      >
                        <option value="" disabled>
                          Choose Fields
                        </option>
                        {getFilteredOptions(cellIndex).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="removeDuplicates"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="removeDuplicates" className="text-sm text-gray-600">
              Remove Duplicate Leads
            </label>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
              onClick={() => alert("Action cancelled.")}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapping;
