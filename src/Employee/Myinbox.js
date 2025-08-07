
import { useState } from "react";

function Myinbox() {
  const companyOptions = ["TCS", "Infosys", "HCL", "Wipro", "Google", "Meta"];

  const [messages, setMessages] = useState([
    { id: 1, company: "TCS", message: "This Is First Company Message." },
    { id: 2, company: "Infosys", message: "This Is Second Company Message" },
    { id: 3, company: "HCL", message: "This Is Third Company Message" },
    { id: 4, company: "Wipro", message: "This Is Fourth Company Message" },
    { id: 5, company: "Google", message: "This Is Fifth Company Message" },
    { id: 6, company: "Meta", message: "This Is Sixth Company Message" },
    { id: 7, company: "TCS", message: "This Is Seventh Company Message" },
    { id: 8, company: "Google", message: "This Is Eighth Company Message" },
    { id: 9, company: "Infosys", message: "This Is Ninth Company Message" },
    { id: 10, company: "Meta", message: "This Is Tenth Company Message" }
  ]);

  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const handleSendMessage = () => {
    if (selectedCompany && messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        company: selectedCompany,
        message: messageText
      };
      setMessages([newMessage, ...messages]);
      setSelectedCompany("");
      setMessageText("");
      setShowSendModal(false);
    }
  };

  const handleDownload = () => {
    const header = "Company, Message\n";
    const csv = messages.map(c => `${c.company}, ${c.message}`).join("\n");
    const blob = new Blob([header + csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "inbox_messages.csv";
    link.click();
  };

  const filteredMessages = messages.filter(c =>
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredMessages.length / pageSize);

  return (
    <div className="container mt-4">
      <h2 className="text-muted">
        <i className="bi bi-envelope-fill me-2 text-success"></i>My Inbox
      </h2>
      <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => setShowSendModal(true)}>
            <i className="bi bi-send"></i> Send Message
          </button>
      </div>
      <br />
      <br />
      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search company..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success" onClick={handleDownload} title="Download CSV">
            <i className="bi bi-download"></i> Export
          </button>
        </div>
        <div className="col-md-3 text-md-end">
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
            <th>Company</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMessages.length > 0 ? (
            paginatedMessages.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.company}</td>
                <td>{c.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No Message Found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Send Message Modal */}
      {showSendModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send New Message</h5>
                <button type="button" className="btn-close" onClick={() => setShowSendModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Select Company:</label>
                <select
                  className="form-select mb-3"
                  value={selectedCompany}
                  onChange={e => setSelectedCompany(e.target.value)}
                >
                  <option value="">-- Select Company --</option>
                  {companyOptions.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>

                <label>Type Message:</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Enter your message..."
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowSendModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSendModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Myinbox;
