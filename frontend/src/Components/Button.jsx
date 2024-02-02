export function Button({label, onClick}) {
  return (
    <button className="w-[100%] mt-6 py-2.5 bg-background rounded" onClick={onClick}>{label}</button>
  )
}