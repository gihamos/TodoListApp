const User = require("../models/user.model");
exports.existUser= async(_id)=>{
  try {
    const isExists = await User.findOne( {_id});
    const exist=!!isExists
      return {
    error: false, 
    exist:exist ,
    message:`l'utilisateur ${exist? " existe":" n'existe pas"}`,
    statusCode: 400,
  };
  }
  catch (error) {
     return {
   error: true,
    exist:false,
   message: error,
   statusCode: 400,
 };
    
  }
}
exports.getUser= async(data)=>{
   try {
     const user= await User.findOne({email:data.email});
    if (!user) {
      return {
        error: true,
        message: "adresse mail ou id invalide",
        statusCode: 401,
      };
    }

    return {
      error:false,
      data:{
        id:user.id,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        adress:user.adress,
        createdAT:user.createdAt
      },
      statusCode:200
    }
     
   } catch (error) {

    return {
      error:true,
      value:data,
      message:error.message,
      statusCode:400
    }
     
   }
}

exports.UpdateUser= async(data)=>{
   try {
     const {first_name,last_name,email,password,adress,email1} = data;
     const user= await User.findOne({email:email1});
     
    if (!user) {
      return {
        error: true,
        message: "adresse mail ou id invalide",
        statusCode: 401,
      };
    }

    if(password)
       password= await hashPassword(password);
   const data= user.updateOne({first_name:first_name,last_name:last_name,email:email,password:password,adress:adress});


    return {
      error:false,
      data:data,
      statusCode:200
    }
     
   } catch (error) {

    return {
      error:true,
      message:error.message,
      statusCode:400
    }
     
   }
}

