import { useState } from "react";
import { FaEye } from "react-icons/fa";

function Profilematch() {
  const [profiles] = useState([
    { id: 1, name: "Amir", degree: "B.Tech", skill: "React" },
    { id: 2, name: "Vivek ", degree: "MCA", skill: "Java" },
    { id: 3, name: "Piyush Sharma", degree: "BCA", skill: "Python" },
    { id: 4, name: "Sneha Kapoor", degree: "MBA", skill: "Digital Marketing" },
    { id: 5, name: "Manish Rawat", degree: "B.Tech", skill: "Angular" },
    { id: 6, name: "Divya Singh", degree: "M.Tech", skill: "Data Science" },
    { id: 7, name: "Aman Yadav", degree: "B.Tech", skill: "React" },
    { id: 8, name: "Megha Verma", degree: "MCA", skill: "Spring Boot" },
    { id: 9, name: "Kunal Chauhan", degree: "BCA", skill: "Python" },
    { id: 10, name: "Deepak Rana", degree: "MBA", skill: "Business Analytics" },
    { id: 11, name: "Simran Bedi", degree: "B.Tech", skill: "DevOps" },
    { id: 12, name: "Ritika Joshi", degree: "M.Tech", skill: "Cybersecurity" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const filteredProfiles = profiles.filter(p =>
    p.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredProfiles.length / pageSize);

  const handleDownload = () => {
    const header = "Name,Degree,Skill\n";
    const csv = profiles.map(p => `${p.name},${p.degree},${p.skill}`).join("\n");
    const blob = new Blob([header + csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "profiles.csv";
    link.click();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-muted"><i className="bi bi-person-check-fill me-2 text-success"></i> Employee Profile Match</h2>

      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by skill or degree..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-success"
            onClick={handleDownload}
            title="Download CSV"
          >
            <i className="bi bi-download"></i> Export
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
            <th>Degree</th>
            <th>Skill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProfiles.length > 0 ? (
            paginatedProfiles.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.degree}</td>
                <td>{p.skill}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-sm btn-outline-primary" title="View"><FaEye /></button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No Profile Found.</td>
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
    </div>
  );
}

export default Profilematch;
