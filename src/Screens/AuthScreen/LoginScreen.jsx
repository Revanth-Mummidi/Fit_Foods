import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "./redux/AuthSlice";

function LoginScreen() {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const dispatch=useDispatch();
  const navigate = useNavigate();
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
  return (
    <div>
      <h1 className="text-center text-4xl font-bold font-sans text-white ">
        Login
      </h1>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="email"
          className="flex-1 placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Email"
        />
        <MdEmail className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 border-2 border-white p-3 rounded-3xl gap-2">
        <input
          type="password"
          className="flex-1 placeholder-white placeholder:text-lg  bg-transparent focus:outline-none"
          placeholder="Password"
        />
        <RiLockPasswordFill className="text-white align-baseline flex justify-end  text-3xl" />
      </div>
      <div className="flex flex-row justify-between align-baseline my-4 ">
        <div>
          <input type="checkbox" className="checked:fill-white"></input>
          <label className="text-white ml-3">Remeber me</label>
        </div>
        <p className="text-white ml-20">Forgot Password?</p>
      </div>
      <div
        onClick={() => {
          setLogin(true);
        }}
        className="flex flex-row justify-center bg-white align-baseline my-8 border-2 border-white p-3 rounded-3xl "
      >
        <p className="font-bold">Login</p>
      </div>
      <div className="flex flex-row justify-center align-baseline my-8 gap-2">
        <p className="text-white">Don't have an account? </p>
        <Link className="text-white" to={`/auth/signup${location.search}`}>
          Register
        </Link>
      </div>
      <hr></hr>
      <div className="my-8 flex-1 flex-row flex gap-2">
        <div onClick={handleSignInWithGoogle}className="flex flex-1 flex-row justify-center align-baseline border border-sm hover:cursor-pointer hover:bg-gray-400 bg-white rounded-2xl p-2">
          <p className="font-bold">Google </p>
          <FcGoogle className="text-lg align-baseline justify-center flex m-1" />
        </div>
        <div className="flex flex-1 flex-row justify-center align-baseline hover:cursor-pointer hover:bg-gray-400 border border-sm bg-white rounded-2xl p-2">
          <p className="font-bold">Facebook </p>
          <SiFacebook className="text-lg align-baseline justify-center flex m-1" />
        </div>
      </div>
      {/* <button onClick={()=>{
            setLogin(true);
        }}>login</button> */}
    </div>
  );
}

export default LoginScreen;
