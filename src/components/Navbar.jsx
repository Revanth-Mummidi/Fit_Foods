import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,

} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaAllergies } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import { CgWebsite } from "react-icons/cg";
import { MdFavorite } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserSignInState, signOutUser } from "../Screens/AuthScreen/redux/AuthSlice";
import axios from "axios";

const SearchItems = [
  "Kale Salad",
  "Ceasar Salad",
  "Loaded Salad",
  "Fruit Salad",
  "Double Cheeseburger",
  "Meat Lovers",
  "Wings",
  "Baked Chicken",
  "Chicken Tenders",
  "Chicken Kabob",
];


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const Auth = useSelector((state) => state.authslice);
  const [data,setData]=useState([]);
  const [isLoading,setLoading]=useState(true);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchData();
    console.log(data);
  },[searchTerm]);
  const fetchData=async()=>{
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + `foods?search=${searchTerm}`;
      const response = await axios.get(MAIN_URL,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });
      setData(response.data);
      console.log("RESPONSE=", response);

    } catch (err) {
      
      console.log("ERROR IN GETTING FOOD ITEMS", err);
      
    } 
  }
  const filteredSuggestions = data.map((item,index) =>
   {
    
     if(item){
     return item;
    
    }
  }
  );
  const handleLogout=async()=>{
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/logout/";
      const response = await axios.post(MAIN_URL,{},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });

      console.log("RESPONSE=", response);
      
      dispatch(
        setUserSignInState({
          user: null,
          isAuthenticated: false,
          isLoading: true,
        })
      );
      navigation('/auth/signup');
    } catch (err) {
      console.log("ERROR IN REGISTERING", err);
    }
  }
  return (
    <>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center ml-4">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
              FIT <span className="font-bold">FOODS</span>
              
            </h1>
          </Link>
        </div>

        {/* Search Input */}
        <div  className="bg-gray-200 relative rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
          <AiOutlineSearch size={25} />
          <input
            className="bg-transparent p-2 w-full focus:outline-none"
            type="text"
            placeholder="Search foods, recipes, health tips..."
            value={searchTerm}
            onChange={(e) =>{
               setSearchTerm(e.target.value)
              }}
          />
        {/* Suggestions dropdown */}
        {(searchTerm!="") && (
          <div className="absolute mt-1 bg-white shadow-lg rounded-lg w-[400px] top-9 mx-auto z-10">
            {data.map((item, index) => (
              <Link
                key={index}
                to={`/fooditem/${item._id}`}
                className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                onClick={() => setSearchTerm("")}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        </div>


        {/* Cart button */}
        {Auth.isAuthenticated ? (
          <button
            onClick={() => {
              // console.log("Auth = ", Auth.user);
              // dispatch(signOutUser());
              handleLogout();
              navigation("/auth/signup");
            }}
            className="sm:bg-black flex  border-0  mx-2 text-white  items-center sm:py-2 rounded-full"
          >
            <img
              src={Auth.user.photoURL}
              className="sm:mr-4 h-7 hidden sm:flex aspect-square rounded-full"
              alt="User Profile"
            />
            <IoIosLogOut style={{color:"black"}} size={25} className=" flex sm:hidden" />
            <p className="sm:block hidden" >
              Logout
              </p>
            {/* Animationan */}
          </button>
        ) : (
          <div className="flex flex-row gap-3 mx-2">
            <Link
              to={`/auth/login?next=${location.pathname}`}
              className="bg-black text-white hidden md:flex items-center p-2 px-4 rounded-full"
            >
              <CgProfile size={25} className="mr-4" />
              Login
            </Link>
            <Link
              to={`/auth/signup?next=${location.pathname}`}
              className="bg-black text-white hidden md:flex justify-center px-4  items-center p-2 rounded-full"
            >
              <CgProfile size={25} className="mr-4" />
              Signup
            </Link>
          </div>
        )}

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">
            FIT <span className="font-bold">FOODS</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex">
                <CgProfile size={25} className="mr-4" />
                <Link to="/userprofile">User Details</Link>
              </li>
              <li className="text-xl py-4 flex">
                <MdFavorite size={25} className="mr-4" />
                <Link to="/healthissues">Health Issues</Link>
              </li>
              <li className="text-xl py-4 flex">
                <FaAllergies size={25} className="mr-4" />
                <Link to="/allergies"> Allergies</Link>
              </li>
              <li className="text-xl py-4 flex">
                <IoDocuments size={25} className="mr-4" />
                <Link to="/document"> Upload Documents </Link>
              </li>
              <li className="text-xl py-4 flex">
                <CgWebsite size={25} className="mr-4" />
                <Link to="/blogs"> Food Blogs</Link>
              </li>
              {/* <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
                <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Invite Friends</li> */}
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
