const User=require('../model/User');         // MongoDB collection-oda model
const bcrypt = require("bcryptjs");          // import bcrypt
const jwt = require("jsonwebtoken");         // json web token (jwt)

//     ------------------------------------------ REGISTER USER --------------------------------------
const registerUser=async(req,res)=>{
//                                         ----- Destructuring pannrom
    const {name,email,password,role}=req.body;
//                                      -------- Password-a hash pannrom (Security purpose)
    const hashedPassword = await bcrypt.hash(password, 10);

//                                      ----- Database-ku save panna user object create pannrom
    const user=new User({
        name,
        email,
        password:hashedPassword,
        role
    })
//                                    -------- User details MongoDB-la save pannrom
    await user.save();

    res.status(201).json({
        message:"user Registered",
    });

}

// ----------------------------------------------------------   LOGIN USER ---------------------------------------
 const loginUser = async (req, res) => {

     const { email, password } = req.body;

//                                                -------- Email iruka-nu database-la check pannrom
    const user = await User.findOne({email});

             if (!user) {
                return res.status(400).json({
                    message: "User Not Found"
                });
                         }
//                                                -------- User password & database password compare pannrom
    const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid Password"
                });
                          }


//  -------- JWT Token create pannrom -------------------------------------------

    const token = jwt.sign(
        { id: user._id },          // -------- User Object ID payload-la store pannrom
        process.env.JWT_SECRET,    // -------- .env-la iruka Secret Key use pannrom
        { expiresIn: "1d" }        // -------- Token 1 day-ku valid
    );

    res.status(200).json({
          message: "Login Successful",
          token,
         name: user.name,
         role: user.role
    });



 };

module.exports={registerUser,loginUser};
