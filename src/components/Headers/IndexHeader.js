import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

function IndexHeader() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [joinButton, setJoinButton] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setJoinButton(1);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      const header = document.getElementById("header");

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.remove("active");
      } else {
        // Scrolling up
        header.classList.add("active");
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <div className="sticky-header" id="header">
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow p-0">
          <Container fluid>
            <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
              <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>eLEARNING</h2>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto p-4 p-lg-0">
                <a href="/index" className="nav-item nav-link active">Home</a>
                <a href="/about" className="nav-item nav-link">About</a>
                <a href="/course" className="nav-item nav-link">Courses</a>
                <a href="/contact" className="nav-item nav-link">Contact</a>
              </div>

              <button className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                {/* Render join button based on state */}
                {joinButton ? (
                  <a style={{ color: "white" }} href="/dashboard">Dashboard<i className="fa fa-arrow-right ms-3"></i></a>
                ) : (
                  <a style={{ color: "white" }} href="/login">Join Now<i className="fa fa-arrow-right ms-3"></i></a>
                )}
              </button>
            </div>
          </Container>
        </nav>
      </div>
    </>
  );
}

export default IndexHeader;
