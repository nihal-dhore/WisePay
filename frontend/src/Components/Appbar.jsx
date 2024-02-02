import { useEffect, useState } from "react";

export function Appbar() {

  const [firstname, setFirstName] = useState("");
  
  useEffect(() => {
    setFirstName(localStorage.getItem("firstname"));
  }, [firstname]);

  return (
    <div className="flex flex-row justify-end py-[10px] items-center shadow shadow-white text-white bg-black">
      <div className="mr-[700px] font-bold text-3xl items-center">WisePay</div>
      <div className="flex justify-end mr-16 text-md items-center">
        <label className="mr-4">Hello, {firstname}</label>
        <div className="rounded-[20px] bg-background w-[40px] h-[40px] text-center py-[5px] text-black text-xl">
          {firstname && firstname.length > 0 ? firstname[0].toUpperCase() : ""}
        </div>
      </div>
    </div>
  );
}
