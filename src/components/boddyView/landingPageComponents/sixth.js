import React from "react";
import { Container } from "reactstrap";

function Sixth() {
  return (
    <>
      <Container className="container-xxl py-5">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Instructors</h6>
          <h1 className="mb-5">Expert Instructors</h1>
        </div>
        <div className="row g-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`0.${index}s`}>
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={`/assets/img/team-${index}.jpg`} alt={`Instructor ${index}`} />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: "-23px" }}>
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-sm-square btn-primary mx-1" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Sixth;
