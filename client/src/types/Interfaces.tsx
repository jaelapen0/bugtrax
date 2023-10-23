export interface Issue {
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
  reportedUser: {
    name: string;
  };
  assignedUser: {
    name: string;
  };
};
