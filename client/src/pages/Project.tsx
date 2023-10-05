import React, {useState, useEffect} from 'react'
import { fetchProject } from '../utils/ProjectsUtils';
import { getUrl } from '../utils/GetUrl';
import { issueColumns } from '../components/columns/Columns';
import DataTable from '../components/Table/Table';

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
      <div className="issues-table"> 
        <h1> Title: {project.name}</h1>
        <p> Created At {project.createdAt}</p>
      <h1>Issues</h1>
        <DataTable
          columns={issueColumns}
          data={project.issues}
          context="issues"
        />  
      </div> : <></> }
      
    </div>
  )
}

export default Project;