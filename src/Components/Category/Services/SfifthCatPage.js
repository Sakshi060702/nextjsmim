"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SfourthCategory from "@/app/Service/[sSecCategory]/[sThirdCategory]/page";
import SthirdCategory from "@/app/Service/[sSecCategory]/page";
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

const SfifthCatPage = ({ params }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const secID = searchParams.get("secID");

  console.log("secID", secID);
  console.log("id", id);
  const { resolvedParamsF } = params || {};
  const { sSecCategory, sThirdCategory, sFourthCategory } =
    resolvedParamsF || {};
  const [fourthCategories, setFourthCategories] = useState([]);
  const [fifthCategories, setFifthCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);

  const fourthCategoryId = searchParams.get("id"); // Query parameter
  console.log("fourthCategoryId", fourthCategoryId);
  //   const thirdCategoryId = decrypt(decodeURIComponent(listingId_enc));

  console.log("sSecCategoryNext", sSecCategory);
  console.log("sThirdCategoryNext", sThirdCategory);
  console.log("sFourthCategoryNext", sFourthCategory);

  useEffect(() => {
    fetchFifthCategories();
  }, [fourthCategoryId, sFourthCategory, sThirdCategory, sSecCategory]);

  const fetchFifthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      console.log("Fetched data:", data);

      // Assuming data has a structure like { services: [...] }
      if (data && data.services && Array.isArray(data.services)) {
        let foundFourthCategory = null;

        data.services.forEach((service) => {
          service.thirdCategories.forEach((thirdCategory) => {
            thirdCategory.fourthCategories.forEach((fourthCategory) => {
              if (fourthCategory.fourthCategoryID === fourthCategoryId)
                foundFourthCategory = fourthCategory;
            });
          });
        });

        console.log("Selected Fifth Category:", foundFourthCategory);
        setSelectedFourthCategory(foundFourthCategory);
        setFifthCategories(
          foundFourthCategory ? foundFourthCategory.fifthCategories : []
        );
      } else {
        console.error("Unexpected data format or missing services array", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <div className="container margin_80_55 servicecontainer">
        <div className="main_title_2">
          <span>
            <em></em>
          </span>
          <h2>Popular Categories</h2>
        </div>
        <div className="row justify-content-center categories-list">
          <ul className="subcategories-list d-flex justify-content-center flex-wrap">
            {fifthCategories.map((fifthCategory) => {
              const categoryUrl = `/All/${sSecCategory}/${sThirdCategory}/${sFourthCategory}/${encodeURIComponent(
                fifthCategory.name.replace(/ /g, "-")
              )}?secatEncyt=${encodeURIComponent(
                secID
              )}&secatName=${encodeURIComponent(sSecCategory)}`;

              return(
<li
                key={fifthCategory.fifthCategoryID}
                className={`col-lg-3 col-6 d-flex justify-content-center`}
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
                    title={fifthCategory.name}
                    className="Linkstyle categorylink"
                  >
                    {fifthCategory.name}
                  </Link>

                  {fifthCategory.sixthCategories &&
                    fifthCategory.sixthCategories.length > 0 && (
                      <Link
                        href={{
                          pathname: `/Service/${sSecCategory}/${sThirdCategory}/${sFourthCategory}/${encodeURIComponent(
                            fifthCategory.name.replace(/ /g, "-")
                          )}`,
                          query: { id: fifthCategory.fifthCategoryID,secID:fifthCategory.secondCategoryID },
                        }}
                        title={fifthCategory.name}
                        style={{ color: "orange" }}
                      >
                        more ...
                      </Link>
                    )}
                </div>
              </li>
              )

            }
              
            
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SfifthCatPage;
