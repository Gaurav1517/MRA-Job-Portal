import { useState, useEffect } from "react";

function Feedbackreport() {
  const [feedbacks] = useState([
    { id: 1, name: "Vivek Solanki", email: "vivek123@gmail.com", comment: "Great service!", rating: 5 },
    { id: 2, name: "Rizwan Ahmad", email: "rizwan123@gmail.com", comment: "Very helpful and professional.", rating: 4 },
    { id: 3, name: "Piyush Sharma", email: "piyush123@gmail.com", comment: "Average experience.", rating: 3 },
    { id: 4, name: "Neha Verma", email: "neha123@gmail.com", comment: "Excellent support team!", rating: 5 },
    { id: 5, name: "Aarav Gupta", email: "aarav123@gmail.com", comment: "Could be better.", rating: 2 },
    { id: 6, name: "Shiwansh Solutions", email: "info@shiwansh.com", comment: "Great collaboration with your platform.", rating: 4 },
    { id: 7, name: "Tech Innovators", email: "info@techinnovator.com", comment: "Smooth integration with our systems.", rating: 5 },
    { id: 8, name: "GreenTech Solutions", email: "info@greentech.com", comment: "Helpful support and timely updates.", rating: 4 },
    { id: 9, name: "EduTech Hub", email: "info@edutech.com", comment: "Impressive tools for educational outreach.", rating: 5 },
    { id: 10, name: "HealthCare Innovations", email: "info@healthcare.com", comment: "Efficient and reliable services.", rating: 5 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const filteredFeedbacks = feedbacks.filter(fb =>
    fb.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredFeedbacks.length / pageSize);

  const handleDownload = () => {
    const header = "ID,Name,Email,Comment,Rating\n";
    const rows = filteredFeedbacks.map(fb =>
      `${fb.id},${fb.name},${fb.email},${fb.comment},${fb.rating}`
    ).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback_report.csv";
    link.click();

    // Scroll to top after download
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStars = (rating) => {
    const total = 5;
    return (
      <>
        {[...Array(total)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9", fontSize: "1.5rem" }}>
            ★
          </span>
        ))}
      </>
    );
  };

  // Scroll to top when search term or page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchTerm, currentPage]);

  return (
    <div className="container mt-4">
      <h2 className="text-muted">
        <i className="bi bi-chat-dots-fill me-2 text-warning"></i>
        Feedback Report
      </h2>

      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-success" onClick={handleDownload}>
            <i className="bi bi-download me-1"></i>Export
          </button>
        </div>

        <div className="col-md-4 text-md-end">
          <label className="form-label me-2 mb-0">Items per page:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={pageSize}
            onChange={e => {
              setPageSize(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFeedbacks.length > 0 ? (
            paginatedFeedbacks.map(fb => (
              <tr key={fb.id}>
                <td>{fb.id}</td>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.comment}</td>
                <td>{renderStars(fb.rating)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No feedback found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Feedbackreport;
