import React from "react";
import { categories } from "../data/data";

const HeadlineCards = () => {
  const list = [
    {
      name: "Two Peas and their Pod",
      url:"https://www.twopeasandtheirpod.com/",
      image:
        "https://influencermarketinghub.com/wp-content/uploads/2018/06/Two-peas-and-their-pod.jpg",
        
    },
    {
      name: "Pinch of Yum",
      url:"https://pinchofyum.com/",
      image:
        "https://www.blogtyrant.com/wp-content/uploads/2022/05/rsz_pinch-of-yum-food-blog.png",
    },
    {
      name: "FOOD52",
      url:"https://food52.com/",
      image:
      "https://www.chefspencil.com/wp-content/uploads/Food52.jpg",
    },
    {
      name: "Gillion Foodie",
      url:"https://gillion.shufflehound.com/foodie/",
      image:
        "https://colorlib.com/wp/wp-content/uploads/sites/2/gillion-food-blog-website-template.jpg",
        
    },
    {
      name: "Cooking and Recipes Blog",
      url:"https://www.thefoodies.org/",
      image:
        "https://i.ytimg.com/vi/gU05E1O6fdU/maxresdefault.jpg",
    },
    {
      name: "THE FOODIES",
      url:"https://www.thefoodies.org/",
      image:
        "https://www.milesweb.in/blog/wp-content/uploads/2016/09/the-voux-minimal-food-blog-website-template.jpg",
    },
    // { name: "snacks" },
    // { name: "bevarages" },
    // { name: "vegetables" },
  ];
  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6 bg-gradient-to-r from-black to-gray-800">
      {list.map((category) => (
        <div className="rounded-xl relative">
          {/* Overlay */}

          <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
            <p className="font-bold text-2xl px-2 pt-4">{category.name}</p>
            {/* <p className="px-2">{category.subTitle  }</p> */}
            <button className="border-white bg-white text-black mx-2 absolute bottom-4">
             <a href={category.url}> View all </a>
            </button>
          </div>
          <img
            className="max-h-[300px] md:max-h-[300px] w-full h-full object-cover rounded-xl"
            src={category.image}
            alt="/"
          />
        </div>
      ))}
    </div>
  );
};

export default HeadlineCards;
