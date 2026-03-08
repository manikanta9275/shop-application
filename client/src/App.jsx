import { useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ProductGallery from "./components/ProductGallery";

function App(){

const [search,setSearch] = useState("");

return(

<div>

<ShopHeader setSearch={setSearch}/>

<ProductGallery search={search}/>

</div>

)

}

export default App