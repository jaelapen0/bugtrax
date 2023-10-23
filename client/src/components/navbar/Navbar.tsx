import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = (): JSX.Element => {
  const authContext = useContext(AuthContext);

  const logout = () => {
    authContext?.logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary display: flex">
      <div id="navbar" className="container-fluid">
        {/* change these to links with react-router-dom */}
        <div className="left-side">
          <Link
            to={"/dashboard"}
            style={{ textDecoration: "none" }}
            className="navbar-brand"
          >
            Issue Tracker
          </Link>
        </div>

        {/* <div className="right-side"> */}
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none" }}
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/projects"}
              style={{ textDecoration: "none" }}
              className="nav-link"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/issues"}
              style={{ textDecoration: "none" }}
              className="nav-link"
            >
              Issues
            </Link>
          </li>
          {authContext?.user ? (
            <li className="nav-item">
              <button onClick={logout}>Log Out</button>
            </li>
          ) : (
            <div>
              <li className="nav-item">
              <Link
                to={"/login"}
                style={{ textDecoration: "none" }}
                className="nav-link"
              >
                Login
              </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/register"}
                  style={{ textDecoration: "none" }}
                  className="nav-link"
                >
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
