
const express = require("express");
const cors = require("cors");

const app = express();

const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

app.use(cors());

app.use(express.json());

app.use("/uploads",express.static("uploads"));

app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes);
app.use("/api/categories",categoryRoutes);

app.get("/",(req,res)=>{
res.send("Server running");
});

app.listen(5000,()=>{
console.log("Server started on port 5000");
});