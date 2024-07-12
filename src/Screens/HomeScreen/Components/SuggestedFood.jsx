import React, { useState } from "react";
import {  HealthyFoodItems, UnhealthyFoodItems } from "../../../data/data.js";
import { useNavigate, useNavigation } from "react-router-dom";

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

  return (
    <div className="max-w-[1640px] m-auto px-4 ">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-4">
        Suggested items
      </h1>
      <h1 className="text-black-600 font-medium sm text-2xl  my-2 ">
        Consumable Foods
      </h1>

      {/* Display foods */}
      <Consumable />
      <h1 className="text-black-600 font-medium text-2xl my-2">
        Avoid these Foods
      </h1>

      {/* Display foods */}
      <NonConsumable />
    </div>
  );
};

function Consumable() {
  const [foods, setFoods] = useState(HealthyFoodItems);
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {foods.slice(0, 4).map((item, index) => (
        <div
          onClick={()=>{
            navigate(`/fooditem/${item.name}`)
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

function NonConsumable() {
  const [foods, setFoods] = useState(UnhealthyFoodItems);
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {foods.slice(0, 4).map((item, index) => (
        <div
        onClick={()=>{
          navigate(`/fooditem/${item.name}`)
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
