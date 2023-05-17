export function SchoolItem({ handle, res: { id, name } }) {
  return (
    <li>
    <button
      type='button'
      onClick={handle}
      data-id={id}
      data-name={name}
    >
      {name}
    </button>
    </li>
  )
}
