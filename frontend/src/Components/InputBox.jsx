export function InputBox({label, placeholder, onChange}) {
  return (
    <div className="pt-[20px] ">
          <label className="block">{label}</label>
          <input
            className="w-[100%] mt-[10px] py-2.5 pl-2.5 bg-grey rounded placeholder:text-[14px]"
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            required
          />
        </div>
  )
}