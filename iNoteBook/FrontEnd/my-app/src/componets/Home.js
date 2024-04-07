import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext';
import Notes from './Notes';
import Addnote from './Addnote';

function Home(props) {
 const {showAlert}=props
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
