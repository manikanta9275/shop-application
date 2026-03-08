// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   password: "Manikanta@2580",
//   host: "db.hiwqyoeiaieuwfzwmqdu.supabase.co",
//   database: "postgres",
//   port: 5432,
//   ssl: { rejectUnauthorized: false }
// });

// pool.connect()
//   .then(() => {
//     console.log("✅ Connected to Supabase Postgres!");
//     return pool.query("SELECT * FROM categories");
//   })
//   .then(res => {
//     console.log(res.rows);
//     pool.end();
//   })
//   .catch(err => {
//     console.error("❌ Connection error:", err.message);
//   });