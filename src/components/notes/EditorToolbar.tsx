import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

type EditorToolbarProps = {
  onNewClick: () => void
  onDeleteClick: () => void
}

export const EditorToolbar = ({
  onNewClick,
  onDeleteClick,
}: EditorToolbarProps) => {
  return (
    <div className="p-2 bg-slate-700 border-b-slate-600 border-b text-slate-200">
      <ul className="flex gap-4">
        <li>
          <button onClick={onNewClick}>
            <PencilSquareIcon className="w-4 h-4" />
          </button>
        </li>
        <li>
          <button onClick={onDeleteClick}>
            <TrashIcon className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div>
  )
}
