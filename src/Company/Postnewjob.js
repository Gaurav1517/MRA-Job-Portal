import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Postnewjob() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      degree: "B.Tech",
      skill: "React",
      experience: "1-3 Years",
      salary: "50000",
      vacancy: 2,
      details: "Experience with React and REST APIs"
    },
    {
      id: 2,
      title: "Backend Developer",
      degree: "MCA",
      skill: "Node.js",
      experience: "3-5 Years",
      salary: "60000",
      vacancy: 1,
      details: "Strong backend experience"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const [jobForm, setJobForm] = useState({
    title: "",
    degree: "",
    skill: "",
    experience: "",
    salary: "",
    vacancy: "",
    details: ""
  });

  const handleAddJob = () => {
    const newId = jobs.length + 1;
    const newJob = { id: newId, ...jobForm };
    setJobs([...jobs, newJob]);
    setShowAddModal(false);
    setJobForm({
      title: "",
      degree: "",
      skill: "",
      experience: "",
      salary: "",
      vacancy: "",
      details: ""
    });
  };

  const handleDownload = () => {
    const header = "Job Title,Degree,Skill,Experience,Salary,Vacancy,Details\n";
    const csv = jobs.map(j =>
      `${j.title},${j.degree},${j.skill},${j.experience},${j.salary},${j.vacancy},${j.details}`
    ).join("\n");

    const blob = new Blob([header + csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "posted_jobs.csv";
    link.click();
  };

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredJobs.length / pageSize);

  return (
    <div className="container mt-4">
      <h2 className="text-muted"><i className="bi bi-plus-circle me-2 text-success"></i>Post New Job</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Post Job</button>

      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-success" onClick={handleDownload}>
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
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Degree</th>
            <th>Skill</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Vacancy</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map(j => (
              <tr key={j.id}>
                <td>{j.id}</td>
                <td>{j.title}</td>
                <td>{j.degree}</td>
                <td>{j.skill}</td>
                <td>{j.experience}</td>
                <td>{j.salary}</td>
                <td>{j.vacancy}</td>
                <td>{j.details}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-sm btn-outline-primary" title="View"><FaEye /></button>
                    <button className="btn btn-sm btn-outline-success" title="Edit"><FaEdit /></button>
                    <button className="btn btn-sm btn-outline-danger" title="Delete"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No Job Found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal */}
      {showAddModal && (
        <>
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Post New Job</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        value={jobForm.title}
                        onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={jobForm.degree}
                        onChange={e => setJobForm({ ...jobForm, degree: e.target.value })}
                      >
                        <option value="">Select Degree</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="Bsc,Bca,Btech,Mtech,Mca">B.Sc, BCA, B.Tech, M.Tech, MCA</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={jobForm.skill}
                        onChange={e => setJobForm({ ...jobForm, skill: e.target.value })}
                      >
                        <option value="">Select Skill</option>
                        <option value="React">React</option>
                        <option value="JavaScript">javaScript</option>
                        <option value=".NETCore">.NET Core</option>
                        <option value="Node.js">Node.js</option>
                        <option value="SQL">SQL</option>
                        <option value="React,JavaScript,.NetCore,Nodejs,SQL">React.js, JavaScript, .NET Core, Node.js, SQL</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={jobForm.experience}
                        onChange={e => setJobForm({ ...jobForm, experience: e.target.value })}
                      >
                        <option value="">Select Experience</option>
                        <option value="0-2 Year">0-2 Year</option>
                        <option value="1-5 Years">1-5 Years</option>
                        <option value="3-10 Years">3-10 Years</option>
                        <option value="15+ Years">15+ Years</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Salary"
                        value={jobForm.salary}
                        onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="No. of Vacancy"
                        value={jobForm.vacancy}
                        onChange={e => setJobForm({ ...jobForm, vacancy: e.target.value })}
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        placeholder="Job Details"
                        rows={3}
                        value={jobForm.details}
                        onChange={e => setJobForm({ ...jobForm, details: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleAddJob}>Post</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowAddModal(false)}></div>
        </>
      )}
    </div>
  );
}

export default Postnewjob;