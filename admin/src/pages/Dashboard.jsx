import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

function Dashboard(){

const [reload,setReload] = useState(false);
const navigate = useNavigate();

const refreshProducts = () =>{
setReload(!reload);
};

/* LOGOUT */

const logout = ()=>{
localStorage.removeItem("token");
navigate("/");
};

return(
    <div>

{/* NAVBAR */}

<nav className="navbar navbar-dark bg-dark px-4">

<span className="navbar-brand">
Admin Dashboard
</span>

<button
className="btn btn-danger"
onClick={logout}
>
Logout
</button>

</nav>


<div className="container-fluid p-4">

{/* <h2 className="mb-4">Admin Dashboard</h2> */}

<div className="row">

{/* ADD PRODUCT FORM */}

<div className="col-lg-4">

<div className="card shadow mb-4">

<div className="card-header bg-primary text-white">
<h5 className="mb-0">Add New Product</h5>
</div>

<div className="card-body">
<AddProduct refreshProducts={refreshProducts}/>
</div>

</div>

</div>


{/* PRODUCT LIST */}

<div className="col-lg-8">

<div className="card shadow">

<div className="card-header bg-dark text-white">
<h5 className="mb-0">Product List</h5>
</div>

<div className="card-body">

<ProductList reload={reload}/>

</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default Dashboard;