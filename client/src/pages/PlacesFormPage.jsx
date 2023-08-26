import { useEffect, useState } from "react";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";

export default function PlacesFormPage (){
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [address, setAddress] = useState('');

    const [category, setCategory] = useState('apartment');
    const [contact, setContact] = useState(+254);
    const [contactCode, setContactCode] = useState("🇨🇦 +1");
    const [countryPhone, setCountryPhone] = useState([]);
    const [currency, setCurrency] = useState("AED - د.إ");
    const [currencies, setCurrencies] = useState([]);

    const [description, setDescription] = useState('');

    const [email,setEmail] = useState('');
    const [extraInfo, setExtraInfo]= useState('');

    const [fileInputState, setFileInputState] = useState();

    const {id} = useParams();

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const [perks, setPerks] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [positionLoaded, setPositionLoaded] = useState(false);
    const [previewSources, setPreviewSources] = useState([]);
    const [price, setPrice] = useState(1000);

    const [redirect,setRedirect]= useState(false);
    
    const [title, setTitle] = useState('');
    
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    
    const [website, setWebsite]= useState('');
    const [youtube, setYoutube]= useState('');

    useEffect(()=>{
        fetch('http://localhost:5173/src/pages/countrydata.json')
        .then(response => response.json())
        .then(data => {
            for (const countryData of data) {
                for(const currencyCode in countryData.currencies){
                    setCurrencies(prev => [...new Set([...prev, currencyCode+" - "+countryData.currencies[currencyCode].symbol].sort())]);
                }
                
                if(!countryData.idd.suffixes){
                    console.log("Have A Wonderful Day");
                }else{
                    if(countryData.idd.suffixes.length > 1){
                        for(const suff of countryData.idd.suffixes){
                            let phoneCode = countryData.flag + " " + countryData.idd.root + suff;
                            setCountryPhone(prev => [...new Set([...prev, phoneCode].sort((a, b)=> parseInt(a.split("+")[1]) - parseInt(b.split("+")[1])))]);
                        }
                    }else{
                        let phoneCode = countryData.flag + " " + countryData.idd.root + countryData.idd.suffixes;
                        setCountryPhone(prev => [...new Set([...prev, phoneCode].sort((a, b)=> parseInt(a.split("+")[1]) - parseInt(b.split("+")[1])))]);
                    }
                    
                }
                
                
                
                
            }
        })
        .catch(error => console.error('Error fetching data:', error));

        if(!id){
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                setLatitude(lat);
                setLongitude(lng);
                setPositionLoaded(true);
            }, (err) => {
                if(err.code === 1){
                    alert("Kindly Allow Geolocation For Business Location Determination");
                }else{
                    alert("Location Cannot Be Determined");
                }
            });
            return;
        }
        axios.get('/places/'+ id)
        .then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setCategory(data.category);
            setCurrency(data.currency);
            setDescription(data.description);
            setContact(data.contact);
            setContactCode(data.contactCode);
            setEmail(data.email);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setWebsite(data.website);
            setYoutube(data.youtube);
            setPrice(data.price);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setPositionLoaded(true);
        });

    },[id]);


    function inputHeader(text) {
        return(
            <h2 className="font-semibold text-2xl mb-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    // upload by link
    async function addPhotoByLink(e){
        e.preventDefault();
        const filename =await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev => [...prev, filename.data]);
        setPhotoLink('');
    }
  

    // upload using file

    async function processFile(e){
        var file = e.target.files[0];
      
        const newName = 'photo' + Date.now();
      
        // Set your cloud name and unsigned upload preset here:
        var YOUR_CLOUD_NAME = "dfgrndvvy";
        var YOUR_UNSIGNED_UPLOAD_PRESET = "dev_setups";
      
        var POST_URL =
          "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";
      
        var XUniqueUploadId = new Date();
      
        processFile();
      
        function processFile(e) {
          var size = file.size;
          var sliceSize = 20000000;
          var start = 0;
      
          setTimeout(loop, 3);
      
          function loop() {
            var end = start + sliceSize;
      
            if (end > size) {
              end = size;
            }
            var s = slice(file, start, end);
            send(s, start, end - 1, size);
            if (end < size) {
              start += sliceSize;
              setTimeout(loop, 3);
            }
          }
        }
      
        function send(piece, start, end, size) {
      
          var formdata = new FormData();
      
          formdata.append("file", piece);
          formdata.append("cloud_name", YOUR_CLOUD_NAME);
          formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
          formdata.append("public_id", newName);
      
          var xhr = new XMLHttpRequest();
          xhr.open("POST", POST_URL, false);
          xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
          xhr.setRequestHeader(
            "Content-Range",
            "bytes " + start + "-" + end + "/" + size
          );
          
          
          xhr.onload = function () {
            // Getting the imageURL and adding it to AddedPhotos
            let response = this.responseText;
            let responseData = JSON.parse(response);
            let imageUrl = responseData.secure_url;
            setAddedPhotos((prev) => [...prev, imageUrl]);

            
          };
      
          xhr.send(formdata);
      
        }
      
        function slice(file, start, end) {
          var slice = file.mozSlice
            ? file.mozSlice
            : file.webkitSlice
            ? file.webkitSlice
            : file.slice
            ? file.slice
            : noop;
      
          return slice.bind(file)(start, end);
        }
      
        function noop() {}
      };

    async function savePlace(e){
        e.preventDefault();
        // Upload all the previewed photos
        const placeData={
            title,address, category, addedPhotos,
            description, contactCode, contact, email, perks, extraInfo, website, youtube, latitude, longitude, currency, price}
        if(id){
            // update
            await axios.put('/places',{
                id,
                ...placeData
            });
            setRedirect(true);
        }else{
            // new place
            await axios.post('/places',{
                ...placeData
            });
            setRedirect(true);
        }

    }

    if (redirect){
        return <Navigate to={'/account/places'}/>
    }

    async function removePhoto (e,filename){
        e.preventDefault();
        const publicId = filename.split("/")[7].split(".")[0];
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
        await axios.post('/get-public-id', {publicId: publicId});
    }

    function selectAsMainPhoto (e,filename){
        e.preventDefault();
        setAddedPhotos([filename,...addedPhotos
            .filter(photo => photo !== filename)]);
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center pb-10">
            <div className="pt-6">
            <AccountNav/>
            </div>
        <form onSubmit={savePlace} className="md-8">
            
            <div className="bg-white p-4 rounded-lg shadow-lg relative showcase-form max-w-screen-2xl">
            <div className="form-control mb-4">
        

            {preInput('Title','Title for your property, should be short and catchy')}
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}required
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none" 
                placeholder="title"/>
            </div>

            <div className="form-control mb-4">
            {preInput('Address','Address to your property')}
                <input type="text" value={address} onChange={e=>setAddress(e.target.value)}required
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                 placeholder="address"/>
            </div>

            <div className="form-control mb-4">
            {preInput('Category','Select property type')}
            <select
                onChange={(e) => setCategory(e.target.value)}
                required
                defaultValue="apartment"
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
            >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="hotel">Hotel</option>
                <option value="real estate">Real estate</option>
                <option value="town house">Town house</option>
            </select>
            </div>

                <div className="form-control mb-4">
                    {preInput('Photos','upload a 728 by 455 HD photo " the better the quality the more the attraction "')}    
                        <div className="flex gap-3">
                            <input value={photoLink}
                            onChange={e=>setPhotoLink(e.target.value)}
                            className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                            type="text" placeholder={'Add using a link "must start with" http//....)'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                        </div>
                </div>

            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map((link) => (
                <div key={link} className="relative h-32 flex">
                 <img className="rounded-2xl w-full object-cover" src={link} alt=" " />
                    <button onClick={(e)=> removePhoto(e,link)} className=" cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-xl p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    </button>
                    <button onClick={(e)=> selectAsMainPhoto(e,link)} className=" cursor-pointer absolute left-1 text-white bg-black bg-opacity-50 rounded-xl p-1">
                        {link === addedPhotos[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          
                        )}
                        {link !== addedPhotos[0] && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        )}
                    </button>
                 </div>

            ))}


                {/* Display preview of chosen photos */}
                    {previewSources.map((source, index) => (
                        <img
                        key={index}
                        src={source}
                        alt={`Preview ${index}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                        />
                    ))}

                {/* Display the uploaded photos */}
                    {uploadedPhotos.map((photoUrl, index) => (
                        <img
                        key={index}
                        src={photoUrl}
                        alt={`Uploaded ${index}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                        />
                        
                    ))}

                
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-xl p-2 text-xl text-gray-600" >
                    <input type="file" name="image" multiple className="hidden" onChange={processFile} /*value={fileInputState}*//>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                        Upload
                </label>
                
            </div>
            
            <div className="form-control mb-4">
                {preInput('Description','The description of the property')} 
                <textarea value={description} onChange={e=>setDescription(e.target.value)}required
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                ></textarea>
            </div>

            <div className="form-control mb-4">          
                {preInput('Contact','Enter your contact')}
                    <select defaultValue={contactCode} className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none" onChange={e => setContactCode(e.target.value)}>
                        {countryPhone.length > 0 && countryPhone.map((contactCode, index) => (
                                <option key={index} value={contactCode}>{contactCode}</option>
                            ))}
                    </select>
                    <input type="number" value={contact} onChange={e=>setContact(e.target.value)} required
                    className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                    placeholder="Enter phone number" minLength={9} maxLength={10}></input>
            </div> 

            <div className="form-control mb-4">
                {preInput('Email','Enter the email to be contacted on')}
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                    className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                    placeholder="Email"/>
            </div>
            
            
            {preInput('Perks','Select all the perks of your property')} 
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
               <Perks selected={perks} onChange={setPerks}/>
            </div>
            
            <div className="form-control mb-4">
                {preInput('Extra info','More into details of the property')}
                <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}
                 className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none">
                </textarea>
            </div>

            <div className="form-control mb-4">

                {preInput('Your Website','Enter the url of your website if have one')}
                    <input type="text" value={website} onChange={e=>setWebsite(e.target.value)}
                    className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                    placeholder="https://yourwebsite.com"/>
            </div>

            <div className="form-control mb-4">
                {preInput('Youtube Vedio','Enter the link of your Youtube video here')}
                    <input type="text" value={youtube} onChange={e=>setYoutube(e.target.value)}
                    className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none"
                    placeholder="https://youryoutubevedio"/>
            </div>

            <div className="form-control mb-4 ">
                {preInput('Location', 'be at the property to grab the location automatically')}
                <div className="mt-3"><MapComponent latitude={latitude} longitude={longitude} positionLoaded={positionLoaded} setLatitude={setLatitude} setLongitude={setLongitude} /></div>
            </div>
            <div className="form-control mb-4 ">
                {preInput('Property Price','the price of your property')}
                <select onChange={e => setCurrency(e.target.value)}>
                    {currencies.length > 0 && currencies.map((tender, index) => (
                            <option key={index} value={tender}>{tender}</option>
                        ))}
                </select>
                <input type="number" value={price} onChange={e=>setPrice(e.target.value)}required
                className="border-b-2 border-gray-300 w-full py-1 px-3 text-base focus:outline-none">
                </input>
            </div>

            <button className="primary my-4 max-w-10">Save</button>
        </div>
        </form>
     </div>
    );

}

function MapComponent({latitude, longitude, positionLoaded, setLatitude, setLongitude}){

    const handleMarkerDragEnd = (event) => {
        const newPosition = event.target.getLatLng();
        setLatitude(newPosition.lat);
        setLongitude(newPosition.lng);
    }
    

    return (
        <div>
            {positionLoaded && (
                <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '350px'}}>
                <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                <Marker position={[latitude, longitude]} draggable eventHandlers={{dragend: handleMarkerDragEnd }}>
                    <Popup>You are here</Popup>
                </Marker>
            </MapContainer>
            )}
        </div>
    )
}