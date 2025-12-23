import React from 'react'
import NavbarComponent from '../components/navBar/navbarComponent'
import { apiService } from '../main'
import "./homePage.css"
import Toaskcomponent from '../components/toask/Toaskcomponent';
import CardComponent from '../components/card/CardComponent';
import EditTaskComponent from '../components/task/EditTaskComponent';

function HomePage() {
   const [userData, setUserData] = React.useState(null);
   const[listTask,setListTask]=React.useState(null);
   const [selectedTask, setSelectedTask] = React.useState(null);
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
         <div className='TaskContainer'>
          <div className="last_task">
          <Toaskcomponent  keys="encours" title="Liste des taches modifiées recement  ">
           
            {listTask? (Array.from(listTask)
            .filter((task) => !task.closed)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 4)
            .map((task) => {
              return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} />);
            })):(<p>Aucune liste de tache trouvée</p>)}
 
          </Toaskcomponent>
          </div>

          <div className="task-list-non-completed">
          <Toaskcomponent title="Liste des taches en cours"   keys="enfin">
 
             {listTask? (Array.from(listTask)
            .filter((task) => !task.closed)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(4, listTask.length-1)
            .map((task) => {
            return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} />);
              })):(<p>Aucune liste de tache trouvée</p>)}
          </Toaskcomponent>
          </div>
            
          <div className="task-list-completed">
          <Toaskcomponent title="Liste des taches terminées"   keys="enfin">
 
             {listTask? (Array.from(listTask)
            .filter((task) => task.closed)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((task) => {
            return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} />);
              })):(<p>Aucune liste de tache trouvée</p>)}
          </Toaskcomponent>
          </div>

          </div>

          {selectedTask && (
    
          <EditTaskComponent
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}
          />
          )}
          
      
         </>
        
      
        
      ) }


    </main>


    </>
    
   
    
  )
}

export default HomePage