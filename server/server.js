
// const express = require("express");
// const cors = require("cors");

// const app = express();

// const adminRoutes = require("./routes/admin");
// const productRoutes = require("./routes/products");
// const categoryRoutes = require("./routes/categories");

// app.use(cors());

// app.use(express.json());

// app.use("/uploads",express.static("uploads"));

// app.use("/api/admin",adminRoutes);
// app.use("/api/products",productRoutes);
// app.use("/api/categories",categoryRoutes);

// app.get("/",(req,res)=>{
// res.send("Server running");
// });

// app.listen(5000,()=>{
// console.log("Server started on port 5000");
// });

const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const pool = require("./db"); // your db.js

const app = express();

app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api/products", productRoutes);

// ✅ Add test-db route here
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// Default root route
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});