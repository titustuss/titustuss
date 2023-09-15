import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function IndexPage({category, searchInput}){
  const [places,setPlaces] = useState([]);
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  useEffect(()=>{
    axios.get('/places').then(response =>{
      setPlaces(response.data);
    })
  },[]);

  const categoryFilteredPlaces = places.filter(place => (category === "all" || place.category.toLowerCase() === category));
  const searchFilteredPlaces = categoryFilteredPlaces.filter( place => (searchInput == "" || place.title.toLowerCase() == searchInput.toLowerCase() ))
  const currentPagePlaces = searchFilteredPlaces.slice(current, current+10);
  

  // const filteredPlacesWithSearch = filteredPlaces.filter(
  //   place =>
  //     place.title.toLowerCase().includes(searchText.toLowerCase()) ||
  //     place.address.toLowerCase().includes(searchText.toLowerCase())
  // );

  function pageCounter(){
    if(searchFilteredPlaces.length % 10 != 0){
      return parseInt(searchFilteredPlaces.length/10)+1;
    }
    return parseInt(searchFilteredPlaces.length/10);
  }
      
return (
  <div>
  <div className="mx-4 mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 animate-slideup">
    {currentPagePlaces.length > 0 && currentPagePlaces.map((place, index) =>(
      <span key={place._id}>
          <Link to={'/place/' + place._id}>
          <div className="grid grap-16 grid-cols-fluid">
          {place.photos?.[0] && (
            <img className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt="" />
          )}
          </div>
          <div className="mt-3 flex justify-between">
              <div>
              <h4 className="pb-0">{place.category}</h4>
              <h2 className="font-bold font-body text-xl" style={{ width: '14ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {place.title}
              </h2>
              <h3 className="font-body" style={{ width: '14ch', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{place.address}</h3>
              </div>
              <div className=" flex gap-1 font-semibold text-secondary right-0 mr-6">
                <div>
                {place.currency.split("-")[1]}
                </div>
                <div>
                {place.price}
                </div>
              </div>
          </div>
        </Link>
      
      </span>
    ))}
  </div>
      <div className="md-auto">
      {places.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => {
                    if(pageCount > 1){
                      setCurrent((prev) => prev - 10);
                      setPageCount(prev => prev - 1);
                    }
                  }}
                  className={`py-2 px-4 rounded bg-blue-500 text-white ${
                    !(pageCount > 1) && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>
                <div className="sm:flex items-center gap-2">
                  Page <strong>{pageCount} of {pageCounter()}</strong>
                </div>
                <button
                  onClick={() => {
                    if(pageCount < pageCounter()){
                      setCurrent((prev) => prev + 10);
                      setPageCount(prev => prev + 1);
                    }
                  }}
                  className={`py-2 px-4 rounded bg-blue-500 text-white ${
                    pageCount === pageCounter() && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
                
              </div>
            )}
            </div>
  </div>

)
}