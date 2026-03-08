// const express = require("express");
// const router = express.Router();
// const pool = require("../db");

// // LOGIN
// router.post("/login", async (req, res) => {

//   const { email, password } = req.body;

//   try {

//     const result = await pool.query(
//       "SELECT * FROM admins WHERE email=$1 AND password=$2",
//       [email, password]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       message: "Login success",
//       admin: result.rows[0]
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }

// });

// module.exports = router;

const express=require("express");
const router=express.Router();
const pool=require("../db");

router.post("/login",async(req,res)=>{

const {email,password}=req.body;

try{

const result=await pool.query(
"SELECT * FROM admins WHERE email=$1 AND password=$2",
[email,password]
);

if(result.rows.length===0){
return res.status(401).json({message:"Invalid"});
}

res.json({message:"Login success"});

}catch(err){
console.log(err);
res.status(500).json({error:"Server error"});
}

});

module.exports=router;