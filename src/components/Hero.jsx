import React from "react";
import { Carousel } from "react-carousel-minimal";
const Hero = () => {
  const data = [
    {
      image:
        "https://influencermarketinghub.com/wp-content/uploads/2018/06/Two-peas-and-their-pod.jpg",
      caption: "Two Peas and thier Pod",
    },
    {
      image:
        "https://www.blogtyrant.com/wp-content/uploads/2022/05/rsz_pinch-of-yum-food-blog.png",
      caption: "Pinch of Yum",
    },
    {
      image:
        "https://www.chefspencil.com/wp-content/uploads/Food52.jpg",
      caption: "FOOD52",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfyBY4WgYQ4JN5XputB85RtMKLzg4jffPG6EKF8M6gf_6a7-z-TDDr7zvGmJQ8JIFt_Q&usqp=CAU",
      caption: "Minimalist Baker",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  

  return (
    <>

    <div className="max-w-[1640px] mx-auto p-4 mb-16">
      <div className="max-h-[500px] relative">
        <div className="App">
          <div style={{ textAlign: "center" }}>
            {/* <div
              style={{
                padding: "0 20px",
              }}
            > */}
              <Carousel
                data={data}
                
                time={2000}
                width="5550px"
                height="500px"
               
                captionStyle={captionStyle}
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  // maxWidth: "850px",
                  // maxHeight: "500px",
                
                  margin: "40px auto",
                }}
              />
            </div>
          </div>
        </div> 
      
    </div>
  
    </>

  );
};

export default Hero;
