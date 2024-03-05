const User=require('../models/userModels');
const bcrypt=require('bcrypt');


module.exports.register = async(req, res, next) => {
  try{
    const {username,email,password}=req.body;
    const usernameCheck=await User.findOne({username});
 if(usernameCheck)
 return res.json({msg:"username already used",status:false});
 const emailCheck=await User.findOne({email});
 if(emailCheck)
 return res.json({msg:"email already used",status:false});
 const hashedPassword=await bcrypt.hash(password,10);
 const user=await User.create({
     email,username,password:hashedPassword,
 
 });
 delete user.password;
 return res.json({status:true,user});
  }
  catch(ex){
next(ex);
  }

};



module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username }).lean(); // Using lean() for performance, since we don't need a full Mongoose model instance here
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    // Remove the password from the user object before returning it
    // Since we used lean(), we can delete the password directly without issues
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    // Pass the error to the next middleware (error handler)
    next(ex);
  }
};
