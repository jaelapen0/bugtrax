import React,{ FC, useState, useEffect, useRef } from "react";
import { fetchIssue } from "../utils/IssueUtils";
import { getUsers } from "../utils/UserUtils"
import '../index.css';
import axios from "axios";
import { fetchProjects } from "../utils/ProjectsUtils";
import { project } from "../../src/types/ProjectType";


const Issue = (props: any) => {
  const [formData, setFormData] = useState({
  })
  const [projects, setProjects] = useState<project[]>([]);
  const [users, setUsers] = useState<any>([]);
  const [edit, setEdit] = useState(true);
  const url = window.location.href.split('/')
  const id = url[url.length-1]

  const [issue, setIssue] = useState<any>([]);
  const pullIssue = (id: string) => {
    fetchIssue(id)
    .then(res => {setIssue(res.data);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        status: res.data.status,
        priority: res.data.priority,
        project: res.data.project.name,
        createdAt: res.data.createdAt,
        reportedUser: res.data.reportedUser,
        assignedUser: res.data.assignedUser,
      })
    
    })
  }
  useEffect(() => {
    pullIssue(id);
    fetchProjects().then((res) => {
      setProjects(res.data);
    });

    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    debugger
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/issues/${id}`,
        formData
      );
    } catch (err) {
      console.log(err);
    }
  };
  debugger
  return (
    <div>Issue
      {issue._id ?    
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
                    <input id="issue-title" type="text" value={issue.title}/>
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={issue.description} />
                  </div>
                  </fieldset>
                  <div>
                  
                  <div>
                    <label htmlFor="project">Project</label>
                    <select
                      id="project"
                      name="project"
                      value={issue.project?.name}
                      onChange={(e) => {
                        setNewProject(e.target.value);

                        handleChange(e);
                        if (e.target.value == "new") {
                          setShowOption(true);
                          setFormData({ ...formData, newProject: true });
                        } else setShowOption(false);
                      }}
                    >
                      <option value=""> --Choose a project-- </option>
                      {projects.map((proj) => (
                        <option id={proj._id} value={proj.name}>
                          {proj.name}
                        </option>
                      ))}
                    </select>
                   </div>

                   <div>
                    <label htmlFor="project">Assignee</label>
                    <select
                      id="assignee"
                      name="assignee"
                      value={issue.assignedUser?.name}
                      onChange={(e) => {
                        setNewProject(e.target.value);

                        handleChange(e);
                        if (e.target.value == "new") {
                          setShowOption(true);
                          setFormData({ ...formData, newProject: true });
                        } else setShowOption(false);
                      }}
                    >
                      <option value=""> --Choose a project-- </option>
                      {users.map((user) => (
                        <option id={user._id} value={user.name}>
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
                      value={issue.status}
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
                      value={issue.priority}
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