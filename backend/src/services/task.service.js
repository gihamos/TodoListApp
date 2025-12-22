const { json } = require("express");
const Task=require("../models/task.model")
const { listTask } = require("./list.service");
const ListTask = require("../models/list.model");

exports.task={};
exports.task.create=async (data)=>{

    try {
         
         const {list_id,label,done}=data;

        const listVerify=await listTask.existListTask(list_id);
        if(!listVerify.exist)
             return listVerify

         const task= await Task.create({...data});

         return {
            error:false,
            message: "une nouvelle tache a été crée",
            data:task,
            statusCode:200,
         }
              
        
        }
      
        
     catch (error) {
        return {
             error:true,
             message: "une erreur lors de la création de la liste de Tache :  "+error,
             statusCode:200,
   
        }
    }
}

exports.task.checked= async (data)=>{
try {

    const {id,list_id,value,user_id}=data;

    const isuserTask= await listTask.isUserList({list_id,user_id});
    const listVerify=await listTask.existListTask(list_id);

    if(value===undefined){
        return{
         error:false,
          message: "parametre value manquant",
         statusCode: 400,
 }
            
    }
     
    if(!listVerify.exist&&!isuserTask)
         return listVerify;

    if((await ListTask.findById(list_id).done))
        return {
          error:false,
          message:" impossible de modifier la tache, la liste de tache a été cloturé",
          statusCode:400
    };
     const task=await Task.findOne({$and:[{_id:id},{list_id:list_id}]});
     if(!task)
          return {
            error:false,
            message:" impossible de modifier la tache, la liste de tache n'appartient pas à l'utlisateur",
             statusCode:400
         };
        const newtask=  await task.updateOne({done:value});
        return {
            error:false,
            message:`tache ${parseInt(value)? "realisé" : "terminée"} `,
            data:newtask,
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

exports.task.drop= async (data)=>{
try {

    const {id,list_id,user_id}=data;

    const isuserTask= await listTask.isUserList({list_id,user_id});
    const listVerify=await listTask.existListTask(list_id);




    if(!listVerify.exist&&!isuserTask)
         return listVerify;

    if((await ListTask.findById(list_id).done))
        return {
          error:false,
          message:" impossible de supprimer la tache, la liste de tache a été ",
          statusCode:400
    };
     const task=await Task.findOne({$and:[{_id:id},{list_id:list_id}]});
     if(!task)
          return {
            error:false,
            message:" impossible de supprimer la tache,  n'appartient pas à l'utlisateur",
             statusCode:400
         };
        const newtask=  await task.deleteOne();
        return {
            error:false,
            message:`tache supprimer`,
            data:newtask,
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





