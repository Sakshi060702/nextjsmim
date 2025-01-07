'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import nextarrowimg from "../../../FrontEnd/img/Frontarrow.png";
// import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "@/app/Hoc/withAuth";
import Select from "react-select";
import Popupalert from "./Popupalert";
import useAuthCheck from "@/app/Hooks/useAuthCheck";
import LocalityPopup from "./Localitypopup.js";
import PincodePopup from "./Pincodepopup";
import Areapopup from "./Areapopup";



import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Businesslisting.css";
import "../../Styles/Frontend/css/Register.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/Businesslisting.css";


const Addressf = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  const [isCountryValid,setIsCountryValid]=useState(true);
  const[isStateValid,setIsStateValid]=useState(true);
  const[isCityValid,setIsCityValid]=useState(true);
  const[isLocalityValid,setIsLocalityValid]=useState(true);
  const[isPincodeValid,setIsPincodeValid]=useState(true);
  const[isAreaValid,setIsAreaValid]=useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [localAddress, setLocalAddress] = useState("");

  const router=useRouter();

  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);

  const [showAddressPopup, setShowAddressPopup] = useState([false, null]);
  const[showPincodePopup,setShowPincodePopup]=useState([false,null]);
  const[showAreaPopup,setShowAreaPopup]=useState([false,null]);

  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const isAuthenticated = useAuthCheck();

  

  const apiUrl =
    "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

  const fetchData = async (type, parentID = null) => {
    let body = {
      type,
      CountryID: setSelectedCountry,
      StateID: setSelectedState,
      CityID: setSelectedCity,
      AssemblyID: setSelectedAssembly,
      PincodeID: setSelectedPincode,
      LocalityID: setSelectedLocality,
      LocalAddress: "", // Assuming this is default or required in your API
    };
    if (parentID) body.parentID = parentID;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Data fetched for ${type}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if(isAuthenticated){
      fetchData("countries").then((data) => {
        if (data) setCountries(data.country);
      });
    }
    
  }, [token]);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetAddressDetailslisting",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setSelectedCountry(data.countryID);
        setSelectedState(data.stateID);
        setSelectedCity(data.cityID);
        setSelectedAssembly(data.assemblyID);
        setSelectedPincode(data.pincodeID);
        setSelectedLocality(data.localityID);
        setLocalAddress(data.localAddress);

        console.log("User Address Fetched", data);
      } catch (error) {
        console.error("Error fetching user categories:", error);
      }
    };
    fetchUserAddress();
  }, [token]);

  useEffect(() => {
    if (selectedCountry) {
      const selectcountry = countries.find(
        (address) => address.countryID === selectedCountry
      );
      if (selectcountry) {
        setStates(selectcountry.states || []);
      }
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (selectedState) {
      const selectstate = states.find(
        (address) => address.stateID === selectedState
      );
      if (selectstate) {
        setCities(selectstate.cities || []);
      }
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedCity) {
      const selectcity = cities.find(
        (address) => address.cityID === selectedCity
      );
      if (selectcity) {
        setAssemblies(selectcity.assemblies || []);
      }
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedAssembly) {
      const selectAssembly = assemblies.find(
        (address) => address.assemblyID === selectedAssembly
      );
      if (selectAssembly) {
        setPincodes(selectAssembly.pincodes || []);
      }
    }
  }, [selectedAssembly, assemblies]);

  useEffect(() => {
    if (selectedPincode) {
      const selectpincode = pincodes.find(
        (address) => address.pincodeID === selectedPincode
      );
      if (selectpincode) {
        setLocalities(selectpincode.localities || []);
      }
    }
  }, [selectedPincode, pincodes]);

  const handleCountryChange = (e) => {
    const countryID = e.target.value;
    setSelectedCountry(countryID);
    setSelectedState("");
    setSelectedCity("");
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");

    const selectedCountryData = countries.find(
      (country) => country.countryID === parseInt(countryID)
    );
    if (selectedCountryData) {
      console.log("Selected country states:", selectedCountryData.states);
      setStates(selectedCountryData.states);
    } else {
      setStates([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredState = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCity = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredassembly = assemblies.filter((assembly) =>
    assembly.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredPincoode = pincodes.filter((pincode) =>
  //   pincode.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredArea = localities.filter((locality) =>
  //   city.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleStateChange = (e) => {
    const stateID = e.target.value;
    setSelectedState(stateID);
    setSelectedCity("");
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");

    const selectedStateData = states.find(
      (state) => state.stateID === parseInt(stateID)
    );
    if (selectedStateData) {
      console.log("Selected state cities:", selectedStateData.cities);
      setCities(selectedStateData.cities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityID = e.target.value;
    setSelectedCity(cityID);
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");

    const selectedCityData = cities.find(
      (city) => city.cityID === parseInt(cityID)
    );
    if (selectedCityData) {
      console.log("Selected city assemblies:", selectedCityData.assemblies);
      setAssemblies(selectedCityData.assemblies);
    } else {
      setAssemblies([]);
    }
  };

  const handleLocalityChange = (e) => {
    const assemblyID = e.target.value;
    setSelectedAssembly(assemblyID);
    setSelectedPincode(""); // Clear selected pincode when locality changes
    setSelectedLocality("");

    const selectedLocalityData = assemblies.find(
      (assembly) => assembly.assemblyID === parseInt(assemblyID)
    );
    if (selectedLocalityData) {
      console.log("Selected locality pincodes:", selectedLocalityData.pincodes);
      setPincodes(selectedLocalityData.pincodes);
    } else {
      setPincodes([]);
    }
  };

  const handlePincodeChange = (e) => {
    const pincodeID = e.target.value;
    setSelectedPincode(pincodeID);
    setSelectedLocality("");

    const selectedPincodeData = pincodes.find(
      (pincode) => pincode.pincodeID === parseInt(pincodeID)
    );
    if (selectedPincodeData) {
      console.log(
        "Selected pincode localities:",
        selectedPincodeData.localities
      );
      setLocalities(selectedPincodeData.localities);
    } else {
      setLocalities([]);
    }
  };

  const handleAreaChange = (e) => {
    const localityID = e.target.value;
    setSelectedLocality(localityID);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!selectedCountry){
      setIsCountryValid(false);
      return;
    }

    if(!selectedState){
      setIsStateValid(false);
      return;
    }

    if(!selectedCity){
      setIsCityValid(false);
      return;
    }
    if(!selectedAssembly){
      setIsLocalityValid(false);
      return;
    }

    if(!selectedPincode){
      setIsPincodeValid(false);
      return;
    }
    if(!selectedLocality){
      setIsAreaValid(false);
      return;
    }
    

    const submissionData = {
      CountryID: parseInt(selectedCountry),
      StateID: parseInt(selectedState),
      CityID: parseInt(selectedCity),
      AssemblyID: parseInt(selectedAssembly),
      PincodeID: parseInt(selectedPincode),
      LocalityID: parseInt(selectedLocality),
      LocalAddress: localAddress,
    };

    console.log("Submitting data:", submissionData);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())

      .then((responseData) => {
        console.log("API response:", responseData);
        // console.log("Address token:", token);
        
        const cityName = localStorage.getItem('cityname');
        const pathlisting = `/Flayout/addcategory`;

        router.push(pathlisting);
        // setSuccessMessage("Address Details Saved Successfully");
        // setErrorMessage("");
        // setShowPopup(true);

        // setTimeout(() => {
        //   setShowPopup(false);
        //   navigate(pathlisting);
        // }, 2000);

       
      })
      .catch((error) => {
        console.error("API error:", error);
        setErrorMessage("Failed to save Address details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  //country
  const handleCounChange = (selectedOption) => {
    setSelectedCountry(selectedOption ? selectedOption.value : "");
    setIsCountryValid(!!selectedOption);
  };

  const countryOptions = filteredCountries.map((country) => ({
    value: country.countryID,
    label: country.name,
  }));

  const handleStaChange = (selectedOption) => {
    setSelectedState(selectedOption ? selectedOption.value : "");
    setIsStateValid(!!selectedOption);
  };

  const stateOptions = states.map((state) => ({
    value: state.stateID,
    label: state.name,
  }));


  const handleCiChange = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : "");
    setIsCityValid(!!selectedOption);
  };

  const cityOptions = cities.map((city) => ({
    value: city.cityID,
    label: city.name,
  }));

  const handleLocalChange = (selectedOption) => {
    setSelectedAssembly(selectedOption ? selectedOption.value : "");
    setIsLocalityValid(!!selectedOption);
  };

  const assemblyOptions = assemblies.map((assembly) => ({
    value: assembly.assemblyID,
    label: assembly.name,
  }));

  const handlePinChange = (selectedOption) => {
    setSelectedPincode(selectedOption ? selectedOption.value : "");
    setIsPincodeValid(!!selectedOption);
  };

  const pincodeOptions = pincodes.map((pincode) => ({
    value: pincode.pincodeID,
    label: pincode.number,
  }));


  const handleArChange = (selectedOption) => {
    setSelectedLocality(selectedOption ? selectedOption.value : "");
    setIsAreaValid(!!selectedOption);
  };

  const localityOptions = localities.map((locality) => ({
    value: locality.localityID,
    label: locality.name,
  }));

  

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h4>Add Address Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Address Details
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Country<span className="text-danger">*</span></label>
                    {/* <input
        type="text"
        placeholder="Search Country"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', width: '250px', height: '30px' }}
      /> */}
                    <Select
                      className="wide add_bottom_10 country selectdrp"
                      value={countryOptions.find(
                        (option) => option.value === selectedCountry
                      )}
                      onChange={handleCounChange}
                      options={countryOptions}
                      placeholder="Select Country"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                          ? "orange"
                          : provided.backgroundColor,
                        color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                          // borderColor: "#ccc",
                          // "&:hover": { borderColor: "#aaa" },
                        }),
                      }}
                    />
                    {!isCountryValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       Country required.
                     </span>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="state">State<span className="text-danger">*</span></label>
                    <Select
                      className="wide add_bottom_10 state selectdrp"
                      value={stateOptions.find(
                        (option) => option.value === selectedState
                      )}
                      onChange={handleStaChange}
                      options={stateOptions}
                      placeholder="Select State"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                          ? "orange"
                          : provided.backgroundColor,
                        color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                     {!isStateValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       State required.
                     </span>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="city">City<span className="text-danger">*</span></label>
                    <Select
                      className="wide add_bottom_10 city selectdrp"
                      value={cityOptions.find(
                        (option) => option.value === selectedCity
                      )}
                      onChange={handleCiChange}
                      options={cityOptions}
                      placeholder="Select City"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                     {!isCityValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       City required.
                     </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Locality<span className="text-danger">*</span></label>
                    <Select
                      className="wide add_bottom_10 locality selectdrp"
                      value={assemblyOptions.find(
                        (option) => option.value === selectedAssembly
                      )}
                      onChange={handleLocalChange}
                      options={assemblyOptions}
                      placeholder="Select Locality"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                     
                    <button onClick={(e)=>{ e.preventDefault(); console.log(cities, cities.cityId); return setShowAddressPopup([true,selectedCity])}}>Add Locality +</button>
                    {!isLocalityValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       Locality required.
                     </span>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label>Pincode<span className="text-danger">*</span></label>
                    <Select
                      className="wide add_bottom_10 pincode selectdrp"
                      value={pincodeOptions.find(
                        (option) => option.value === selectedPincode
                      )}
                      onChange={handlePinChange}
                      options={pincodeOptions}
                      placeholder="Select Pincode"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                   
                    <button onClick={(e)=>{ e.preventDefault();  return setShowPincodePopup([true,selectedAssembly])}}>Add Pincode +</button>
                    {!isPincodeValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       Pincode required.
                     </span>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label>Area<span className="text-danger">*</span></label>
                    <Select
                      className="wide add_bottom_10 area selectdrp"
                      value={localityOptions.find(
                        (option) => option.value === selectedLocality
                      )}
                      onChange={handleArChange}
                      options={localityOptions}
                      placeholder="Select Area"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                          ? "orange"
                          : provided.backgroundColor,
                        color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                     
                    <button onClick={(e)=>{ e.preventDefault();console.log("assembly", selectedAssembly);console.log("pincode",selectedPincode);  return setShowAreaPopup([true,selectedAssembly,selectedPincode])}}>Add Area +</button>
                    {!isAreaValid && (
                       <span style={{ color: "red", fontSize: "12px" }}>
                       Area required.
                     </span>
                    )}
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="localAddress">Local Address<span className="text-danger">*</span></label>
                    <textarea
                      type="text"
                      className="form-control localAddress-textarea companyD"
                      id="localAddress"
                      placeholder="Enter local address"
                      value={localAddress}
                      onChange={(e) => setLocalAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div
                  className="text-left col-12 mt-3"
                  style={{ display: "flex" }}
                >
                  <button
                    type="submit"
                    className="btn_1 freelistingpagebtn"
                   
                  >
                    Save & Continue
                  </button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <Link href='/Flayout/addcommunication'>
                      <img src='/img/Backarrow.png' style={{ height: "30px" }} />
                    </Link>
                    <Link href='/Flayout/addcategory'>
                      <img src='/img/Frontarrow.png' style={{ height: "30px" }} />
                    </Link>
                    
                  </div>
                </div>
                {/* {console.log(showAddressPopup)} */}
                {showAddressPopup && (
                  <LocalityPopup
                  isOpen={showAddressPopup[0]} cityId={showAddressPopup[1]}
                  onClose={()=>setShowAddressPopup([false,null])}/>
                )}

                {
                  showPincodePopup && (
                    <PincodePopup 
                    isOpen={showPincodePopup[0]} localityId={showPincodePopup[1]}
                    onClose={()=>setShowPincodePopup([false,null])}/>
                  )
                }
                 {/* {console.log(showAreaPopup)} */}
                {
                  showAreaPopup && (
                    <Areapopup 
                    isOpen={showAreaPopup[0]} pincodeId={showAreaPopup[1]} localityId={showAreaPopup[2]}
                    onClose={()=>setShowAreaPopup([false,null,null])}/>
                  )
                }



                {showPopup && ( 
                  <Popupalert 
                  message={successMessage || errorMessage} 
                  type={successMessage ? 'success' : 'error'} 
                  onClose={handleClosePopup}
                />)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addressf;
