export function InputBox({label, placeholder, onChange, register, errors}) {
  return (
    <div className="pt-[20px] ">
          <label className="block pl-1">{label}</label>
          <input
            className="w-[100%] mt-[10px] py-2.5 pl-2.5 border-solid border-slate-300 border-[0.5px] bg-black rounded placeholder:text-[14px]"
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            {...register}
          />
          {errors && <label className="block text-red-600 text-sm pl-1 mt-1">{errors.message}</label> }
        </div>
  )
}