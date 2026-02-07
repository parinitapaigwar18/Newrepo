// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { email, password };

//     try {
//       const res = await axios.post(
//         "https://backend-pi-topaz-40.vercel.app/login",
//         formData
//       );


      




//       if (res.data.user) {
//         // ✅ save userId
//         localStorage.setItem("userId", JSON.stringify(res.data.user));
//         alert(res.data.message);
//         navigate("/dashboard");
//       } else {
//         alert(res.data.message); // user not found
//       }

//     } catch (error) {
//       alert("error while login");
//       console.error(error);
//     }
//   };

//   return (
//     <div class ="page">
//       <h1 style={{color:"white"}}>Welcome to Login</h1>
//       <br/>
//       <img src="/padlock.png" alt="Login" width="100" height="100"/>
//       <div class="login">
      
//       <h1 style={{color:"white", marginLeft:"105px"}}>LOG IN</h1>
//       <form onSubmit={handleLoginSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="email"
//         /><br />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="password"
//         /><br />

//         <button type="submit">Login</button>

//         <p>
//           Do not have account:   <a href="/registration"> Register</a>
//         </p>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://backend-pi-topaz-40.vercel.app/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      // ✅ SUCCESS CASE
     

      if ( res.data.user && res.data.token) {
        // 🔐 Save auth data
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.response?.data?.message || "Something went wrong while logging in"
      );
    }
  };

  return (
    <div className="page">
      <h1 style={{ color: "white" }}>Welcome to Login</h1>

      <img src="/padlock.png" alt="Login" width="100" height="100" />

      <div className="login">
        <h2 style={{ color: "white", marginLeft: "105px" ,marginTop:"30px", marginBottom:"10px"}}>LOG IN</h2>

        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button type="submit">Login</button>

          <p style={{ color: "white" }}>
            Don’t have an account?{" "}
            <a href="/registration" style={{ color: "#14ebeb" }}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
