export type project = {
  name: string;
  _id: string;
};

export type Issue = {
  title: string;
  description: string;
  status: string;
  priority: string;
  project: string;
};
