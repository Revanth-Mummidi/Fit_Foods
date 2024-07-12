import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import HealthIssues from "./Screens/HealthIssuesScreen/HealthIssues";
import UserProfile from "./Screens/UserProfile/UserProfile";
import Allergies from "./Screens/AllergiesScreen/Allergies";
import Document from "./Screens/UploadDocument/Document";
import Blogs from "./Screens/Blogs/Blogs";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";
import AuthLayout from "./Screens/AuthScreen/AuthLayout";
import SignupScreen from "./Screens/AuthScreen/SignupScreen";
import FoodItemScreen from "./Screens/FoodITemScreen/FoodItemScreen";
import CategoryScreen from "./Screens/Categories/CategoryScreen";

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
       path:'/fooditem/:id',
       element:<FoodItemScreen/>
    },
    {
      path:'/categories/:id',
      element:<CategoryScreen/>
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