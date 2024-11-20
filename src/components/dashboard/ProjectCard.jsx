import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 border rounded-md shadow-md bg-white hover:shadow-lg cursor-pointer flex items-center justify-center"
      onClick={() => navigate(`/project/${id}`)}
    >
      <h3 className="text-lg  text-center font-sans ">{name}</h3>
    </div>
  );
};

export default ProjectCard;
