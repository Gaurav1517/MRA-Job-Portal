import { useState } from "react";

function Myaccount() {
    const [countries, setCountries] = useState([
        {
            id: 1,
            firstname: "Anil",
            middlename: "Kumar",
            lastname: "Sah",
            address: "123 Main St",
            city: "Delhi",
            pincode: "110001",
            mobile: "9876543210",
            detail: "Leading Provider of IT Solutions and Training Services",
            degree: "MCA",
            skill: ".NET Core",
            passyear: "2011",
            experience: "3+ Years"
        },
    ]);

    const [newFirstname, setNewFirstname] = useState("");
    const [newMiddlename, setNewMiddlename] = useState("");
    const [newLastname, setNewLastname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newPincode, setNewPincode] = useState("");
    const [newMobile, setNewMobile] = useState("");
    const [newDetail, setNewDetail] = useState("");
    const [newDegree, setNewDegree] = useState("");
    const [newSkill, setNewSkill] = useState("");
    const [newPassyear, setNewPassyear] = useState("");
    const [newExperience, setNewExperience] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, ] = useState(3);

    const handleUpdateDetails = () => {
        setCountries(prevCountries =>
            prevCountries.map(c =>
                c.id === 1
                    ? {
                        ...c,
                        firstname: newFirstname,
                        middlename: newMiddlename,
                        lastname: newLastname,
                        address: newAddress,
                        city: newCity,
                        pincode: newPincode,
                        mobile: newMobile,
                        detail: newDetail,
                        degree: newDegree,
                        skill: newSkill,
                        passyear: newPassyear,
                        experience: newExperience
                    }
                    : c
            )
        );
        setShowAddModal(false);
    };

    const handleDownload = () => {
        const header = "Full Name, Address, City, Pincode, Mobile, Detail, Degree, Skill, Pass Year, Experience\n";
        const csvData = countries.map(c =>
            `${c.firstname} ${c.middlename} ${c.lastname}, ${c.address}, ${c.city}, ${c.pincode}, ${c.mobile}, ${c.detail}, ${c.degree}, ${c.skill}, ${c.passyear}, ${c.experience}`
        ).join("\n");
        const blob = new Blob([header + csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "countries.csv";
        link.click();
    };

    const filteredCountries = countries.filter(c =>
        `${c.firstname} ${c.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCountries = filteredCountries.slice(
        startIndex,
        startIndex + pageSize
    );

    // const totalPages = Math.ceil(filteredCountries.length / pageSize);

    return (
        <div className="container mt-4">
            <h2 className="text-muted"><i className="bi bi-person-fill me-2 text-success"></i>My Account</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    const current = countries.find(c => c.id === 1);
                    if (current) {
                        setNewFirstname(current.firstname);
                        setNewMiddlename(current.middlename);
                        setNewLastname(current.lastname);
                        setNewAddress(current.address);
                        setNewCity(current.city);
                        setNewPincode(current.pincode);
                        setNewMobile(current.mobile);
                        setNewDetail(current.detail);
                        setNewDegree(current.degree);
                        setNewSkill(current.skill);
                        setNewPassyear(current.passyear);
                        setNewExperience(current.experience);
                    }
                    setShowAddModal(true);
                }}
            >
                Update Details
            </button>

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
                    <button
                        className="btn btn-success"
                        onClick={handleDownload}
                        title="Download CSV"
                    >
                        <i className="bi bi-download"></i> Export
                    </button>
                </div>
                {/* <div className="col-md-4 text-md-end">
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
                </div> */}
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Mobile No.</th>
                        <th>Detail</th>
                        <th>Degree</th>
                        <th>Skill</th>
                        <th>Pass Year</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCountries.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.firstname}</td>
                            <td>{c.middlename}</td>
                            <td>{c.lastname}</td>
                            <td>{c.address}</td>
                            <td>{c.city}</td>
                            <td>{c.pincode}</td>
                            <td>{c.mobile}</td>
                            <td>{c.detail}</td>
                            <td>{c.degree}</td>
                            <td>{c.skill}</td>
                            <td>{c.passyear}</td>
                            <td>{c.experience}</td>
                        </tr>
                    ))}
                    {paginatedCountries.length === 0 && (
                        <tr>
                            <td colSpan="13" className="text-center">No Data Found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {/* <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </nav> */}

            {/* Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        {/* All Form Fields */}
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" value={newFirstname} onChange={e => setNewFirstname(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Middle Name</label>
                                            <input type="text" className="form-control" value={newMiddlename} onChange={e => setNewMiddlename(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control" value={newLastname} onChange={e => setNewLastname(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" value={newCity} onChange={e => setNewCity(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Pincode</label>
                                            <input type="text" className="form-control" value={newPincode} onChange={e => setNewPincode(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Mobile No.</label>
                                            <input type="text" className="form-control" value={newMobile} onChange={e => setNewMobile(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Degree</label>
                                            <select className="form-select" value={newDegree} onChange={e => setNewDegree(e.target.value)}>
                                                <option value="">Select degree</option>
                                                <option value="bca">BCA</option>
                                                <option value="btech">B.Tech</option>
                                                <option value="bsc">B.Sc</option>
                                                <option value="mtech">M.Tech</option>
                                                <option value="mca">MCA</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Skill</label>
                                            <select className="form-select" value={newSkill} onChange={e => setNewSkill(e.target.value)}>
                                                <option value="">Select skill</option>
                                                <option value="reactjs">React.js</option>
                                                <option value="nodejs">Node.js</option>
                                                <option value=".netcore">.Net Core</option>
                                                <option value="angular">Angular</option>
                                                <option value="next">Next</option>
                                                <option value="sql/database">SQL / Database</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 col-12">
                                            <label className="form-label">Detail</label>
                                            <textarea className="form-control" rows="3" value={newDetail} onChange={e => setNewDetail(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Pass Year</label>
                                            <select className="form-select" value={newPassyear} onChange={e => setNewPassyear(e.target.value)}>
                                                <option value="">Select pass year</option>
                                                {Array.from({ length: 18 }, (_, i) => 2008 + i).map(y => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label className="form-label">Experience</label>
                                            <select className="form-select" value={newExperience} onChange={e => setNewExperience(e.target.value)}>
                                                <option value="">Select experience</option>
                                                <option value="0">Fresher</option>
                                                <option value="1">1 Year</option>
                                                <option value="2">2 Years</option>
                                                <option value="3">3 Years</option>
                                                <option value="4">4 Years</option>
                                                <option value="5">5+ Years</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleUpdateDetails}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {showAddModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default Myaccount;