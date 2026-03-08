function ProductCard({product}){

return(

<div className="card h-100 shadow-sm">

<img
src={`http://localhost:5000/uploads/${product.image}`}
className="card-img-top"
style={{height:"180px",objectFit:"cover"}}
/>

<div className="card-body d-flex flex-column ">

<h5 className="card-title">
{product.name}
</h5>

<p className="text-muted mb-1">
Category: {product.category}
</p>

<h4 className="text-primary mb-2">
₹ {product.price}
</h4>

{product.is_available ? (
<span className="badge bg-success p-2">
Available
</span>
) : (
<span className="badge bg-danger p-2">
Out of Stock
</span>
)}

</div>

</div>

)

}

export default ProductCard