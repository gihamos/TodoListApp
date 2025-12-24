import React from 'react'
import NavbarComponent from '../components/navBar/navbarComponent'
import { apiService } from '../main'
import "./homePage.css"
import Toaskcomponent from '../components/toask/Toaskcomponent';
import CardComponent from '../components/card/CardComponent';
import EditTaskComponent from '../components/task/EditTaskComponent';
import TaskListComponent from '../components/TaskList/TaskListComponent';

function HomePage() {
   const [userData, setUserData] = React.useState(null);
   const[listTask,setListTask]=React.useState(null);
   const [selectedTask, setSelectedTask] = React.useState(null);
    const [seeTask, setSeeTask] = React.useState(null);
   const [lastListTask,setLastListTask]=React.useState([]);
   const [runListTask,setRunListTask]=React.useState([]);
   const [closeListTask,setCloseListTask]=React.useState([]);

   
   React.useEffect(() => {
  if (listTask && listTask.length > 0) {
    setSelectedTask(null);
  }
}, [listTask]);



  React.useEffect(() => {
    apiService.user.getUser()
    .then((response) => {   

      if (!response.error) {
        setUserData(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

        apiService.taskList.getAllTaskList().then((response)=>{
           if (!response.error) {
            setListTask(response.data);
            const list= Array.from(response.data)
                .filter((task) => (!task.closed)&&(new Date(task.updatedAt)>=(new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000))))
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 4)
            setLastListTask(
             
             
                  list
             
             );
             setRunListTask(
               Array.from(response.data)
                  .filter((task) => !task.closed)
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .slice(list.length, response.data.length-1)
             );

             setCloseListTask(
                 Array.from(response.data)
                  .filter((task) => task.closed)
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

                );
           }
        }).catch((error)=>{
          console.log(error.message);
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  





  return (
    <>
    <NavbarComponent id_profile={userData ? userData.id : null}/>
    <main>
      { !userData ? (
        <h2 className="welcome-message">Chargement...</h2>
      ) : (
      <>  
          
          <h2 className="welcome-message">Bienvenue ,hereux de vous revoir {userData.first_name} </h2>
           { (listTask!=null&&listTask.length>0 )?(<div className='TaskContainer'>
          <div className="last_task">
          <Toaskcomponent  keys="encours" title="Liste des taches modifiées recement  ">
           
            {lastListTask.length>0 ? (lastListTask.map((task) => {
              return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} onRun={()=> setSeeTask(task)} />);
            })):(<p>Aucune tache recente trouvée</p>)}
 
          </Toaskcomponent>
          </div>

          <div className="task-list-non-completed">
          <Toaskcomponent title="Liste des taches en cours"   keys="enfin">
 
             {runListTask.length>0 ? (runListTask.map((task) => {
            return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} onRun={()=> setSeeTask(task)} />);
              })):(<p>Aucune Tache  tache en cours trouvée</p>)}
          </Toaskcomponent>
          </div>
            
          <div className="task-list-completed">
          <Toaskcomponent title="Liste des taches terminées"   keys="enfin">
 
             {closeListTask.length>0? (closeListTask.map((task) => {
            return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} onRun={()=> setSeeTask(task)} />);
              })):(<p>vous n'avez terminer aucune tache</p>)}
          </Toaskcomponent>
          </div>

          </div>):(<p>
              vous ne possedez pas de tache actuellement, veuillez créér une tache


          </p>)
            }

          {selectedTask && (
          <>
          <EditTaskComponent
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}

          />
          
          </>
           

          )}
           {
           seeTask && (
            <TaskListComponent
            taski={seeTask}
            onCancel={() => setSeeTask(null)}
            />
          
            )}
      
         </>
        
      
        
      ) }


    </main>


    </>
    
   
    
  )
}

export default HomePage