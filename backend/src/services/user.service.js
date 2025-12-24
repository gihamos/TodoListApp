const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password.utils");
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
exports.updateUser = async (value) => {
  try {
    const { first_name, last_name, email, password, adresse, email1 } = value;

    const user = await User.findOne({ email: email1 });

    if (!user) {
      return {
        error: true,
        message: "Adresse mail invalide",
        statusCode: 401,
      };
    }

    const updateData = {};

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;
    if (adresse) updateData.adress = adresse;

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email1 },
      { $set: updateData },
      { new: true }
    );

    return {
      error: false,
      data: {
        id: updatedUser.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        adress: updatedUser.adress, 
        createdAT: updatedUser.createdAt,
      },
      message: "Utilisateur mis à jour avec succès.",
      statusCode: 200,
    };

  } catch (error) {
    return {
      error: true,
      message: error.message,
      statusCode: 400,
    };
  }
};