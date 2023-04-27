import React, { useEffect, useContext, useRef, useState } from 'react'
import noteContext from "../Context/notes/noteContext"
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router'


function Notes(props) {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })
    const ref = useRef(null)
    const refClose = useRef(null)
    const {showAlert} = props
    let history = useNavigate()

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        showAlert("Updated Successflly", "success")
    }

    const onChamge = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        }
        else {
            history("/login")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote showAlert={showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChamge} required minLength={5}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChamge} required minLength={5}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChamge} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button  disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 className='my-2'>Your Notes</h1>
                <div className='container mx-2'>
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
            
        </>
    )
}

export default Notes
