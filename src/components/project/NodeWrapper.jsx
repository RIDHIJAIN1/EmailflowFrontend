import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const NodeWrapper = ({ children, onEdit, onDelete }) => {
  return (
    <div className="relative rounded-lg bg-white group">
      {/* Hover Icons */}
      <div className="absolute top-[-1.75rem] right-[-2.5rem] flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={onEdit}
          className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
        >
          <FaTrash size={14} />
        </button>
      </div>
      {children}
    </div>
  );
};
