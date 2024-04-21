// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomeScreen from "./components/HomeScreen";
// import HealthIssues from "./components/HealthIssues";
// import Document from "./components/Document";
// import Allergies from "./components/Allergies";
// import UserProfile from "./components/UserProfile";
// import Blogs from "./components/Blogs";
// import SignIn from "./components/SignIn"
// import SignUp from "./components/SignUp"
// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/"  element={<HomeScreen />} />
//           <Route path="/healthissues" element={<HealthIssues />} />
//           <Route path="/userprofile" element={<UserProfile />} />
//           <Route path="/allergies" element={<Allergies/>} />
//           <Route path="/document" element={<Document />} />
//           <Route path="/blogs" element={<Blogs />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store.js";
import { getFireAuth } from "./config/firebase.js";
import { setUserSignInState } from "./Screens/AuthScreen/redux/AuthSlice.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getFireAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        const { displayName, email, phoneNumber, uid ,photoURL} = user;
        dispatch(
          setUserSignInState({
            user: { displayName, email, phoneNumber,photoURL, uid },
            isAuthenticated: true,
          })
        );
      } else {
        dispatch(
          setUserSignInState({
            user: null,
            isAuthenticated: false,
          })
        );
      }
    });
    getFireAuth.onIdTokenChanged(async(user)=>{
      if (user !== null) {
        const { displayName, email,photoURL, phoneNumber, uid } = user;
        dispatch(
          setUserSignInState({
            user: { displayName, email,photoURL, phoneNumber, uid },
            isAuthenticated: true,
          })
        );
      } else {
        dispatch(
          setUserSignInState({
            user: null,
            isAuthenticated: false,
          })
        );
      }
    })
  }, []);
  return (
   
      <RouterProvider router={router} />
    
  );
}

export default App;

