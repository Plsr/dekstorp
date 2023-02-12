import { clsx } from 'clsx'

type NotesSidebarItemProps = {
  title: string
  createdAt: Date
  onClick: () => void
  active: boolean
}

export const NotesSidebarItem = ({
  title,
  createdAt,
  onClick,
  active,
}: NotesSidebarItemProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col p-2 ',
        active && 'bg-slate-500 text-slate-100',
        !active && 'text-slate-400',
      )}
      onClick={onClick}>
      <span>{title}</span>
      <span
        className={clsx('text-xs text-slate-500', active && 'text-slate-300')}>
        {createdAt.toLocaleDateString('en-US')} -{' '}
        {createdAt.toLocaleTimeString('en-US', { timeStyle: 'short' })}
      </span>
    </div>
  )
}
