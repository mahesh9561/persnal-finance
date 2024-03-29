import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createDoc } from "./CreateDoc";

function SignupSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSigninWithEmail() {
    setLoading(true);
    // Authentication with Firebase using email and password.
    if ((name !== "", email !== "", password !== "", confirmPass !== "")) {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User..", user);
            toast.success("Account created for" + user.name);
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            createDoc(user, name);
            navigate("/login");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Error: ${errorMessage}`);
            setLoading(false);
          });
      } else {
        toast.error("Password and ConfirmPassword not match");
      }
    } else {
      toast.error("All fields are required!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("GoogleAuth", user);
        toast.success(user.email + " Signed in");
        createDoc(user, user.displayName || user.email);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="p-4 bg-slate-50 rounded-md shadow-2xl items-center lg:w-1/3 my-4">
        <h2>
          Sign Up on <span>Personal-Finance</span>
        </h2>

        <form className="max-w-md mx-auto mt-6">
          <div className="relative z-0 w-full mb-5 group text-sm">
            <div className="mb-4">
              <Input
                type={"text"}
                label="Full Name"
                state={name}
                setState={setName}
                placeholder="Enter your Name"
                className=" py-2 border-spacing-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 text-black dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 "
                required
              />
            </div>

            <div className="mb-4">
              <Input
                type={"email"}
                label="Email ID"
                state={email}
                setState={setEmail}
                placeholder="Enter your Email"
                className=" py-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 text-black dark:focus:border-blue-500 focus:outline-none focus:border-blue-600  "
                required
              />
            </div>

            <div className="mb-4">
              <Input
                type={"password"}
                label="Password"
                state={password}
                setState={setPassword}
                placeholder="Enter your Password"
                className=" py-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 text-black dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 "
                required
              />
            </div>

            <div className="mb-4">
              <Input
                type={"password"}
                label="Confirm Password"
                state={confirmPass}
                setState={setConfirmPass}
                placeholder="Enter your confirmPassword"
                className=" py-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 text-black dark:focus:border-blue-500 focus:outline-none focus:border-blue-600 "
                required
              />
            </div>

            <Button
              className={` bg-slate-200 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 hover:text-white`}
              text={loading ? "Loading..." : "SignUp Using Email And Password"}
              onClick={handleSigninWithEmail}
            />
            <p className=" text-center text-lg m-0">or</p>
            <Button
              className={` bg-blue-400 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 hover:text-white`}
              text={loading ? "Loading..." : "SignUp Using Google"}
              onClick={googleAuth}
            />
            <p className=" text-center text-sm m-0">
              {" "}
              or Have an account Already ? <Link to={"/login"}>Login Now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupSignIn;
