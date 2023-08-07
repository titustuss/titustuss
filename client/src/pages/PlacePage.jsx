import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PlacePage(){
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/' + id).then(response =>{
            setPlace(response.data)
            console.log(response.data);
        });
    },[id]);

    if(!place) return '';

    if(showAllPhotos){
        return(
        <div className="absolute bg-black text-white min-w-full min-h-screen">
            <div className="bg-black grid gap-4">
                <div>
                    <h2 className="text-3xl">Photos of {place.title}</h2>
                    <button onClick={()=>setShowAllPhotos(false)} className="fixed flex gap-1 right-2 top-8 py-2 px-3 rounded-2xl shadow shadow-black-500 bg-white text-black ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                    close</button>
                </div>
            {place?.photos?.length > 0 && place.photos.map(photo =>(
                <div>
                <img src={photo} alt="" />
                </div>
            ))}
            </div>
        </div>
        )
    }

    return(
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-5">
            <h1 className="font-semibold text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?g='+ place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl  ">
                    <div className="object-fit">
                        {place.photos?.[0] && (
                            <div>
                                <img className="object-cover" src={place.photos?.[0]} alt="" width={1240} height={870} />
                            </div>
        
                        )}
                    </div>
                    <div className="grid gap-2">
                        {place.photos?.[1] && (
                            <img className="object-cover" src={place.photos?.[1]} alt=""width={704} height={503} />
                        )}
                        <div >
                        {place.photos?.[2] && (
                            <img className="object-cover" src={place.photos?.[2]} alt="" width={704} height={503}/>
                        )}
                        </div>
                    </div>
                </div>
                <button onClick={()=>setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-3 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                    Show more photos
                    </button>
            </div>
            <div className="my-4 ">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
            </div>
  
            <div className="grid grid-cols-2 gap-4 mt-5">
                {place.perks.length > 0 && (
                    <h2 className="font-semibold text-2xl">Perks</h2>
                )} <br />
                <div>
                    {place.perks.map((perk, index) => (
                    <div key={index} className="flex items-center p-3">
                        <img src={'http://localhost:5173/' + perk + '.svg' } alt={perk.name} className="w-8 h-8 mr-2" />
                        <span>{perk}</span>
                    </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg mb-3">
                    <h1 className="font-semibold text-2xl mb-4">Contact us</h1>
                    <a href={`tel:${place.contact}`} className="flex items-center mb-2">
                        <span className="mr-2">{place.contact}</span>
                        <div className="border border-gray-300 rounded-lg p-2 flex items-center">
                            <img src={'http://localhost:5173/phone.svg'} alt="" className="w-8 h-8 mr-2" />
                            <h1 className="text-lg font-medium text-gray-800">PHONE</h1>
                        </div>
                    </a>
                    <a href={`sms:${place.contact}`} className="flex items-center mb-2">
                        <span className="mr-2">{place.contact}</span>
                        <div className="border border-gray-300 rounded-lg p-2 flex items-center">
                            <img src={'http://localhost:5173/message.svg'} alt="" className="w-8 h-8 mr-2" />
                            <h1 className="text-lg font-medium text-gray-800">MESSAGE</h1>
                        </div>
                    </a>
                    <a href={`https://wa.me/${place.contact}`} target="_blank" rel="noopener noreferrer" className="flex items-center mb-2">
                        <span className="mr-2">{place.contact}</span>
                        <div className="border border-gray-300 rounded-lg p-2 flex items-center">
                            <img src={'http://localhost:5173/whatsapp.svg'} alt="" className="w-8 h-8 mr-2" />
                            <h1 className="text-lg font-medium text-gray-800">WHATSAPP</h1>
                        </div>
                    </a>
                    <a href={`mailto:${place.email}`} className="flex items-center mb-2">
                        <span className="mr-2">{place.contact}</span>
                        <div className="border border-gray-300 rounded-lg p-2 flex items-center">
                            <img src={'http://localhost:5173/email.svg'} alt="" className="w-8 h-8 mr-2" />
                            <h1 className="text-lg font-medium text-gray-800">EMAIL</h1>
                        </div>
                    </a>
                </div>

            </div>
            <div className="my-4">
                <h2 className="font-semibold text-xl">ExtraInfo</h2>
                {place.extraInfo}
            </div>
        </div>
    )
}