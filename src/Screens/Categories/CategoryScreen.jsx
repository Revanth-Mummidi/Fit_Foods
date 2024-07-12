import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SuggestedFood from '../HomeScreen/Components/SuggestedFood';
import { HealthyFoodItems, UnhealthyFoodItems } from '../../data/data';

function CategoryScreen() {
    const {id}=useParams();
  return (
    <div className='w-screen gap-10 min-h-screen h-full  flex flex-col items-center p-10 bg-gradient-to-r from-black to-gray-800'>
      <p className='font-bold text-white text-[50px] mb-10'>{id}</p>
        <div className='w-full flex flex-col'>
        <p className='text-green-200 font-semibold text-2xl'>Consumable Items:</p>
        <ItemsList consumable={true} FoodItems={HealthyFoodItems}/>
        </div>
        <div className='w-full flex flex-col'>
        <p className='text-green-200 font-semibold text-2xl'>Consumable Items:</p>
        <ItemsList consumable={false} FoodItems={UnhealthyFoodItems}/>
        </div>
    </div>
  )
}
function ItemsList({consumable,FoodItems}) {
    const [foods, setFoods] = useState(FoodItems);
    const navigate=useNavigate();
    return (
      <div className="flex flex-row flex-wrap gap-6 pt-4">
        {foods.slice(0, 4).map((item, index) => (
          <div
            onClick={()=>{
              navigate(`/fooditem/${item.name}`)
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
      </div>
    );
  }
  

export default CategoryScreen
