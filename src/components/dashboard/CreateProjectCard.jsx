import React from "react";

const CreateProjectCard = ({ onCreate }) => {
  return (
    <div
      onClick={onCreate}
      className="flex items-center justify-center bg-white text-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition duration-300 border-2 border-blue-400"
    >
      <div className="text-center p-6">
        <div className="text-4xl font-bold text-blue-500 mb-2">+</div>
        <p className="font-medium">Create a project</p>
      </div>
    </div>
  );
};

export default CreateProjectCard;
