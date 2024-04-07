import React,{useContext, useEffect,useRef,useState} from 'react'
import NotesContext from '../context/notes/NotesContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
  
    const context = useContext(NotesContext);
    let navigate = useNavigate();
    const {notes,getNotes,editNote}=context
    const [note,setNote]=useState({id:"",etitle:"",edis:"",etag:""})
    useEffect( ()=>{
      if(localStorage.getItem('token'))
      {
        getNotes()
      }
      else
      {
        navigate("/login")
      }
    },[])
    const updateNote = (currentNote)=>
    {
        ref.current.click()
        setNote({id:currentNote._id, etitle:currentNote.title,edis:currentNote.dis,etag:currentNote.tag})
    }
    const ref=useRef(null)
    const refClose=useRef(null)

    const handleClick = (e) =>
    {
        console.log("Updating the note...",note)
        editNote(note.id,note.etitle,note.edis,note.etag)
        refClose.current.click()
        props.showAlert("Updated successfully","success")
        //AddNote(note.title,note.dis,note.tag);
    }
    const onChange = (e)=>
    {
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
      <>
      <Addnote showAlert={props.showAlert}/>
 
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="dis" className="form-label"> Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="dis" className="form-label">Description</label>
    <input type="text" className="form-control" id="edis" name="edis" value={note.edis} onChange={onChange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required minLength={5}/>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edis.length<5} onClick={handleClick} type="button" class="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="container row my-3">
      <h2>Your Notes</h2>
      {notes.length===0 && "No notes to display"}
      {
        notes.map((note)=>{
          return <NoteItem key = {note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
        })
      }
    </div>
    </>
  )
}

export default Notes
