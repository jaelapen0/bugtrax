import axios from "axios";

export const getIssues = async (routeName: string) => {
  try {
    let user_id = JSON.parse(localStorage.currentUser)._id
    const res = await axios.get(`http://localhost:8000/api/issues/${user_id}/${routeName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return res;
    // console.log("Issues");
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllIssues = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/issues", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return res;
    
  } catch (err) {
    console.log(err);
  }
};


export const fetchIssue = async (issue_id: string) => {
  try {
    
    const res = await axios.get(`http://localhost:8000/api/issues/${issue_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return res;
    
  } catch (err) {
    console.log(err);
  }
};

export const updateIssue = async (issueId: string, formData: any) => {

  try {
    const res = await axios.put(
      `http://localhost:8000/api/issues/${issueId}`,
      formData
    );
  } catch (err) {
    console.log(err);
  }
}