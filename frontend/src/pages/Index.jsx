import { Navigate } from "react-router-dom";
import { useUser } from "./useUser"

export const Index = () => {
  const user = useUser();
  if(user.loading) {
    return "Loading...";
  }
  if(!user.userDetails) {
    return <Navigate to={"/signin"} />
  }

  return (
    <Navigate to={"/dashboard"} />
  )
}