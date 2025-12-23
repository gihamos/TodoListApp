import React, { useState, useEffect} from "react"
import "./EditTaskComponent.css"
import { apiService } from '../../main';
import { useNavigate } from "react-router-dom";
function EditTaskComponent({ task,onCancel}) {
 const navigate = useNavigate(); 
  const [form, setForm] = useState({
    label: "",
    expireAt: "",
    description: "",
    closed: false
  });

  useEffect(() => {
    if (task) {
      const nextForm = {
        label: task.label || "",
        expireAt: task.expireAt ? task.expireAt.slice(0, 10) : "",
        description: task.description || "",
        closed: !!task.closed
      };
      Promise.resolve().then(() => setForm(nextForm));
    }
  }, [task]);

  if (!task) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedTask = {
      label: form.label,
      expireAt: form.expireAt ? new Date(form.expireAt).toDateString() : null,
      closed: form.closed
    }

      updatedTask.description = form.description||"";
    
    
     apiService.taskList.update(task._id, updatedTask)
      .then((response) => {
        if (!response.error) {
            console.log("Tâche mise à jour avec succès");
             onCancel();
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/home", { replace: true });
      });
      window.location.reload();
     
  }

  return (
    <div className="edit-task-overlay">
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <h3>Modifier la tâche</h3>

        {/* Label */}
        <label>
          Nom de la tâche
          <input
            type="text"
            value={form.label}
            onChange={(e) => setForm(prev => ({ ...prev, label: e.target.value }))}
            required
          />
        </label>
         <label>
          description
            <textarea 
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            />
         </label>
        <label>
          Date d’échéance
          <input
            type="date"
            value={form.expireAt}
            onChange={(e) => setForm(prev => ({ ...prev, expireAt: e.target.value }))}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.closed}
            onChange={(e) => setForm(prev => ({ ...prev, closed: e.target.checked }))}
          />
          Tâche clôturée
        </label>

        <div className="edit-task-actions">
          <button type="button" onClick={onCancel}>
            Annuler
          </button>

          <button type="submit" className="primary">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTaskComponent
