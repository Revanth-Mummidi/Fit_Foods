import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Health_Issues } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { setHealthIssuesAction } from "./redux/HealthIssuesSlice";
import axios from "axios";

function HealthIssues() {
  return (
    <div>
      <Navbar />
      <ParentComponent />
    </div>
  );
}

export default HealthIssues;

function ParentComponent() {
  const dispatch=useDispatch();
  const HTSlice=useSelector(state=>state.healthissueslice.health_issues);
  const [healthIssues, setHealthIssues] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState(Health_Issues);
  useEffect(()=>{
    let arr=tagSuggestions.filter((item,index)=>{
      if(!healthIssues.find((currentVal,idx,arr)=>{
          if(currentVal==item)
          {
            return true;
          }
      }))
      {
          return item;
      }
    })
    setTagSuggestions(arr);
    dispatch(setHealthIssuesAction(healthIssues));
    
  },[healthIssues]);
  const handleEditUserProfile=async(health_issues)=>{
    try{
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.put(MAIN_URL,
        {
          healthIssues:health_issues,
        }
        ,
        {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });

      console.log("RESPONSE=", response);
    }
    catch(err){
      console.log("ERROR IN EDITING USER PROFILE",err);
    }
  }
  const addHealthIssue = (newHealthIssue) => {
    setHealthIssues([...healthIssues, newHealthIssue]);
    handleEditUserProfile([...healthIssues, newHealthIssue]);
  };

  const removeHealthIssue = (index) => {
    let arr=[...tagSuggestions,healthIssues[index]];
    setTagSuggestions(arr);
    const updatedHealthIssues = healthIssues.filter((_, i) => i !== index);

    setHealthIssues(updatedHealthIssues);
    handleEditUserProfile(updatedHealthIssues);
  };
  useEffect(()=>{
    handleGetData();
  },[])
  const handleGetData=async()=>{
    try{
      let BASE_URL = process.env.REACT_APP_BASE_URL;

      let MAIN_URL = BASE_URL + "users/me/";
      const response = await axios.get(MAIN_URL,
       {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
      });
      // dispatch(setHealthIssuesAction(response.data.healthIssues));
      setHealthIssues(response.data.healthIssues)
      console.log("RESPONSED=", response);
    }
    catch(err){
      console.log("ERROR IN FETCHING USER PROFILE",err);
    }
  }
  return (
    <div className=" mx-auto p-4 text-white min-h-screen bg-gradient-to-r from-black to-gray-800">
      <h1 className="text-2xl mb-4">Select Health Issues</h1>
      <HealthIssueInput
        addHealthIssue={addHealthIssue}
        tagSuggestions={tagSuggestions}
      />
     <div className="flex flex-wrap mt-4">
  {healthIssues.map((healthIssue, index) => (
    <div
      key={index}
      className="bg-gray-200 text-black p-2 rounded-lg m-2 flex items-center"
    >
      <span className="mr-2">{healthIssue}</span>
      <button
        onClick={() => removeHealthIssue(index)}
        className="p-2 text-red-500 focus:outline-none"
      >
        ❌
      </button>
    </div>
  ))}
</div>

    </div>
  );
}

function HealthIssueInput({ addHealthIssue, tagSuggestions }) {
  const [inputValue, setInputValue] = useState("");
  const [matchingTags, setMatchingTags] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
    // Filter tag suggestions based on input value
    const filteredTags = tagSuggestions.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setMatchingTags(filteredTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addHealthIssue(inputValue);
      setInputValue("");
      setMatchingTags([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addHealthIssue(suggestion);
    setInputValue("");
    setMatchingTags([]);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Add a Health Issue"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500 bg-gray-900 text-white"
      />
      {matchingTags.length > 0 && (
        <ul className="border border-gray-300 rounded-lg mt-2">
          {matchingTags.map((tag, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(tag)}
              className="cursor-pointer hover:bg-slate-500 hover:rounded-lg px-3 py-2 bg-gray-800"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


