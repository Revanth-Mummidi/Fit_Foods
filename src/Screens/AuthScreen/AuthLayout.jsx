import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function AuthLayout() {
  const AuthSlice = useSelector(state=>state.authslice);
  const isAuthenticated=AuthSlice.isAuthenticated;
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
   if(isAuthenticated)
   {
     const next = location.search.split('next=')[1];
     if(next)
     navigate(next)
    else 
    navigate('/')
   }
  },[isAuthenticated]);
  
  return (
    <div className="min-h-screen relative flex items-center">
            <img src="https://raw.githubusercontent.com/bedimcode/login-form/main/assets/img/login-bg.png" alt="background image"  className='h-screen w-full absolute object-cover' />
            <div className=" mx-auto ">
                {/* <h2 onClick={() => setLogin(true)} className=""> */}
                  
                {/* </h2 > */}
                <div className="flex items-center mt-8 mx-auto max-w-md">
                    <div className="bg-transparent rounded-3xl backdrop-blur-xl border-4 py-8 px-4 shadow rounded-2xl sm:px-10 ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

  )
}

export default AuthLayout