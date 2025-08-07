import React from "react";

function Contactus() {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        <i className="bi bi-telephone-forward-fill me-2 text-warning"></i>Contact Us
      </h2>

      <div className="row g-4">
        {/* Contact Form */}
        <div className="col-md-7">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">Send Message</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-md-5">
          <div className="card shadow border-0 bg-light">
            <div className="card-body">
              <h5 className="card-title mb-3">Contact Information</h5>

              <p>
                <i className="bi bi-geo-alt-fill text-info me-2"></i>
                22B Knowledge Park, Noida, Uttar Pradesh, India
              </p>

              <p>
                <i className="bi bi-envelope-fill text-danger me-2"></i>
                <a href="mailto:contact@techbridge.com" className="text-decoration-none text-dark">
                  contact@techbridge.com
                </a>
              </p>

              <p>
                <i className="bi bi-telephone-fill text-success me-2"></i>
                <a href="tel:+919876543210" className="text-decoration-none text-dark">
                  +91 98765 43210
                </a>
              </p>

              <p>
                <i className="bi bi-clock-fill text-secondary me-2"></i>
                Mon - Sat: 9 AM to 6 PM
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contactus;
