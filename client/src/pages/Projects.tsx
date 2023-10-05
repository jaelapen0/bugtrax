import React, { FC, useState, useEffect } from "react";
import IssueTable from "../components/IssueTable/IssueTable";
import axios, { AxiosResponse } from "axios";
import { AddIssueForm } from "../components/AddIssueForm/AddIssueForm";
import { fetchProjects } from '../utils/ProjectsUtils';
import DataTable from "../components/Table/Table";
import { projectColumns } from "../components/columns/Columns";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    fetchProjects()
    .then((res ) => {
      setProjects(res.data);
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
        />
      </div>

      : <></>}
    </div>
  )
}

export default Projects