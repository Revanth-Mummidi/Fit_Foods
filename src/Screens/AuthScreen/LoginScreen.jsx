import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "./redux/AuthSlice";
import axios from "axios";

function LoginScreen() {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  useEffect(() => {
    if (login) {
      const loc = location.search.split("next=")[1];
      if (!loc) {
        navigate("/");
      } else navigate(loc);
    }
  }, [login]);
   const handleSignInWithGoogle=async()=>{
    dispatch(signInWithGoogle());
   }
   const handleLogin=async()=>{
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL ;
      

      let MAIN_URL = BASE_URL + "users/login/";
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
      setLogin(true);
    } catch (err) {
      console.log("ERROR IN Login", err);
    }
   }
  return (
    <div  >
      <h1 className="text-center text-4xl font-bold font-sans text-white ">
        Login
      </h1>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="email"
          onChange={(e)=>{
            setEmail(e.target.value);
          }}
          
          className="flex-1 text-white  placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Email"
        />
        <MdEmail className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="password"
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
          className="flex-1 text-white placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Password"
        />
        <RiLockPasswordFill className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-between align-baseline my-8 ">
        <div>
          <input type="checkbox" className="checked:fill-white"></input>
          <label className="text-white ml-3">Remeber me</label>
        </div>
        <p className="text-white ml-20">Forgot Password?</p>
      </div>
      <div
        onClick={() => {
          handleLogin();
          
        }}
        className="flex cursor-pointer flex-row justify-center bg-white align-baseline my-8 border-2 border-white p-3 rounded-3xl "
      >
        <p className="font-bold">Login</p>
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 gap-2">
        <p className="text-white">Don't have an account? </p>
        <Link className="text-white" to={`/auth/signup${location.search}`}>
          Register
        </Link>
      </div>
      {/* <hr></hr>
      <div className="mt-8 flex-1 flex-row flex gap-2">
        <div onClick={handleSignInWithGoogle}className="flex flex-1 flex-row justify-center align-baseline border border-sm hover:cursor-pointer hover:bg-gray-400 bg-white rounded-2xl p-2">
          <p className="font-bold">Google </p>
          <FcGoogle className="text-lg align-baseline justify-center flex m-1" />
        </div>
        <div className="flex flex-1 flex-row justify-center align-baseline hover:cursor-pointer hover:bg-gray-400 border border-sm bg-white rounded-2xl p-2">
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

export default LoginScreen;
