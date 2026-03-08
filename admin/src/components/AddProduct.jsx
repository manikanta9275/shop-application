import { useEffect, useState } from "react";
import axios from "axios";

function AddProduct({ refreshProducts }) {

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [stock,setStock] = useState("");
const [category,setCategory] = useState("");
const [image,setImage] = useState(null);

const [categories,setCategories] = useState([]);

/* LOAD CATEGORIES */

useEffect(()=>{

axios.get("http://localhost:5000/api/categories")
.then(res=>setCategories(res.data));

},[]);


/* ADD PRODUCT */

const submit = async ()=>{

const formData = new FormData();

formData.append("name",name);
formData.append("price",price);
formData.append("stock",stock);
formData.append("category_id",category);
formData.append("image",image);

await axios.post(
"http://localhost:5000/api/products",
formData
);

alert("Product Added Successfully");

setName("");
setPrice("");
setStock("");
setCategory("");
setImage(null);

refreshProducts();

};

return(

<div className="container mt-4">

<div className="card shadow">

<div className="card-header bg-primary text-white">
<h4 className="mb-0">Add Product</h4>
</div>

<div className="card-body">

<div className="row g-3">

{/* PRODUCT NAME */}

<div className="col-md-6">
<label className="form-label">Product Name</label>
<input
type="text"
className="form-control"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Enter product name"
/>
</div>

{/* PRICE */}

<div className="col-md-3">
<label className="form-label">Price</label>
<input
type="number"
className="form-control"
value={price}
onChange={(e)=>setPrice(e.target.value)}
placeholder="Price"
/>
</div>

{/* STOCK */}

<div className="col-md-3">
<label className="form-label">Stock</label>
<input
type="number"
className="form-control"
value={stock}
onChange={(e)=>setStock(e.target.value)}
placeholder="Quantity"
/>
</div>

{/* CATEGORY */}

<div className="col-md-6">
<label className="form-label">Category</label>
<select
className="form-select"
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">Select Category</option>

{categories.map(c=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>
</div>

{/* IMAGE */}

<div className="col-md-6">
<label className="form-label">Product Image</label>
<input
type="file"
className="form-control"
onChange={(e)=>setImage(e.target.files[0])}
/>
</div>

{/* BUTTON */}

<div className="col-12">

<button
className="btn btn-success"
onClick={submit}
>
Add Product
</button>

</div>

</div>

</div>

</div>

</div>

);

}

export default AddProduct;