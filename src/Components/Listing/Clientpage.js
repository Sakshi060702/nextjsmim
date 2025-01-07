'use client';
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/Gallerypopup.css";



const Clientreview = (companyID) => {

  const [imageURLs, setImageURLs] = useState([]); 
  const [error, setError] = useState("");
  const { listingId } = useParams();
//  console.log('companyid',companyID.listingID)
 const company_idFetch = {companyID: companyID.listingID.companyID};
//  console.log('company_idFetch',company_idFetch)

const[modalOpen,setModalOpen]=useState(false);
const[selectedImage,setSelectedImage]=useState(null);

const openModel=(image)=>{
  setSelectedImage(image);
  setModalOpen(true);
}

const closeModel=()=>{
  setSelectedImage(null);
  setModalOpen(false);
}


  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetClientImage",
          {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(company_idFetch), 
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        
       
        if (data && data.imagepath) {
          setImageURLs(data.imagepath.map((img) => ({ url: img }))); 
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      }
    };

    if(companyID)
    {
      fetchGalleryImages(); 
    }
      
    
  }, [ companyID]); 

  return (
    <div className="labournakaclient-container">
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          {imageURLs.length > 0 ? (
            imageURLs.map((image, index) => (
              <img
                key={index}
                className="upload_images ListingClient uploadimages"
                src={`https://apidev.myinteriormart.com${image.url}`}
                alt={`Certificate ${index + 1}`}
                style={{ paddingTop: '10px', margin: '10px',height:'100px',width:'100px' }} 
                onClick={()=>openModel(image.url)}
              />
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>

      {modalOpen &&(
         <div className="CLmodal-overlay">
         
         <div className="CLmodal-content" onClick={(e)=>e.stopPropagation()}>
         <button className="CLmodal-close" onClick={closeModel}>
        &times;
      </button>
           <img  src={`https://apidev.myinteriormart.com${selectedImage}`}
               alt="Full View"
               className="CLmodal-image"/>
              
         </div>
        
       </div>
      )}
      
    </div>
  );
};


export default Clientreview