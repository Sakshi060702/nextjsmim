'use client';
import React, { useState,useEffect } from "react";;
import { useParams } from "next/navigation";
import Certificatepage from "./Certificatepage";
import Clientreview from "./Clientpage";
import Reviewpage from "./Reviewpage";



const reviewButton = { title: "Reviews", component: Reviewpage };
const allbuttons = [
  // { title: "Reviews", component: Review1 },
  { title: "Our Client", component: Clientreview },
  { title: "Certificates", component: Certificatepage },
];

function Webreviews(props) {
  const { listingId } = useParams();
  console.log("Listing ID:", listingId, props);
  const [selectedButton, setSelectedButton] = useState(0);
  // const SelectedComponent = buttons[selectedButton].component;
  const [showClientButton, setShowClientButton] = useState(false);
  const [showCertificateButton, setShowCertificateButton] = useState(false);
 
const[status,setStatus]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await fetch(
      //     "https://apidev.myinteriormart.com/api/Keywordshowfromstatus/GetKeywordshow",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         companyID: props.companyID,
      //       }),
      //     }
      //   );
      //   const data = await response.json();
      //   console.log(data);
      //   setStatus(data.data.status);
      //   console.log("Status inside fetch:", data.data.status);
      // } catch (error) {
      //   console.error("Error fetching status:", error);
      // }
      try {
        const clientResponse = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetClientImage", // Replace with actual endpoint
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyID: props.companyID }),
          }
        );
        const clientData = await clientResponse.json();
        console.log("clientData",clientData);
        setShowClientButton(
          clientData && Array.isArray(clientData.imagepath) && clientData.imagepath.length > 0
        );

        const certificateResponse = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetCertificateImage",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyID: props.companyID }),
          }
        );
        const certificateData = await certificateResponse.json();
        console.log("cerficatedata",certificateData);
        // setShowCertificateButton(
        //   certificateData && certificateData.imagepath && certificateData.imagepath.length > 0
        // );
        setShowCertificateButton(
          certificateData && Array.isArray(certificateData.imagepath)&&certificateData.imagepath.length>0
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [props.companyID]);

  const buttons = [
    reviewButton,
    ...allbuttons.filter((button) => {
      if (button.title === "Our Client") {
        return showClientButton;
      }
      if (button.title === "Certificates") {
        return showCertificateButton;
      }
      return true;
    }),
  ];

  const SelectedComponent = buttons[selectedButton]?.component || Review1;

  return (
    <main>
      <div className="company-listing-tab listingreviews">
        <div className="step">
          <ul className="nav nav-tabs" id="tab_checkout" role="tablist">
            {buttons.map((button, index) => (
              <li className="nav-item " key={index}>
                <a
                  className={`nav-link webreview ${
                    selectedButton === index ? "active" : ""
                  }`}
                  id={`${button.title.toLocaleLowerCase()}-tab`}
                  data-toggle="tab"
                  role="tab"
                  aria-controls={button.title.toLowerCase()}
                  aria-selected={selectedButton === index}
                  onClick={() => setSelectedButton(index)}
                  style={{ cursor: "pointer" }}
                >
                  {button.title}
                </a>
              </li>
            ))}
          </ul>
          {/* {console.log(props)} */}
          <SelectedComponent listingID={props} />
        </div>
      </div>
    </main>
  );
}

export default Webreviews;
