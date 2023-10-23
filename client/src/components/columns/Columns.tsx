import {Issue, Project} from '../../types/Type';

export const projectColumns = [
  { label: 'Project', field: 'name', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Number of Incidents', field: `issues`, className: '', render: (project: Project) => project.issues.length, },
];

export const issueColumns = [
  { label: 'Issue', field: 'title', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Project', field: `project?.name`, className: '', render: (issue: Issue) => issue.project ? issue.project.name : '', },
  { label: 'Status', field: 'status', className: (issue: Issue) => `status-${issue.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (issue: Issue) => `priority-${issue.priority.toLowerCase()}` },
  { label: 'Open Date', field: 'createdAt', className: '', render: (issue: Issue) => new Date(issue.createdAt).toDateString()},
  { label: 'Reported User', field: 'reportedUser', className: '', render: (issue: Issue) => issue.reportedUser ? issue.reportedUser.name : '', },
  { label: 'Assignee', field: 'assignedUser', className: '',  render: (issue: Issue) => issue.assignedUser ? issue.assignedUser.name : '',  },
];
