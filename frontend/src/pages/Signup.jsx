import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../Components/Heading";
import { Subheading } from "../Components/Subheading";
import { InputBox } from "../Components/InputBox";
import { Button } from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
// import { useState } from "react";
import { useForm } from "react-hook-form";

export function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm(/* u can provide default values as a object here to show them
                  on frontend */);

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  async function dataHandler(data) {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup" /* {
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      } */,
        data
      );
      //console.log(res.data.msg, firstName, lastName, email, password);
      /* if (res.status === 200) { */
      navigate("/signin");
      localStorage.setItem("authToken", res.data.token);
      /* }  else if (res.status === 411) {
        console.log(res.data);
        console.log(res.data.msg, firstName, lastName, email, password);
      } */
    } catch (error) {
      //console.error(error.response.status);
      if (error.response.status === 403) {
        setError("root", {
          message: "Account already exists",
        });
      } else if (error.response.status === 411) {
        setError("root", {
          message: "Verify Inputs",
        });
      }
    }
  }

  return (
    <div //main
      className="flex justify-center"
    >
      {/* <Navigate to={"/check"} /> */}
      <div //card
        className="my-40 rounded-2xl bg-black text-white w-96 h-auto px-10 py-8"
      >
        <Heading label={"Sign Up"} />
        <Subheading label={"Enter your credentials to Create your account"} />
        <form onSubmit={handleSubmit(dataHandler)}>
          <InputBox
            register={register("firstName", {
              required: "First Name is required",
            })}
            /* onChange={(e) => {
              setFirstName(e.target.value);
            }} */
            label={"First Name"}
            placeholder={"Aditya"}
            errors={errors.firstName}
          />

          <InputBox
            register={register("lastName")}
            /* onChange={(e) => {
              e.target.value.length > 1 ? (
                setLastName(e.target.value)
              ) : (
                <p>value</p>
              );
            }} */
            label={"Last Name"}
            placeholder={"Sharma"}
          />

          <InputBox
            register={register("username", {
              required: "Email is required",
            })}
            /* onChange={(e) => {
              setEmail(e.target.value);
            }} */
            label={"Email"}
            placeholder={"adityasharma@example.com"}
            errors={errors.username}
          />

          <div className="pt-[20px] ">
            <label className="block pl-1">Password</label>
            <input
              className="w-[100%] mt-[10px] py-2.5 pl-2.5 border-solid border-gray-600 border-[2px] bg-black rounded placeholder:text-[14px]"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have 8 characters",
                },
              })}
              /* onChange={(e) => {
                setPassword(e.target.value);
              }} */
              label={"Password"}
            />
          </div>
          {errors.password && (
            <label className="text-red-600 text-sm pl-1 mt-1">
              {errors.password.message}
            </label>
          )}
          <button
            disabled={isSubmitting}
            className="w-[100%] mt-6 py-2.5 bg-background rounded text-grey font-bold hover:bg-gray-400"
          >
            {isSubmitting ? "Loading..." : "Sign up"}
          </button>
          {errors.root && (
            <label className="text-red-600 text-sm pl-1 mt-1">
              {errors.root.message}
            </label>
          )}
        </form>

        <BottomWarning
          label={"Already have an account? "}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
