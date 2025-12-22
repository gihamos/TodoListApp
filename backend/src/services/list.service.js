const ListTask=require("../models/list.model");
const Task = require("../models/task.model");
const User=require("../models/user.model");
const { existUser } = require("./auth.service");

exports.listTask={};


exports.listTask.create=async (data)=>{

    try {

        const {label,user_id,description,expireAt}=data;
        if(!User.findById(user_id)){
            return {
                error: false, 
                message:"cet utilisateur n'existe pas",
                statusCode: 400,

            }
        }
         const task= await ListTask.create({...data});

         return {
            error:false,
            message: "une nouvelle tache a été crée",
            data:task.toJSON(),
            statusCode:201,
         }
              
        
        }
      
        
     catch (error) {
        return {
             error:true,
             message: "une erreur lors de la création de la liste de Tache : "+error,
             statusCode:400,
   
        }
    }
}

exports.listTask.existListTask= async(_id)=>{
  try {
    const isExists = await ListTask.findOne( {_id});
    const exist=!!isExists
      return {
    error: false, 
    exist:exist ,
    message:"la liste de tache "+exist?" existe":" n'existe pas",
    statusCode: 200,
  };
  }
  catch (error) {
     return {
   error: true,
   message: ""+error,
   statusCode: 400,
    exist:false
 };
    
  }
}

exports.listTask.getAllListTask=async(user_id)=>{
try {

    const userVerify=await existUser(user_id);
    if(!userVerify.error&&userVerify.exist ){
        const list=  await ListTask.find({user_id:user_id})
        return {
            error:false,
            data:list,
            statusCode: 200,
        }
             

    }else

        return userVerify
    
} catch (error) {
     return {
     error:true,
     message:"erreur lors de la recupération de la liste de taches :"+error,
     statusCode: 400,
 }
}

}

exports.listTask.delete=async(data)=>{
try {
     const {id, user_id}=data
    const list= await ListTask.findOne({$and:[{user_id:user_id},{_id:id}]});
    if(!list)
        return {
        error:false,
        message:"aucune liste de tache de l'utilisateur associé à cette identifiant a été trouvée ",
        statusCode: 400,
    };

    await Task.deleteMany({list_id:list.id});
    await list.deleteOne();
    return {
         error:false,
         message:`la liste de tache id: ${id} a bien été supprimée`,
         statusCode: 200,
    }

} catch (error) {
    return {
        error:true,
        message:"erreur lors de la suppression de la liste de taches :"+error,
        statusCode: 400,
    }
}

};

exports.listTask.getAllTask= async (data)=>{
try {

    const {list_id,user_id}=data;

    const isuserTask= await this.listTask.isUserList({list_id,user_id});
    const listVerify=await this.listTask.existListTask(list_id);

    if(!listVerify.exist&&!isuserTask)
         return listVerify;
        const list= await Task.find({list_id:list_id})
        return {
            error:false,
            data:list,
            statusCode: 200,
        }
             
       
    
} catch (error) {
     return {
     error:true,
     message:"erreur lors de la recupération des taches :"+error,
     statusCode: 400,
 }
}

}


exports.listTask.update=async(data)=>{
try {
     const {id, label,description,expireAt,user_id}=data
    const list= await ListTask.findOne({$and:[{user_id:user_id},{_id:id}]});
    if(!list)
        return {
        error:false,
        message:"aucune liste de tache de l'utilisateur associé à cette identifiant a été trouvée ",
        statusCode: 400,
    };

   const newlist= await list.updateOne({label:label,description:description,expireAt:expireAt})
    return {
         error:false,
         message:`la liste de tache (id: ${id}) a bien été modifie`,
         data:newlist,
         statusCode: 200,
    }

} catch (error) {
    return {
        error:true,
        message:"erreur lors de la suppression de la liste de taches :"+error,
        statusCode: 400,
    }
}



}

exports.listTask.close=async(data)=>{
try {
     const {id, user_id}=data
    const list= await ListTask.findOne({$and:[{user_id:user_id},{_id:id}]});
    if(!list)
        return {
        error:false,
        message:"aucune liste de tache de l'utilisateur associé à cette identifiant a été trouvée",
        statusCode: 400,
    };

   const newlist= await list.updateOne({closed:true});
    return {
         error:false,
         message:`la liste de tache (id: ${id}) a bien été cloturée`,
         data:newlist,
         statusCode: 200,
    }

} catch (error) {
    return {
        error:true,
        message:"erreur lors de la cloture de la liste de taches :"+error,
        statusCode: 400,
    }
}



}

exports.listTask.isUserList=async({list_id,user_id})=>{
    try {
        const istrue= await ListTask.findOne({$and:[{user_id:user_id},{_id:list_id}]});
        return !!istrue;

    } catch (error) {

        return false;
        
    }
}
exports.listTask.sync= async(_id)=>{
  try {
    const list = await ListTask.findOne( {_id});
    if(!list)
      return {
    error: false, 
    message:"la liste de tache  n'existe pas",
    statusCode: 400,
  };
  if(list.expireAt &&(new Date(list.expireAt).getTime>=Date.now())){

       await this.listTask.close({id:list.id,user_id:list.user_id});

  }

    const tasks= await this.listTask.getAllTask({id:list.id,user_id:list.user_id})
    if(tasks.data.lenth>0){
      if((Array.from(tasks.data).filter((e)=>e.done).length==Array.from(tasks.data).length))
        await this.listTask.close({id:list.id,user_id:list.user_id});
       }
    
     return {
        error : false,
        message : " synchronisation effectué , mise à jour effectué",
        date:Date.now(),
       statusCode:200
     }

  }
  catch (error) {
     return {
    error: true,
    message:  error.message,
    statusCode: 400,
 };
}
}




