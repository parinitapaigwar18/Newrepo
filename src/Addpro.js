// import React,{useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const Addpro = () => {
//     const [productName , setProductName] = useState("")
//     const [productPrice, setProductPrice] = useState("")
//     const [productDetail, setProductDetail]=useState("")
//     const [image , setImage]=useState(null)
//     const navigate = useNavigate();

//      const handleSubmit = async(e)=>{
//         e.preventDefault();
//         const formData = {productName,  productPrice,productDetail,image};
        

//         try{
//           const res = await axios.post("http://localhost:3000/addproduct", formData);
//           alert(res.data.message);
//          navigate("/");
//      }catch(error){
//         alert("error while adding product");
//      }
//     }

//   return (
//     <div class="page">

//        <img src='/monitor.png' alt='tv' id="img1"/>
//        <img src='/setting.png' alt='laptop' id="img2"/>
//        <img src='/smart-fridge.png' alt='fridge' id="img3"/>
//        <img src='/laundry.png' alt='washing machine' id="img4"/>

       
//       <div class="add">
//         <h1 style={{color:"white", marginLeft:"50px"}}>ADD Product</h1>
//         <form onSubmit={handleSubmit}>
//             <input type= "text" value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='Product Name'/><br/>
//             <input type="text" value={productDetail} onChange={(e)=>setProductDetail(e.target.value)} placeholder='Product Detail'/><br/>
//             <input type="number" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} placeholder='Product Price'/><br/>
//             <input type="file" onChange={(e)=>setImage(e.target.files[0])} /><br/>
//             <button type='submit'>Add Product</button>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Addpro;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Addpro.css";

const Addpro = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 Extra safety check (AdminRoute already exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDetail", productDetail);
    formData.append("image", image);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ DO NOT set Content-Type
          },
        }
      );

      alert(res.data.message || "Product added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error while adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* Background Images */}
      <img src="/monitor.png" alt="tv" id="img1" />
      <img src="/setting.png" alt="laptop" id="img2" />
      <img src="/smart-fridge.png" alt="fridge" id="img3" />
      <img src="/laundry.png" alt="washing machine" id="img4" />

      <div className="add">
        <h1 style={{ color: "white", marginLeft: "30px", marginTop: "20px" }}>
          ADD PRODUCT
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Product Detail"
            value={productDetail}
            onChange={(e) => setProductDetail(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
           name="image"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpro;
