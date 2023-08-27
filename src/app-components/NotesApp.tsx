import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from 'draft-js'

import { EditorToolbar } from '../components/notes/EditorToolbar'
import { NotesEditor } from '../components/notes/NotesEditor'
import { NotesSidebarItem } from '../components/notes/NotesSidebarItem'
import { useHandleClose } from '../hooks/useHandleClose'
import { GenericAppProps } from '../types/genericAppProps'

type NotesAppProps = GenericAppProps

export type Note = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  content: EditorState
  notesApiVersion: number
}

export type StoredNote = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  content: RawDraftContentState
  notesApiVersion: number
}

const NOTES_VERSION = 1

export const NotesApp = ({ shouldClose, onCloseConfirm }: NotesAppProps) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>()

  const saveNotes = () => {
    const preparedNotes = notes.map((note) => {
      const preparedContent = convertToRaw(note.content.getCurrentContent())
      return {
        ...note,
        createdAt: note.createdAt.toString(),
        updatedAt: note.updatedAt.toString(),
        content: preparedContent,
      }
    }) as StoredNote[]

    const stringNotes = JSON.stringify(preparedNotes)
    localStorage.setItem('notes', stringNotes)
  }

  useHandleClose(shouldClose, saveNotes, onCloseConfirm)

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (!storedNotes) return

    const parsedNotes = JSON.parse(storedNotes) as StoredNote[]

    setNotes(
      parsedNotes
        .map((note) => {
          const content = EditorState.createWithContent(
            convertFromRaw(note.content),
          )

          return {
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
            content,
          }
        })
        .sort((a, b) => {
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        }),
    )
  }, [])

  const handleNewClick = () => {
    const newNote = {
      id: uuid(),
      title: 'No title',
      createdAt: new Date(),
      updatedAt: new Date(),
      content: EditorState.createEmpty(),
      notesApiVersion: NOTES_VERSION,
    }

    setNotes([newNote, ...notes])

    setCurrentNote(newNote)
  }

  const handleDeleteClick = () => {
    if (!currentNote) {
      return
    }
    const notesWithoutCurrent = notes.filter(
      (note) => note.id !== currentNote.id,
    )

    setCurrentNote(undefined)
    setNotes([...notesWithoutCurrent])
  }

  const handleEditorChange = (payload: EditorState) => {
    if (!currentNote) return

    const title =
      payload.getCurrentContent().getPlainText().split('\n')[0] || 'No Title'
    const updatedNote = {
      ...currentNote,
      title,
      content: payload,
      updatedAt: new Date(),
    }

    setCurrentNote(updatedNote)
    const notesWithoutCurrent = notes.filter(
      (note) => note.id !== currentNote.id,
    )
    setNotes([updatedNote, ...notesWithoutCurrent])
  }

  const handleSidbarItemClick = (id: string) => {
    setCurrentNote(notes.find((note) => note.id === id))
  }

  return (
    <div className="h-full">
      <EditorToolbar
        onNewClick={handleNewClick}
        onDeleteClick={handleDeleteClick}
      />
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
