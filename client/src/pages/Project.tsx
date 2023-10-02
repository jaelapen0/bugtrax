import React, {useState, useEffect} from 'react'
import { fetchProject } from '../utils/ProjectsUtils';
import { getUrl } from '../utils/GetUrl';


const Project = () => {
  const url = window.location.href.split('/')
  const id = url[url.length-1]

  const [project, setProject] = useState({});
  useEffect(() => {
    // let id = getUrl();
    fetchProject(id)
    .then((res: any) => {
      debugger
      setProject(res.data);
      debugger
    })
  }, []); 


  return (
    <div>Project
    {project._id ? 
      <div className="issue-container"> 
        {/* <h1>Issue title: <span contentEditable="true" onChange={handleChange}> {project.title}</span></h1> */}
        <p > Description <span contentEditable="true"> {project.description}</span> </p>
        {/* <p  onClick={handleChange}> Status {issue.status}</p> */}
        {/* <p> Priority {project.priority}</p> */}
        <p> Project {project.name}</p>
        <p> Created At {project.createdAt}</p>
        <ul>Issues: {project.issues.map(issue => (

            <li key={issue._id}>
              <h3>{issue.title}</h3>
              <p>Status: {issue.status}</p>
              <p>Priority: {issue.priority}</p>
              <p>Created At: {issue.createdAt}</p>
              <p>Assigned User: {issue.assignedUser?.name}</p>
              <p>Reported User: {issue.reportedUser?.name}</p>
            </li>

        ))}
        </ul> 

        {/* {projects.map((project) => (
            <div key={project._id} className="projectContainer">
              <Link
                to={`/projects/${project._id}`}
                style={{ textDecoration: "none" }}
                className="project-link"
              >
                {project.name}{" "}
              </Link>
            </div>
          ))} */}
        {/* <p> Reported User {project.reportedUser}</p> */}
      </div> : <></> }
    </div>
  )
}

export default Project;