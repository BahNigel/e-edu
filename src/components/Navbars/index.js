/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardNaveBarIndex() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("Access token not found");
          return;
        }

        // Include the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user data using the token
        const response = await axios.get("http://localhost:8000/api/user/", config);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <img
            src="assets/dasboard/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {userData && (
                <img
                  src={userData.profile.profile_picture}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              )}
            </div>
            <div className="info">
              {userData && (
                <a href="#" className="d-block">
                  {userData.first_name} {userData.last_name}
                </a>
              )}
            </div>
          </div>

          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/courses" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Courses
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default DashboardNaveBarIndex;
