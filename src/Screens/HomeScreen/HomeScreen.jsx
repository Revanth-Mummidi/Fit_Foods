import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Hero from "./Components/Hero";
import HeadlineCards from "./Components/HeadlineCards";
import SuggestedFood from "./Components/SuggestedFood";
import Category from "./Components/Category";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserSignInState } from "../AuthScreen/redux/AuthSlice";
import { useNavigate, useNavigation } from "react-router-dom";
function HomeScreen() {
  // const [isLoading, setLoading] = useState(true);
  const Auth = useSelector((state) => state.authslice);
  useEffect(() => {
    handleGetProfile();
  }, []);
  const navigation = useNavigate();
  const handleGetProfile = async () => {
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.get(MAIN_URL,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });

      console.log("RESPONSE=", response);

      dispatch(
        setUserSignInState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        })
      );
    } catch (err) {
      
      console.log("ERROR IN GETTING PROFILE", err);
      dispatch(
        setUserSignInState({
          user: null,
          isAuthenticated: false,
          isLoading: true,
        })
      );
      navigation('/auth/signup');
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen w-screen">
      <Navbar />
      {(!Auth.isLoading) ? (
        <div>
          <Hero />
          <Category />

          {/* <HeadlineCards />  */}
          <SuggestedFood />
        </div>
      ) : (
        <div className="w-screen min-h-screen  flex justify-center items-center">
          <p className="text-[40px] font-bold text-center">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
