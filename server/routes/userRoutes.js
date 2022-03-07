const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer')
const multer = require('multer')
// const {protect} = require('../middleware/authMiddleware.js');
// const { validateEmployee, validateData } = require('../expressvalidator/validateEmployee.js');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images/')
    },
    filename:(req,file,cb)=>{
      cb(null, Date.now()+file.originalname)
    }
  })

 

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });



router.post("/register",async (req, res) => {
    const { fname, lname,email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    console.log("data",req.body.fname)
    if (userExists) {
        res.status(400).json("User Exists");
        throw new Error("User already exists");
    }
    else {
        const newblog = await new userModel({ fname, lname, email, password });

        newblog.save((error) => {
            if (error) {
                res.send("Something went wrong")
            }
            res.send("Your data is saved in database!!!")

        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            console.log(user.email)

            const currentUser = {
                fname: user.fname,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user.Id,
                token: generateToken(user._id,user.name)
            }
            res.send(currentUser)
        }
        // else {
        //     res.json("Login Failed")
        // }
    } catch (error) {
        res.send(error)
    }
})











router.put("/updateProfile",upload.single('profileImage'), (req, res) => {
    var profilePic= req.file.path;
    var profileImg=profilePic?profilePic:null;

    console.log("data", profilePic)
    // const newblog = new userModel(data);

    userModel.updateOne({email:"sud@gmail.com"},
        {
        
            profileImg:profileImg
        })
        .then((data) => {
            console.log(data)
            res.json(data)

        })
        .catch((error) => {
            console.log(error)
        })
})







module.exports = router