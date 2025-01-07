'use client';
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/app/Redux/authSlice";
import { faUser,faGear,faKey,faSignOut } from "@fortawesome/free-solid-svg-icons";

// import "../../Styles/Frontend/css/RegistrationMV.css";
// import "../../Styles/Frontend/css/dropdown.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdownpage = () => {
  const router=useRouter();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    window.location.href = "/profile2";
    // Handle profile click action
  };

  const cityName = localStorage.getItem("cityname");
  const pathhome = `/`;

  const handleLogoutClick = () => {
    dispatch(logout());
    router.push(pathhome);
  };

  return (
    <div className="dropdown1 profiledrp">
      <ul id="dropdown_logged_in_menu" style={{ justifyContent: "left" }}>
        {/* <li onClick={handleProfileClick}>
          <i style={{ marginRight: "10px" }}></i>Profile
        </li> */}
        <li style={{ marginRight: "60px", marginTop: "10px" }}>
          <Link
            className="droplink"
            // to={`/Myactivity`}
            href='/portal/myactivity'
            style={{ color: "black" }}
          >
            {/* <i className="fa fa-user" style={{ color: "orange" }}></i>  */}
            <FontAwesomeIcon icon={faUser} style={{color:'orange',marginRight: "10px"}}/>
            Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/userpersonalinformation" style={{color:'black'}}>
          <i style={{ marginRight: "10px" }}></i>Personal Info
          </Link>
        
        </li> */}
        <li className="droplink drpsetting">
        <FontAwesomeIcon icon={faGear} style={{marginRight: "10px",color:'orange'}}/>
          {/* <i
            className="fa fa-gear"
            style={{ marginRight: "10px", color: "orange" }}
          ></i> */}
          Settings
        </li>
        <li
          style={{ marginTop: "-8px", marginRight: "1px" }}
          className="droplink"
        >
            <FontAwesomeIcon icon={faKey} style={{marginRight: "10px",color:'orange'}}/>
          {/* <i
            className="fa fa-key"
            style={{ marginRight: "10px", color: "orange" }}
          ></i> */}
          Change Password
        </li>
        <li onClick={handleLogoutClick} className="droplink drpsetting">
        <FontAwesomeIcon icon={faSignOut} style={{marginRight: "10px",color:'orange'}}/>
          {/* <i
            className="fa fa-sign-out"
            style={{ marginRight: "10px", color: "orange" }}
          ></i> */}
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdownpage;
