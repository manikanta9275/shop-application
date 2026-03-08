import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

function ProductGallery({search}){

const [products,setProducts] = useState([])
const [page,setPage] = useState(1)
const [category,setCategory] = useState("")

useEffect(()=>{

api.get(`/products?search=${search}&page=${page}&category=${category}`)
.then(res=>{
 setProducts(res.data)
})

},[search,page,category])

return(

<div className="gallery-container">

<style>{`

.gallery-container{
padding:20px;
background:#f4f6f9;
}

/* CATEGORY BAR */

.category-bar{
display:flex;
gap:30px;
overflow-x:auto;
padding:15px 10px;
background:white;
border-bottom:2px solid #eee;
}

.category-item{
text-align:center;
cursor:pointer;
padding-bottom:6px;
}

.category-item img{
width:45px;
height:45px;
object-fit:contain;
}

.category-item p{
margin:5px 0 0;
font-size:14px;
}

.category-active{
border-bottom:3px solid #0d6efd;
font-weight:bold;
}

/* PRODUCT GRID */

.product-grid{
display:grid;
grid-template-columns:repeat(auto-fill,230px);
gap:40px;
margin-top:25px;
justify-content:flex-start;
}

.pagination-wrapper{
margin-top:30px;
display:flex;
justify-content:center;
}

`}</style>


{/* CATEGORY BAR */}

<div className="category-bar">

<div
className={`category-item ${category==""?"category-active":""}`}
onClick={()=>setCategory("")}
>
<img src="/images/all.png"/>
<p>All</p>
</div>

<div
className={`category-item ${category=="6"?"category-active":""}`}
onClick={()=>setCategory("6")}
>
<img src="/images/fan.png"/>
<p>Fan</p>
</div>

<div
className={`category-item ${category=="7"?"category-active":""}`}
onClick={()=>setCategory("7")}
>
<img src="/images/light.png"/>
<p>Celling Light</p>
</div>

<div
className={`category-item ${category=="2"?"category-active":""}`}
onClick={()=>setCategory("2")}
>
<img src="/images/switch.png"/>
<p>Switch Board</p>
</div>

<div
className={`category-item ${category=="5"?"category-active":""}`}
onClick={()=>setCategory("5")}
>
<img src="/images/pipe.png"/>
<p>Pipes</p>
</div>

<div
className={`category-item ${category=="4"?"category-active":""}`}
onClick={()=>setCategory("4")}
>
<img src="/images/tap.png"/>
<p>Taps</p>
</div>

<div
className={`category-item ${category=="8"?"category-active":""}`}
onClick={()=>setCategory("8")}
>
<img src="/images/drum.png"/>
<p>Water Drum</p>
</div>

<div
className={`category-item ${category=="1"?"category-active":""}`}
onClick={()=>setCategory("1")}
>
<img src="/images/wire.png"/>
<p>Wire</p>
</div>

<div
className={`category-item ${category=="3"?"category-active":""}`}
onClick={()=>setCategory("3")}
>
<img src="/images/light.png"/>
<p>Lights</p>
</div>

</div>
{/* PRODUCTS */}

<div className="product-grid">

{
products.map(p=>(
<ProductCard key={p.id} product={p}/>
))
}

</div>


{/* PAGINATION */}

<div className="pagination-wrapper">
<Pagination page={page} setPage={setPage}/>
</div>

</div>

)

}

export default ProductGallery