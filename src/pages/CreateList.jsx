import React, { useState } from "react";
import { createList } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateList = () => {
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("idle"); // idle, uploaded
  const [listName, setListName] = useState(""); // Name for the list
  const [newList, setNewList] = useState(""); // Name for the list
  const navigate = useNavigate();

  const handleGoBack=()=>{
    navigate(-1);
  }

  // Handle mail list creation
  const handleMailList = async () => {
    if (!listName || !file) {
      console.log("Validation failed:", { listName, file });
      toast.error("Please provide a name and upload a file.");
      return;
    }

    console.log("List name:", listName);
    console.log("File:", file);

    try {
      const formData = new FormData();
      formData.append("name", listName);
      formData.append("file", file);

      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const newList = await createList(formData);
      setNewList(newList.data); // Assuming `setNewList` updates state
      console.log("Created list response:", newList);
      toast.success("List Created Successfully");
      setListName(""); // Clear list name input
      setFile(null); // Clear file input
      setFileStatus("idle"); // Reset file status
      handleGoBack();
      document.getElementById("fileInput").value = "";

     
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      console.log(uploadedFile);
      setFile(uploadedFile);
      setFileStatus("uploaded");
    } else {
    }
  };

  const handleNameChange = (e) => {
    setListName(e.target.value);
  };

  // Cancel upload
  const cancelUpload = () => {
    setFile(null); // Clear the file state
    setListName("")
 
    handleGoBack();
    document.getElementById("fileInput").value = ""; // Reset the file input
    setFileStatus("idle"); // Reset file status
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Title & Description */}
      <h1 className="text-xl font-semibold text-gray-700">Add your leads</h1>
      <p className="text-gray-500 text-center mt-2">
        Either upload a CSV file or use a public Google Sheets link to import
        leads.
      </p>

      {/* File Upload Options */}
      <div className="mt-6 flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="fileOption"
            value="csv"
            defaultChecked
            className="hidden"
          />
          <span className="w-4 h-4 border rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          </span>
          <span>Upload via CSV</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="fileOption"
            value="sheet"
            className="hidden"
          />
          <span className="w-4 h-4 border rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </span>
          <span>Upload via Google Sheet</span>
        </label>
      </div>

      {/* Drag-and-Drop Area */}
      <div
        className="mt-8 w-full max-w-xl h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white cursor-pointer"
        onClick={triggerFileInput}
      >
        <div className="text-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto mb-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 8a5 5 0 1110 0h1a4 4 0 010 8H7a4 4 0 01-4-4H2a5 5 0 011-9.9V3a1 1 0 011 1v1.1a5.002 5.002 0 01.902-.284z"
              clipRule="evenodd"
            />
          </svg>
          <p>Drag 'n' Drop a file here, or click to select file</p>
        </div>
      </div>
      {fileStatus === "uploaded" && (
        <div className="mt-8 w-full max-w-xs h-20 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center bg-green-50">
          <div className="text-center text-green-700">
            <p>Document Received</p>
            <p className="font-semibold">{file?.name}</p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        accept=".csv, application/vnd.google-apps.spreadsheet"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Name Input */}
      <div className="mt-4 w-full max-w-xl">
        <label
          htmlFor="listName"
          className="block text-sm font-medium text-gray-700"
        >
          List Name
        </label>
        <input
          type="text"
          id="listName"
          value={listName}
          onChange={handleNameChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter list name"
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleMailList}
        // Disable if no file or list name
        >
          Next
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={cancelUpload}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateList;
