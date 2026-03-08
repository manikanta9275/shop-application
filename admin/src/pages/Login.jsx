import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const login = async ()=>{

try{

await axios.post(
"http://localhost:5000/api/admin/login",
{email,password}
);

localStorage.setItem("admin",email);

navigate("/dashboard");

}catch(err){

alert("Invalid email or password");

}

};

return(

<div className="d-flex justify-content-center align-items-center vh-100 bg-light">

<div className="card shadow p-4" style={{width:"400px"}}>

<h3 className="text-center mb-4">
Admin Login
</h3>

<div className="mb-3">

<label className="form-label">Email</label>

<input
type="email"
className="form-control"
placeholder="Enter email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>

<div className="mb-3">

<label className="form-label">Password</label>

<input
type="password"
className="form-control"
placeholder="Enter password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

</div>

<button
className="btn btn-primary w-100"
onClick={login}
>
Login
</button>

</div>

</div>

);

}

export default Login;