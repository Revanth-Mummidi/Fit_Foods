import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { foodAllergies } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { setAllergiesAction } from "./redux/AllergiesSlice";

function Allergies() {
  return (
    <div>
      <Navbar />
      <ParentComponent />
    </div>
  );
}

export default Allergies;

function ParentComponent() {
  const dispatch=useDispatch();
  const Allergy=useSelector(state=>state.allergyslice);
  const [Allergies, setAllergies] = useState(Allergy.allergy);
  const [tagSuggestions, setTagSuggestions] = useState(foodAllergies);
  useEffect(()=>{
    let arr=tagSuggestions.filter((item,index)=>{
      if(!Allergies.find((currentVal,idx,arr)=>{
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
    dispatch(setAllergiesAction(Allergies));
  },[Allergies]);

  const addAllergies = (newAllergies) => {
    setAllergies([...Allergies, newAllergies]);
  };

  const removeAllergies = (index) => {
    let arr=[...tagSuggestions,Allergies[index]];
    setTagSuggestions(arr);
    const updatedAllergies = Allergies.filter((_, i) => i !== index);
    setAllergies(updatedAllergies);
  };

  return (
    <div className=" mx-auto p-4 text-white min-h-screen bg-gradient-to-r from-black to-gray-800">
      <h1 className="text-4xl mb-4">Select Allergies</h1>
      <AllergiesInput
        addAllergies={addAllergies}
        tagSuggestions={tagSuggestions}
      />
     <div className="flex flex-wrap mt-4">
  {Allergies.map((Allergies, index) => (
    <div
      key={index}
      className="bg-gray-200 text-black p-2 rounded-lg m-2 flex items-center"
    >
      <span className="mr-2">{Allergies}</span>
      <button
        onClick={() => removeAllergies(index)}
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

function AllergiesInput({ addAllergies, tagSuggestions }) {
  const [inputValue, setInputValue] = useState("");
  const [matchingTags, setMatchingTags] = useState([]);

  const handleInputChange = (value) => {
    setInputValue(value);
    const filteredTags = tagSuggestions.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setMatchingTags(filteredTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addAllergies(inputValue);
      setInputValue("");
      setMatchingTags([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addAllergies(suggestion);
    setInputValue("");
    setMatchingTags([]);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Add Allergy"
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


