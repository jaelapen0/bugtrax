import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchProject } from '../utils/ProjectsUtils';
import { issueColumns } from '../components/columns/Columns';
import DataTable from '../components/Table/Table';

interface ProjectPayload {
  id: string;
  name: string;
  description: string;
  issues: [];
  createdAt: string;
}
type UrlParams = {
  id: string;
};
function Project() : JSX.Element {

  const {id} = useParams<UrlParams>()
  const [project, setProject] = useState<ProjectPayload | null>(null);
  useEffect(() => {
    fetchProject(id!)
    .then((res: any) => {
      setProject(res.data);
    })
  }, []); 


  return (
    <div>Project
    {project !== null ? 
      <div className="issues-table"> 
        <h1> Title: {project!.name}</h1>
        <p> Created At {project!.createdAt}</p>
      <h1>Issues</h1>
        <DataTable
          columns={issueColumns}
          data={project!.issues}
          context="issues"
          size="large"
        />  
      </div> : <></> }
      
    </div>
  )
}

export default Project;