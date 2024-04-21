import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import HealthIssues from "./components/HealthIssues";
import UserProfile from "./components/UserProfile";
import Allergies from "./components/Allergies";
import Document from "./components/Document";
import Blogs from "./components/Blogs";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";
import AuthLayout from "./Screens/AuthScreen/AuthLayout";
import SignupScreen from "./Screens/AuthScreen/SignupScreen";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeScreen/>
    },
    {
        path:'/healthissues',
        element:<HealthIssues/>
    },
    {
        path:'/userprofile',
        element:<UserProfile/>
    },
    {
        path:'/allergies',
        element:<Allergies/>
    },
    {
        path:'/document',
        element:<Document/>
    },
    {
        path:'/blogs',
        element:<Blogs/>
    },
    {
        path: "/auth",
        element:<AuthLayout/>,
        children: [
          {
            index:true,
            path:"",
            element: <LoginScreen />,
          },
          {
            path: "login",
            element: <LoginScreen />,
          },
          {
            path:"signup",
            element:<SignupScreen/>
          },
          
        ],
      },
])