export function Button({label/* , onClick */}) {
  return (
    <button type="submit" className="w-[100%] mt-6 py-2.5 bg-background rounded text-grey font-bold" /* onClick={onClick} */>{label}</button>
  )
}