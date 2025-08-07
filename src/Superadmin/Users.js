import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5269/api/Users')
      .then((res) => {
        console.log("Users API Response:", res.data);
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-muted">
        <i className="bi bi-people me-2 text-info"></i> Users
      </h2>
      
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No Users Found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
