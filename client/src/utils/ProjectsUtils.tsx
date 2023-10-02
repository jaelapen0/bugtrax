import axios from "axios";

export const fetchProjects =  async () =>  {
  try {
    const res = await axios.get("http://localhost:8000/api/projects", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    // need to add toast message for error
  }
}

export const fetchProject =  async (id : string) =>  {
  debugger
  try {
    const res = await axios.get(`http://localhost:8000/api/projects/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    // need to add toast message for error
  }
}