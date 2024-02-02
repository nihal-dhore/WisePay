import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";


export function Dashboard() {

  return (
    <div>
      <Appbar userName={"Nihal"} />
      <Balance />
      <Users />
    </div>
  );
}
