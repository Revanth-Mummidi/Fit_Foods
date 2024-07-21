import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SuggestedFood from '../HomeScreen/Components/SuggestedFood';
import { HealthyFoodItems, UnhealthyFoodItems } from '../../data/data';
import axios from 'axios';

function CategoryScreen() {
    
    const {id}=useParams();
    const [consumableData,setConsumableItems]=useState([]);
    const [nonConsumableData,setNonConsumableItems]=useState([]);
    const [name,setName]=useState("");
    const handleCategoryData=async()=>{
      try{
        let BASE_URL = process.env.REACT_APP_BASE_URL;
  
        let MAIN_URL = BASE_URL + `categories/${id}`;
        const response = await axios.get(MAIN_URL,{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          },
        });
  
        console.log("CATEGORIES=", response);
        let arr=response.data;
        let con=[],ncon=[];
        arr.map((item,index)=>{
            if(item.consumable)
            {
              con.push(item);
            }
            else{
              ncon.push(item);
            }
        })
        setName(arr[0].categories[0].name);
        setConsumableItems(con);
        setNonConsumableItems(ncon);
        console.log("CONSUMABLE ITEMS",arr[0].categories[0].name,con);
        console.log("NON CONSUMABLE ITEMS",ncon);
        // setData(response.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    useEffect(()=>{
      handleCategoryData();
    },[]);
  return (
    <div className='w-screen gap-10 min-h-screen h-full  flex flex-col items-center p-10 bg-gradient-to-r from-black to-gray-800'>
      <p className='font-bold text-white text-[50px] mb-10'>{name}</p>
        <div className='w-full flex flex-col'>
        <p className='text-green-200 font-semibold mb-10 text-2xl'>Consumable Items:</p>
        <ItemsList consumable={true} FoodItems={consumableData}/>
        </div>
        <div className='w-full flex flex-col'>
        <p className='text-red-500 font-semibold mb-10 text-2xl'>Non Consumable Items:</p>
        <ItemsList consumable={false} FoodItems={nonConsumableData}/>
        </div>
    </div>
  )
}
function ItemsList({consumable,FoodItems}) {
    
    const navigate=useNavigate();
    return (
      <div className="flex flex-row flex-wrap gap-6 pt-4">
        {FoodItems.map((item, index) => (
          <div
            onClick={()=>{
              navigate(`/fooditem/${item._id}`)
            }}
            key={index}
            className="border mx-auto w-[30%] shadow-lg rounded-lg hover:scale-105 duration-300"
          >
                  <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold text-white">{item.name}</p>
              <p>
                <span className={`${consumable?"bg-green-700":"bg-red-700"} text-white p-2  rounded-full `}>
                  {consumable?"Consumable":"Non Consumable"}
                </span>
              </p>
            </div>
          </div>
        ))}
        {
          ([...FoodItems].length==0)?(
            <div className='w-full '>
              <p className='font-bold text-[30px] text-white text-center'>No food items to display</p>
            </div>
          ):null
        }
      </div>
    );
  }
  

export default CategoryScreen
