const { generateJWT, validateJWT } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");
const User = require("../models/user.model");
exports.SignUp = async (data) => {
  try {
    const {first_name,last_name,email, password,adress } = data;

    const isExists = await User.findOne( {email });

    if (isExists) {
      return {
        error: true,
        message: "Un utilisateur existe déjà avec ces informations.",
        statusCode: 400,
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUserData = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      adress,
    };

    const newUser = new User(newUserData);
    await newUser.save();

    return {
      error: false,
      message: "Utilisateur créé avec succès.",
      statusCode: 201,
    };
  } catch (error) {
    return {
      error: true,
      message: "entre "+error.message,
      statusCode: 500,
    };
  }
};

exports.SignIn = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      return {
        error: true,
        message: "adresse mail ou mot de passe invalide",
        statusCode: 401,
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: "adresse mail ou mot de passe invalide",
        statusCode: 401,
      };
    }

    const token = await generateJWT({
      userId: user.id,
      email: user.email,
    });

    return {
      error: false,
      message: "Vous êtes désormais connecté.",
      data: { token },
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.refreshTocken=async(data)=>{
  try{
   
    const decodedToken=validateJWT(data.token);
    const newtoken=generateJWT({userId:decodedToken.userId,email:decodedToken.email});
    return {
      error:false,
      data:newtoken,
      statusCode:200,
    }


    
   
 }catch(error){

    return {
    error:true,
    message:" le token est invalide: "+error,
    statusCode:403
    }
 }
  
}

