import { PencilSquareIcon } from '@heroicons/react/24/outline'

type EditorToolbarProps = {
  onNewClick: () => void
}

export const EditorToolbar = ({ onNewClick }: EditorToolbarProps) => {
  return (
    <div className="p-2 bg-slate-700 border-b-slate-600 border-b text-slate-200">
      <ul>
        <li>
          <button onClick={onNewClick}>
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  )
}
