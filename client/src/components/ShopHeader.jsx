import { useState } from "react";

function ShopHeader({setSearch}){

const [showContact,setShowContact] = useState(false);

return(

<div>

<nav className="navbar px-4" style={{background:"#0d3b66"}}>

<div className="container-fluid d-flex align-items-center">



{/* SHOP NAME */}

<h3 className="text-white fw-bold mx-auto mb-0">
Ayyappa Hardware & Electrical
</h3>


{/* SEARCH */}

<input
className="form-control me-3"
style={{width:"250px"}}
placeholder="Search product..."
onChange={(e)=>setSearch(e.target.value)}
/>


{/* CONTACT BUTTON */}

<button
className="btn btn-light fw-bold"
onClick={()=>setShowContact(true)}
>
Contact
</button>

</div>

</nav>

{/* CONTACT MODAL */}

{showContact && (

<div className="modal fade show d-block">

<div className="modal-dialog modal-dialog-centered">

<div className="modal-content shadow">

<div className="modal-header bg-primary text-white">

<h5 className="modal-title">Shop Details</h5>

<button
className="btn-close btn-close-white"
onClick={()=>setShowContact(false)}
></button>

</div>

<div className="modal-body">

<p><b>Shop:</b> Ayyappa Hardware & Electrical</p>
<p><b>Phone:</b> 90325 84446</p>
<p><b>Phone:</b> 89772 22569</p>
<p><b>Address:</b> Near kalla shivalayam main road</p>

</div>

</div>

</div>

</div>

)}

{showContact && <div className="modal-backdrop fade show"></div>}

</div>

)

}

export default ShopHeader