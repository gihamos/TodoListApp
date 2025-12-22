import { React, useState, useEffect } from 'react';
import "./TaskListComponent.css";
import { apiService } from '../../main';


function TaskListComponent( {listTask_id} ) {
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
    <div className="task-list-component" style={{
      width: '300px',
      height: '500px',
      overflowY: 'auto',
      backdropFilter: 'blur(10px)',
      background: 'rgba(70, 55, 55, 0.4)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }}>
      {loading ? (
      <h2>Chargement...</h2>
                      ) : (
        <h2>{listTask?.label}</h2>
        )}


      <ol>
        {tasks.map(task => (
         <li className={task.done ? "done" : "non_done"} key={task._id}>
             <span className="task_drop_button" title='cliquez pour supprimer' onClick={() => HandlerDropTask(task._id)}>X</span>
              <span className="task-label">{task.label}</span>
                  <input  type="checkbox"
                     onChange={(e) => HandlerChange(e, task._id) }
                     checked={task.done}
                     title={`${task.done ? "décochez pour marquer comme non fait" : "cochez pour marquer comme fait"}`}
                    />
                   </li>
        ))}
        <li><input type="text"  onKeyDown={(e) => {if (e.key === 'Enter') handle_addTask(e);}} placeholder="Ajouter une tâche" /></li>

          </ol>
    </div>
  );
}

export default TaskListComponent;