import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getIssues } from "../utils/IssueUtils";
import  DataTable from "../components/Table/Table";

const issueColumns = [
  { label: 'Issue', field: 'title', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Project', field: `project?.name`, className: '', render: (item) => item.project ? item.project.name : '', },
  { label: 'Status', field: 'status', className: (item) => `status-${item.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (item) => `priority-${item.priority.toLowerCase()}` },
  { label: 'Open Date', field: 'createdAt', className: '', render: (item) => new Date(item.createdAt).toDateString()},
  { label: 'Reported User', field: 'reportedUser', className: '', render: (item) => item.reportedUser ? item.reportedUser.name : '', },
  { label: 'Assignee', field: 'assignedUser', className: '',  render: (item) => item.assignedUser ? item.assignedUser.name : '',  },
];


const Dashboard: FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [myReportedIssues, setMyReportedIssues] = useState<any[]>([]);
  const [myAssignedIssues, setMyAssignedIssues] = useState<any[]>([]);

  useEffect(() => {
    getProjects();

    getIssues("assignedIssues")
    .then(res => {
      setMyAssignedIssues(res.data);
    })
    getIssues("reportedIssues")
    .then(res => {
      setMyReportedIssues(res.data);
    })
  }, []);

  const getProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProjects(res.data);
      console.log("Projects");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="dashboard-container">
      This is Da Dashboard Container
      <div className="my-issues">Reported Issues 
      < DataTable
        columns={issueColumns}
        data={myReportedIssues}
        context="issues"
      />
      </div>
      <div className="my-issues"> Assigned Issues </div>
      < DataTable
        columns={issueColumns}
        data={myAssignedIssues}
        context="issues"
      />
      <div className="my-projects">
        {" "}
        Projects
        <ul>
          {projects.map((project) => (
            <div key={project._id} className="projectContainer">
              <Link
                to={`/projects/${project._id}`}
                style={{ textDecoration: "none" }}
                className="project-link"
              >
                {project.name}{" "}
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
