import React, { FC } from "react";
import "./issueTable.css";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../Table/Table";
import { format } from 'date-fns';
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
  { label: 'Project', field: `project?.name`, className: '', render: (item) => item.project ? item.project.name : '', },
  { label: 'Status', field: 'status', className: (item) => `status-${item.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (item) => `priority-${item.priority.toLowerCase()}` },
  { label: 'Open Date', field: 'createdAt', className: '', render: (item) => new Date(item.createdAt).toDateString()},
  { label: 'Reported User', field: 'reportedUser', className: '', render: (item) => item.reportedUser ? item.reportedUser.name : '', },
  { label: 'Assignee', field: 'assignedUser', className: '',  render: (item) => item.assignedUser ? item.assignedUser.name : '',  },
];


const IssueTable: FC = ({ issues }: any) => {
  debugger
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
  );
};

export default IssueTable;
