// import { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// function Login(){

// const[email,setEmail]=useState("");
// const[password,setPassword]=useState("");

// const navigate = useNavigate();

// const login = async () => {

// try{

// const res = await api.post("/admin/login",{
// email,
// password
// });

// alert("Login success");

// navigate("/dashboard");

// }catch(err){

// alert("Invalid email or password");

// }

// };

// return(

// <div>

// <h2>Admin Login</h2>

// <input
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button onClick={login}>
// Login
// </button>

// </div>

// )

// }

// export default Login