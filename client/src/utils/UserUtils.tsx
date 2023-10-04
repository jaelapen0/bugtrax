import axios from "axios";

export const getUsers = async () => {
  try {

    const res = await axios.get(`http://localhost:8000/api/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    debugger
    return res;
    // console.log("Issues");
    // console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};