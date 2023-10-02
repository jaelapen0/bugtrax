import React, { FC } from "react";
import "./issueTable.css";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../Table/Table";
interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project: {
    _id: string;
    name: string;
  };
  createdAt: string;
  reportedUser: string;
  assignedUser: string;
};


const issueColumns = [
  { label: 'Issue', field: 'title', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Project', field: 'project.name', className: '' },
  { label: 'Status', field: 'status', className: (item) => `status-${item.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (item) => `priority-${item.priority.toLowerCase()}` },
  { label: 'Created At', field: 'createdAt', className: '' },
  { label: 'Created By', field: 'reportedUser', className: '' },
  { label: 'Assigned To', field: 'assignedUser', className: '' },
];


const IssueTable: FC = ({ issues }: any) => {
  const navigate = useNavigate();

  const goToIssue = (e) : void => {
    debugger
    e.preventDefault();
    navigate(`/issues/${e.data._id}`);
    
  }
  return (

    <div className="issues-table">
      <DataTable
        columns={issueColumns}
        data={issues}
        context="issues"
        onRowClick={goToIssue}
      />
      </div>
    // <div className="issues-table">
    //   <div className="main-container">
    //     <div className="table-container">
    //       <div className="table-row heading">
    //         <div className="row-item">Issue</div>
    //         <div className="row-item">ID #</div>
    //         <div className="row-item">Project</div>
    //         <div className="row-item">Status</div>
    //         <div className="row-item">Priority #</div>
    //         <div className="row-item">Created At</div>
    //         <div className="row-item">Created By</div>
    //         <div className="row-item">Assigned To</div>
    //         <div className="row-item">Action</div>
    //       </div>
    //       {issues.map((issue: Issue) => (
    //         <Link to={`/issues/${issue._id}`} className="table-row" key={issue._id}>
    //           <div className="row-item">
    //             <Link to={`/issues/${issue._id.substring(0, 10)}`}>{issue.title}</Link>
    //           </div>
    //           <div className="row-item">{issue._id.substring(0, 10)}</div>
    //           {issue.project ? (
    //             <div className="row-item">{issue.project.name.substring(0, 10)}</div>
    //           ) : (
    //             <div className="row-item">Project XXX</div>
    //           )}
    //           <div className={`row-item status-${issue.status.toLowerCase()}`}>{issue.status}</div>
    //           <div className={`row-item priority-${issue.priority.toLowerCase()}`}>{issue.priority}</div>
    //           <div className="row-item">{issue.createdAt}</div>
    //           <div className="row-item">{issue.reportedUser.substring(0, 10)}</div>
    //           <div className="row-item">{issue.assignedUser}</div>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </div>

  );
};

export default IssueTable;
