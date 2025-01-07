"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

import "../../../Styles/Frontend/css/bootstrap.min.css";
import "../../../Styles/Frontend/css/style.css";
import "../../../Styles/Frontend/css/Service.css";
import "../../../Styles/Frontend/css/custom.css";
import "../../../Styles/Frontend/css/Header.css";
import "../../../Styles/Frontend/css/reset.css";

const DthirdCatPage = ({ params }) => {
  console.log("Params in CthirdCatPage:", params);
  // const secCategory = params?.cSecCategory;

  //   const { categoryName } = useParams(); // Fetch the dynamic parameter
  const searchParams = useSearchParams();
  const secondCategoryId = searchParams.get("id"); // Get the id query parameter
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const secCategory = decodeURIComponent(params?.dSecCategory);
  console.log("secCategory", secCategory);

  const decodeCateName = decodeURIComponent(secCategory);
  console.log("decodeCateName", decodeCateName);

  useEffect(() => {
    if (secondCategoryId) {
      fetchThirdCategories();
    }
  }, [secondCategoryId]);

  const fetchThirdCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      // console.log("Fetched Data:", data);

      // Log secondCategoryId to check its value
      console.log("secondCategoryId:", secondCategoryId);

      const category = data.dealers.find(
        (cat) => String(cat.secondCategoryID) === String(secondCategoryId)
      );
      console.log("Selected Category:", category);
      setSelectedCategory(category);
      setSubCategories(category ? category.thirdCategories : []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <>
      
        <div id="popular-categories" className="container margin_80_55 contractorcontainer">
          <div className="main_title_2">
            <span>
              <em></em>
            </span>
            <h2>Popular Categories</h2>
          </div>
          {/* <h1>categoryName:{catName}</h1> */}

          <div className="row justify-content-center categories-list">
            {selectedCategory && (
              <ul className="subcategories-list d-flex justify-content-center flex-wrap">
                {subCategories.map((subCategory, index) => {
                  // console.log('subCategories',subCategories);
                  const categoriesPerRow = 4;
                  const totalCategories = subCategories.length;

                  const isFirstRow = index < categoriesPerRow;
                  const remainingCategories =
                    totalCategories % categoriesPerRow;
                  const isLastRow =
                    totalCategories > categoriesPerRow &&
                    index >=
                      Math.floor(totalCategories / categoriesPerRow) *
                        categoriesPerRow;

                  let justifyContentClass;
                  if (isFirstRow && totalCategories <= categoriesPerRow) {
                    justifyContentClass = "center";
                  } else if (
                    isLastRow &&
                    remainingCategories !== 0 &&
                    remainingCategories < categoriesPerRow
                  ) {
                    justifyContentClass = "start";
                  } else {
                    justifyContentClass = "center";
                  }
                  const subCategoryNameFormatted = subCategory.name
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  const selectedCategoryNameFormatted = selectedCategory.name
                    .replace(/\s+/g, "-")
                    .toLowerCase();

                    const url = `/All/${selectedCategoryNameFormatted}/${subCategoryNameFormatted}?secatEncyt=${encodeURIComponent(
                      subCategory.secondCategoryID
                    )}&secatName=${encodeURIComponent(
                      selectedCategoryNameFormatted
                    )}`;

                  return (
                    <li
                      key={subCategory.thirdCategoryID}
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
                          href={url}
                          title={subCategory.name}
                          className="Linkstyle categorylink"
                        >
                          {subCategory.name}
                        </Link>

                        {subCategory.fourthCategories &&
                          subCategory.fourthCategories.length > 0 && (
                            <Link
                              href={{
                                pathname: `/Dealer/${decodeCateName}/${encodeURIComponent(
                                  subCategory.name.replace(/ /g, "-")
                                )}`,
                                query: { id: subCategory.thirdCategoryID,secID:subCategory.secondCategoryID },
                              }}
                              title={subCategory.name}
                              style={{ color: "orange" }}
                            >
                              more ...
                            </Link>
                          )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
     
    </>
  );
};

export default DthirdCatPage;
