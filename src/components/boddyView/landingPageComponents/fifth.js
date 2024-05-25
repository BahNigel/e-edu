import React from "react";
import { Container } from "reactstrap";

function Fifth() {
  return (
    <>
      <Container className="py-5">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Courses</h6>
          <h1 className="mb-5">Popular Courses</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {[1, 2, 3].map((index) => (
            <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index}s`}>
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid" src={`/assets/img/course-${index}.jpg`} alt={`Course ${index}`} />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: "30px 0 0 30px" }}>Read More</a>
                    <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: "0 30px 30px 0" }}>Join Now</a>
                  </div>
                </div>
                <div className="text-center p-4 pb-0">
                  <h3 className="mb-0">$149.00</h3>
                  <div className="mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <small key={starIndex} className="fa fa-star text-primary"></small>
                    ))}
                    <small>(123)</small>
                  </div>
                  <h5 className="mb-4">Web Design & Development Course for Beginners</h5>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2"></i>John Doe</small>
                  <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2"></i>1.49 Hrs</small>
                  <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>30 Students</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Fifth;
