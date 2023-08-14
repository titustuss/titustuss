import { useContext } from "react"
import axios from "axios";
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useState, useEffect } from "react";


export default function Header({category, setCategoryValue}) {
  const {user} = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  

  const handleChange = (e) => {
    setCategoryValue(e.target.value);
  }


  return (
  <div className="flex items-center justify-center">
    <div className="w-full mx-auto">
      {/* the logo */}
      <header className='flex sm:flex-row sm:justify-between items-center flex-wrap sm:flex-nowrap'>
      <div className=" ml-16 flex flex-col justify-center sm:ml-2">
        <Link to={'/'} className='flex flex-col items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='font-bold text-xl text-secondary'>ONA Properties</span>
        </Link>
      </div>
        {/* the search */}
      <div className="flex justify-between gap-5 mt-5 sm:mt-2">
        <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
          <button className='bg-primary text-white p-1 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

          <div className='flex gap-2 border border-gray-300 rounded py-1 px-2 shadow-md shadow-gray-300'>
              <select
                value={category}
                onChange={handleChange}
                required
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
              >
                <option value="all">All</option>
                <option value="hotel">Hotel</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="real estate">Real Estate</option>
                <option value="town house">Town House</option>
              </select>
          </div>
        
        {/* the user */}
        <Link to={user?'/account':'/login'} className='flex items-center gap-1 sm:gap-2 border-gray-300 rounded py-2 px-4 shadow-md shadow-gray-300'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="items-end bg-gray-500 text-white rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name.split(" ")[0]}
            </div>
          )}
        </Link>
        </div>

      </header>
    </div>
    </div>
  )
}