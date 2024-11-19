import React, { useState } from 'react';

function CustomNode({ data, id, onEdit, onRemove }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-4 bg-white rounded shadow-md"
    >
      <div>{data.label}</div>
      {hovered && (
        <div className="absolute top-0 right-0 flex space-x-1">
          <button onClick={() => onEdit(id)} className="text-blue-500 hover:underline">
            Edit
          </button>
          <button onClick={() => onRemove(id)} className="text-red-500 hover:underline">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomNode;
