require("dotenv").config();
const { Pool } = require("pg");

// Create a pool with proper SSL settings
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION,
  ssl: {
    rejectUnauthorized: false // ignore self-signed certs
  },
  // optional timeouts
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log("✅ Connected to Supabase Postgres!");
});

pool.on('error', (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = pool;