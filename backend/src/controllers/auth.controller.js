const authService = require("../services/auth.service");

exports.SignUp = async (req, res) => {

  const result = await authService.SignUp({...req.body});
  return res.status(result.statusCode).json(result);
};

exports.SignIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.SignIn({ email, password });
  return res.status(result.statusCode).json(result);
};

exports.refreshtoken=async (req,resp)=>{
    const result=await authService.refreshTocken(req.body);
    return resp.status(result.statusCode).json(result);
}

exports.getUser=async(req,resp)=>{

  const result=await authService.getUser(req.header.email);
 return resp.status(result.statusCode).json(result);
  
}