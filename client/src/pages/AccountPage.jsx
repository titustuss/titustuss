import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const [redirect,setRedirect] = useState(null)
    const {ready, user,setUser,}= useContext(UserContext)
    const [suscribeTo, setSuscribeTo] =useState(false);

    const [subscribeToMonthly, setSubscribeToMonthly] = useState(true);

    const handleSubscribeMonthly = () => {
      setSubscribeToMonthly(true);
    };
  
    const handleSubscribeYearly = () => {
      setSubscribeToMonthly(false);
    };

    
  
    let {subpage}= useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
}

    if(!ready){
        return 'Loading....'
    }

    if (ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }
    
    if(redirect){
        return <Navigate to={redirect} />
    }


    if(suscribeTo){
        return(
        <div className="flex justify-center items-center mt-10 ">
            <div className="grid gap-4 pb-8 bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="flex">
                    <h2 className="text-3xl pl-3 pt-3">Suscribe to  </h2>
                    <button onClick={()=>setSuscribeTo(false)} className=" ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="mx-2 sm:mx-4 h-20 w-auto sm:w-96 flex gap-10 bg-green-600 rounded-2xl overflow-hidden shadow-lg relative ">
                        <h1 className="flex items-center text-xl text-white ml-4">Pay with M-pesa</h1>
                        <img src={'http://localhost:5173/mpesa.jpg'} alt="" className=" h-20 ml-auto" />
                    </div>
                    <div className="mx-2 sm:mx-4 h-20 w-auto sm:w-96 flex gap-10 bg-blue-600 rounded-2xl overflow-hidden shadow-lg relative ">
                        <h1 className=" flex items-center text-xl text-white ml-4">Pay using Paypal</h1>
                        <img src={'http://localhost:5173/paypal2.jpg'} alt="" className=" h-20 ml-auto" />
                    </div>
                    <div className="mx-2 sm:mx-4 h-20 w-auto sm:w-96 flex gap-10 bg-red-500 rounded-2xl overflow-hidden shadow-lg relative ">
                        <h1 className=" flex items-center text-xl text-white ml-4">Pay using Strip</h1>
                        <img src={'http://localhost:5173/strip.jpg'} alt="" className=" h-20 ml-auto" />
                    </div>
                </div>
            
            </div>
        </div>
        )
    }
    return(
        <div>
          <AccountNav/>
            {subpage==='profile'&& (

                <div >
                    <div className="grid sm:grid-flow-col flex-grow justify-center gap-10 ">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-800/60 transition duration-300 relative">
                    <div className="p-6 text-gray-600">
                        <h1 className="text-3xl font-bold mb-2 font-body">PREMIUM PLAN</h1>
                        <div className="flex gap-4">
                        <h2
                        className={`${
                            subscribeToMonthly ? 'text-primary' : 'text-gray-400'
                        } cursor-pointer`}
                        onClick={handleSubscribeMonthly}
                        >
                        $9.99/month
                        </h2>
                        <h2
                        className={`${
                            !subscribeToMonthly ? 'text-primary' : 'text-gray-400'
                        } cursor-pointer`}
                        onClick={handleSubscribeYearly}
                        >
                        $99.99/year
                        </h2>
                        </div>
                        <p className="mt-4 mb-10">
                        <span className="flex items-center gap-2">
                            Add 2 properties <br />
                            add 8 photos <br />
                            easy update <br />
                            save 20% <br />
                            contact section <br />
                            Free Youtube video <br />
                            scalable map <br />
                            24 hrs support <br />
                        </span>
                        </p>
                        <br />
                    </div>
                    <button
                        onClick={()=>setSuscribeTo(true)}
                        className="absolute rounded-full bottom-3 left-0 right-0 mx-auto w-2/3 py-2 sm:py-3 bg-white text-secondary font-semibold tracking-wide hover:bg-primary hover:text-white hover:border-none border-2 border-secondary"
                    >
                        Subscribe
                    </button>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-800/60 transition duration-300 relative">
                    <div className="p-6 text-gray-600">
                        <h1 className="text-2xl font-bold mb-2 font-body">GOLDEN PLAN</h1>
                        <div className="flex gap-4">
                        <h2
                        className={`${
                            subscribeToMonthly ? 'text-primary' : 'text-gray-400'
                        } cursor-pointer`}
                        onClick={handleSubscribeMonthly}
                        >
                        $30/month
                        </h2>
                        <h2
                        className={`${
                            !subscribeToMonthly ? 'text-primary' : 'text-gray-400'
                        } cursor-pointer`}
                        onClick={handleSubscribeYearly}
                        >
                        $300/year
                        </h2>
                        </div>
                        <p className="mt-4 mb-10">
                        <span className="flex items-center gap-2">
                            Add 2 properties <br />
                            add 8 photos <br />
                            easy update <br />
                            save 20% <br />
                            Free Youtube video <br />
                            contact section <br />
                            scalable map <br />
                            24 hrs support <br />
                        </span>
                        </p>
                        <br />
                    </div>
                    <button
                        onClick={() => setSubscribeTo(true)}
                        className="absolute rounded-full bottom-3 left-0 right-0 mx-auto w-2/3 py-2 sm:py-3 bg-white text-secondary font-semibold tracking-wide hover:bg-primary hover:text-white hover:border-none border-2 border-secondary"
                    >
                        Subscribe
                    </button>
                    </div>

                    </div>

                    <div className="text-center max-w-lg mx-auto mt-10 mb-10">
                        Logged in as {user.name} ({user.email}),<br/>
                        <button onClick ={logout}className="primary max-w-sm mt-4">logout</button>
                    </div>
                </div>
            )}

            {subpage ==='places' && (
                <PlacesPage/>
            )}
        </div>
    );
}