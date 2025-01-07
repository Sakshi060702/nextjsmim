'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import withAuthh from "@/app/Hoc/withAuth";
import Popupalert from "./Popupalert";
import Select from "react-select";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Mangelisting.css";

function Addcategoryf()
{
    const [firstCategories, setFirstCategories] = useState([]);
  const [secondCategories, setSecondCategories] = useState([]);
  const [thirdCategories, setThirdCategories] = useState([]);
  const [fourthCategories, setFourthCategories] = useState([]);
  const [fifthCategories, setFifthCategories] = useState([]);
  const [sixthCategories, setSixthCategories] = useState([]);
  const [selectedFirstCategory, setSelectedFirstCategory] = useState("");
  const [selectedSecondCategory, setSelectedSecondCategory] = useState("");
  const [selectedThirdCategory, setSelectedThirdCategory] = useState("");
  const [selectedFourthCategory, setSelectedFourthCategory] = useState("");
  const [selectedFifthCategory, setSelectedFifthCategory] = useState("");
  const [selectedSixthCategory, setSelectedSixthCategory] = useState("");

  const [selectAll, setSelectAll] = useState(false);

const router=useRouter();
  const token=useSelector((state)=>state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  // const firstcat=localStorage.getItem('businessType')
  const firstcat=sessionStorage.getItem('businessType')
  console.log('businesstype',firstcat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetCategoriesDetailslisting",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
           
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const { allCategories } = data;

        if (allCategories && allCategories.length > 0) {
          setFirstCategories(allCategories);

          if(firstcat){
            setSelectedFirstCategory(parseInt(firstcat))
          }
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchUserCategories=async()=>{
      try{
        const response=await fetch("https://apidev.myinteriormart.com/api/BinddetailsListing/GetCategoriesDetailslisting",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data=await response.json();

        if (data && data.category) {
          setSelectedFirstCategory(data.category.firstCategoryID);
          setSelectedSecondCategory(data.category.secondCategoryID);
          setSelectedThirdCategory(data.category.thirdCategoryID.split(",").map(Number));
          setSelectedFourthCategory(data.category.fourthCategoryID.split(",").map(Number));
          setSelectedFifthCategory(data.category.fifthCategoryID.split(",").map(Number));
          setSelectedSixthCategory(data.category.sixthCategoryID.split(",").map(Number));
          
          console.log('User categories fetched', data);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } 
      catch(error)
      {
        console.error("Error fetching user categories:", error);
      }
    }

    fetchData();
    fetchUserCategories();
  }, []); // Empty dependency array to run effect only once


  useEffect(() => {
    console.log("BRAVOOOO")
    console.log('category')
    if (selectedFirstCategory) {
      console.log(firstCategories);
      const selectedFirstCat = firstCategories.find(
        (category) => category.firstCategoryID === selectedFirstCategory
      );
      const selectedFirstCat_ak = firstCategories.find(
        (category) => {
          console.log("first category",category.firstCategoryID)
          console.log(category.firstCategoryID, parseInt(selectedFirstCategory), category.firstCategoryID === parseInt(selectedFirstCategory));
          if(category.firstCategoryID === parseInt(selectedFirstCategory)){
            console.log(selectedFirstCategory);
            console.log(selectedFirstCat);
            console.log(category);
            setSecondCategories(category.secondCategories || []);
          }
        }
      );

      console.log(selectedFirstCat);
      console.log(selectedFirstCategory);
      // setSecondCategories(selectedFirstCat.secondCategories);
      // if (selectedFirstCat) {
      //   setSecondCategories(selectedFirstCat.secondCategories || []);
      // }
    }
  }, [selectedFirstCategory, firstCategories]);


  useEffect(() => {
    if (selectedSecondCategory) {
      const selectedSecondCat = secondCategories.find(
        (category) => category.secondCategoryId === selectedSecondCategory
      );
      if (selectedSecondCat) {
        setThirdCategories(selectedSecondCat.thirdCategories || []);
        setFourthCategories(selectedSecondCat.fourthCategories || []);
        setFifthCategories(selectedSecondCat.fifthCategories || []);
        setSixthCategories(selectedSecondCat.sixthCategories || []);
      }
    }
  }, [selectedSecondCategory, secondCategories]);

  const handleFirstCategoryChange = (e) => {
    const selectedFirstCategoryID = e.target.value;
    setSelectedFirstCategory(selectedFirstCategoryID); // Update state
    const selectedFirstCategory = firstCategories.find(
      (category) =>
        category.firstCategoryID === parseInt(selectedFirstCategoryID)
    );
    if (selectedFirstCategory) {
      setSecondCategories(selectedFirstCategory.secondCategories); // Update second categories
      setSelectedSecondCategory(""); // Clear second category selection
      setThirdCategories([]);
      setFourthCategories([]);
      setFifthCategories([]);
      setSixthCategories([]);
    }
  };

  const handleSecondCategoryChange = (e) => {
    const selectedSecondCategoryID = e.target.value;
    setSelectedSecondCategory(selectedSecondCategoryID); // Update state
    const selectedSecondCategory = secondCategories.find(
      (category) =>
        category.secondCategoryId === parseInt(selectedSecondCategoryID)
    );
    if (selectedSecondCategory) {
      setThirdCategories(selectedSecondCategory.thirdCategories || []); // Update third categories
      setFourthCategories(selectedSecondCategory.fourthCategories || []);
      setFifthCategories(selectedSecondCategory.fifthCategories || []);
      setSixthCategories(selectedSecondCategory.sixthCategories || []);
    }
  };

  const handleCheckboxChange = (
    e,
    setSelectedCategories,
    selectedCategories
  ) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== value));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Unselect all if currently selected
      setSelectedThirdCategory([]);
      setSelectedFourthCategory([]);
      setSelectedFifthCategory([]);
      setSelectedSixthCategory([]);
    } else {
      // Select all if currently not selected
      setSelectedThirdCategory(thirdCategories.map((category) => category.thirdCategoryId));
      setSelectedFourthCategory(fourthCategories.map((category) => category.fourthCategoryId));
      setSelectedFifthCategory(fifthCategories.map((category) => category.fifthCategoryId));
      setSelectedSixthCategory(sixthCategories.map((category) => category.sixthCategoryId));
    }
    setSelectAll(!selectAll); // Toggle select all state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const thirdCategoryIDs =
      selectedThirdCategory.length > 0 ? selectedThirdCategory.join(",") : "";
    const fourthCategoryIDs =
      selectedFourthCategory.length > 0 ? selectedFourthCategory.join(",") : "";
    const fifthCategoryIDs =
      selectedFifthCategory.length > 0 ? selectedFifthCategory.join(",") : "";
    const sixthCategoryIDs =
      selectedSixthCategory.length > 0 ? selectedSixthCategory.join(",") : "";

    console.log("Third Category IDs:", thirdCategoryIDs);
    console.log("Fourth Category IDs:", fourthCategoryIDs);
    console.log("Fifth Category IDs:", fifthCategoryIDs);
    console.log("Sixth Category IDs:", sixthCategoryIDs);

    const selectedData = {
      FirstCategoryID: selectedFirstCategory,
      SecondCategoryID: selectedSecondCategory,
      ThirdCategoryID: thirdCategoryIDs,
      FourthCategoryID: fourthCategoryIDs,
      FifthCategoryID: fifthCategoryIDs,
      SixthCategoryID: sixthCategoryIDs,
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/CategoryAllFromDropdown/GetAllCategoriesfromFirstandSecond",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(selectedData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data saved successfully:", data);
      // console.log("Category Token",token);

      const cityName = localStorage.getItem('cityname');
        const pathlisting = `/Flayout/addspecilisation`;

        router.push(pathlisting);

      // setSuccessMessage("Category Details Saved Successfully");
      // setErrorMessage("");
      // setShowPopup(true);

      // setTimeout(() => {
      //   setShowPopup(false);
      //   navigate(pathlisting);
      // }, 2000); // Show popup for 3 seconds before redirect
  
      
       
    } catch (error) {
      setErrorMessage("Failed to save category details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const handleCategoryChange = (selectedOption) => {
    setSelectedFirstCategory(selectedOption ? selectedOption.value : "");
  };

  const categoryOptions = firstCategories.map((category) => ({
    value: category.firstCategoryID,
    label: category.firstCategoryName,
  }));

  const handleSecCategoryChange = (selectedOption) => {
    setSelectedSecondCategory(selectedOption ? selectedOption.value : "");
  };

  const secondCategoryOptions = secondCategories.map((category) => ({
    value: category.secondCategoryId,
    label: category.secondCategoryName,
  }));


    return(

        <>
        <div >
          <div >
            <div >
              <div >
                <h4>Add Category Details</h4>
                <p className="add-lidting-title-from">
                  Add Listing / Add Category Details
                  
                </p>
  
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="fcategory">First Category <span className="text-danger">*</span></label>
                      <br></br>
                      <Select
                      className="wide add_bottom_10 fcategory selectdrp"
                      value={categoryOptions.find(
                        (option) => option.value === selectedFirstCategory
                      )}
                      onChange={handleCategoryChange}
                      options={categoryOptions}
                      placeholder="Select First Category"
                      isDisabled={true}
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                          ? "orange"
                          : provided.backgroundColor,
                        color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                         
                          height: "50px", // Increase the height of the select box
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" },
                        }),
                      }}
                    />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="scategory">Second Category <span className="text-danger">*</span></label>
                      <br></br>
                      <Select
                      className="wide add_bottom_10 scategory selectdrp"
                      value={secondCategoryOptions.find(
                        (option) => option.value === selectedSecondCategory
                      )}
                      onChange={handleSecCategoryChange}
                      options={secondCategoryOptions}
                      placeholder="Select Second Category"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Hover background color
                          color: state.isFocused ? "white" : "black", // Adjust text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          height: "50px", // Increase the height of the select box
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 add_bottom_15">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: "#fb830d" }}
                        onClick={handleSelectAll}
                      >
                        {selectAll ? "Select All" : "Select All"}
                      </button>
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row" style={{justifyContent:'normal'}}>
                    {thirdCategories.length > 0 &&
                      thirdCategories.map((category) => (
                        <div className="col-md-4" key={category.thirdCategoryId}>
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label
                                htmlFor={`thirdCategory-${category.thirdCategoryId}`}
                                className="label-spacing"
                              >
                                <input
                                  type="checkbox"
                                  id={`thirdCategory-${category.thirdCategoryId}`}
                                  value={category.thirdCategoryId}
                                  checked={selectedThirdCategory.includes(category.thirdCategoryId)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      setSelectedThirdCategory,
                                      selectedThirdCategory
                                    )
                                  }
                                 className="custom-checkbox"
                                 
                                />
                                 
                                 <span className="label-text-spacing">
                      {category.thirdCategoryName}
                    </span>
                              
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                  
                    {fourthCategories.length > 0 &&
                      fourthCategories.map((category) => (
                        <div className="col-md-4" key={category.fourthCategoryId}>
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label
                                htmlFor={`fourthCategory-${category.fourthCategoryId}`}
                                 className="label-spacing"
                              >
                                <input
                                  type="checkbox"
                                  id={`fourthCategory-${category.fourthCategoryId}`}
                                  value={category.fourthCategoryId}
                                  checked={selectedFourthCategory.includes(category.fourthCategoryId)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      setSelectedFourthCategory,
                                      selectedFourthCategory
                                    )
                                  }
                                  className="custom-checkbox"
                                />
                                <span className="label-text-spacing">
                                {category.fourthCategoryName}
                                </span>
                               
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                  
                    {fifthCategories.length > 0 &&
                      fifthCategories.map((category) => (
                        <div className="col-md-4" key={category.fifthCategoryId}>
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label
                                htmlFor={`fifthCategory-${category.fifthCategoryId}`}
                                className="label-spacing"
                              >
                                <input
                                  type="checkbox"
                                  id={`fifthCategory-${category.fifthCategoryId}`}
                                  value={category.fifthCategoryId}
                                   checked={selectedFifthCategory.includes(category.fifthCategoryId)}  
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      setSelectedFifthCategory,
                                      selectedFifthCategory
                                    )
                                  }
                                   className="custom-checkbox"
                                />
                                <span className="label-text-spacing">
                                {category.fifthCategoryName}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                     
  
                  
                    {sixthCategories.length > 0 &&
                      sixthCategories.map((category) => (
                        <div className="col-md-4" key={category.sixthCategoryId}>
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label
                                htmlFor={`sixthCategory-${category.sixthCategoryId}`}
                                className="label-spacing"
                              >
                                <input
                                  type="checkbox"
                                  id={`sixthCategory-${category.sixthCategoryId}`}
                                  value={category.sixthCategoryId}
                                  checked={selectedSixthCategory.includes(category.sixthCategoryId)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      setSelectedSixthCategory,
                                      selectedSixthCategory
                                    )
                                  }
                                className="custom-checkbox"
                                />
                                <span className="label-text-spacing">
                                {category.sixthCategoryName}
                                </span>
                               
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                      </div>
                  </div>
  
                  <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1 freelistingpagebtn" >
                      Save & Continue
                    </button>
                  
                  <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                        <Link href='/Flayout/addcategory '><img src='/img/Backarrow.png' style={{height:'30px'}}/></Link>
                      <Link href='/Flayout/addspecilisation' ><img src='/img/Frontarrow.png' style={{height:'30px'}}/></Link>
                      </div>
                      </div>
                      {showPopup && (
           <Popupalert 
           message={successMessage || errorMessage} 
           type={successMessage ? 'success' : 'error'} 
           onClose={handleClosePopup}
         />
          )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Addcategoryf;