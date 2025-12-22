import React from 'react'
import HomePage from './homePage'
import NavbarComponent from '../components/navBar/navbarComponent'

function ProfilePage() {
  return (
    <>
        <NavbarComponent id_profile="12345"/>
        <main>
            <h2>Bienvenue sur votre page de profil</h2>
        </main>
    </>
  )
}

export default ProfilePage