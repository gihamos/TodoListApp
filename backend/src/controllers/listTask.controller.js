const { id } = require("../dtos/mongoId.dto");
const { listTask } = require("../services/list.service");

exports.listTaskController={};

exports.listTaskController.create=async (req,resp)=>{

    const data={user_id:req.user.userId,...req.body}
    const result=await listTask.create(data);
    return resp.status(result.statusCode).json(result);
 


}

exports.listTaskController.getAllUserTask=async (req,resp)=>{

  const result= await listTask.getAllListTask(req.user.userId);
  return resp.status(result.statusCode).json(result);
}

exports.listTaskController.getAllTaskOfListTask=async (req,resp)=>{

  const result= await listTask.getAllTask({list_id:req.params.id,user_id:req.user.userId});
  return resp.status(result.statusCode).json(result);
}

exports.listTaskController.syncListTask=async (req,resp)=>{

  const result= await listTask.sync(req.params.id);
  return resp.status(result.statusCode).json(result);
}



exports.listTaskController.deleleTask=async (req,resp)=>{
    const data={id:req.params.id,user_id:req.user.userId};
    const result =await listTask.delete(data);
    return resp.status(result.statusCode).json(result);
}

exports.listTaskController.updateTask=async (req,resp)=>{
   console.log("test1");
    const data={id:req.params.id,...req.body,user_id:req.user.userId};
    const result =await listTask.update(data);
    return resp.status(result.statusCode).json(result);
}
exports.listTaskController.closeTask=async (req,resp)=>{
    const data={id:req.params.id,user_id:req.user.userId};
    const result =await listTask.close(data);
    return resp.status(result.statusCode).json(result);
}