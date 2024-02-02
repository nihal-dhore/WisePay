import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
import { InputBox } from "../Components/InputBox";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import { useState } from "react";

export function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function dataHandler() {
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username: email,
        password: password,
        firstName : firstName,
        lastName: lastName
      });
    console.log(res.data);
    if (res.status === 200) {
      navigate("/signin");
      localStorage.setItem("authToken", res.data.token);
    } else if (res.status === 411) {
      console.log(res.data);
    }
  }

  
  return (
    <div //main
      className="flex justify-center" 
    >
      <div //card
        className="mt-44 rounded-2xl bg-black text-white w-96 h-[660px] px-10 py-8"
      >
        <Heading label={"Sign Up"} />
        <Subheading label={"Enter your credentials to Create your account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} label={"First Name"} placeholder={"Aditya"} />
        <InputBox onChange={e => {
          e.target.value.length > 1 ? setLastName(e.target.value) : <p>value</p>;
        }} label={"Last Name"} placeholder={"Sharma"} />
        <InputBox onChange={e => {
          setEmail(e.target.value);
        }} label={"Email"} placeholder={"adityasharma@example.com"} />
        <InputBox onChange={e => {
          setPassword(e.target.value);
        }} label={"Password"} />
        <Button onClick={dataHandler} label={"Sign up"} />
        <BottomWarning
          label={"Already have an account? "}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
