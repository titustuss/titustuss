import { useEffect, useState } from "react";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage (){
    const {id} =useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] =useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo]= useState('');
    const [price,setPrice] = useState(1000);
    const [fileInputState, setFileInputState] = useState();
    const [previewSource ,setPreviewSource] = useState();
    const [redirect,setRedirect]= useState(false);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+ id)
        .then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setPrice(data.price);
        })
    },[id]);

    function inputHeader(text) {
        return(
            <h2 className="text-lg mt-3">{text}</h2>
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
        const {data: filename}=await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev =>{
            return [...prev, filename];
        });
        setPhotoLink('');
    }
  
// upload by file
const uploadPhoto = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(prev => [...prev, reader.result]); // Append the new previewSource to the existing array
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    await uploadImage(previewSource[previewSource.length - 1]); // Pass the last added previewSource
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await axios.post('/upload', { data: base64EncodedImage }, {
        headers: { 'Content-type': 'application/json' }
      });
      console.log('Image uploaded successfully.');
      
      // You can still update the previewSource state with the new filename if needed
      // const { data: filename } = response.data;
      // setPreviewSource(prev => [...prev, filename]);
    } catch (error) {
      console.error(error);
    }
  };

    async function savePlace(e){
        e.preventDefault();
        const placeData={
            title,address, addedPhotos,
            description,perks, extraInfo,price}
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

    function removePhoto (e,filename){
        e.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function selectAsMainPhoto (e,filename){
        e.preventDefault();
        setAddedPhotos([filename,...addedPhotos
            .filter(photo => photo !== filename)]);
    }
    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('Title','Title for your property, should be short and catchy')}
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title"/>

            {preInput('Address','Address to your property')}
                <input type="text" value={address} onChange={e=>setAddress(e.target.value)} placeholder="address"/>
            {preInput('Photos','more=better')}    
                <div className="flex gap-3">
                    <input value={photoLink}
                     onChange={e=>setPhotoLink(e.target.value)} 
                     type="text" placeholder={'Add using a link "must start with" http//....)'} />
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                </div>

            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map((link) => (
                <div key={link} className="relative h-32 flex">
                 <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+ link} alt=" " />
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

            {/* {previewSource && (
                <div className="h-32 flex">
                <img src={previewSource} alt="chosen" style={{
                    height:'130px'
                }} />
                </div>
            )} */}

                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-xl p-2 text-xl text-gray-600" >
                    <input type="file" name="image" multiple className="hidden" onChange={uploadPhoto} value={fileInputState}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                        Upload
                </label>
                
                <div>
                    <input type="file" name="image" onChange={uploadPhoto} value={fileInputState}/>
                    <button className='bg-red-500' type="submit">submit</button>
                </div>
            </div>

            {preInput('Description','The description of the property')} 
                <textarea value={description} onChange={e=>setDescription(e.target.value)}></textarea>

            {preInput('Perks','Select all the perks of your property')} 
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
               <Perks selected={perks} onChange={setPerks}/>
            </div>

            {preInput('Extra info','More into details of the property')} 
                <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}></textarea>

            {preInput('Property Price','the price of your property')} 
            <input type="number" value={price} onChange={e=>setPrice(e.target.value)}></input>
            
            <button className="primary my-4">Save</button>
        
        </form>
     </div>
    );

}