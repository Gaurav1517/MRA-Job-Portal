import { useState } from "react";

function Myaccount() {
    const [countries, setCountries] = useState([
        {
            id: 1,
            companyname: "MRA Infotech",
            address: "190 IT Park",
            city: "New Delhi",
            pincode: "32001",
            mobile: "7319970198",
            contactperson: "Rizwan Ahmad",
            detail: "Leading Provider of IT Solutions and Training Services",
        },
    ]);

    const [newCompanyname, setNewCompanyname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newPincode, setNewPincode] = useState("");
    const [newMobile, setNewMobile] = useState("");
    const [newContactperson, setNewContactperson] = useState("");
    const [newDetail, setNewDetail] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleUpdateDetails = () => {
        setCountries(prev =>
            prev.map(c =>
                c.id === 1
                    ? {
                        ...c,
                        companyname: newCompanyname,
                        address: newAddress,
                        city: newCity,
                        pincode: newPincode,
                        mobile: newMobile,
                        contactperson: newContactperson,
                        detail: newDetail,
                    }
                    : c
            )
        );
        setShowAddModal(false);
    };

    const handleDownload = () => {
        const header = "ID,Company Name,Address,City,Pincode,Mobile,Contact Person,Detail\n";
        const csvData = countries.map(c =>
            `${c.id},${c.companyname},${c.address},${c.city},${c.pincode},${c.mobile},${c.contactperson},${c.detail}`
        ).join("\n");
        const blob = new Blob([header + csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "my_account.csv";
        link.click();
    };

    const filteredCountries = countries.filter(c =>
        `${c.companyname} ${c.address}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-muted">
                <i className="bi bi-person-circle me-2 text-success"></i>My Account
            </h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    const current = countries.find(c => c.id === 1);
                    if (current) {
                        setNewCompanyname(current.companyname);
                        setNewAddress(current.address);
                        setNewCity(current.city);
                        setNewPincode(current.pincode);
                        setNewMobile(current.mobile);
                        setNewContactperson(current.contactperson);
                        setNewDetail(current.detail);
                    }
                    setShowAddModal(true);
                }}
            >
                Update Details
            </button>

            <div className="row g-2 mb-3 align-items-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by company or address..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-6 text-md-end">
                    <button className="btn btn-success" onClick={handleDownload}>
                        <i className="bi bi-download me-1"></i>Export
                    </button>
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Mobile</th>
                        <th>Contact Person</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.companyname}</td>
                                <td>{c.address}</td>
                                <td>{c.city}</td>
                                <td>{c.pincode}</td>
                                <td>{c.mobile}</td>
                                <td>{c.contactperson}</td>
                                <td>{c.detail}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No Data Found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Account Info</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Company Name</label>
                                        <input type="text" className="form-control" value={newCompanyname} onChange={e => setNewCompanyname(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" value={newCity} onChange={e => setNewCity(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pincode</label>
                                        <input type="text" className="form-control" value={newPincode} onChange={e => setNewPincode(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile</label>
                                        <input type="text" className="form-control" value={newMobile} onChange={e => setNewMobile(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact Person</label>
                                        <input type="text" className="form-control" value={newContactperson} onChange={e => setNewContactperson(e.target.value)} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Detail</label>
                                        <textarea className="form-control" rows="3" value={newDetail} onChange={e => setNewDetail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleUpdateDetails}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {showAddModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default Myaccount;
