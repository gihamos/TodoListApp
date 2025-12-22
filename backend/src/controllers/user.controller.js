exports.getUser=async(req,resp)=>{

  const result=await authService.getUser({email:req.header.email});
 return resp.status(result.statusCode).json(result);
  
}

exports.updateUser=async(req,resp)=>{
  const result=await authService.UpdateUser({...req.body,email1:req.header.email});
   return resp.status(result.statusCode).json(result);
}