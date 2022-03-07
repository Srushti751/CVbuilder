const jwt = require("jsonwebtoken")

const generateToken = (id,name)=>{
    return jwt.sign({id,name},process.env.JWT_SECRET,{
        expiresIn: "30d"
    });
};

module.exports = generateToken;