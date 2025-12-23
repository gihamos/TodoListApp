const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:false,
        description:"id de l'utlisateur quel la tache est attribué"
    },

     label:{
        type:String,
        required:true,
        description:"le nom de la tache"
     },
     description:{
        type:String,
        required:false,
        description:"le but de la tache"
        
     },
     expireAt:{
        type:Date,
        default:null,
        required:false ,
        description:"date d'expiration"

     },
     closed:{
        type:Boolean,
        default:false,
        required:false,
        description:"permet de determiner si la liste de taches est cloturé, true la liste de tache est cloturé "
     },
     nb_task:{
        type:Number,
        default:0,
        required:false,
        description:"nombre de tache dans la liste"
     },


},{
    timestamps:true
});
const ListTask = mongoose.model('TaskList', listSchema);



module.exports = ListTask;