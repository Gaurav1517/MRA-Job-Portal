import React, { useState } from "react";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    feedback: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback sent successfully!");
    setFormData({ name: "", mobile: "", email: "", feedback: "" });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">
          <i className="bi bi-chat-dots-fill me-2 text-success"></i>Feedback Form
        </h2>
        <p className="text-muted">
          We value your feedback — help us improve your experience.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Feedback</label>
                  <textarea
                    className="form-control"
                    name="feedback"
                    rows="4"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Write your feedback here..."
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">
                    <i className="bi bi-send-fill me-2"></i>Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <i className="bi bi-stars text-warning fs-1"></i>
            <h5 className="mt-2">Thank you for helping us grow!</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;