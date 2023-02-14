import { useRef } from 'react'
import { Note } from '../../app-components/NotesApp'
import { Editor, EditorState } from 'draft-js'

type NotesEditorProps = {
  note?: Note
  onChange: (payload: EditorState) => void
}

export const NotesEditor = ({ note, onChange }: NotesEditorProps) => {
  const editor = useRef<any>(null)

  const focusEditor = () => {
    if (!editor.current) return null
    editor.current.focus()
  }

  if (!note) return <div>No note selected</div>

  const handleChange = (payload: EditorState) => {
    // onChange is triggered even on focus and click in the editor.
    // We don't want to fire an update for that.
    const newContentEditorText = payload.getCurrentContent().getPlainText()
    const contentEditorText = note.content.getCurrentContent().getPlainText()
    if (newContentEditorText === contentEditorText) return

    onChange(payload)
  }

  return (
    <div className="h-full w-full p-2" onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={note.content || EditorState.createEmpty()}
        onChange={handleChange}
      />
    </div>
  )
}
