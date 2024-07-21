import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfileCard = () => {
  // const Auth=useSelector(state=>state.authslice);
  
  const [userId, setUserId] = useState();
  const [Auth,setAuth]=useState(null);
  const [password, setPassword] = useState("********");
  const [firstName, setFirstName] = useState(Auth?.firstName);
  const [lastName, setLastName] = useState(Auth?.lastName);
  const [email, setEmail] = useState(Auth?.email);
  const [phone_number, setphone_number] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editMode, setEditMode] = useState(false);
  
  // useEffect(()=>{
  //   if(Auth.isAuthenticated){
  //     console.log("AUTh",Auth);
    
  //   let fname=Auth?.user?.displayName?.split(" ")[0] ;
  //   let lname=Auth?.user?.displayName?.split(" ")[1];
  //   setFirstName(fname);
  //   setLastName(lname);
  //   setEmail(Auth?.user?.email);
  //   setphone_number(Auth?.user?.phoneNumber);
  //   setNewImage(Auth?.user?.photoURL);
  //   }
  // },[Auth]);
  
  useEffect(()=>{
    handleGetData();

  },[]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetData=async()=>{
    try{
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.get(MAIN_URL,
       {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });
      // dispatch(setHealthIssuesAction(response.data.healthIssues));
      setAuth(response.data)
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      
      console.log("RESPONSED=", response);
    }
    catch(err){
      console.log("ERROR IN FETCHING USER PROFILE",err);
    }
  }

  const handleSaveChanges = async() => {
    try{
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.put(MAIN_URL,
        {
            firstName:firstName,
            lastName:lastName,
            email:email
        },
       {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });
      console.log("SAVED RESPONSE=",response);
      setEditMode(false);
    }
    catch(err){
      console.log("ERROR IN SAVING EDITED USER DETAILS",err)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-20 bg-gradient-to-r from-black to-gray-800">
    <div className="max-w-md w-full mx-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="photo-wrapper mb-4 text-center">
            <img
              className="w-40 h-40 rounded-full mx-auto"
              src={
                newImage ||
                "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
              }
              alt="John Doe"
            />
            {editMode && (
              <input
                type="file"
                accept=".jpg"
                onChange={handleImageUpload}
                className="mt-2 block w-full focus:outline-none"
              />
            )}
          </div>
          <div className="p-2">
            {/* {editMode ? (
              <div className="mb-2">
                <label htmlFor="userId">User ID:</label>
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>User ID: {userId}</div>
            )} */}
            {editMode ? (
              <div className="mb-2">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  disabled={true}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>Password: {password}</div>
            )}
            {editMode ? (
              <div className="mb-2">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>First Name: {firstName}</div>
            )}
            {editMode ? (
              <div className="mb-2">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>Last Name: {lastName}</div>
            )}
            {editMode ? (
              <div className="mb-2">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>Email: {email}</div>
            )}
            {/* {editMode ? (
              <div className="mb-2">
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                  type="text"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setphone_number(e.target.value)}
                  className="w-full text-gray-700 border rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ) : (
              <div>Phone Number: {phone_number}</div>
            )} */}

            <div className="text-center my-3">
              {editMode ? (
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none"
                >
                  Save Changes
                </button>
              ) : (
                <a
                  onClick={() => setEditMode(true)}
                  className="text-sm text-indigo-500 italic hover:underline hover:text-indigo-600 cursor-pointer"
                >
                  Edit Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
