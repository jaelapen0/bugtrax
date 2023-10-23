import React, { useState, ChangeEvent, useEffect, FC, FormEvent } from "react";
import axios from "axios";
import { fetchProjects } from "../../utils/ProjectsUtils";
import { Link, useNavigate, redirect } from "react-router-dom";
import { Project } from "../../types/Type";
// import { useHistory } from 'react-router-dom';


export const AddIssueForm: FC = () => {
  // GET CURRENT USER's ID - Might put inside a useEffect Hook
  const loggedInUserString = localStorage.getItem("currentUser");
  const reportingUser = JSON.parse(loggedInUserString!);
  const navigate = useNavigate();

  // CREATE ISSUE FORMDATA
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    newProject: false,
    status: "Open",
    reportedUser: reportingUser._id, //logged in user's id
    project: "",
  });

  // ALL EXISTING PROJECTS ARRAY
  const [projects, setProjects] = useState<Project[]>([]);
  const [formVisible, setFormVisibility] = useState(false);
  // NEW PROJECT STATE
  const [newProject, setNewProject] = useState<unknown>("");
  const [selectedProject, selectProject] = useState<unknown>("");

  // PROJECT FIELD SHO/ HIDE STATE
  const [showOption, setShowOption] = useState(false);

  // HANDLE CHANGE
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // HANDLE FORM SUBMIT
  // If NEW project is chosen, handler will make 2 calls (1 to create project, 1 to create issue)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/issues/",
        formData
      );
      debugger;
      navigate(`/issues/${res.data._id}`, { state: { data: res } });
    } catch (err) {
      console.log(err);
    }
  };

  // FETCHING THE CURRENTLY EXISTING PROJECTS VIA useEffect HOOK
  useEffect(() => {
    fetchProjects().then((res) => {
      setProjects(res!.data);
    });
  }, []);

  const handleToggle = () => {
    setFormVisibility((formVisible) => !formVisible);
  };

  return (
    <div className="issue-form-container">
      <h2 onClick={handleToggle}>Add New Issue</h2>
      {formVisible ? (
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="project">Which project is this issue part of?</label>
          <select
            id="project"
            name="project"
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
            <option value="new">New Project</option>
          </select>
          {showOption && (
            <input
              className="issue-form-input"
              id="project"
              value={formData.project}
              type="text"
              onChange={handleChange}
              placeholder="Enter New Project"
              required
              name="project"
            ></input>
          )}
          <input
            type="text"
            className="issue-form-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Issue Title"
          />
          <textarea
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            name="description"
          />
          <select name="priority" onChange={handleChange} id="priority">
            <option name="priority" value="low">
              Low
            </option>
            <option name="priority" value="medium">
              Medium
            </option>
            <option name="priority" value="high">
              High
            </option>
            <option name="priority" value="critical">
              Critical
            </option>
          </select>
          <button type="submit">Add Issue</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
