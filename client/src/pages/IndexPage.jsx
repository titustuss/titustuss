import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage({category}) {
  const [places, setPlaces] = useState([]);
  

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);


  const filteredPlaces = places.filter(place => (category === "all" || place.category.toLowerCase() === category));

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-slideup">
      {filteredPlaces.length > 0 &&
        filteredPlaces.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="grid grap-16 grid-cols-fluid">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold truncate ">
              {place.title}
            </h2>
            <h3 className="">{place.address}</h3>
            <div className="right-0">${place.price}</div>
            {place.category}
          </Link>
        ))}
    </div>
  );
}
