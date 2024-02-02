import axios from "axios";
import { useEffect, useState } from "react";

export function Balance() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, [balance]);

  return (
    <div className="text-black font-bold mt-10 ml-16 w-60 text-xl leading-9 align-middle">
      Your balance :<span className="text-2xl"> &#8377;{parseFloat(balance / 100).toFixed(2)}</span>
    </div>
  );
}
