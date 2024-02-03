// import { Navigate } from "react-router-dom";
import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";


export function Dashboard() {

  return (
    <div>
      {/* <Navigate to={"/check"} /> */}
      <Appbar userName={"Nihal"} />
      <Balance />
      <Users />
    </div>
  );
}
