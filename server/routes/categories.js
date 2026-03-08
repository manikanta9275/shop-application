const express = require("express");
const router = express.Router();
const pool = require("../db");

/* GET ALL CATEGORIES */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
});

/* ADD NEW CATEGORY (optional) */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const result = await pool.query(
      "INSERT INTO categories(name) VALUES($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding category:", err.message);
    res.status(500).json({ message: "Server error while adding category" });
  }
});

module.exports = router;