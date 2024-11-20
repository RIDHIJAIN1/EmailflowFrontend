import React, { useEffect, useState } from "react";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";
import ProjectCard from "../components/dashboard/ProjectCard";
import ProjectModal from "../components/dashboard/ProjectModal";
import { createProject, fetchProject } from "../utils/api";

// Dashboard Component
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjectsFromAPI = async () => {
      try {
        const response = await fetchProject();
        if (Array.isArray(response.data.projects)) {
          setProjects(response.data.projects);
        } else {
          console.error("API response is not an array:", fetchedProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjectsFromAPI();
  }, []);

  // Handle project creation
  const handleCreateProject = async (projectName) => {
    try {
      const response = await createProject({ name: projectName }); // Assuming response contains the project data
      const newProject = {
        id: response.data.id || response.data._id, // Use id or _id from response
        name: response.data.name || projectName, // Fallback to the provided name
      };
      setProjects((prev) => [...prev, newProject]); // Add the new project to the state
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal when creating a project
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when canceled
  };

  return (
    <>
      <div className="min-h-[24vh]"></div>
      <div className="mx-[15%] mt-[-14vh]">
        {/* Heading Section */}
        <h1 className="text-6xl font-medium my-8 mx-auto uppercase text-blue-400 font-serif">
          Create your email flow
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create Project Card */}
          <CreateProjectCard onCreate={openModal} />
          {/* Project Cards */}
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                id={project._id}
                name={project.name}
              />
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && (
        <ProjectModal onClose={closeModal} onCreate={handleCreateProject} />
      )}
    </>
  );
};

export default Dashboard;
