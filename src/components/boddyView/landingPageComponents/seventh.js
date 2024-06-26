import React from "react";
import { Container } from "reactstrap";

function Seventh() {
  return (
    <>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <Container>
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">Testimonials</h6>
            <h1 className="mb-5">What Our Students Say!</h1>
          </div>
          <div className="owl-carousel testimonial-carousel position-relative">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="testimonial-item text-center">
                <img className="border rounded-circle p-2 mx-auto mb-3" src={`/assets/img/testimonial-${index}.jpg`} style={{ width: "80px", height: "80px" }} alt={`Testimonial ${index}`} />
                <h5 className="mb-0">Client Name</h5>
                <p>Profession</p>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Seventh;
