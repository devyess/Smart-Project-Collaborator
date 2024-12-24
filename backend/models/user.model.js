import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
      email:{
            unique:true,
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            minLength:[6,'Email must be at least 6 characters long'],
            maxLength:[50,'Email must be at most 64 characters long']
      },
      password:{
            type:String,
            select:false,
      },
});

userSchema.statics.hashPassword = async function(password){
      return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
      return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
      return jwt.sign(
            {email: this.email}, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
      );
}

const User=mongoose.model('user',userSchema);
export default User;