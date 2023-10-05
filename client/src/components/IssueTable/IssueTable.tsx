import React, { FC } from "react";
import "./issueTable.css";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../Table/Table";
import { format } from 'date-fns';
import { Issue } from "../../types/Interfaces"

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

  return (
    <div className="issues-table">
      <DataTable
        columns={issueColumns}
        data={issues}
        context="issues"
      />
      </div>
  );
};

export default IssueTable;
