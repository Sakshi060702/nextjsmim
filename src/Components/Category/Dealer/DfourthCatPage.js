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

const DfourthCatPage = ({ params }) => {
    console.log("Params in CthirdCatPage:", params);
    const {resolvedParams }=params||{}
    const { dSecCategory, dThirdCategory } = resolvedParams || {};
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  const secID = searchParams.get("secID");
//   const { cSecCategory, cThirdCategory } = React.use(params); // Get dynamic route params
  
  const [fourthCategories, setFourthCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const[selectedFourthCategory,setSelectedFourthCategory]=useState(null);

//   const cSecCategory = decodeURIComponent(params?.cSecCategory);
//   const cThirdCategory = decodeURIComponent(params?.cThirdCategory);

  console.log('dSecCategory:', dSecCategory);
  console.log('dThirdCategory:', dThirdCategory);

  const thirdCategoryId = searchParams.get("id"); // Query parameter
//   const thirdCategoryId = decrypt(decodeURIComponent(listingId_enc));

  useEffect(() => {
    fetchFourthCategories();
  }, [thirdCategoryId, dSecCategory, dThirdCategory]);

  const fetchFourthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      console.log("Fetched Fourth Categories Data :", data);

      if (data && Array.isArray(data.dealers)) {
        let subcategory = null;
        data.dealers.forEach((category) => {
          category.thirdCategories.forEach((thirdCategory) => {
            if (String(thirdCategory.thirdCategoryID) === thirdCategoryId) {
              subcategory = thirdCategory;
            }
          });
        });
        console.log("Selected Category :", subcategory);
        setSelectedFourthCategory(subcategory);
        setFourthCategories(subcategory ? subcategory.fourthCategories : []);
      } else {
        console.error("Unexpected data format :", data);
      }
    } catch (error) {
      console.error("Error fetching fourth categories", error);
    }
  };


  const getLGColClass = (numItems) => {
    switch (numItems) {
      case 1:
        return "12"; // Full width for single item
      case 2:
        return "6"; // 2 items per row
      case 3:
        return "4"; // 3 items per row
      case 4:
        return "3"; // 4 items per row
      default:
        return "3"; // Default to 3 items per row if more than 4
    }
  };

  return (
    <>
     
      <div>
        <div className="container margin_80_55 servicecontainer">
          <div className="main_title_2">
            <span>
              <em></em>
            </span>
            <h2>Popular Categories</h2>
          </div>
          <div className="row justify-content-center categories-list">
            <ul
              className={`subcategories-list d-flex justify-content-${
                fourthCategories.length < 4 ? "center" : "start"
              } flex-wrap`}
            >
              {fourthCategories.map((fourthCategory) => {
                const categoryUrl = `/All/${dSecCategory}/${dThirdCategory}/${encodeURIComponent(
                  fourthCategory.name.replace(/ /g, "-")
                )}?secatEncyt=${encodeURIComponent(
                  secID
                )}&secatName=${encodeURIComponent(dSecCategory)}`;

                return(
<li
                  key={fourthCategory.fourthCategoryID}
                  className={`col-lg-${getLGColClass(
                    fourthCategories.length
                  )} col-6 d-flex justify-content-center`}
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
                      title={fourthCategory.name}
                      className="Linkstyle categorylink"
                    >
                      {fourthCategory.name}
                    </Link>

                    {fourthCategory.fifthCategories &&
                      fourthCategory.fifthCategories.length > 0 && (
                        <Link
                        href={{
                            pathname: `/Dealer/${dSecCategory}/${dThirdCategory}/${encodeURIComponent(fourthCategory.name.replace(/ /g, '-'))}`,
                            query: { id: fourthCategory.fourthCategoryID,secID: fourthCategory.secondCategoryID, },
                          }}
                          title={fourthCategory.name}
                          style={{ color: "orange" }}
                        >
                          more ...
                        </Link>
                      )}
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

export default DfourthCatPage;
