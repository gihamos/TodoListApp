const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
     list_id:{
        type:String,
        required:true,
        description:"Identifiant de la liste de tache auquel cette tache appartient"
        
     },
     label:{
        type:String,
        required:true,
        description:"le nom de la tache"
     },
     done:{
        type:Boolean,
        default:false,
        description:"status de la tache: true si terminé false sinon"
     }
     


},{
    timestamps:true
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;