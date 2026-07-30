const express=require("express")
const route=express.Router();

const {registerUser,loginUser}=require('../controller/authController');
const {protect,adminOnly,authorizeRole}=require("../middlewares/authMiddleware")

//                                                          ----- REGISTER user path ....
route.post("/register",registerUser);
//                                                          ----- LOGIN user path ...
route.post("/login",loginUser);
//                                                          ----  Logged-in user profile (JWT token verify pannum)
route.get("/profile",protect,(req,res)=>{
    res.json(req.user)
});

//                                                         ----  Fixed middleware (admin mattum access)
// route.get("/admin",protect,adminOnly,(req,res)=>{
//           res.send("welcome Admin")
// });

//                                                          --- Reusable middleware (admin role-ku mattum access)
route.get("/admin",protect,authorizeRole("admin"),(req,res)=>{
          res.send("Admin Dashboard")
});

//                                                         ---- Admin & Manager rendu perukkum access ..
route.get("/manager",protect,authorizeRole("admin", "manager"), (req, res) => {
        res.send("Manager Panel");
    }
);

//                                                          --- User delete panna Admin-ku mattum permission ..
route.delete("/delete-user",protect,authorizeRole("admin"),(req,res)=>{
    res.json({
                 message: "User Deleted By Admin"
    })

});


module.exports=route;
