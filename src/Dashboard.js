// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext.js";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Dashboard() {
//   const { role } = useContext(AuthContext);

//   const [user, setUser] = useState(null);
//   const [products, setProducts] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//   const storedUser = localStorage.getItem("userId");

//   if (!storedUser) {
//     alert("Please login first");
//     navigate("/");
//     return;
//   }

//   setUser(JSON.parse(storedUser))
//    }, [navigate]);

//     // Fetch user details
//     axios
//       .get(`https://backend-pi-topaz-40.vercel.app/dashboard/${userId}`)
//       .then((res) => {
//         setUser(res.data.user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     // Fetch products
//     axios
//       .get("https://backend-pi-topaz-40.vercel.app/products")
//       .then((res) => {
//         setProducts(res.data.products);
//       })
//       .catch((err) => {
//         console.log(err);
//       },[navigate]);
    

//   return (
//     <div>
//       {/* DASHBOARD HEADER */}
//       <h2>Dashboard ({role})</h2>

//       {/* ROLE BASED BUTTONS (YOUR WORKING CODE KEPT) */}
//       {user?.role === "admin" && (
//         <Link to="/addproduct">
//           <button>Add Product</button>
//         </Link>
//       )}

//       <Link to="/products">
//         <button>View Products</button>
//       </Link>

//       <hr />

//       {/* USER INFO */}
//       {user ? (
//         <div className="navbar">
//           <p><b>Name:</b> {user.name}</p>
//           <p><b>Email:</b> {user.email}</p>
//           <p>
//             <b>Registered On:</b>{" "}
//             {new Date(user.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}

//       <hr />

//       {/* PRODUCT SECTION */}
//       <h2>Product Section</h2>

//       {role === "admin" && (
//         <button onClick={() => navigate("/addproduct")}>
//           Add Product
//         </button>
//       )}

//       {products.length > 0 ? (
//         products.map((product) => (
//           <div
//             key={product._id}
//             className="product"
//             style={{
//               border: "1px solid #ccc",
//               margin: "10px",
//               padding: "10px",
//             }}
//           >
//             <p><b>Product Name:</b> {product.productName}</p>
//             <p><b>Details:</b> {product.productDetail}</p>
//             <p><b>Price:</b> ₹{product.productPrice}</p>
//           </div>
//         ))
//       ) : (
//         <p>No product added yet</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 GET AUTH DATA
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // ✅ FETCH PRODUCTS WITH TOKEN
    axios
      .get("https://backend-pi-topaz-40.vercel.app/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(
          "Error fetching products:",
          err.response?.data || err.message
        );
      });
  }, [navigate]);

  // 🔓 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* 🔹 HEADER */}
      <header className="header">
        <h2>Dashboard ({user?.role || "user"})</h2>

        <div className="header-actions">
          {user?.role?.toLowerCase() === "admin" && (
            <Link to="/addproduct">
              <button className="btn">Add Product</button>
            </Link>
          )}

          <Link to="/products">
            <button className="btn">View Products</button>
          </Link>

          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 USER INFO */}
      {user && (
        <div className="user-info">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p>
            <b>Registered On:</b>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      )}

      {/* 🔹 PRODUCTS */}
      <h2 className="section-title">Product Section</h2>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.image?.url && (
                <img
                  src={product.image.url}
                  alt={product.productName}
                />
              )}

              <h3>{product.productName}</h3>
              <p className="price">₹{product.productPrice}</p>
              <p className="details">{product.productDetail}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No product added yet</p>
      )}
    </div>
  );
}

export default Dashboard;
