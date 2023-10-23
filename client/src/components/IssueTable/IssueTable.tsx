
import "./issueTable.css";
import DataTable from "../Table/Table";

import { Issue } from "../../types/Interfaces"

interface IssueProps {
  issues: Issue[];
}
const issueColumns = [
  { label: 'Issue', field: 'title', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Project', field: `project?.name`, className: '', render: (item : Issue) => item.project ? item.project.name : '', },
  { label: 'Status', field: 'status', className: (item : Issue) => `status-${item.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (item : Issue) => `priority-${item.priority.toLowerCase()}` },
  { label: 'Open Date', field: 'createdAt', className: '', render: (item : Issue) => new Date(item.createdAt).toDateString()},
  { label: 'Reported User', field: 'reportedUser', className: '', render: (item : Issue) => item.reportedUser ? item.reportedUser.name : '', },
  { label: 'Assignee', field: 'assignedUser', className: '',  render: (item : Issue) => item.assignedUser ? item.assignedUser.name : '',  },
];


const IssueTable = ({ issues }: IssueProps) : JSX.Element => {

  return (
    <div className="issues-table">
      <DataTable
        columns={issueColumns}
        data={issues}
        context="issues"
        size="large"
      />
      </div>
  );
};

export default IssueTable;
