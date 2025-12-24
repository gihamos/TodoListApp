import { React, useState, useEffect } from 'react';
import "./TaskListComponent.css";
import { apiService } from '../../main';


function TaskListComponent( {taski,onCancel} ) {
  const listTask_id=taski?._id;
  const [tasks, setTasks] = useState([]);
  const [listTask, setListTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);



const handle_refresh_data_list=(param_listTask_id)=>{
  if(!param_listTask_id)
     return;

    apiService.taskList
    .getAllTaskOfListTask(param_listTask_id)
     .then((response)=>{
     if(response.error){
      setError(response.message);
     }
     else{
      setTasks(response.data);
      setError("");
     }
     })
     .catch((error)=>{
      setError(error.message);
     })
  };



const handle_addTask=(e)=>{
  const taskLabel=e.target.value;
  e.target.value="";
  apiService.task.create({
    list_id:listTask_id,
    label:taskLabel
  })
  .then((response)=>{
    if(response.error)
      setError(response.message);
      handle_refresh_data_list(listTask_id);
  })
  .catch((error)=>{
    setError(error.message);
  });
}


  const HandlerChange =  (e, taskId) => {
  const value = e.target.checked;
    apiService.task.checked({
      id: taskId,
      value,
      list_id: listTask_id
    })
    .then((response)=>{
       if(response.error)
        setError(response.message); 
        handle_refresh_data_list(listTask_id);    
 
    })
    .catch((error)=>{
        setError(error.message);
      });
  }

   const HandlerDropTask =  (taskId) => {
   apiService.task.drop({
     id: taskId,
     list_id: listTask_id
   })
   .then((response)=>{
      if(response.error)
       setError(response.message); 
       handle_refresh_data_list(listTask_id);    
 
   })
   .catch((error)=>{
       setError(error.message);
     });
 }



  useEffect(() => {
    if (!listTask_id) return; 

    const fetchTasks = async () => {
      try {
         setLoading(true);
        const tasksRes = await apiService.taskList.getAllTaskOfListTask(listTask_id);
        setTasks(tasksRes.data);

        const listsRes = await apiService.taskList.getAllTaskList();
        const taskList = Array.from(listsRes.data).find(item => item._id === listTask_id);
        setListTask(taskList);
      } catch (err) {
        setError(err.response?.data?.message || err.message);


      }
       finally{
        setLoading(false);
       }
    };

    fetchTasks();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }
return (
  <div className="task-overlay">
    <div className="task-card">
      {loading ? (
        <h2>Chargement...</h2>
      ) : (
        <h2>{listTask?.label}</h2>
      )}

      <ol>
        {tasks.map(task => (
          <li className={task.done ? "done" : ""} key={task._id}>
            <span
              className="task_drop_button"
              title="Supprimer"
              onClick={() => HandlerDropTask(task._id)}
            >
              ✕
            </span>

            <span className="task-label">{task.label}</span>

            <input
              type="checkbox"
               disabled={taski?.closed}
              checked={task.done}
              onChange={(e) => HandlerChange(e, task._id)}
            />
          </li>
        ))}

        <li>
          <input
            type="text"
            placeholder="Ajouter une tâche"
            disabled={taski?.closed}
            onKeyDown={(e) => {
              if (e.key === "Enter") handle_addTask(e);

            }}
          />
        </li>
      </ol>

      <button className="closebt" onClick={onCancel}>
        Fermer
      </button>
    </div>
  </div>
);
}
export default  TaskListComponent;