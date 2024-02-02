import { useSearchParams } from "react-router-dom";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { useState } from "react";
import axios from "axios";

export function Send() {
  const[amount, setAmount] = useState(0);

  const [params] = useSearchParams();
  const id = params.get("userId");
  const name = params.get("name");

  return (
    <div className="flex justify-center my-[290px] h-[470]">
      <div className="w-[380px] px-[40px] pt-[50px] pb-[35px] rounded-[20px] bg-black text-white">
        <Heading label={"Pay Now"} />
        <div className="flex justify-start items-center mt-6">
          <div className="mr-4 font-bold w-10 h-10 rounded-full bg-white text-center pt-[2px] text-[24px] text-black">
            {name && name.length > 0 ? name[0].toUpperCase() : ""}
          </div>
          <div className="font-bold">{name}</div>
        </div>
        <InputBox label={"Amount in Rs"} placeholder={"Enter Amount"} onChange={(e) => setAmount(e.target.value)} />
        <Button onClick={() => {
          axios.post("http://localhost:3000/api/v1/account/transfer", {
            to : id,
            amount : amount
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken") 
            }
          })
        }} label={"Proceed"} />
      </div>
    </div>
  );
}
