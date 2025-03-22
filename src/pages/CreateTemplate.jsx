import React, { useState } from "react";
import { createTemplate } from "../utils/api";
// import { createTemplate } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateTemplate = ({ onClose }) => {
const navigate = useNavigate();
  const [templateData, setTemplateData] = useState({
    name: "",
    template: "",
    subject: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createTemplate(templateData); // Call the API
      toast.success("Template Created Successfully");
      setTimeout(()=>{
        handleGoBack();
      }, 2000)
     
    } catch (err) {
      console.error("Error creating template:", err);
      setError(err?.message || "Failed to create template."); // Set the error state
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Template Modal</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={templateData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the template name"
              required
            />
          </div>

          {/* Template Field */}
          <div className="mb-4">
            <label
              htmlFor="template"
              className="block text-sm font-medium text-gray-700"
            >
              Template
            </label>
            <textarea
              id="template"
              name="template"
              value={templateData.template}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Enter the template content"
              required
            ></textarea>
          </div>

          {/* Subject Field */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={templateData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the email subject"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 mb-4">
              {error}
            </p>
          )}

          {/* Modal Footer */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;
