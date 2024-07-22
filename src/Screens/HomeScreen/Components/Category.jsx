import React, { useEffect, useState } from 'react';
import { categories } from '../../../data/data.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    handleGetCategories();
  },[]);
  const [data,setData]=useState([]);
  const handleGetCategories=async()=>{
    try{
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "categories";
      const response = await axios.get(MAIN_URL,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });

      console.log("CATEGORIES=", response);
      setData(response.data);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        All Categories
      </h1>
      {/* Categories */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6'>
        {data.map((item, index) => (
          <div
          onClick={()=>{
            navigate(`/categories/${item._id}`)
          }}
            key={index}
            className='bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center transition bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black'
          >
            <h2 className='font-bold sm:text-xl text-cyan-50 '>{item.name}</h2>
            <img src={item.image} alt={item.name} className='w-20' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
