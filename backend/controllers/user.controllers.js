import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import {validationResult} from 'express-validator';
import redisClient from '../services/redis.service.js';
export const createUserController=async(req,res)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
            return res.status(400).json({
                  errors:errors.array()
            });
      }
      try{
            const user = await userService.createUser(req.body);
            delete user._doc.password;
            const token=user.generateToken();
            return res.status(201).json({
                  user,token
            });
      }catch(error){
            return res.status(500).json({
                  error:error.message
            });
      }
}

export const loginUserController=async(req,res)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
            return res.status(400).json({
                  errors:errors.array()
            });
      }
      try{
            const {email,password}=req.body;
            const user=await userModel.findOne({email}).select('+password');
            if(!user){
                  return res.status(404).json({
                        errors:'User not found'
                  });
            }
            const isMatch=await user.isValidPassword(password);
            if(!isMatch){
                  return res.status(400).json({
                        errors:'Invalid credentials'
                  });
            }
            const token=await user.generateToken();
            delete user._doc.password;
            return res.status(200).json({user,token});
      }catch(error){
            console.log(error);
            return res.status(500).json({
                  error:error.message
            });
      }
}

export const profileUserController=async(req,res)=>{
      console.log(req.user);
      res.status(200).json({
            user:req.user
      });
}

export const logoutUserController=async(req,res)=>{
      try{
            const token=req.cookies.token || req.header('Authorization').split(' ')[1];
            if(!token){
                  return res.status(401).json({error:'Unauthorized User!'});
            }
            redisClient.set(token,'logout','EX',60*60*24);
            return res.status(200).json({
                  message:'Logged out successfully'
            });
            
      }catch(error){
            return res.status(500).json({
                  error:error.message
            });
      }
}