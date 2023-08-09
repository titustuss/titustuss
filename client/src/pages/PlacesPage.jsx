import { Link, useParams } from "react-router-dom"
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PlacesPage(){
    
    const [places, setPlaces] = useState([])
    useEffect(()=>{
     axios.get('/user-places').then(({data})=>{
        setPlaces(data)
     })
    },[]);


    const handleDelete = (id) => {
        // Show an alert to confirm the deletion
        const confirmDelete = window.confirm('Are you sure you want to delete this property?');
      
        if (confirmDelete) {
          // Send a delete request to the server
          axios.delete(`/places/${id}`)
            .then(response => {
              // If the deletion is successful, update the 'places' state with the new array after the deletion
              setPlaces(prevPlaces => prevPlaces.filter(place => place._id !== id));
            })
            .catch(error => {
              // Handle any errors that occurred during the deletion process
              console.error('Error deleting property:', error);
            });
        } else {
          // Do nothing if the user cancels the deletion
          console.log('Deletion canceled.');
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <AccountNav/>
        <div className="max-w-screen-xl text-center">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new places
                </Link>
            </div> 
            
                <div className="mt-4 ml-4">
                    {places.length > 0 && places.map(place => (
                        <div key={place._id} className="relative flex mb-4 mr-4 ml-4">
                        <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl">
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {place.photos.length > 0 && (
                                <img className='object-cover' src={place.photos[0]} alt="" />
                            )}
                            </div>
                            <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                        <button onClick={() => handleDelete(place._id)}
                        className=" cursor-pointer absolute bottom-1 right-1 bg-opacity-50 rounded-xl hover:bg-red-500 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                        </button>
                        </div>
                    ))}
            </div>
        </div>
    )
} 