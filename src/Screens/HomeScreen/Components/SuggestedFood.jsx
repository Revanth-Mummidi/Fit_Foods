import React, { useEffect, useState } from "react";
import {  HealthyFoodItems, UnhealthyFoodItems } from "../../../data/data.js";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";

const SuggestedFood = () => {
  //   console.log(data);
  // const [foods, setFoods] = useState(data);

  // //   Filter Type burgers/pizza/etc
  // const filterType = (category) => {
  //   setFoods(
  //     data.filter((item) => {
  //       return item.category === category;
  //     })
  //   );
  // };

  // //   Filter by price
  // const filterPrice = (price) => {
  //   setFoods(
  //     data.filter((item) => {
  //       return item.price === price;
  //     })
  //   );
  // };
  // const [Data,setData]=useState([]);
  const [UserData,setUserData]=useState([]);
  const [ConsumableItems,setConsumableItems]=useState([]);
  const [NonConsumableItems,setNonConsumableItems]=useState([]);
  useEffect(()=>{
    handleGetFoodItemsList();
  },[]);

  const handleGetFoodItemsList=async()=>{
    try {
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + `foods/suggestions`;
      const response = await axios.get(MAIN_URL,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });
    
      console.log("SUGGEST=", response);
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
      setConsumableItems(con);
      setNonConsumableItems(ncon);
    } catch (err) {
      
      console.log("ERROR IN GETTING FOOD ITEMS", err);
      
    } 
  }
  
 
  return (
    <div className="max-w-[1640px] m-auto px-4 ">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-4">
        Suggested items
      </h1>
      <h1 className="text-black-600 font-medium sm text-2xl  my-2 ">
        Consumable Foods
      </h1>

      {/* Display foods */}
      <Consumable ConsumableItems={ConsumableItems} />
      <h1 className="text-black-600 font-medium text-2xl my-2">
        Avoid these Foods
      </h1>

      {/* Display foods */}
      <NonConsumable NonConsumableItems={NonConsumableItems} />
    </div>
  );
};

function Consumable({ConsumableItems}) {
  console.log("CONS=",ConsumableItems)
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {ConsumableItems.map((item, index) => (
        <div
          onClick={()=>{
            navigate(`/fooditem/${item._id}`)
          }}
          key={index}
          className="border shadow-lg rounded-lg hover:scale-105 duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="flex justify-between px-2 py-4">
            <p className="font-bold">{item.name}</p>
            <p>
              <span className="bg-green-500 text-white p-2  rounded-full ">
                Consumable
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NonConsumable({NonConsumableItems}) {
  console.log("NONCONS=",NonConsumableItems)
  // const [foods, setFoods] = useState(NonConsumableItems);
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {NonConsumableItems.map((item, index) => (
        <div
        onClick={()=>{
          navigate(`/fooditem/${item._id}`)
        }}
          key={index}
          className="border shadow-lg rounded-lg hover:scale-105 duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="flex justify-between px-2 py-4">
            <p className="font-bold">{item.name}</p>
            {/* <p> */}
              <span className="bg-red-500 text-sm text-white p-2 rounded-full">
                Non Consumable
              </span>
            
          </div>
        </div>
      ))}
    </div>
  );
}

// export default Consumable
export default SuggestedFood;
