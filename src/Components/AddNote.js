import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from "../Context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const {showAlert} = props

    const handleAdd = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        showAlert("Added Successflly", "success")
    }

    const onChamge = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>

            <form>
                <div className="my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} id="title" name='title' onChange={onChamge} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onChamge} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChamge} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
