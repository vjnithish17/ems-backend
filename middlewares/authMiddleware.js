// const protect = (req, res, next) => {

//     console.log("Middleware Running");

//     next();

// };

// -------------------------------------------------------------------------------------------------------------

// const protect=(req,res,next)=>{
//     let token;
//     if(req.headers.authorization){
//         token=req.headers.authorization.split(" ")[1];
//         console.log(token);

//     }
//     next()
// }

// ------------------------------------------------------------------------------------------------------------------

const jwt=require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization) {

        token = req.headers.authorization.split(" ")[1];
        console.log(token)
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
//                                                             -- decoded atles iruka id edukurom
            console.log(decoded);
            req.user = await User.findById(decoded.id).select("-password");
//                                                             -- find pana ID irunthu password ignore panrom,privacy kaaa
            console.log(req.user);
            next();
        } catch (error) {

             console.log(error)
            return res.status(401).json({
                message: "Token Failed"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No Token"
        });
    }

};

const adminOnly = (req, res, next) => {
//                                                         only admin role mattum allow panum ...
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin Access Only"
        });
    }
     next();
};

const authorizeRole=(...roles)=>{
//                                                     Iruka ella role irunthu routes-la mention paniruka role mattum allow pannum...
     return (req,res,next)=>{
         if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:"Access Denied"
            })
         }
         next();
     }
}


module.exports = { protect , adminOnly,authorizeRole };
