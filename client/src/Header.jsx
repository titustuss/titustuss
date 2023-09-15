import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useState, useEffect } from "react";
import { IoSearchOutline } from 'react-icons/io5';


export default function Header({category, setCategoryValue, searchInput, setSearchInputValue}) {
  const {user} = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [toggle,setToggle] =useState(false);

  const handleChange = (e) => {
    setCategoryValue(e.target.value);
  }

  const handleSearch = (e) => {
    let searchValue = document.getElementById("searchDialogBox").value;
    setSearchInputValue(searchValue);
  }

  const handleMenuItemClick = () => {
    setToggle(false);
  };


  return (
  <div className="flex items-center justify-center">
    <div className="w-full mx-auto">
      {/* the logo */}
      <header className='flex flex-col sm:flex-row sm:justify-between items-center flex-wrap sm:flex-nowrap'>
      <div className="flex flex-col justify-center sm:ml-2">
        <Link to={'/'} className='flex flex-col items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='font-bold text-xl text-secondary'>ONA Properties</span>
        </Link>
      </div>
        {/* the search */}
    <div className="flex flex-col sm:flex-row justify-center gap-5 mt-5 sm:mt-2">
      <div className="">
          <div className="relative flex items-stretch">
            <input
              type="search"
              id="searchDialogBox"
              className="relative m-0 -mr-0.5 block w-50 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            {/* Search button */}
            <button
              className="relative  flex items-center rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
    </div>
        <div className="flex">
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
        <div className="flex">
         <div className="  cursor-pointer flex flex-1 justify-end items-center border-gray-300 rounded px-4 shadow-md shadow-gray-300">
         <img
            src={toggle ? 'http://localhost:5173/close.svg' : 'http://localhost:5173/menu.svg'}
            alt="menu"
            className="w-8 h-8"
            onClick={() => setToggle((prev) => !prev)}
          />

            <div
              className={`${!toggle ?"hidden" :  "flex"} p-6 z-10 bg-primary text-white font-semibold absolute top-56 sm:top-20 right-6 mx-4 my-2 min-w-[140px] rounded-xl `}
            >
              <div>
              <ul>
              <li>
                <Link to="/" onClick={handleMenuItemClick}>
                  <h1>Home</h1>
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleMenuItemClick}>
                  <h1>Login</h1>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={handleMenuItemClick}>
                  <h1>Sign Up</h1>
                </Link>
              </li>
              <li>
                <Link to={user?'/account':'/login'} onClick={handleMenuItemClick}>
                  <h1>My account</h1>
                </Link>
              </li>
              <li>
                <Link to={user?'/account':'/login'} onClick={handleMenuItemClick}>
                  <h1>Advertise</h1>
                </Link>
              </li>
            </ul>
              </div>
            </div>
          </div>
          
            <Link to={user?'/account':'/login'} className='flex items-center gap-1 sm:gap-2 border-gray-300 rounded py-2 px-4 shadow-md shadow-gray-300'>
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
        </div>
      </div>

      </header>
    </div>
    </div>
  )
}