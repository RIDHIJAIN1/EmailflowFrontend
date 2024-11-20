import React, { useState } from "react";
import { createList } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

const CreateList = () => {
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("idle"); // idle, uploaded
  const [listName, setListName] = useState(""); // Name for the list
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const validateCSV = async (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields;
          const requiredHeaders = ["first_name", "last_name", "email"];
          const isValid = requiredHeaders.every((header) =>
            headers.includes(header)
          );
          if (!isValid) {
            reject("CSV file must contain first_name, last_name, and email columns.");
            
          } else {
            resolve(true);

          }
        },
        error: (error) => {
          reject(error.message);
        },
      });
    });
  };

  const handleMailList = async () => {
    if (!listName || !file) {
      toast.error("Please provide a name and upload a file.");
      return;
    }

    try {
      // Validate the file
      await validateCSV(file);

      // Prepare FormData
      const formData = new FormData();
      formData.append("name", listName);
      formData.append("file", file);

      const newList = await createList(formData);
      toast.success("List Created Successfully");
      setListName(""); // Clear list name input
      setFile(null); // Clear file input
      setFileStatus("idle"); // Reset file status
      handleGoBack();
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error validating or creating list:", error);
      toast.error(error);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileStatus("uploaded");
    }
  };

  const handleNameChange = (e) => {
    setListName(e.target.value);
  };

  const cancelUpload = () => {
   
    setFile(null); // Clear the file state
    setListName("");
  
    document.getElementById("fileInput").value = ""; // Reset the file input
    setFileStatus("idle"); // Reset file status
  };

  return (
    <div>
    <p className="pt-5 ml-5" onClick={handleGoBack}>Back</p>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
 
      <h1 className="text-xl font-semibold text-gray-700">Add your leads</h1>
      <p className="text-gray-500 text-center mt-2">
        Either upload a CSV file or use a public Google Sheets link to import
        leads.
      </p>

      <div className="mt-8 w-full max-w-xl h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white cursor-pointer" onClick={triggerFileInput}>
        <div className="text-center text-gray-400">
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

      <input
        type="file"
        id="fileInput"
        accept=".csv"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="mt-4 w-full max-w-xl">
        <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
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

      <div className="mt-4 flex gap-4">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleMailList}
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
    </div>
  );
};

export default CreateList;
