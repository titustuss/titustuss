import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function IndexPage(){
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/places').then(response =>{
      setPlaces(response.data);
    })
  },[]);
return (
  <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 animate-slideup">
    {places.length > 0 && places.map(place =>(
      <Link to={'/place/' + place._id} >
        <div className="grid grap-16 grid-cols-fluid">
        {place.photos?.[0] && (
          <img className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt="" />
        )}
        </div>
        <h2 className="text-xl truncate ">{place.title}</h2>
        <h3 className="font-bold ">{place.address}</h3>
        <div className="right-0">
          ${place.price}
        </div>
      </Link>
    ))}
  </div>
)
}