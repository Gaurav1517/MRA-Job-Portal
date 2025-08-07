import { useState, useEffect } from "react";

function Companyreport() {
  const [reports] = useState([
    { id: 1, name: "CodeNest Pvt. Ltd.", type: "Software Firm", contact: "Aman Jaiswal", city: "Bengaluru", address: "Block A, MG Road", email: "info@codenest.com", mobile: "9876543211", description: "We build scalable digital products." },
    { id: 2, name: "NovaTech", type: "AI Startup", contact: "Simran Kaur", city: "Hyderabad", address: "Plot 67, HITEC City", email: "support@novatech.ai", mobile: "9876543212", description: "AI solutions for fintech and healthcare." },
    { id: 3, name: "LogiFlow", type: "Logistics Company", contact: "Manish Mehta", city: "Delhi", address: "Warehouse 5, NH8", email: "contact@logiflow.in", mobile: "9876543213", description: "Smart logistics services and freight." },
    { id: 4, name: "MediPlus", type: "Healthcare", contact: "Dr. Kavita Nair", city: "Mumbai", address: "Sector 2, HealthPark", email: "care@mediplus.com", mobile: "9876543214", description: "Advanced patient care services." },
    { id: 5, name: "SkillForge", type: "EdTech", contact: "Ankur Sharma", city: "Pune", address: "Tower 9, Skills Avenue", email: "info@skillforge.com", mobile: "9876543215", description: "Online skill building platform." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const filteredReports = reports.filter(cmp =>
    cmp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const handleDownload = () => {
    const header = "ID,Name,Type,Contact,City,Address,Email,Mobile,Description\n";
    const rows = filteredReports.map(cmp =>
      `${cmp.id},${cmp.name},${cmp.type},${cmp.contact},${cmp.city},${cmp.address},${cmp.email},${cmp.mobile},${cmp.description}`
    ).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "company_report.csv";
    link.click();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchTerm, currentPage]);

  return (
    <div className="container mt-4">
      <h2 className="text-muted">
        <i className="bi bi-buildings me-2 text-info"></i>
        Company Report
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
            <th>Type</th>
            <th>Contact</th>
            <th>City</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.length > 0 ? (
            paginatedReports.map(cmp => (
              <tr key={cmp.id}>
                <td>{cmp.id}</td>
                <td>{cmp.name}</td>
                <td>{cmp.type}</td>
                <td>{cmp.contact}</td>
                <td>{cmp.city}</td>
                <td>{cmp.address}</td>
                <td>{cmp.email}</td>
                <td>{cmp.mobile}</td>
                <td>{cmp.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No Company Found.</td>
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

export default Companyreport;
