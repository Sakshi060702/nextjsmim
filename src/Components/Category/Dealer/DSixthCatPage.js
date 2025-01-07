'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import Head from "next/head";
// import CryptoJS from "crypto-js";

// const encryptionKey = 'myinterriorMart@SECRETKEY';

// const encrypt = (text) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
// };

// const decrypt = (ciphertext) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

const DSixthCatPage = ({ params }) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const secID = searchParams.get("secID");
    const {resolvedParamsS}=params||{}
  const { dFifthCategory,dFourthCategory,dSecCategory,dThirdCategory } = resolvedParamsS||{} // Get dynamic route params
  const [fourthCategories, setFourthCategories] = useState([]);
  const [fifthCategories, setFifthCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);
  const [sixthCategories, setSixthCategories] = useState([]);

  console.log('fifthCategory',dFifthCategory)
  const decodeFifthcateogry=decodeURIComponent(dFifthCategory);
  console.log('decodeFifthcateogry',decodeFifthcateogry);

  const fifthCategoryId = searchParams.get("id"); // Query parameter
  console.log('fifthCategoryId',fifthCategoryId);
//   const thirdCategoryId = decrypt(decodeURIComponent(listingId_enc));

useEffect(() => {
    fetchSixthCategories();
  }, [fifthCategoryId,dFifthCategory,dFourthCategory,dSecCategory,dThirdCategory ]);

  const fetchSixthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
  
      console.log("API Response:", data);
  
      if (data && data.dealers && Array.isArray(data.dealers)) {
        let foundSixthCategories = [];
  
        data.dealers.forEach((service) => {
            service.thirdCategories.forEach((thirdcategory) => {
              thirdcategory.fourthCategories.forEach((fourthcategory) => {
                fourthcategory.fifthCategories.forEach((fifthCat) => {
                // console.log('fifthcat', fifthCat.name);
                const normalize = (str) => str.trim().replace(/\s+/g, "-").toLowerCase();

const formattedFifthCatName = normalize(fifthCat.name);
const formattedDecodedFifthCategory = normalize(decodeFifthcateogry);
console.log("Formatted FifthCat Name:", formattedFifthCatName);
console.log("Formatted Decoded Fifth Category:", formattedDecodedFifthCategory);
console.log("Comparison:", formattedFifthCatName === formattedDecodedFifthCategory);
                
                // Match by name, replace fifthCategory with the actual matching logic
                if (
                  formattedFifthCatName===formattedDecodedFifthCategory
                ) {
                  foundSixthCategories = fifthCat.sixthCategories || [];
                }
              });
            });
          });
        });
  
        if (foundSixthCategories.length > 0) {
          console.log("Found Sixth Categories:", foundSixthCategories);
          setSixthCategories(foundSixthCategories);
        } else {
          console.error("No sixth categories found.");
        }
      } else {
        console.error("Unexpected API response format.");
      }
    } catch (error) {
      console.error("Error fetching sixth categories:", error);
    }
  };
  

  
  return (
    <>
    
     <div>
      <div className="container margin_80_55 servicecontainer" >
        <div className="main_title_2">
          <span>
            <em></em>
          </span>
          <h2>Popular Categories</h2>
        </div>
        <div className="row justify-content-center categories-list">
        <ul className="subcategories-list">
  {sixthCategories.map((sixthCategory, index) => {

const categoryUrl = `/All/${dSecCategory}/${dThirdCategory}/${dFourthCategory}/${dFifthCategory}/${encodeURIComponent(
  sixthCategory.name.replace(/ /g, "-")
)}?secatEncyt=${encodeURIComponent(
  secID
)}&secatName=${encodeURIComponent(dSecCategory)}`;

return (
  <li
  key={sixthCategory.sixthCategoryID || `sixthCategory-${index}`}
  className={`col-lg-${sixthCategories.length === 2 ? "6" : "4"} col-6`}
>
  <div className="item">
    <span
      className="icon"
      style={{
        display: "inline-block",
        width: "40px",
        height: "40px",
        overflow: "hidden",
        position: "relative",
        marginRight: "10px",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "orange",
          borderRadius: "50%",
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </span>
    <Link
      href={categoryUrl}
      title={sixthCategory.name}
      className="Linkstyle"
    >
      {sixthCategory.name || "Unnamed Category"}
    </Link>
  </div>
</li>
)
   
  })}
</ul>

        </div>
      </div>
    </div>
    </>
  );
};

export default DSixthCatPage;
