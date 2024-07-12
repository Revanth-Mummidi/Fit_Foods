import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { completeFoodItems } from '../../data/data';

function FoodItemScreen() {
  const {id}=useParams();
  const [item,setItem]=useState();
  useEffect(()=>{
    completeFoodItems.map((data,index)=>{
        if(data.name==id)
            {
                setItem(data);
            }
    })
  },[]);
  return (
    <div className='h-screen w-screen flex items-center justify-center p-10 bg-gradient-to-r from-black to-gray-800'>
    <div className='flex flex-col gap-4 items-center p-10 h-full w-[40vw] bg-white overflow-y-scroll  rounded-lg shadow-md shadow-slate-100'>
      <img src={item?.image} className='w-full h-[40%] bg-black object-cover'></img>
      <p className='font-semibold text-black text-2xl'>{item?.name}</p>
      <div className='flex flex-col w-full justify-between'>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className='font-semibold pr-4 pb-2'>Category:</td>
              <td className='font-medium text-slate-800 pb-2'>{item?.category}</td>
            </tr>
            <tr>
              <td className='font-semibold pr-4 pb-2'>Description:</td>
              <td className='font-medium text-slate-800 pb-2'>{item?.description}</td>
            </tr>
            <tr>
              <td className='font-semibold pr-4 pb-2'>Price:</td>
              <td className='font-medium text-slate-800 pb-2'>{item?.price}</td>
            </tr>
            <tr>
              <td className='font-semibold pr-4 pb-2'>Consumable:</td>
              <td  style={!item?.consumable?{color:"red"}:{color:"green"}} className='font-medium text-slate-800 pb-2'>{item?.consumable ? "YES" : "NO"}</td>
            </tr>
            <tr>
              <td className='font-semibold pr-4 pb-2'>Nutrients:</td>
              <td className='font-medium text-slate-800 pb-2'>
                {`Calories: ${item?.nutrients.calories}, Protein: ${item?.nutrients.protein}, Fat: ${item?.nutrients.fat}, Carbohydrates: ${item?.nutrients.carbohydrates}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  
  )
}

  
export default FoodItemScreen
