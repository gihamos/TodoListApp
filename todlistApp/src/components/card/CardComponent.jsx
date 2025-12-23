import React from "react"
import "./CardComponent.css"
import { apiService } from '../../main';
import { useNavigate } from "react-router-dom";

function CardComponent({ task, onEdit }) {
  const navigate = useNavigate();
  if (!task) return null;

const handleClose = (taskId, closed) => {
  apiService.taskList.update(taskId, { closed: !closed })            
  .then((response)=>{
    if(!response.error){
      console.log("Tâche mise à jour avec succès");
      window.location.reload();
      navigate("/home", { replace: true });
    }
  })
  .catch((error)=>{
    console.log("Erreur lors de la mise à jour de la tâche :", error);
    window.location.reload();
      navigate("/home", { replace: true });
  });
}

const handleDelete=(taskId)=>{
  apiService.taskList.delete(taskId)
  .then((response)=>{
    if(!response.error){
        
      console.log("Tâche supprimée avec succès");
      window.location.reload();
      navigate("/home", { replace: true });
      
    }
  })
  .catch((error)=>{
    console.log("Erreur lors de la suppression de la tâche :", error);
    window.location.reload();
      navigate("/home", { replace: true });
  });
  
}
  const isExpired =
    task.expireAt && new Date(task.expireAt) < new Date() && !task.closed

  return (
    <div className={`task-card ${task.closed ? "closed" : ""}`}>
      
      {/* Header */}
      <div className="task-card-header">
        <h3 className="task-title">{task.label}</h3>

        <span
          className={`task-status ${
            task.closed ? "closed" : isExpired ? "expired" : "active"
          }`}
        >
          {task.closed ? "Clôturée" : isExpired ? "Expirée" : "Active"}
        </span>
      </div>

      
      <p className="task-description">
        {task.description || "Aucune description"}
      </p>

      <div className="task-info">
        <span>Créée : {new Date(task.createdAt).toLocaleDateString()}</span>

        {task.expireAt && (
          <span>
            Échéance :{""}
            {new Date(task.expireAt).toLocaleDateString()}
          </span>
        )}

        <span> Nombre de tâches : {task.nb_task}</span>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit?.(task)}
          disabled={task.closed}
          hidden={task.closed}
        >
          Modifier
        </button>

        <button
          className="btn btn-close"
          onClick={() => handleClose(task._id, task.closed)}     
          
        >
          {task.closed ? "Rouvrir" : "Clôturer"}
        </button>
         <button
           className="btn btn-close"
          onClick={() => handleDelete(task._id)}
          >
            supprimer
             </button>
      </div>
    </div>
  )
}


export default CardComponent
