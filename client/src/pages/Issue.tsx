import React,{ FC, useState, useEffect, useRef } from "react";
import { fetchIssue } from "../utils/IssueUtils";
import '../index.css';
import axios from "axios";
const Issue = (props: any) => {
  const [formData, setFormData] = useState({
  })
  const url = window.location.href.split('/')
  const id = url[url.length-1]

  const [issue, setIssue] = useState<any>([]);
  const pullIssue = (id: string) => {
    fetchIssue(id)
    .then(res => {debugger; setIssue(res.data);
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
      // debugger;
      // navigate(`/issues/${res.data._id}`, { state: { data: res } });
    } catch (err) {
      console.log(err);
    }
  };
  debugger
  return (
    <div>Issue
      {issue._id ? 
          
          <div className="issue-container"> 
            
             <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
              </div>
              <button type="submit">Submit</button>
            </form>
            <h1>Issue title: <span contentEditable="true" onChange={handleChange}> {issue.title}</span></h1>
            <p > Description <span contentEditable="true"> {issue.description}</span> </p>
            <p  onClick={handleChange}> Status {issue.status}</p>
            <p> Priority {issue.priority}</p>
            <p> Project {issue.project.name}</p>
            <p> Created At {issue.createdAt}</p>
            <p> Reported User {issue.reportedUser}</p>
          </div> : <></> }
    </div>
  )
}

export default Issue;