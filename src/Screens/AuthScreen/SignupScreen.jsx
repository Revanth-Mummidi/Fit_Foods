import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "./redux/AuthSlice";
import axios from "axios";

function SignupScreen() {
  const [register, setregister] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (register) {
      const loc = location.search.split("next=")[1];
      if (!loc) {
        navigate("/");
      } else navigate(loc);
    }
  }, [register]);

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegistration = async () => {
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL ;
      

      let MAIN_URL = BASE_URL + "users/register/";
      console.log("MAIN URL=",MAIN_URL);

      const data = {
        email: email,
        password: password,
      };
    
     
      const response = await axios.post(MAIN_URL,data,{
        withCredentials:"include",
        headers:{
          "Content-Type":"application/json",
        }
      });

      console.log("RESPONSE=", response);
    } catch (err) {
      console.log("ERROR IN REGISTERING", err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold font-sans text-white ">
        Register
      </h1>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="flex-1 text-white text-lg  placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Email"
        />
        <MdEmail className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="flex-1 text-white text-lg  placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="New Password"
        />
        <RiLockPasswordFill className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="flex-1 text-white text-lg  placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Confirm Password"
        />
        <RiLockPasswordFill className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-between align-baseline my-4 gap-4 ">
        <div>
          <input type="checkbox" className="checked:fill-white"></input>
          <label className="text-white ml-3">Remeber me</label>
        </div>
        <div className="flex flex-row justify-center align-baseline  gap-1">
          <p className="text-white">Already have an account? </p>
          <Link className="text-white" to={`/auth/login${location.search}`}>
            Login
          </Link>
        </div>
      </div>
      <div
        onClick={() => {
          if (password != confirmPassword) {
            setConfirmPassword("");
            setPassword("");
          } else {
            handleRegistration();
            setregister(true);
          }
          console.log("REGISTERED");
        }}
        className="flex flex-row cursor-pointer justify-center bg-white align-baseline my-8 border-2 border-white p-3 rounded-3xl "
      >
        <p className="font-bold">Register</p>
      </div>

      {/* <hr></hr>
      <div className="mt-8 flex-1 flex-row flex gap-2">
        <div onClick={handleSignInWithGoogle} className="flex flex-1 flex-row justify-center align-baseline border border-sm hover:cursor-pointer hover:bg-gray-400 bg-white rounded-2xl p-2">
          <p className="font-bold">Google </p>
          <FcGoogle className="text-lg align-baseline justify-center flex m-1" />
        </div>
        <div className="flex flex-1 flex-row justify-center align-baseline border border-sm hover:cursor-pointer hover:bg-gray-400 bg-white rounded-2xl p-2">
          <p className="font-bold">Facebook </p>
          <SiFacebook className="text-lg align-baseline justify-center flex m-1" />
        </div>
      </div> */}
      {/* <button onClick={()=>{
            setLogin(true);
        }}>login</button> */}
    </div>
  );
}

export default SignupScreen;
