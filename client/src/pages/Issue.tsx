import React,{ FC, useState, useEffect, useRef, useCallback, ChangeEvent } from "react";
import { fetchIssue, updateIssue } from "../utils/IssueUtils";
import { getUsers } from "../utils/UserUtils"
import '../index.css';
import { fetchProjects } from "../utils/ProjectsUtils";
import { Project, User} from "../types/Type";
import { useParams } from "react-router-dom";

type UrlParams = {
  id: string;
};

interface FormData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project: Project | null;
  createdAt: string;
  reportedUser: User | null;
  assignedUser: User | null;
}

const Issue = () : JSX.Element => {
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [edit, setEdit] = useState(true);
  const [issue, setIssue] = useState<any>([]);
  const initialFormData: FormData = {
    id: "",
    title: "",
    description: "",
    status: "",
    priority: "",
    project: null, // You need to define an initial value for Project and User
    createdAt: "",
    reportedUser: null,
    assignedUser: null,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const {id} = useParams<UrlParams>();

  const pullIssue = (id: string) => {
    fetchIssue(id)
    .then(res => {
      const { title, description, status, priority, project, createdAt, reportedUser, assignedUser } = res?.data
      setIssue(res?.data);
      setFormData({ id, title, description, status, priority, project, createdAt, reportedUser, assignedUser });
    })
    
  }

  useEffect(() => {
    pullIssue(id!);
    
    fetchProjects().then((res) => {
      setProjects(res!.data);
    });

    getUsers().then((res) => {
      setUsers(res!.data);
    });
  }, [])

  const handleChange = async (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLTextAreaElement | HTMLInputElement;
    let { name, value } = target;
    debugger
    if (name === "project") {
      const project = projects.filter((proj) => proj.name === value);
      setFormData({
        ...formData,
        [name]: project[0],
      });
    } else if (name === "assignedUser") {
      const user = users.filter((user) => user.name === value);
      setFormData({
        ...formData,
        [name]: user[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    debugger
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateIssue(issue._id, formData);
  };
  
  debugger
  return (
    <div>Issue
      {formData.id ?    
          <div className="issue-container"> 
          <br/>
          <br/>
          <br/>
          <br/>
            <h1>Issue ID: {issue._id}</h1>
            <div className="issue-main">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset" disabled={edit}>
                  <div>
                    <label htmlFor="issue-title">Issue title</label>
                    <input 
                      id="issue-title" 
                      type="text"
                      name="title"
                      defaultValue={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                      id="description"
                      name="description"
                      onChange={handleChange}
                      defaultValue={formData.description}
                    />
                  </div>
                  </fieldset>
                  <div>
                  
                  <div>
                    <label htmlFor="project">Project</label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project?.name}
                      onChange={handleChange}
                    >
                      <option value=""> --Choose a project-- </option>
                      {projects.map(proj => (
                        <option id={proj._id} value={proj.name} key={proj._id}>
                          {proj.name}
                        </option>
                      ))}
                    </select>
                   </div>

                   <div>
                    <label htmlFor="assignee">Assignee</label>
                    <select
                      id="assignee"
                      name="assignedUser"
                      value={formData.assignedUser?.name}
                      onChange={handleChange}
                    >
                      <option value=""> --Choose a project-- </option>
                      {users.map(user => (
                        <option id={user._id} value={user.name} key={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                   </div>

                   <div>
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={issue.status}
                      onChange={handleChange}
                    >
                        <option value=""> --Choose a status-- </option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                   </div>

                   <div>
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      defaultValue={issue.priority}
                      onChange={handleChange}
                    >
                        <option value=""> --Choose a priority-- </option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>    
              </form>
              <button onClick={() => setEdit(!edit)}>Edit</button>
              <button onClick={handleSubmit}>Save</button>
              <div>
                <p> Open Date: {new Date(issue.createdAt).toDateString()}</p>
              </div>
              <div>
                <p> Reported User: {issue.reportedUser?.name}</p>
              </div>
             
            </div>
            <div className="issue-comments">
              <h1>Comments</h1>
            </div>
          </div> : <></> }
    </div>
  )
}

export default Issue;