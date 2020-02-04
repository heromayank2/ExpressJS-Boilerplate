const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.get("/police",auth.required,(req,res)=>{
    const {payload:
        {longitude,latitude}
    } = req;
    // google map api calling return location coordinates 
    return res.json({policestations})
})

// 

router.get("/hospital",auth.required,(req,res)=>{
    const {payload:
        {longitude,latitude}
    } = req;
    // google map api calling return location coordinates 
    return res.json({hospitals})
})

// 

router.get("/warrior",auth.required,(req,res)=>{
    const {payload:
        {longitude,latitude}
    } = req;
    // google map api calling return location coordinates 
    return res.json({warriors})
})


