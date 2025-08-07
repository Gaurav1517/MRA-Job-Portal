import axios from "axios";
import { useEffect, useState } from "react";

function Usersroles() {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5269/api/UserRoles')
      .then((res) => {
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        setUserRoles(data);
      })
      .catch((err) => {
        console.error(err);
        setUserRoles([]); // ensure it's always an array
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-muted">
        <i className="bi bi-person-badge me-2 text-warning"></i>User Roles
      </h2>
      
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Role Name</th>
          </tr>
        </thead>
        <tbody>
          {userRoles?.length > 0 ? (
            userRoles.map(ur => (
              <tr key={ur.userId}>
                <td>{ur.userId}</td>
                <td>{ur.userName}</td>
                <td>{ur.roleName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No User Roles Found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Usersroles;
