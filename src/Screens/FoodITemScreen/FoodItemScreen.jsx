import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { completeFoodItems } from "../../data/data";

function FoodItemScreen() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cause, setCause] = useState([]);
  const [catergoies,setCatergories]=useState("");
  const [isLoading,SetLoading]=useState(false);
  useEffect(() => {
    
   handleGetItem();
    handleGetUserData();

    // handleCategroies();
  
  }, []);

  // const handleCategroies=async()=>{
 
  //   handleGetCategories(item?.categories[0]);
    
  // }
  // const handleGetCategories=async(id)=>{
  //   try {

  //     let BASE_URL = process.env.REACT_APP_BASE_URL;

  //     let MAIN_URL = BASE_URL + `categories/${id}`;
      
  //     console.log("CATEGORIES ID =", id);
  //     const response = await axios.get(MAIN_URL, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log("CATEGORIES=", response.data);
  //     setCatergories(response.data[0])
      
  //   } catch (err) {
  //     console.log("ERROR IN GETTING CATERGORIES", err);
  //   }
  // }

  const handleGetUserData = async () => {
    try {

      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.get(MAIN_URL, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("USER IN FOOD ITEM =", response.data);
      setUserData(response.data);
    
      // IsConsumable();
    } catch (err) {
      console.log("ERROR IN GETTING PROFILE", err);
    }
  };
  const IsConsumable = () => {
    
      console.log("FOOD ITEM=", item, "USER DATA=", userData);
    
    
    if (item && userData) {
      let HI = [...userData?.healthIssues];
      let AL = [...userData?.allergies];
      let FHI = [...item?.nonConsumableByHealthIssues];
      let FAL = [...item?.nonConsumableByAllergies];
      let REASON = [];
      for (let i = 0; i < HI.length; i++) {
        for (let j = 0; j < FHI.length; j++) {
          if (HI[i] == FHI[j]) REASON.push(HI[i]);
        }
      }
      for (let i = 0; i < AL.length; i++) {
        for (let j = 0; j < FAL.length; j++) {
          if (AL[i] == FAL[j]) REASON.push(AL[i]);
        }
      }
      // setCause(REASON);
      if(REASON.length>0 )
      {
         if(REASON.length!=cause.length)
         {
          setCause(REASON);
         }
         else{
          REASON=REASON.sort();
          let causes=cause.sort();
           for(let i=0;i<REASON.length;i++)
           {
              if(REASON[i]!=causes[i])
              {
                setCause(REASON);
                break;
              }
           }
         }
        // setCause(REASON);
      }
      // SetLoading(false);
      return (REASON.length == 0);
    } 
  };

  const handleGetItem = async () => {
    try {
      // SetLoading(true);
      let BASE_URL = process.env.REACT_APP_BASE_URL;
      let MAIN_URL = BASE_URL + `foods/${id}`;

      const response = await axios.get(MAIN_URL, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setItem(response.data);
      console.log("RESPONSE=", response.data);
    } catch (err) {
      console.log("ERROR IN GETTING FOOD ITEM", err);
    }
  };

  const arr = [
    `Protein: ${item?.nutrition?.protein}`,
    `Fat: ${item?.nutrition?.fat}`,
    `Carbohydrate: ${item?.nutrition?.carbohydrate}`,
    `Energy: ${item?.nutrition?.energy}`,
    `Sodium: ${item?.nutrition?.sodium}`,
    `Sugars: ${item?.nutrition?.sugars}`,
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center p-10 bg-gradient-to-r from-black to-gray-800">
      {!isLoading?(<div className="flex flex-col gap-4 items-center p-10 h-full w-[40vw] bg-white overflow-y-scroll rounded-lg shadow-md shadow-slate-100">
        <img
          src={item?.image}
          className="w-full h-[40%] bg-black object-cover"
          alt="Food Item"
        />
        <p className="font-semibold text-black text-2xl">{item?.name}</p>
        <div className="flex flex-col w-full justify-between">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 pb-2">Category:</td>
                <td className="font-medium text-slate-800 pb-2">
                  {item?.categories[0]?.name}
                </td>
              </tr>
              <tr>
                <td className="font-semibold align-top pr-4 pb-2">Description:</td>
                <td className="font-medium text-slate-800 pb-2">
                  {item?.desc}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 pb-2">Consumable:</td>
                <td
                  style={
                    (!IsConsumable()) ? { color: "red" } : { color: "green" }
                  }
                  className="font-medium text-slate-800 pb-2"
                >
                  {(IsConsumable())? "YES" : "NO"}
                </td>
              </tr>
              {(!IsConsumable()) ? (
                <tr>
                  <td className="font-semibold align-top pr-4 pb-2">Reason:</td>
                  <td className="font-bold  text-slate-800 pb-2">
                    {cause.map((cont, index) => (
                      <p key={index}>{cont}</p>
                    ))}
                  </td>
                </tr>
              ) : null}

              <tr>
                <td className="font-semibold align-top pr-4 pb-2">Nutrients:</td>
                <td className="font-medium text-slate-800 pb-2">
                  {arr.map((cont, index) => (
                    <p key={index}>{cont}</p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>):(
        <div className="text-white text-3xl">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default FoodItemScreen;
