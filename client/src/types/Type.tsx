export type Project = {
  name: string;
  _id: string;
  issues: Issue[];
};

export type Issue = {
  title: string;
  description: string;
  status: string;
  priority: string;
  project: Project;
  createdAt: string;
  assignedUser: User;
  reportedUser: User;
  _id: string;
};

export type User = {
  name: string;
  _id: string;
  email: string;
  isAdmin: boolean;
  projects: Project[];
  issues: Issue[];
};