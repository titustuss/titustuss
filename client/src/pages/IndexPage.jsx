import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function IndexPage({category}){
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/places').then(response =>{
      setPlaces(response.data);
    })
  },[]);

  const filteredPlaces = places.filter(place => (category === "all" || place.category.toLowerCase() === category));
return (
  <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 animate-slideup">
    {filteredPlaces.length > 0 && filteredPlaces.map(place =>(
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

        {places.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              // onClick={() => setCurrent((prev) => prev - 1)}
              // className={`py-2 px-4 rounded bg-blue-500 text-white ${
              //   !(current > 1) && "opacity-50 cursor-not-allowed"
              // }`}
            >
              Previous
            </button>
            {/* <div className="hidden sm:flex items-center gap-2">
              Page <strong>{current} of {pageCount}</strong>
            </div> */}
            <button
              // onClick={() => setCurrent((prev) => prev + 1)}
              // className={`py-2 px-4 rounded bg-blue-500 text-white ${
              //   current === pageCount && "opacity-50 cursor-not-allowed"
              // }`}
            >
              Next
            </button>
            <select
              // value={pageSize}
              // onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
              // className="border border-gray-300 py-1 px-2 text-base focus:outline-none"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        )}

  </div>
)
}