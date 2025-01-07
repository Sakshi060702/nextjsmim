'use client';
import React, { useState ,useEffect} from "react";
// import { Link,useNavigate } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import withAuthh from "@/app/Hoc/withAuth";
import Popupalert from "./Popupalert";
import useAuthCheck from "@/app/Hooks/useAuthCheck";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";



function Addspecialisationf()
{
    const [specialisations, setSpecialisations] = useState({
        selectAll: false,
        acceptTenderWork: false,
        bank: false,
        beautyParlors: false,
        bungalow: false,
        callCenter: false,
        church: false,
        company: false,
        computerInstitute: false,
        dispensary: false,
        exhibitionStall: false,
        factory: false,
        farmhouse: false,
        gurudwara: false,
        gym: false,
        healthClub: false,
        home: false,
        hospital: false,
        hotel: false,
        laboratory: false,
        mandir: false,
        mosque: false,
        office: false,
        plazas: false,
        residentialSociety: false,
        resorts: false,
        restaurants: false,
        salons: false,
        shop: false,
        shoppingMall: false,
        showroom: false,
        warehouse: false,
      });
    
    //   const navigate=useNavigate();
    const router=useRouter();
      const token=useSelector((state)=>state.auth.token);
    

      const [showPopup, setShowPopup] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const[successMessage,setSuccessMessage]=useState("");

      const isAuthenticated=useAuthCheck();


      useEffect(()=>{
        const fetchSpecialisations=async()=>{
          try{
            const response=await fetch("https://apidev.myinteriormart.com/api/BinddetailsListing/GetSpecializationDetailslisting",{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
    
            if(!response.ok){
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data=await response.json();
            setSpecialisations((prevState)=>({
              ...prevState,
              ...data,
            }));
          }
          catch(error)
          {
            console.error("Error:", error);
          }
        };
        if(isAuthenticated){
          fetchSpecialisations();
        }
       
      },[token]);
    
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSpecialisations((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      };
    
      const handleSelectAll = () => {
        const allSelected = !specialisations.selectAll;
        const updatedSpecialisations = Object.fromEntries(
          Object.keys(specialisations).map((key) => [key, allSelected])
        );
        setSpecialisations(updatedSpecialisations);
      };
    
      const handleSubmit = async () => {


        const isAnyCheckboxSelected = Object.keys(specialisations).some(
          (key) => specialisations[key] === true
        );
      
        if (!isAnyCheckboxSelected) {
          setErrorMessage("Please select at least one Specialisation.");
          setSuccessMessage(""); // Clear any existing success message
          setShowPopup(true);
          return; // Prevent form submission
        }

        try {
          const response = await fetch("https://apidev.myinteriormart.com/api/Specialisation/CreateSpecialisation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(specialisations),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log("Response:", data);
          // console.log("Specialisation token",token);

          const cityName = localStorage.getItem('cityname');
        const pathlisting = `/Flayout/addworkinghours`;

        router.push(pathlisting);

          // setSuccessMessage("Specialisation Details Saved Successfully");
          // setErrorMessage("");
          // setShowPopup(true);
    
          // setTimeout(() => {
          //   setShowPopup(false);
          //   navigate(pathlisting);
          // }, 2000);

         
          // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("Failed to save Specialisation details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
          // Handle error (e.g., show an error message)
        }
      };

      const handleClosePopup = () => {
        setShowPopup(false);
      };
    
    return(

        <div >
        <div >
          <div >
            <div >
              <h4>Add Specialisation Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Specialisation Details
                
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                    onClick={handleSelectAll}
                  >
                    Select All
                  </button>
                </div>
              </div>
              <div className="row" style={{justifyContent:'normal'}}>
                {Object.keys(specialisations).map(
                  (key, index) =>
                    !["selectAll", "listingID", "ownerGuid", "ipAddress"].includes(key)  && (
                      <div className="col-md-3" key={index}>
                        <div className="clearfix add_bottom_15">
                          <div className="checkboxes float-left">
                            <label className="container_check">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                              <input
                                type="checkbox"
                                id={key}
                                name={key}
                                checked={specialisations[key]}
                                onChange={handleCheckboxChange}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1 freelistingpagebtn"  onClick={handleSubmit}>
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                        <Link href='/Flayout/addcategory' ><img src='/img/Backarrow.png' style={{height:'30px'}}/></Link>
                      <Link href='/Flayout/addworkinghours' ><img src='/img/Frontarrow.png' style={{height:'30px'}}/></Link>
                      </div>
                  </div>
                  {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            

onClose={handleClosePopup}
          />
          )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Addspecialisationf;