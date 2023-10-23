import React, { FC, useState, useEffect } from "react";
import IssueTable from "../components/IssueTable/IssueTable";
import { AddIssueForm } from "../components/AddIssueForm/AddIssueForm";
import { fetchAllIssues } from "../utils/IssueUtils";
import { Issue } from "../types/Type";

const Issues: FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchAllIssues()
    .then((res ) => {
      setIssues(res!.data);
    })
  }, []); 

  return (
    <div className="issues-container">
      <header className="issues-header">
        <h2 className="header-text">All Issues</h2>
      </header>
      <div className="add-issue-container">
        <AddIssueForm  />
      </div>
      <div className="issues-table-container">
        <IssueTable issues={issues} />
      </div>
      
    </div>
  );
};

export default Issues;
