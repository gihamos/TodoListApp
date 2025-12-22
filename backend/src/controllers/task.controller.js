const { task } = require("../services/task.service");

exports.taskController={};

exports.taskController.create=async (req,resp)=>{
 const result=await task.create(req.body);
 return resp.status(result.statusCode).json(result);
};

exports.taskController.checked=async (req,resp)=>{
 const result=await task.checked({id:req.params.id,value:req.params.value,list_id:req.body.id,user_id:req.user.user_id});
 return resp.status(result.statusCode).json(result);
};

exports.taskController.drop=async (req,resp)=>{
 const result=await task.drop({id:req.params.id,list_id:req.body.id,user_id:req.user.user_id});
 return resp.status(result.statusCode).json(result);
};



