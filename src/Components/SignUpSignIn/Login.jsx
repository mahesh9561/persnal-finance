import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createDoc } from "./CreateDoc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLoginWithEmail() {
    setLoading(true);
    if (email.trim() !== "" || password.trim() !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success(`Login Success ${user.email}!`);
          setEmail("");
          setPassword("");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("Please enter both Email and Password!");
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
    <div>
      <div className="flex justify-center items-center max-h-screen">
        <div className="p-4 bg-slate-50 rounded-md shadow-2xl items-center lg:w-1/3 my-4">
          <h2>
            Sign Up on <span>Persnal-Finance</span>
          </h2>

          <form className="max-w-md mx-auto mt-6">
            <div className="relative z-0 w-full mb-5 group text-sm">
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

              <Button
                className={` bg-slate-200 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 hover:text-white`}
                text={loading ? "Loading..." : "Login Using Email And Password"}
                onClick={handleLoginWithEmail}
              />
              <p className=" text-center text-lg m-0">or</p>
              <Button
                className={` bg-blue-400 rounded-md  px-4 py-2 w-full text-center align-middle my-2 font-semibold hover:bg-blue-500 hover:text-white`}
                text={loading ? "Loading..." : "Login Using Google"}
                onClick={googleAuth}
              />
              <p className=" text-center text-sm m-0">
                {" "}
                or I don't Have an account ? <Link to="/">Create Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
