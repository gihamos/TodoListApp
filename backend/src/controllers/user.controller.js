const userService=require("../services/user.service");

exports.getUser=async(req,resp)=>{

  const result=await userService.getUser(req.user);
 return resp.status(result.statusCode).json(result);
  
}

exports.updateUser=async(req,resp)=>{
  const result=await userService.updateUser({...req.body,email1:req.user.email});
   return resp.status(result.statusCode).json(result);
}