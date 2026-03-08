function Pagination({page,setPage}){

return(

<div style={{marginTop:"20px"}}>

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
>
Previous
</button>

<span style={{margin:"10px"}}>
Page {page}
</span>

<button onClick={()=>setPage(page+1)}>
Next
</button>

</div>

)

}

export default Pagination