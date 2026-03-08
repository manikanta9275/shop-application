const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* GET PRODUCTS WITH SEARCH + CATEGORY + PAGINATION */
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, category = "" } = req.query;
    const limit = 42;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.name ILIKE $1
    `;
    let values = [`%${search}%`];

    if (category) {
      query += ` AND p.category_id = $2`;
      values.push(category);
    }

    query += ` ORDER BY p.id DESC LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ADD PRODUCT */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const is_available = req.body.is_available ?? true;

    const result = await pool.query(
      `INSERT INTO products(name, price, stock, category_id, image, is_available)
       VALUES($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [name, price, stock, category_id, image, is_available]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* DELETE PRODUCT */
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* UPDATE PRODUCT */
router.put("/:id", async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;
    const result = await pool.query(
      `UPDATE products
       SET name=$1, price=$2, stock=$3, category_id=$4
       WHERE id=$5
       RETURNING *`,
      [name, price, stock, category_id, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* TOGGLE AVAILABILITY */
router.patch("/:id/toggle-availability", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT is_available FROM products WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const current = result.rows[0].is_available;
    const updated = !current;

    const updateResult = await pool.query(
      "UPDATE products SET is_available=$1 WHERE id=$2 RETURNING *",
      [updated, req.params.id]
    );

    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;