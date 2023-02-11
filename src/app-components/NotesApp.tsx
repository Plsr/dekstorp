import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { EditorState } from 'draft-js'

import { EditorToolbar } from '../components/notes/EditorToolbar'
import { NotesEditor } from '../components/notes/NotesEditor'
import { NotesSidebarItem } from '../components/notes/NotesSidebarItem'

export const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>()

  const handleNewClick = () => {
    console.log('Will create new note')
    const newNote = {
      id: uuid(),
      title: 'No title',
      createdAt: new Date(),
    }
    setNotes([...notes, newNote])

    setCurrentNote(newNote)
  }

  const handleEditorChange = (payload: EditorState) => {
    if (!currentNote) return

    const title =
      payload.getCurrentContent().getPlainText().split('\n')[0] || 'No Title'
    const updatedNote = { ...currentNote, title, content: payload }

    setCurrentNote(updatedNote)
    const notesWithoutCurrent = notes.filter(
      (note) => note.id !== currentNote.id,
    )
    setNotes([...notesWithoutCurrent, updatedNote])
  }

  const handleSidbarItemClick = (id: string) => {
    setCurrentNote(notes.find((note) => note.id === id))
  }

  return (
    <div className="h-full">
      <EditorToolbar onNewClick={handleNewClick} />
      <div className="flex h-full">
        <div className="w-1/4 flex-shrink-0 bg-slate-700">
          {notes.map((note) => (
            <NotesSidebarItem
              title={note.title}
              createdAt={note.createdAt}
              active={note.id === currentNote?.id}
              onClick={() => handleSidbarItemClick(note.id)}
            />
          ))}
        </div>
        <div className="grow bg-slate-50">
          <NotesEditor note={currentNote} onChange={handleEditorChange} />
        </div>
      </div>
    </div>
  )
}

export type Note = {
  id: string
  title: string
  createdAt: Date
  content?: EditorState // TODO: Always init emtpy?
}
