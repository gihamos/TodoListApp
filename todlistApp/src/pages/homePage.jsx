import React from 'react'
import NavbarComponent from '../components/navBar/navbarComponent'
import { apiService } from '../main'
import "./homePage.css"
import Toaskcomponent from '../components/toask/Toaskcomponent';
import CardComponent from '../components/card/CardComponent';
import EditTaskComponent from '../components/task/EditTaskComponent';
import AlertComponent from '../components/alert/AlertComponent';

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
          <h2 className="welcome-message">Bienvenue {userData.first_name}  sur votre liste de tache</h2>
          <Toaskcomponent title="Liste des taches">
           
            {listTask? listTask.map((task) => {
              return (<CardComponent key={task._id} task={task} onEdit={() => setSelectedTask(task)} onClose={(taskId) => console.log("Close task with ID:", taskId)} />);
            }):"Aucune liste de tache trouvée"}
 
          </Toaskcomponent>

          {selectedTask && (
        <AlertComponent>
          <EditTaskComponent
            task={selectedTask}
            onCancel={() => setSelectedTask(null)}
          />
        </AlertComponent>
          )}
      
         </>
        
      
        
      ) }


    </main>


    </>
    
   
    
  )
}

export default HomePage