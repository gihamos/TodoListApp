import React from 'react'
import HomePage from './homePage'
import NavbarComponent from '../components/navBar/navbarComponent'

function ProfilePage() {
  return (
    <>
        <NavbarComponent id_profile={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null}/>
        <main>
            <h2>Bienvenue sur votre page de profil</h2>
        </main>
    </>
  )
}

export default ProfilePage