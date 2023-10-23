import React, { FC, useState, useEffect } from "react";
import { fetchProjects } from '../utils/ProjectsUtils';
import DataTable from "../components/Table/Table";
import { projectColumns } from "../components/columns/Columns";
import { Project } from "../types/Type";

const Projects = () : JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetchProjects()
    .then((res) => {
      setProjects(res!.data);
    });
  }, []);

  // debugger
  return (
    <div className="issues-table">
      <h1>Projects</h1>
      {projects.length > 0 ? 
      <div>
        <DataTable
          columns={projectColumns}
          data={projects}
          context="projects"
          size="large"
        />
      </div>

      : <></>}
    </div>
  )
}

export default Projects