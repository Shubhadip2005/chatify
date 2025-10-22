import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const{fullname, email, password} = req.body;

  try{
    if(!fullname || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    //check if emails valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email format"});
    }

    const user = await User.findOne({email: email});
    if(user) return res.status(400).json({message: "Email already registered"});

    // 123456 => $bnxkfbdjzfk_?hfbngj
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullname,
        email,
        password: hashedPassword
    });

    if(newUser) {
        //before CR:
        // generateToken(newUser._id, res);
        // await newUser.save();

        //after CR:
        //Persist user first, then issue auth cookie
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

        // todo: send a welcome email to user
    } else {
        res.status(400).json({message: "Invalid user data"});
    }
  }catch(error){
    console.log("Error in signup:", error);
    res.status(500).json({message: "Internal Server error"});
  }
};
