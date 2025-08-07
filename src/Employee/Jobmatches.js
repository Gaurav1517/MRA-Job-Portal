import { useState } from "react";

function Jobmatches() {
    const [countries, setCountries] = useState([
        {
            id: 1,
            company: "MRA Infotech",
            jobtitle: "React.js Developer",
            address: "5th Floor, Tower A, Tech Park",
            city: "Noida",
            pincode: "201301",
            contactPerson: "Anjali Mehta",
            mobile: "9876543210",
            degree: "B.Tech",
            skill: "React, JavaScript, HTML, CSS",
            experience: "2 Years",
            salary: "55000",
            vacancy: "4",
            details: "Looking for a frontend developer experienced in React.js and modern UI frameworks.",
            applied: false
        },
        {
            id: 2,
            company: "MRA Infotech",
            jobtitle: "Java Backend Developer",
            address: "3rd Floor, Sigma Tech Zone",
            city: "Pune",
            pincode: "411045",
            contactPerson: "Ravi Sharma",
            mobile: "9845123678",
            degree: "MCA",
            skill: "Java, Spring Boot, REST API",
            experience: "3 Years",
            salary: "75000",
            vacancy: "3",
            details: "Looking for backend developer to build scalable microservices in Java.",
            applied: false
        },
        {
            id: 3,
            company: "SS Infotech",
            jobtitle: "Data Analyst",
            address: "12 Data Street, Infotech Campus",
            city: "Hyderabad",
            pincode: "500084",
            contactPerson: "Sana Khan",
            mobile: "9765432109",
            degree: "B.Sc. (CS)",
            skill: "Python, SQL, PowerBI",
            experience: "1 Year",
            salary: "60000",
            vacancy: "2",
            details: "Seeking data analysts with experience in Python, SQL, and dashboarding tools.",
            applied: false
        },
        {
            id: 4,
            company: "MRA Infotech",
            jobtitle: "Full Stack Developer",
            address: "8 Dev Lane",
            city: "Bangalore",
            pincode: "560034",
            contactPerson: "Nitin Verma",
            mobile: "9922334455",
            degree: "B.Tech",
            skill: "MERN Stack",
            experience: "4 Years",
            salary: "90000",
            vacancy: "5",
            details: "Full stack developer with strong knowledge of MongoDB, Express, React, and Node.js.",
            applied: false
        },
        {
            id: 5,
            company: "vive Infotech",
            jobtitle: "Cloud Engineer",
            address: "Cloud Tower, Phase 2",
            city: "Chennai",
            pincode: "600100",
            contactPerson: "Priya Raghavan",
            mobile: "9988776655",
            degree: "B.E.",
            skill: "AWS, Docker, Linux",
            experience: "2 Years",
            salary: "85000",
            vacancy: "2",
            details: "Responsible for managing AWS infrastructure, CI/CD pipelines, and server maintenance.",
            applied: false
        },
        {
            id: 4,
            company: "Innovate Softwares",
            jobtitle: "Node.js Developer",
            address: "Plot 56, Phase 2",
            city: "Noida",
            pincode: "201301",
            contactPerson: "Megha Kapoor",
            mobile: "9123456789",
            degree: "M.Tech",
            skill: "Angular, REST API",
            experience: "4 Years",
            salary: "120000",
            vacancy: "4",
            details: "Urgent hiring for Angular Developer with REST API integration experience.",
            applied: false
        },
        {
            id: 5,
            company: "CloudNine Pvt Ltd",
            jobtitle: "Node.js Backend Developer",
            address: "88 Cloud Avenue",
            city: "Pune",
            pincode: "411057",
            contactPerson: "Siddharth Malhotra",
            mobile: "9988776655",
            degree: "BCA",
            skill: "Node.js, Express",
            experience: "2 Years",
            salary: "70000",
            vacancy: "2",
            details: "Backend developer needed for scalable API development.",
            applied: false
        }
    ]);

    const [selectedCompany, setSelectedCompany] = useState("");
    const [message, setMessage] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const handleDownload = () => {
        const header = "Job Title, Company, Degree, Skill, Experience, Salary\n";
        const csvData = countries.map(c =>
            `${c.jobtitle}, ${c.company}, ${c.degree}, ${c.skill}, ${c.experience}, ${c.salary}`
        ).join("\n");
        const blob = new Blob([header + csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "jobs.csv";
        link.click();
    };

    const filteredCountries = countries.filter(c =>
        `${c.company} ${c.jobtitle}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCountries = filteredCountries.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredCountries.length / pageSize);

    return (
        <div className="container mt-4">
            <h2 className="text-muted"><i className="bi bi-briefcase me-2 text-success"></i>Job Matches</h2>

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
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Degree</th>
                        <th>Skill</th>
                        <th>Experience</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCountries.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.company}</td>
                            <td>{c.jobtitle}</td>
                            <td>{c.degree}</td>
                            <td>{c.skill}</td>
                            <td>{c.experience}</td>
                            <td>{c.salary}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 px-3 py-1"
                                    onClick={() => {
                                        setViewData(c);
                                        setShowViewModal(true);
                                    }}
                                    title="View"
                                >
                                    <i className="bi bi-eye-fill"></i>
                                    <span style={{ fontWeight: "500" }}>View</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {paginatedCountries.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center">No matched jobs found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div
                className="card p-3 mt-4 shadow-sm mx-auto"
                style={{ background: "#f7fdff", maxWidth: "600px", fontSize: "0.9rem" }}
            >
                <h5 className="mb-3">
                    <i className="bi bi-chat-dots me-2 text-primary fs-3"></i>
                    <span className="fw-bold">Send Message to Company</span>
                </h5>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Select Company</label>
                    <select
                        className="form-select form-select-sm"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.company}>{c.company}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Your Message</label>
                    <textarea
                        className="form-control form-control-sm"
                        rows={3}
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-success btn-sm px-3"
                    onClick={() => {
                        if (selectedCompany && message.trim()) {
                            alert(`Message sent to ${selectedCompany}`);
                            setMessageSent(true);
                            setMessage("");
                            setSelectedCompany("");
                        } else {
                            alert("Please select a company and enter your message.");
                        }
                    }}
                >
                    Send Message
                </button>

                {messageSent && (
                    <div className="alert alert-success mt-3" role="alert">
                        Message sent successfully!
                    </div>
                )}
            </div>
            <br />

            {showViewModal && viewData && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header" style={{ background: "#89cff0" }}>
                                <h5 className="modal-title text-bold">Job Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ background: "#f7fdff" }}>
                                <div className="container">
                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Company Name</label>
                                            <div className="ps-2 text-dark">{viewData.company}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Job Title</label>
                                            <div className="ps-2 text-dark">{viewData.jobtitle}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Address</label>
                                            <div className="ps-2 text-dark">{viewData.address}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">City</label>
                                            <div className="ps-2 text-dark">{viewData.city}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Pincode</label>
                                            <div className="ps-2 text-dark">{viewData.pincode}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Contact Person</label>
                                            <div className="ps-2 text-dark">{viewData.contactPerson}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Mobile No.</label>
                                            <div className="ps-2 text-dark">{viewData.mobile}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Degree</label>
                                            <div className="ps-2 text-dark">{viewData.degree}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Skill</label>
                                            <div className="ps-2 text-dark">{viewData.skill}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Experience</label>
                                            <div className="ps-2 text-dark">{viewData.experience}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">Salary</label>
                                            <div className="ps-2 text-dark">₹{viewData.salary}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-semibold text-dark">No. of Vacancies</label>
                                            <div className="ps-2 text-dark">{viewData.vacancy}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4" style={{ background: "#f7fdff" }}>
                                        <label className="fw-semibold text-dark">Job Description</label>
                                        <div className="ps-2 text-dark">{viewData.details}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer" style={{ background: "#f7fdff" }}>
                                {!viewData.applied ? (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            alert("Applied Successfully");
                                            setCountries(prev =>
                                                prev.map(job =>
                                                    job.id === viewData.id ? { ...job, applied: true } : job
                                                )
                                            );
                                            setViewData({ ...viewData, applied: true });
                                        }}
                                    >
                                        Apply
                                    </button>
                                ) : (
                                    <button className="btn btn-secondary" disabled>Applied</button>
                                )}
                                <button className="btn btn-danger" onClick={() => setShowViewModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && (
                <div className="modal-backdrop fade show" onClick={() => setShowViewModal(false)}></div>
            )}



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

export default Jobmatches;