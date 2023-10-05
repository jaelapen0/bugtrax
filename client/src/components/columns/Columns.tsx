export const projectColumns = [
  { label: 'Project', field: 'name', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Number of Incidents', field: `issues`, className: '', render: (project: any) => project.issues.length, },
  // label: 'Priority #', field: 'priority', className: (item) => `priority-${item.priority.toLowerCase()}` 
];

export const issueColumns = [
  { label: 'Issue', field: 'title', className: '' },
  { label: 'ID #', field: '_id', className: '' },
  { label: 'Project', field: `project?.name`, className: '', render: (item) => item.project ? item.project.name : '', },
  { label: 'Status', field: 'status', className: (item) => `status-${item.status.toLowerCase()}` },
  { label: 'Priority #', field: 'priority', className: (item) => `priority-${item.priority.toLowerCase()}` },
  { label: 'Open Date', field: 'createdAt', className: '', render: (item) => new Date(item.createdAt).toDateString()},
  { label: 'Reported User', field: 'reportedUser', className: '', render: (item) => item.reportedUser ? item.reportedUser.name : '', },
  { label: 'Assignee', field: 'assignedUser', className: '',  render: (item) => item.assignedUser ? item.assignedUser.name : '',  },
];
