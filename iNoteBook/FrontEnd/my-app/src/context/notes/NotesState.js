import React from 'react'
import { useState } from 'react'
import NotesContext from './NotesContext'

const NotesState = (props)=>
{
    const host = "http://localhost:3002"
    const notesInitial=[
        
      ]
      const [notes,setNotes]=useState(notesInitial)

         //get all  notes

         const getNotes=async()=>
         {
             //todo api call
              //api call
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                 method: "GET", // *GET, POST, PUT, DELETE, etc.
                 headers: {
                   "Content-Type": "application/json",
                   "auth-token": localStorage.getItem('token')
                   // 'Content-Type': 'application/x-www-form-urlencoded',
                 },
                  // body data type must match "Content-Type" header
               });
              // const json=response.json(); // parses JSON response into native JavaScript objects
               const json = await response.json()
               console.log(json)
               setNotes(json)
         }
 



        //Add a note

        const AddNote=async(title,dis,tag)=>
        {
            //todo api call
             //api call
             const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({title,dis,tag}), // body data type must match "Content-Type" header
              });
              const note= await response.json(); // parses JSON response into native JavaScript objects

            
            console.log("adding a new note")
            setNotes(notes.concat(note))
        }

        //Delete a note

        const deleteNote=async (id)=>
        {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // body data type must match "Content-Type" header
              });
              const json=response.json();
              console.log(json)

            console.log("deleting the node with id"+id)
            const newNotes=notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
        }

        //edit a note

        const editNote=async (id,title,dis,tag)=>
        {
            //api call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({title,dis,tag}), // body data type must match "Content-Type" header
              });
             // const json=response.json(); // parses JSON response into native JavaScript objects
            
             let newNotes=JSON.parse(JSON.stringify(notes))
            //logic to edit note
            for(let index=0;index<newNotes.length;index++)
            {
                const element = newNotes[index]
                if(element._id===id)
                {
                    newNotes[index].title=title;
                    newNotes[index].dis=dis;
                    newNotes[index].tag=tag;
                    break;
                }
               
            }
            setNotes(newNotes)
        }

    return (
        <NotesContext.Provider value={{notes,AddNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NotesContext.Provider>
    )
    } 
export default NotesState