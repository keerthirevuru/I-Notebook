import React,{useContext,useState} from 'react'
import NotesContext from '../context/notes/NotesContext';
import Notes from './Notes';
const Addnote = (props) => {
    const context = useContext(NotesContext);
    const {AddNote}=context
    const [note,setNote]=useState({title:"",dis:"",tag:""})
    const handleClick = (e) =>
    {
        e.preventDefault()
        AddNote(note.title,note.dis,note.tag);
        setNote({title:"",dis:"",tag:""})
        props.showAlert(" successfully","success")
    }
    const onChange = (e)=>
    {
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="dis" className="form-label"> Title</label>
    <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="dis" className="form-label">Description</label>
    <textarea value={note.dis} className="form-control" id="dis" name="dis" onChange={onChange} required minLength={5}></textarea>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} required minLength={5}/>
  </div>
  <button disabled={note.title.length<5 || note.dis.length<5} type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Add Note</button>
</form>
    
      </div>
    </div>
  )
}

export default Addnote
