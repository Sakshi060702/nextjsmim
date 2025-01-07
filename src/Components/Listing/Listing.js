"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
import { faClock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";


import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { head } from "lodash";



const Listing = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");
  const secondCategoryId = searchParams.get("secatEncyt");
  const secondCategoryName = searchParams.get("secatName");
  console.log("secondCategoryId", secondCategoryId);
  console.log("secondCategoryName", secondCategoryName);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [homecategoryBanners, setHomeCategoryBanners] = useState([]);
  const [advertiseCategoryBanner, setAdvertiseCategoryBanner] = useState([]);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (secondCategoryId) {
      fetchListings();
    }
  }, [secondCategoryId, currentPage, itemsPerPage]);

  const fetchListings = async (category) => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}`
      );
      const data = await response.json();

      const filterdListing = data.filter((listing) => {
        return listing.subCategory.some(
          (subcat) => subcat.id.toString() === secondCategoryId
        );
      });
      console.log("filterdListing", filterdListing);

      setListings(filterdListing);

      if (filterdListing.length < itemsPerPage) {
        setTotalItems((currentPage - 1) * itemsPerPage + filterdListing.length);
      } else {
        setTotalItems(currentPage * itemsPerPage + 1);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Horizontal banner
  useEffect(() => {
    const fetchCategoryBanners = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();
        console.log(data);
        setHomeCategoryBanners(data.categoryBanners.homecategoryBanners);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };
    fetchCategoryBanners();
  }, []);

  //Vertical Banners

  useEffect(() => {
    const fetchAdvertismentBanners = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();
        console.log(data);
        setAdvertiseCategoryBanner(
          data.categoryBanners.advertiseCategoryBanner
        );
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };
    fetchAdvertismentBanners();
  }, []);


   //for mobile pagination

   const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return isMobile;
  };

  const isMobile = useIsMobile();


  const fetchListingsmobile = async (isAppending = false) => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}&cityName=${fomattedcity}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Fetched Data", data);

      // Filter listings if needed based on subCategoryId
      const filterdListing = data.filter((listing) => {
        return listing.subCategory.some(
          (subcat) => subcat.id.toString() === secondCategoryId
        );
      });

      // setListing(filterdListing);
      // console.log(filteredListing)
      // console.log(itemsPerPage);

      if (isAppending) {
        // Append new listings to existing ones
        setListings((prevListings) => [...prevListings, ...filterdListing]);
      } else {
        // Replace the listings if not appending (for initial load)
        setListings(filterdListing);
      }
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchListingsmobile(true); // Fetch and append new listings
  };

  useEffect(() => {
    if (isMobile) {
      fetchListingsmobile();
    }
  }, [currentPage, isMobile]);


  const totalPages = Math.ceil(totalItems / itemsPerPage);



  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="banner-block one-block categorybanner">
          <div className="row">
            <div className="col-12">
              <div className="grid-item listingpagebanner">
                <div>
                  <Carousel
                    interval={2500}
                    autoPlay={true}
                    fade
                    animationEffect="Fade"
                    pause={false}
                    controls={false}
                  >
                    {homecategoryBanners.length > 0 ? (
                      homecategoryBanners.map((banner) => (
                        <Carousel.Item key={banner.id}>
                          <a
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{ height: "110px", width: "100%" }}
                            />
                          </a>
                        </Carousel.Item>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="listing-list col-9 ">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <div key={listing.listingId} className="row mb-10">
                  <div className="col-12">
                    <Link
                      href={`/Company/${listing.companyName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${secondCategoryName}/${listing.locality
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${listing.city
                        .replace(/\s+/g, "-")
                        .toLowerCase()}?listingEncyt=${encodeURIComponent(
                        listing.listingId
                      )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                        secondCategoryId
                      )}`}
                   
                    >
                      <div className="strip map_view stripmapviewdesign">
                        {/* <h5>Hello world</h5> */}
                        <h6 className="listingcompanyname">
                          <Link className="listingcompany" href="#">
                            {" "}
                            <h5
                              style={{
                                fontWeight: "600",
                                fontFamily: "PoppinsSemiBold",
                                fontSize: "15px",
                              }}
                            >
                              {" "}
                              {listing.companyName}
                            </h5>
                          </Link>
                        </h6>
                        <div
                          className="row no-gutters "
                          // style={{
                          //   border:
                          //     searching == listing.listingKeyword
                          //       ? "2px solid gray"
                          //       : "None",
                          // }}
                        >
                          <div className="col-6 listingdiv">
                            <div className="wrapper listingdetailsdiv">
                             
                              <small className="listingcolor">
                                {listing.listingKeyword}
                              </small>

                              <p
                                className="listingcolor"
                                style={{ marginBottom: "4px" }}
                              >
                                {/* <i
                                  className="fa fa-map-marker"
                                  style={{ paddingRight: "5px" }}
                                ></i> */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 384 512"
                                  style={{
                                    height: "13px",
                                    paddingRight: "5px",
                                  }}
                                >
                                  <path
                                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                                    style={{ fill: "gray" }}
                                  />
                                </svg>
                                {listing.area},
                                <span style={{ marginLeft: "8px" }}>
                                  {listing.locality}
                                </span>
                              </p>
                              <div className="business-info-container listingcolor">
                                <BusinessHours
                                  businessWorking={listing.businessWorking}
                                />

                                {/* Rating below business hours for mobile */}
                                {/* Rating below business hours for mobile */}
                                <div className="rating-container mobile">
                                  <div
                                    className="listingrating"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h4
                                      className="reating-number reactingnumberfont"
                                      style={{
                                        marginRight: "8px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {listing.ratingAverage}.0
                                    </h4>
                                    <div
                                      className="cat_star listingstar"
                                      style={{
                                        display: "flex",
                                        paddingBottom: "11px",
                                      }}
                                    >{Array(5)
                                        .fill()
                                        .map((_, i) => {
                                          const fullStar =
                                            i <
                                            Math.floor(
                                              listing.ratingAverage
                                            );
                                          return (
                                            <FontAwesomeIcon
                                              key={i}
                                              icon={faStar}
                                              style={{
                                                color: fullStar
                                                  ? "orange"
                                                  : "",
                                                fontSize: "16px",
                                                color: "gainsboro",
                                              }}
                                            />
                                          );
                                        })}
                                    </div>
                                    <h4
                                      style={{
                                        marginRight: "8px",
                                        fontSize: "12px",
                                      }}
                                    >
                                      ({listing.ratingCount})
                                    </h4>
                                  </div>
                                </div>

                                <div
                                  className="rating-container desktop st"
                                  style={{ marginLeft: "8px" }}
                                >
                                  <ul
                                    className="listingrating"
                                    style={{
                                      marginTop: "-40px",
                                      marginLeft: "-38px",
                                      marginBottom: "-13px",
                                    }}
                                  >
                                    <ul className="reating-list">
                                      <li>
                                        <h4 className="reating-number reactingnumberfont">
                                          {listing.ratingAverage}.0
                                        </h4>
                                      </li>
                                      <li className="reating-star">
                                        <div className="cat_star">
                                          {Array(5)
                                            .fill()
                                            .map((_, i) => {
                                              const fullStar =
                                                i <
                                                Math.floor(
                                                  listing.ratingAverage
                                                );
                                              return (
                                                <FontAwesomeIcon
                                                  key={i}
                                                  icon={faStar}
                                                  style={{
                                                    color: fullStar
                                                      ? "orange"
                                                      : "",
                                                    fontSize: "16px",
                                                    color: "gainsboro",
                                                  }}
                                                />
                                              );
                                            })}
                                        </div>
                                      </li>
                                      <li>{listing.ratingCount} Rating</li>
                                    </ul>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-2 listingcompanyletter">
                            {listing.logoImage &&
                            listing.logoImage.imagePath ? (
                              <img
                                src={`https://apidev.myinteriormart.com${listing.logoImage.imagePath}`}
                                alt={`${listing.companyName} Logo`}
                                className="card-img-top listingimage listimg listimgborder"

                                // style={{ height: "150px" }}
                              />
                            ) : (
                              <div
                                className="client_first_letter listingimage"
                                style={{ height: "141px", width: "141px" }}
                              >
                                {listing.companyFirstLetter}
                              </div>
                            )}
                          </div>

                          <div className="col-lg-12 listing-bottom listingbottom" style={{paddingBottom:'42px'}}>
                            <ul className="listing-bottom-list">
                              {/* Rating in listing bottom for desktop */}
                              <div>
                                <div>
                                  <li className="listingyear listingyearmim">
                                    <h5
                                      className="yearbusiness"
                                      style={{ paddingTop: "3px" }}
                                    >
                                      <p style={{ color: "gray" }}>
                                        {" "}
                                        Since {listing.businessYear} Year
                                      </p>
                                    </h5>
                                  </li>
                                </div>

                                <div style={{ display: "flex" }}>
                                  <div>
                                    <li
                                      style={{
                                        marginLeft: "-1px",
                                        marginRight: "4px",
                                        marginTop: "-6px",
                                      }}
                                    >
                                      <p className="listingcallnow">
                                        <Link
                                          href={`tel:${listing.mobile}`}
                                          className="loc_open call-now callnowl  listingcallnowinner listingcallnow_btn"
                                        >
                                            <FontAwesomeIcon icon={faPhone}/>
                                          Call now
                                        </Link>
                                      </p>
                                    </li>
                                  </div>

                                  <div>
                                    <li>
                                      <p className="listinggetclaim">
                                        {/* {listing.claimedListing ?(
                                           <button
                                           className="btn btn-guotes btn-sm getclaimbtn"
                                           style={{
                                             boxShadow:
                                               "0 4px 8px rgba(0, 0, 0, 0.2)",
                                             transition:
                                               "box-shadow 0.3s ease-in-out",
                                           }}
                                           onClick={(event) => {
                                             event.preventDefault();
                                             event.stopPropagation();
                                             // setIsPopupOpen([
                                             //   true,
                                             //   listing.listingId,
                                             // ]);
                                             Getclaimhandleclick();
                                           }}
                                         >
                                           Get Claim
                                         </button>
                                           
                                          
                                        ):(
                                          <button
                                          className="btn btn-guotes btn-sm getclaimbtn"
                                          style={{
                                            boxShadow:
                                              "0 4px 8px rgba(0, 0, 0, 0.2)",
                                            transition:
                                              "box-shadow 0.3s ease-in-out",
                                          }}
                                          onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            setIsPopupOpen([
                                              true,
                                              listing.listingId,
                                            ]);
                                          }}
                                        >
                                          Get Quotes
                                        </button>
                                        )} */}

                                        <button
                                          className="btn btn-guotes btn-sm getclaimbtn"
                                          style={{
                                            boxShadow:
                                              "0 4px 8px rgba(0, 0, 0, 0.2)",
                                            transition:
                                              "box-shadow 0.3s ease-in-out",
                                          }}
                                          onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            setIsPopupOpen([
                                              true,
                                              listing.listingId,
                                            ]);
                                          }}
                                        >
                                          Get Quotes
                                        </button>
                                        <p className="pakagediv">{listing.packageID >0 && (
                                          <img src="/Frontend/img/Golden_Membership-removebg-preview.png" className="packageLogo"/>
                                        )}</p>
                                      </p>
                                    </li>
                                  </div>

                                  {/* <div>{listing.packageID >0 && (
  <img src={verifiedImage}/>
)}</div> */}
                                </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* <div className="col-2">
                  <div className="grid-item" style={{ paddingBottom: "6px" }}>
                    <img
                      src={banner}
                      alt="Banner"
                      style={{ height: "108px", width: "100%" }}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      src={banner1}
                      alt="Banner"
                      style={{ height: "115px", width: "100%" }}
                    />
                  </div>
                </div> */}
                </div>
              ))
            ) : (
              <p>Coming soon.</p>
            )}
          </div>

          <div className="col-3 listingbanner">
            <div className="grid-item" style={{ paddingBottom: "6px" }}>
              <Carousel
                interval={2500}
                autoPlay={true}
                fade
                animationEffect="Fade"
                pause={false}
                controls={false}
              >
                {advertiseCategoryBanner.length > 0 ? (
                  advertiseCategoryBanner.map((banner) => (
                    <Carousel.Item key={banner.id}>
                      <a
                        href={banner.bannerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="d-block w-100 bannerimg"
                          src={`https://admin.myinteriormart.com${banner.imagePath}`}
                          alt={`Banner ${banner.location}`}
                          style={{ height: "474px", width: "100%" }}
                        />
                      </a>
                    </Carousel.Item>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </Carousel>
            </div>
            <div className="grid-item">
              <Carousel
                interval={2500}
                autoPlay={true}
                fade
                animationEffect="Fade"
                pause={false}
                controls={false}
              >
                {advertiseCategoryBanner.length > 0 ? (
                  advertiseCategoryBanner.map((banner) => (
                    <Carousel.Item key={banner.id}>
                      <a
                        href={banner.bannerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="d-block w-100 bannerimg"
                          src={`https://admin.myinteriormart.com${banner.imagePath}`}
                          alt={`Banner ${banner.location}`}
                          style={{ height: "474px", width: "100%" }}
                        />
                      </a>
                    </Carousel.Item>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </Carousel>
            </div>
          </div>
        </div>

        <div className="pagination">
          {/* for dekstop */}
          {!isMobile && (
            <>
              {/* <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
                <img src={previousarrowimg} style={{ height: "30px" }} />
              </button> */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={listings.length < itemsPerPage} // Disable "Next" if fewer than 10 listings
              >
                Next
                {/* <img src={nextarrowimage} style={{ height: "30px" }} /> */}
              </button>
            </>
          )}

          {/* mobile view more */}
          {isMobile && listings.length === itemsPerPage && (
            <button
              onClick={handleViewMore}
              className="view-more-btn"
              style={{
                borderRadius: "32px",
                backgroundColor: "white",
                paddingTop: "5px",
                paddingBottom: "5px",
                fontSize: "14px",
                width: "210px",
                color: "orange",
                fontWeight:'bold'
              }}
            >
              More Search Results<img style={{height:'20px',paddingLeft:'5px'}} src={drparrowimg}/>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
const BusinessHours = ({ businessWorking }) => {
  const { isBusinessOpen, isBusinessOpenText, closeTime } = businessWorking;

  return (
    <p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ height: "13px", paddingRight: "5px" }}
      >
        <path
          d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
          style={{ fill: "gray" }}
        />
      </svg>

      <span style={{ color: isBusinessOpen ? "green" : "red" }}>
        {isBusinessOpenText} {isBusinessOpen && `until ${closeTime}`}
      </span>
    </p>
  );
};

export default Listing;
