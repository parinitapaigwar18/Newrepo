 import React, { useContext } from "react";
import { AuthContext } from "./AuthContext.js";
import { Link } from "react-router-dom";

function Dashboard() {
  const { role } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard ({role})</h2>

      {role === "admin" && (
        <Link to="/addproduct">
          <button>Add Product</button>
        </Link>
      )}

      <Link to="/products">
        <button>View Products</button>
      </Link>
    </div>
  );
}

export default Dashboard;