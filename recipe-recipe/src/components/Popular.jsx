import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem("popular");
    if(check){
        setPopular(JSON.parse(check));
        console.log("Getting from local storage.")

    }else{

        const response = await fetch(
            "https://api.spoonacular.com/recipes/random?apiKey=27d1b8e6ca5347799f3c686ce4f19ee7&number=9"
          );
          const data = await response.json();
          setPopular(data.recipes);
          localStorage.setItem("popular",JSON.stringify(data.recipes))
          console.log(data.recipes);
          console.log("Geting from API");
    }


   
  };

  return (
    <div className="popular-col">
      <Splide options={{
        perPage:4,
        drag:"free",
        arrows:false,
        pagination:false,
        gap:"5rem"
      }}>
        {popular.map((item) => {
          return (
            <SplideSlide key={item.id}>
              <div >
              
                <div className="card card-popular">
                <div className="card-body">
                    <p className="card-text card-popular-p">{item.title}</p>
                  </div>
                  <img
                    src={item.image}
                    className="card-img card-popular-image "
                    alt={item.title}
                  />
                  <div className="popular-gradient"></div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Popular;
