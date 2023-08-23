import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const [redirect,setRedirect] = useState(null)
    const {ready, user,setUser,}= useContext(UserContext)
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
    return(
        <div>
            <h2>Hi!! { user.name}</h2>
          <AccountNav/>
            {subpage==='profile'&& (

                <div >
                    <div className="grid sm:grid-flow-col flex-grow justify-center gap-4 ">
                        <div className="bg-white rounded overflow-hidden shadow-lg hover:shadow-blue-800/60 transition duration-300 relative">
                            <div className="p-6 text-gray-600">
                            <h1 className="text-2xl font-bold mb-2 font-body ">BASIC PLAN</h1>
                            <h1 className="text-4xl font-bold">$10/MO</h1>
                            <p className="mt-4 mb-10">
                                <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Add 1 property <br />
                                add 8 photos <br />
                                easy update <br />
                                save 20% <br />
                                contact section <br />
                                scallable map <br />
                                24hr support <br />
                                </span>
                            </p>
                            </div>
                            <button className="absolute rounded-full bottom-3 left-0 right-0 mx-auto w-2/3 py-2 sm:py-3 bg-white text-secondary font-semibold uppercase tracking-wide hover:bg-primary hover:text-white hover:border-none border-2 border-secondary">
                            START NOW
                            </button>
                        </div>

                        <div className="bg-white rounded overflow-hidden shadow-lg hover:shadow-blue-800/60 transition duration-300 relative">
                            <div className="p-6 text-gray-600">
                                <h1 className="text-2xl font-bold mb-2 font-body">PREMIUM PLAN</h1>
                                <h1 className="text-4xl font-bold">$100/YR</h1>
                                <p className="mt-4 mb-10">
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Add 2 properties <br />
                                        add 8 photos <br />
                                        easy update <br />
                                        save 20% <br />
                                        contact section <br />
                                        Free Youtube video <br />
                                        scallable map <br />
                                        24 hrs support <br />
                                    </span>
                                </p><br />
                            </div>
                            <button className="absolute rounded-full bottom-3 left-0 right-0 mx-auto w-2/3 py-2 sm:py-3 bg-white text-secondary font-semibold uppercase tracking-wide hover:bg-primary hover:text-white hover:border-none border-2 border-secondary">
                                START NOW
                            </button>
                            </div>

                            <div className="bg-white rounded overflow-hidden shadow-lg hover:shadow-blue-800/60 transition duration-300 relative">
                                <div className="p-6 text-gray-600">
                                    <h1 className="text-2xl text font-bold mb-2 font-body">GOLDEN PLAN</h1>
                                    <h1 className="text-4xl font-bold">$130/YR</h1>
                                    <p className="mt-4 mb-10">
                                        <span className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Add 2 properties <br />
                                            add 8 photos <br />
                                            easy update <br />
                                            save 20% <br />
                                            Free Youtube video <br />
                                            contact section <br />
                                            scallable map <br />
                                            24 hrs support <br />
                                             
                                        </span>
                                    </p><br />
                                </div>
                                <button className="absolute rounded-full bottom-3 left-0 right-0 mx-auto w-2/3 py-2 sm:py-3 bg-white text-secondary font-semibold uppercase tracking-wide hover:bg-primary hover:text-white hover:border-none border-2 border-secondary">
                                    START NOW
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