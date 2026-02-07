import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate();


const handleSubmit = async(e)=>{
  e.preventDefault();
  const formData = {name, email, password};

  try{
    const res = await axios.post("https://backend-pi-topaz-40.vercel.app/register", formData);
    alert(res.data.message);
   navigate("/");
    
  } catch(error){
    alert("error while registeration");
  }
}

  return (
    <div class="page">
      <h1 style={{color:"white"}}>For Best Product </h1>
      
      <h2 style={{color:"white"}}>Register Now</h2>
      <div class="register">
        <h1>REGISTER NOW</h1>
        <form onSubmit={handleSubmit}>
            <input type= "text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='name'/><br/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/><br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/><br/>
            <button type='submit'>Register</button>
        </form>
       </div>
    </div>
  )
}

export default Registration