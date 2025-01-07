"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import Listingkeyword from "./ListingKeyword";
import Listingspecialisation from "./Listingspecilisation";
import Listingpayment from "./ListingPayment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import useAuthCheck from "@/app/Hooks/useAuthCheck";
import Webreviews from "./Webreviews";
import "swiper/swiper-bundle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import "../../Styles/Frontend/css/style.css";

import "../../Styles/Frontend/css/style.css";
import "../../Styles/Frontend/css/Lisiting.css";
import "../../Styles/Frontend/css/RegistrationMV.css";
import "../../Styles/Frontend/css/bootstrap.min.css";
import "../../Styles/Frontend/css/custom.css";
import "../../Styles/Frontend/css/Header.css";
import "../../Styles/Frontend/css/reset.css";

import {
  faBookmark,
  faMapMarker,
  faMobileAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMapSigns } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLanguage, faSignLanguage } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faClockFour,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faEarthAmerica } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Listingdetails = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");
  const secondCategoryId = searchParams.get("secondCategoryId");
  //   const secondCategoryName = searchParams.get("secatName");
  const listingId = searchParams.get("listingEncyt");
  console.log("secondCategoryId", secondCategoryId);
  //   console.log('secondCategoryName',secondCategoryName);
  console.log("listingId", listingId);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [listings, setListings] = useState([]);
  const [listingDetails, setListingDetails] = useState(null);
  const [isSociallinkOpen, setIsSociallinkOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [teamimageDetails, setTeamImageDetails] = useState([]);

  const isAuthenticated = useAuthCheck();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [initialBookmarkStatus, setInitialBookmarkStatus] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [initialLikeStatus, setInitialLikeStatus] = useState(false);

  const [isSubscribe, setIsSubscribe] = useState(false);
  const [initialSubscribeStatus, setInitialSubscribeStatus] = useState(false);

  const [imageURL, setImageURL] = useState(null);
  const [imageDetails, setImageDetails] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const swiperRef = React.useRef(null);
  const thumbnailsContainerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [socialLink, setSocialLink] = useState("");

  const activeThumbnailRef = useRef(null);

  const [showFullAddress, setShowFullAddress] = useState(false);

  const [showFullAboutus, setShowFullAboutus] = useState(false);

  const fullAddress = listingDetails?.fullAddress || "";
  const shortAddress = fullAddress
    ? fullAddress.split(",").slice(0, 2).join(", ")
    : "";

  //for address
  const toggleAddress = () => {
    setShowFullAddress(!showFullAddress);
  };

  //for about us
  const toggleAboutus = () => {
    setShowFullAboutus(!showFullAboutus);
  };

  // const ClaimForgetpassword = `/ForgetpasswordClaim/in-${localStorage.getItem(
  //   "cityname"
  // )}`;

  const Getclaimhandleclick = () => {
    // navigate(ClaimForgetpassword,{
    //   state:{mobile:listingDetails.mobile,
    //     email:listingDetails.email
    //   },
    // });
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Slide to the clicked thumbnail's image
    }
  };

  const handleSlideChange = (swiper) => {
    setSelectedImage(swiper.activeIndex);
    scrollThumbnailsToView(swiper.activeIndex);
  };

  const handleSlideChangeImg = (swiper) => {
    const activeIndex = swiper.activeIndex;
    setSelectedImage(activeIndex);

    scrollThumbnailsToView(activeIndex);
    swiperRef.current.slideTo(activeIndex);

    // Scroll the active thumbnail into view on slide change

    // if (thumbnailsContainerRef.current && activeThumbnailRef.current) {
    //   activeThumbnailRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     inline: "center",
    //     block: "nearest",
    //   });
    // }
  };

  const scrollThumbnailsToView = (index) => {
    const thumbnailWidth = 100; // approximate width of a thumbnail (adjust based on your CSS)
    const container = thumbnailsContainerRef.current;
    if (container) {
      const scrollPosition =
        index * thumbnailWidth - container.clientWidth / 2 + thumbnailWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const showSlides = (n) => {
    if (n > imageDetails.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(imageDetails.length);
    } else {
      setSlideIndex(n);
    }
  };

  const openModel = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModel = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // appendDots: (dots) => (
    //   <div style={{ marginBottom: "57px" }}>
    //     <ul> {dots} </ul>
    //   </div>
    // ),
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1,
          background: "gainsboro",
          top: "60px",
          right: "29px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1,
          background: "gainsboro",
          top: "60px",
          left: "29px",
        }}
        onClick={onClick}
      ></div>
    );
  }

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchListings();
  }, [listingId]);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      const company = data.find(
        (listing) => listing.listingId.toString() === listingId
      );

      console.log("company", company);
      setListingDetails(company);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  //for bookmark

  const handleBookmarkToggle = async () => {
    console.log(isBookmarked);
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Bookmark/BookMarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId, // dynamically add companyID
          }),
        }
      );
      if (response.ok) {
        setIsBookmarked((prev) => !prev);
      } else {
        console.error("Failed to update bookmark status");
      }
      // console.log(setIsBookmarked);
    } catch (error) {
      console.error("Error in updating bookmark status", error);
    }
  };

  const handleBookmarkClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      console.log("hello");
    } else {
      handleBookmarkToggle();
    }
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        // Ensure listingDetails and listingId are available
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Bookmark`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("bookmark", data);
            setIsBookmarked(data.bookmark); // Assuming response has a field 'bookmark'
          } else {
            console.error("Failed to fetch bookmark status");
          }
        } catch (error) {
          console.error("Error in fetching bookmark status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchBookmarkStatus();
  }, [listingDetails]);

  //for like
  const handleLikeToggle = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Like/Likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId,
          }),
        }
      );
      if (response.ok) {
        setIsLike((prev) => !prev);
      } else {
        console.error("Failed to update Like status");
      }
    } catch (error) {
      console.error("Error in updating Like status", error);
    }
  };

  const handleLikeClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      // console.log("hello");
    } else {
      handleLikeToggle();
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/LikeDislike`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                //  listingId: listingId,
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("Like", data);
            setIsLike(data.likeandDislike); // Assuming response has a field bookmarkStatus
          } else {
            console.error("Failed to fetch like status");
          }
        } catch (error) {
          console.error("Error in fetching like status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchLikeStatus();
  }, [listingDetails]);

  //for subscribe
  const handleSubscribeToggle = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Subscribe/Subscribes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId, // dynamically add companyID
          }),
        }
      );
      if (response.ok) {
        setIsSubscribe((prev) => !prev);
      } else {
        console.error("Failed to update Subscribe status");
      }
    } catch (error) {
      console.error("Error in updating Subscribe status", error);
    }
  };

  const handleSubscribeClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      // console.log("hello");
    } else {
      handleSubscribeToggle();
    }
  };

  useEffect(() => {
    const fetchSubscribeStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Subscribes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("Subscribe", data);
            setIsSubscribe(data.subscribe); // Assuming response has a field bookmarkStatus
          } else {
            console.error("Failed to fetch subscribe status");
          }
        } catch (error) {
          console.error("Error in fetching subscribe status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchSubscribeStatus();
  }, [listingDetails]);

  // useEffect(() => {
  //   const fetchSocialLinks = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetSocialLinkDetails",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             companyID: parseInt(listingId),
  //           }),
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user profile");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setSocialLink(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSocialLinks();
  //   // if (isAuthenticated) {
  //   //   fetchGalleryImage();
  //   // }
  // }, [listingId]);


  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetSocialLinkDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: parseInt(listingId),
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
  
        const text = await response.text(); // Read the response as text
        console.log("Response Text:", text);
  
        // Check if the response is empty
        const data = text.trim() ? JSON.parse(text) : {}; // Parse only if not empty
        console.log("Parsed Data:", data);
  
        setSocialLink(data || {}); // Set an empty object if data is null or undefined
      } catch (error) {
        console.error("Error fetching social links:", error);
        setSocialLink({}); // Set an empty object on error
      }
    };
  
    fetchSocialLinks();
  }, [listingId]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!listingDetails || !listingDetails.listingId) {
        console.log("listingDetails or listingId is not available yet.");
        return;
      }

      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Keywordshowfromstatus/GetKeywordshow",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: listingDetails.listingId,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setStatus(data.data.status);
        console.log("Status inside fetch:", data.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchData();
  }, [listingDetails]); // Dependency array

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetBannerImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: parseInt(listingId),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setImageURL(data.imagepath); // Assuming data contains image URL and title
      } catch (error) {
        console.error(error);
      }
    };
    // if (isAuthenticated) {
    //   fetchBannerImage();
    // }
    fetchBannerImage();
  }, []);

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetGalleryImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: parseInt(listingId),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();

        if (data instanceof Object) {
          setImageDetails(
            data.imagepath.map((img) => ({ url: img, title: data.imagetitle }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGalleryImage();
    // if (isAuthenticated) {
    //   fetchGalleryImage();
    // }
  }, [listingId]);

  //address api
  const fetchStates = async (type, countryID, stateID, parentID = null) => {
    console.log(type, countryID, parentID);
    let body = {
      type,
      CountryID: countryID,
      StateID: stateID,
      CityID: setSelectedCity,
      AssemblyID: setSelectedAssembly,
      PincodeID: setSelectedPincode,
      LocalityID: setSelectedLocality,
      LocalAddress: "",
    };
    if (parentID) body.parentID = parentID;

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/FetchAddressMaster/FetchAddressDropdownMaster",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      console.log("address array", data);

      console.log("stateid", countryID);
      console.log("countryid", stateID);
      const country_detials = data["countries"].filter(
        (count) => count.countryID == countryID
      );
      // console.log('country',country_detials);

      if (!country_detials.length) {
        console.error("Country not found");
        return [];
      }

      const states_details = country_detials[0]["states"].filter(
        (count) => count.stateID == stateID
      );

      // console.log('address array',country_detials[0].name, states_details[0].name);
      // return data.country[0]?.states || [];
      return states_details;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Fetch team image and state details
  const fetchTeamImage = async () => {
    try {
      // Fetch owner image details
      const ownerImageResponse = await fetch(
        "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetOwnerImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyID: parseInt(listingId),
          }),
        }
      );
      if (!ownerImageResponse.ok) {
        throw new Error("Failed to fetch owner image details");
      }
      const ownerImageData = await ownerImageResponse.json();
      console.log("Owner Image Data:", ownerImageData);

      const fetchedStates = await fetchStates(
        undefined,
        ownerImageData.countryId,
        ownerImageData.stateId
      );
      console.log("fechedstates", fetchedStates);

      const stateName =
        fetchedStates.find((state) => state.stateID === ownerImageData.stateId)
          ?.name || "State not found";

      // console.log(stateName);

      // Update team image details
      setTeamImageDetails(
        ownerImageData.imagepath.map((img, index) => ({
          url: img,
          prefix: ownerImageData.prefix[index],
          title: `${ownerImageData.ownerName[index] || "no name"} ${
            ownerImageData.lastName[index]
          }`,
          designation: ownerImageData.designation[index] || "no name",
          state: stateName,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeamImage();
  }, []);

  return (
    <>
      <div className="container individual-listing">
        <div className="row">
          {listingDetails ? (
            <>
              <div className="col-lg-3 individual-listing-sidebar padding-5 pagebottom">
                <>
                  {status === 1 && listingDetails.logoImage ? (
                    <>
                      <div className="box_detail_cus">
                        <div className="p-3">
                          <div className="user_logo_sec">
                            {listingDetails.logoImage &&
                            listingDetails.logoImage.imagePath ? (
                              <img
                                src={`https://apidev.myinteriormart.com${listingDetails.logoImage.imagePath}`}
                                // src={listingDetails.logoImage.imagePath}
                                alt={`${listingDetails.companyName} Logo`}
                                className="card-img-top"
                                style={{ height: "100px" }}
                              />
                            ) : (
                              <div>
                                {/* <div
                              className="client_first_letter"
                              style={{
                                height: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {listingDetails.companyFirstLetter}
                            </div> */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>

                <>
                  {status === 1 && teamimageDetails.length > 0 ? (
                    <div className="box_detail_cus">
                      <div className="cust-profile">
                        {teamimageDetails.length > 0 && (
                          <Slider {...settings}>
                            {teamimageDetails.map((teamImage, index) => (
                              <div key={index}>
                                <img
                                  className="upload_images"
                                  src={`https://apidev.myinteriormart.com${teamImage.url}`}
                                  alt="Owner Image"
                                  style={{
                                    borderRadius: "50px",
                                    width: "100px",
                                    height: "100px",
                                    display: "inline-block",
                                  }}
                                />
                                <h5 style={{ fontSize: "20px" }}>
                                  {teamImage.prefix}.
                                  <span style={{ marginLeft: "6px" }}>
                                    {teamImage.title}
                                  </span>
                                </h5>
                                <h6 style={{ fontSize: "14px" }}>
                                  {teamImage.designation}
                                </h6>
                                <h6 style={{ fontSize: "14px" }}>
                                  From: {teamImage.state}
                                </h6>
                              </div>
                            ))}
                          </Slider>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
                <>
                  {status === 1 ? (
                    <>
                      <Listingkeyword companyID={listingDetails.listingId} />
                    </>
                  ) : (
                    <></>
                  )}
                </>
                <Listingspecialisation companyID={listingDetails.listingId} />
                <Listingpayment companyID={listingDetails.listingId} />
              </div>
              <div className="col-lg-9 individual-listing-main padding-5">
                <div className="listing-gallery ">
                  <div className="gallery listingbanner">
                    <img
                      className="upload_imagesbanner "
                      src={
                        imageURL
                          ? `https://apidev.myinteriormart.com${imageURL}`
                          : "/Frontend/img/Bimg.png"
                      }
                      alt="Banner Image"
                    />
                    {console.log("Banner", imageURL)}
                  </div>

                  <div className="gallery listinggallery">
                    {/* Mobile view Gallery */}
                    <style>
                      {`
                                .swiper-button-prev,
                                .swiper-button-next ,
                                .swiper-pagination{
                                  display: none !important;
                                }
                             `}
                    </style>

                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={10}
                      slidesPerView={1}
                      onSlideChange={handleSlideChangeImg}
                      initialSlide={selectedImage}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                      onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                      {imageDetails.length > 0 ? (
                        imageDetails.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={`https://apidev.myinteriormart.com${image.url}`}
                              alt={`Slide ${index + 1}`}
                              className="main-image-display photogallerymain"
                              onClick={() => openModel(image.url)}
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <img
                            src="/Frontend/img/Gimg.png"
                            alt="Dummy Image"
                            className="main-image-display photogallerymaindummy"
                            style={{ border: "1px solid gainsboro" }}
                          />
                        </SwiperSlide>
                      )}
                    </Swiper>

                    {/* Modal for image popup */}
                    {modalOpen && (
                      <div className="Gmodal-overlay">
                        <div
                          className="Gmodal-content"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="Gmodal-close" onClick={closeModel}>
                            &times;
                          </button>
                          <img
                            src={`https://apidev.myinteriormart.com${selectedImage}`}
                            alt="Full View"
                            className="Gmodal-image"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className="thumbnails scrollmenu"
                      ref={thumbnailsContainerRef}
                      style={{
                        marginTop: "2px",
                        overflowX: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {imageDetails.length > 0 ? (
                        imageDetails.map((image, index) => (
                          <div
                            key={index}
                            className="thumbnail imgScroll photogallerythumbnail "
                            onClick={() => handleThumbnailClick(index)}
                            style={{
                              border:
                                selectedImage === index
                                  ? "2px solid gray"
                                  : "2px solid transparent",
                              display: "inline-block",
                            }}
                            // ref={
                            //   selectedImage === index
                            //     ? activeThumbnailRef
                            //     : null
                            // } // Assign ref to the active thumbnail
                          >
                            <img
                              src={`https://apidev.myinteriormart.com${image.url}`}
                              alt={`Thumbnail ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "2px" }}>
                            {" "}
                            <img
                              src="/Frontend/img/Gimg.png"
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                          <div style={{ marginRight: "2px" }}>
                            {" "}
                            <img
                              src="/Frontend/img/Gimg.png"
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                          <div>
                            {" "}
                            <img
                              src="/Frontend/img/Gimg.png"
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="company-listing-main">
                  <div className="listing-details">
                    <div className="col-lg-4 col-md-12 company-map padding-all-5 listingbanner">
                      <div className="pro-large-img img-zoom gallery1">
                        <div className="image-gallery">
                          {/* Dekstop Gallery Image */}
                          <style>
                            {`
                                .swiper-button-prev,
                                .swiper-button-next ,
                                .swiper-pagination{
                                  display: none !important;
                                }
                                  .main-image-display{
                                  width:252px;
                                  height:52px;
                                  object-fit: cover;
                                  }
                             `}
                          </style>

                          <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            onSlideChange={handleSlideChange}
                            initialSlide={selectedImage}
                            autoplay={{
                              delay: 4000,
                              disableOnInteraction: false,
                            }}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                          >
                            {imageDetails.length > 0 ? (
                              imageDetails.map((image, index) => (
                                <SwiperSlide key={index}>
                                  <img
                                    src={`https://apidev.myinteriormart.com${image.url}`}
                                    alt={`Slide ${index + 1}`}
                                    className="main-image-display photogallerymain"
                                    onClick={() => openModel(image.url)}
                                  />
                                </SwiperSlide>
                              ))
                            ) : (
                              <SwiperSlide>
                                <img
                                  src="/Frontend/img/Gimg.png"
                                  alt="Dummy Image"
                                  className="main-image-display photogallerymain"
                                  style={{ border: "1px solid gainsboro" }}
                                />
                              </SwiperSlide>
                            )}
                          </Swiper>

                          {/* Modal for image popup */}
                          {modalOpen && (
                            <div className="Gmodal-overlay">
                              <div
                                className="Gmodal-content"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="Gmodal-close"
                                  onClick={closeModel}
                                >
                                  &times;
                                </button>
                                <img
                                  src={`https://apidev.myinteriormart.com${selectedImage}`}
                                  alt="Full View"
                                  className="Gmodal-image"
                                />
                              </div>
                            </div>
                          )}

                          {/* Thumbnails Display */}
                          <div
                            className="thumbnails scrollmenu"
                            ref={thumbnailsContainerRef}
                            style={{
                              marginTop: "2px",
                              overflowX: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                            }}
                          >
                            {imageDetails.length > 0 ? (
                              imageDetails.map((image, index) => (
                                <div
                                  key={index}
                                  className="thumbnail imgScroll photogallerythumbnail"
                                  onClick={() => handleThumbnailClick(index)}
                                  style={{
                                    border:
                                      selectedImage === index
                                        ? "2px solid gray"
                                        : "2px solid transparent",
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={`https://apidev.myinteriormart.com${image.url}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "2px" }}>
                                  {" "}
                                  <img
                                    src="/Frontend/img/Gimg.png"
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                                <div style={{ marginRight: "2px" }}>
                                  {" "}
                                  <img
                                    src="/Frontend/img/Gimg.png"
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                                <div>
                                  {" "}
                                  <img
                                    src="/Frontend/img/Gimg.png"
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8 col-md-12 company-details-list padding-all-5 company-addes">
                      <div
                        className="company-addes"
                        style={{ borderBottom: "1px solid #f1f1f1" }}
                      >
                        <div className="company-details">
                          <h5
                            className="company-name"
                            style={{ fontSize: "17px" }}
                          >
                            {listingDetails.companyName}
                          </h5>
                        </div>
                        <div style={{ display: "flex" }}>
                          <span
                            className="company-category-name listingcolor ratingsize"
                            style={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            {listingDetails.listingKeyword}
                          </span>
                          <span className="company-rating ">
                            {listingDetails.ratingAverage}.0
                            <div className="cat_star">
                              {Array(listingDetails.ratingAverage)
                                .fill()
                                .map((_, i) => (
                                  <i
                                    key={i}
                                    className="icon_star active"
                                    style={{ color: "orange" }}
                                  ></i>
                                ))}
                            </div>
                            ({listingDetails.ratingCount})
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 mim-Address">
                        <p>
                          {/* <FontAwesomeIcon icon={faMapMarker} style={{marginRight:'8px'}}/> */}
                          {/* <i
                            className="fa fa-map-marker "
                            style={{ marginRight: "8px" }}
                          ></i> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            style={{ height: "13px", marginRight: "8px" }}
                          >
                            <path
                              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                              style={{ fill: "gray" }}
                            />
                          </svg>
                          <span className="ListingpageFont">
                            {showFullAddress
                              ? fullAddress
                              : `${shortAddress}...`}
                            <a
                              onClick={toggleAddress}
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginLeft: "5px",
                              }}
                            >
                              {showFullAddress ? "less" : "more"}
                            </a>
                          </span>
                        </p>
                        <div className="listingarea listinga">
                          <p className="listingdetailslocality">
                            <span className="ListingpageFont">
                              <FontAwesomeIcon
                                icon={faMap}
                                style={{ color: "gray", marginRight: "8px" }}
                              />
                              {/* <i
                                className="fa fa-map-o"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              {listingDetails.area}
                            </span>
                          </p>
                          <p className="listingareatabs">
                            <span className="ListingpageFont">
                              <FontAwesomeIcon
                                icon={faMapSigns}
                                style={{ color: "gray", marginRight: "8px" }}
                              />
                              {/* <i
                                className="fa fa-map-signs"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              {listingDetails.locality}
                            </span>
                          </p>
                          <p style={{ display: "none" }}>
                            {listingDetails.email}
                          </p>
                        </div>
                      </div>
                      {listingDetails.website && (
                        <div className="col-lg-12 mb-1 px-0 year_gst">
                          <p className="m-0 ListingpageFont">
                            <FontAwesomeIcon
                              icon={faEarthAmerica}
                              style={{ color: "gray", marginRight: "8px" }}
                            />
                            {/* <i
                              className="fa fa-globe"
                              style={{ marginRight: "4px" }}
                            ></i> */}
                            <Link
                              // href={
                              //   listingDetails.website.startsWith("http://") ||
                              //   listingDetails.website.startsWith("https://")
                              //     ? listingDetails.website
                              //     : `https://${listingDetails.website}`
                              // }
                              href={listingDetails.website}
                              target="_blank"
                              style={{ color: "orange" }}
                              rel="noopener noreferrer"
                            >
                              {" "}
                              {listingDetails.website}
                            </Link>
                          </p>
                        </div>
                      )}

                      <div className="listingemp listinglocality">
                        <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                          <p className="m-0 ListingpageFont">
                            {/* <i
                              className="fa fa-calendar"
                              style={{ marginRight: "8px" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              style={{ color: "gray", marginRight: "8px" }}
                            />
                            Since {listingDetails.yearOfEstablishment}
                          </p>
                        </div>

                        {listingDetails.numberOfEmployees && (
                          <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                            <p
                              className="mb-0 noemployee ListingpageFont"
                              style={{ marginLeft: "-1px" }}
                            >
                              {/* <i
                                className="fa fa-users"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <FontAwesomeIcon
                                icon={faUsers}
                                style={{ color: "gray", marginRight: "8px" }}
                              />
                              {listingDetails.numberOfEmployees} Employees
                            </p>
                          </div>
                        )}
                      </div>

                      {listingDetails.turnover && (
                        <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                          <p className="mb-0 ListingpageFont">
                            Turnover : {listingDetails.turnover}
                          </p>
                        </div>
                      )}

                      {/* gstnumber */}
                      {listingDetails.gstNumber && (
                        <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                          <p className="mb-0 ListingpageFont">
                            GST NO : {listingDetails.gstNumber}
                          </p>
                        </div>
                      )}

                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0 ListingpageFont">
                          {/* <i
                            className="fa fa-language mr-1"
                            style={{ marginRight: "4px" }}
                          ></i> */}
                          <FontAwesomeIcon
                            icon={faLanguage}
                            style={{ color: "gray", marginRight: "8px" }}
                          />
                          {listingDetails.languges}
                        </p>
                      </div>

                      {/* <div>
                        <button onClick={() => setIsSociallinkOpen(true)}>
                          Share
                        </button>
                      </div> */}

                      {/* dekstop view */}
                      <div className="listingnumberD">
                        <div className="listingemp listingtoll">
                          {/* mobile number */}
                          <div classname="col-lg-12 mb-1 p-0">
                            {/* <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faMobileAlt}
                              style={{ color: "gray", fontSize: "13px" }}
                            />
                            <Link
                              href={`tel:${listingDetails.mobile}`}
                              style={{ marginRight: "3px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.mobile}
                            </Link>
                          </div>

                          {/* registered mobile */}
                          {listingDetails.registerMobile && (
                            <div
                              classname="col-lg-12 mb-1 listingtelephone"
                              style={{ width: "19%" }}
                            >
                              <FontAwesomeIcon
                                icon={faMobileAlt}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              {/* <i
                                className="fa fa-mobile"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <Link
                                href={`tel:${listingDetails.registerMobile}`}
                                style={{ marginRight: "1px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.registerMobile}
                              </Link>
                            </div>
                          )}

                          {/* telephone */}
                          {listingDetails.telephone && (
                            <div
                              classname="col-lg-12 mb-1 listingtelephone"
                              style={{ width: "20%" }}
                            >
                              {/* <i
                                className="fa fa-phone"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <FontAwesomeIcon
                                icon={faPhone}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              <Link
                                href={`tel:${listingDetails.telephone}`}
                                style={{ marginRight: "3px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.telephone}
                              </Link>
                            </div>
                          )}

                          {/* tollfree */}
                          {listingDetails.tollFree && (
                            <div classname="col-lg-12 mb-1 p-0">
                              {/* <i
                                className="fa fa-headphones"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <FontAwesomeIcon
                                icon={faHeadphones}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              <Link
                                href={`tel:${listingDetails.tollFree}`}
                                style={{ marginRight: "8px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.tollFree}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* mobile view */}
                      <div className="listingnumberM">
                        <div className="listingemp listingtoll">
                          {/* mobile number */}
                          <div classname="col-lg-12 mb-1 p-0">
                            {/* <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faMobileAlt}
                              style={{ color: "gray", fontSize: "13px" }}
                            />
                            <Link
                              href={`tel:${listingDetails.mobile}`}
                              style={{ marginRight: "3px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.mobile}
                            </Link>
                          </div>

                          {/* registered mobile */}
                          {listingDetails.registerMobile && (
                            <div
                              classname="col-lg-12 mb-1 listingtelephone"
                              style={{ width: "32%" }}
                            >
                              {/* <i
                                className="fa fa-mobile"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <FontAwesomeIcon
                                icon={faMobileAlt}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              <Link
                                href={`tel:${listingDetails.registerMobile}`}
                                style={{ marginRight: "3px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.registerMobile}
                              </Link>
                            </div>
                          )}

                          {/* telephone */}
                          {listingDetails.telephone && (
                            <div
                              classname="col-lg-12 mb-1 listingtelephone"
                              style={{ width: "-1%" }}
                            >
                              <FontAwesomeIcon
                                icon={faPhone}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              {/* <i
                                className="fa fa-phone"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <Link
                                href={`tel:${listingDetails.telephone}`}
                                style={{ marginRight: "3px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.telephone}
                              </Link>
                            </div>
                          )}

                          {/* tollfree */}
                          {/* <div classname="col-lg-12 mb-1 p-0">
                          <i
                            className="fa fa-headphones"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a
                            href={`tel:${listingDetails.tollFree}`}
                            style={{ marginRight: "8px", color: "orange" }}
                            className="ListingpageFont"
                          >
                            {listingDetails.tollFree}
                          </a>
                        </div> */}
                        </div>
                      </div>
                      <div className="listingnumberM">
                        <div className="listingemp listingtoll">
                          {listingDetails.tollFree && (
                            <div
                              classname="col-lg-12 mb-1 p-0"
                              style={{ marginLeft: "-2px" }}
                            >
                              {/* <i
                                className="fa fa-headphones"
                                style={{ marginRight: "8px" }}
                              ></i> */}
                              <FontAwesomeIcon
                                icon={faHeadphones}
                                style={{ color: "gray", fontSize: "13px" }}
                              />
                              <Link
                                href={`tel:${listingDetails.tollFree}`}
                                style={{ marginRight: "8px", color: "orange" }}
                                className="ListingpageFont"
                              >
                                {listingDetails.tollFree}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        classname="company-time ListingpageFont"
                        style={{ display: "flex", justifyItems: "center" }}
                      >
                        {/* <i
                          className="fa fa-clock-o"
                          style={{ paddingTop: "5px", marginRight: "8px" }}
                        ></i> */}
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{
                            color: "gray",
                            fontSize: "13px",
                            marginRight: "4px",
                            marginTop: "5px",
                          }}
                        />

                        <BusinessHours
                          businessWorking={listingDetails.businessWorking}
                          workingtime={listingDetails.workingtime}
                        />
                      </div>

                      <div className="social-details desktop">
                        {listingDetails.claimedListing ? (
                          <button
                            className="btn btn-guotes btn-sm"
                            // onClick={() => setIsPopupOpen(true)}
                            style={{ marginRight: "10px", font: "bold" }}
                            onClick={(event) => {
                              event.preventDefault();

                              Getclaimhandleclick();
                            }}
                          >
                            Claim Listing
                          </button>
                        ) : (
                          <button
                            className="btn btn-guotes btn-sm"
                            onClick={() => setIsPopupOpen(true)}
                            style={{ marginRight: "10px", font: "bold" }}
                          >
                            Get Quotes
                          </button>
                        )}

                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          {/* <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i> */}
                          <FontAwesomeIcon
                            icon={faBookmark}
                            style={{
                              color: isBookmarked ? "orange" : "gray",
                              marginRight: "5px",
                            }}
                          />
                          <b
                            style={{ color: isBookmarked ? "orange" : "black" }}
                          >
                            Bookmark
                          </b>
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          {/* <i
                            className="fa fa-share"
                            style={{ marginRight: "4px" }}
                          ></i> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{ marginRight: "4px", height: "13px" }}
                          >
                            <path
                              d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                              style={{ fill:isSociallinkOpen? 'orange':"gray" }}
                            />
                          </svg>
                          <b
                            style={{
                              color: isSociallinkOpen ? "orange" : "black",
                            }}
                          >
                            Share
                          </b>
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          {/* <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{ height: "15px", marginRight: "5px" }}
                          >
                            <path
                              d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"
                              style={{ fill: isLike ? "orange" : "gray" }}
                            />
                          </svg>
                          <b style={{ color: isLike ? "orange" : "black" }}>
                            Like
                          </b>
                        </button>

                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          {/* <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            style={{ height: "15px", marginRight: "5px" }}
                          >
                            <path
                              d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                              style={{ fill: isSubscribe ? "orange" : "gray" }}
                            />
                          </svg>
                          <b
                            style={{ color: isSubscribe ? "orange" : "black" }}
                          >
                            Subscribe
                          </b>
                        </button>
                      </div>
                      <div
                        className="social-details mobile"
                        style={{ marginLeft: "-5px" }}
                      >
                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isBookmarked ? "orange" : "black" }}
                          >
                            Bookmark
                          </b>
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          <i
                            className="fa fa-share"
                            style={{ marginRight: "4px" }}
                          ></i>
                          <b
                            style={{
                              color: isSociallinkOpen ? "orange" : "black",
                            }}
                          >
                            Share
                          </b>
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b style={{ color: isLike ? "orange" : "black" }}>
                            Like
                          </b>
                        </button>

                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isSubscribe ? "orange" : "black" }}
                          >
                            Subscribe
                          </b>
                        </button>
                      </div>

                      {/* social link */}
                      <div className="col-lg-12 social-share p-0 listingpageSocialLink">
                        {socialLink.whatsappGroupLink && (
                          <Link
                            href={`https://${
                              socialLink.whatsappGroupLink || "#0"
                            }`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="fa fa-whatsapp"
                              style={{ marginRight: "-1px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faWhatsapp}
                              style={{ marginRight: "5px", color: "orange" }}
                            />
                          </Link>
                        )}
                        {socialLink.facebook && (
                          <Link
                            href={`https://${socialLink.facebook || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="ti-facebook"
                              style={{ marginRight: "-1px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faFacebook}
                              style={{ marginRight: "5px", color: "orange" }}
                            />
                          </Link>
                        )}

                        {socialLink.linkedin && (
                          <Link
                            href={`https://${socialLink.linkedin || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="ti-linkedin"
                              style={{ marginRight: "3px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              style={{ marginRight: "5px", color: "orange" }}
                            />
                          </Link>
                        )}

                        {socialLink.twitter && (
                          <Link
                            href={`https://${socialLink.twitter || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i className="bi bi-twitter-x" style={{marginRight:'5px',color:'orange'}}></i> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              color="orange"
                              className="bi bi-twitter-x svg-margin"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                          </Link>
                        )}

                        {socialLink.youtube && (
                          <Link
                            href={`https://${socialLink.youtube || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="ti-youtube"
                              style={{ marginRight: "3px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faYoutube}
                              style={{ marginRight: "3px", color: "orange" }}
                            />
                          </Link>
                        )}

                        {socialLink.instagram && (
                          <Link
                            href={`https://${socialLink.instagram || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="ti-instagram"
                              style={{ marginRight: "5px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faInstagram}
                              style={{ marginRight: "5px", color: "orange" }}
                            />
                          </Link>
                        )}

                        {socialLink.pinterest && (
                          <Link
                            href={`https://${socialLink.pinterest || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i
                              className="ti-pinterest"
                              style={{ marginRight: "5px", color: "orange" }}
                            ></i> */}
                            <FontAwesomeIcon
                              icon={faPinterest}
                              style={{ marginRight: "5px", color: "orange" }}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {listingDetails.description && (
                    <div className="banner-block one-block my-5 listingaboutus">
                      <div className="row px-3">
                        <div className="col-12">
                          <h3>About us</h3>
                          <p
                            className={
                              showFullAboutus ? "full-text" : "limited-text"
                            }
                            style={{ textIndent: "30px", display: "inline" }}
                          >
                            {showFullAboutus
                              ? listingDetails.description
                              : `${listingDetails.description.slice(
                                  0,
                                  300
                                )}...`}
                          </p>

                          {/* The More/Less button */}
                          {listingDetails.description.length > 300 && (
                            <button
                              onClick={toggleAboutus}
                              style={{
                                color: "orange",
                                border: "none",
                                background: "none",
                                paddingLeft: "5px",
                                cursor: "pointer",
                                display: "inline",
                              }}
                            >
                              {showFullAboutus ? "Less" : "More"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* webreview code add here */}
                  <Webreviews companyID={listingDetails.listingId}/>

                  <div className="col-lg-4 col-md-12 company-map padding-all-5 listinggallery listingb">
                    <div
                      className="pro-large-img img-zoom gallery1"
                      style={{
                        marginTop: "-4px",
                        marginBottom: "-49px",
                      }}
                    >
                      <img
                        className="upload_imagesbanner "
                        src={
                          imageURL
                            ? `https://apidev.myinteriormart.com${imageURL}`
                            : "/Frontend/img/Bimg.png"
                        }
                        alt="Banner Image"
                        style={{ height: "70%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* <Sociallink
        isOpen={isSociallinkOpen}
        onClose={() => setIsSociallinkOpen(false)}
      /> */}
    </>
  );
};

const BusinessHours = ({ workingtime, businessWorking }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getWorkingHours = (from, to, formatStartOnly = false) => {
    const formatTime = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const isPM = hour >= 12;
      const formattedHour = hour % 12 || 12;
      const ampm = isPM ? "PM" : "AM";
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };
    const fromTime = formatTime(from);
    if (formatStartOnly) {
      return fromTime;
    }
    const toTime = formatTime(to);
    return `${fromTime} - ${toTime}`;
  };

  const days = [
    { day: "Monday", from: workingtime.mondayFrom, to: workingtime.mondayTo },
    {
      day: "Tuesday",
      from: workingtime.tuesdayFrom,
      to: workingtime.tuesdayTo,
    },
    {
      day: "Wednesday",
      from: workingtime.wednesdayFrom,
      to: workingtime.wednesdayTo,
    },
    {
      day: "Thursday",
      from: workingtime.thursdayFrom,
      to: workingtime.thursdayTo,
    },
    { day: "Friday", from: workingtime.fridayFrom, to: workingtime.fridayTo },
    {
      day: "Saturday",
      from: workingtime.saturdayFrom,
      to: workingtime.saturdayTo,
      isHoliday: workingtime.saturdayHoliday,
    },
    {
      day: "Sunday",
      from: workingtime.sundayFrom,
      to: workingtime.sundayTo,
      isHoliday: workingtime.sundayHoliday,
    },
  ];

  const getCurrentStatus = () => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 is Sunday, 6 is Saturday
    const currentDay = days[dayIndex];
    const currentTime = now.toTimeString().split(" ")[0];

    const isOpen =
      currentTime >= currentDay.from && currentTime <= currentDay.to;

    let nextOpenDay;
    for (let i = 0; i <= 7; i++) {
      const nextIndex = (dayIndex + i) % 7;
      const nextDay = days[nextIndex];
      if (!nextDay.isHoliday) {
        nextOpenDay = nextDay;
        break;
      }
    }

    const nextOpenTime = nextOpenDay
      ? getWorkingHours(nextOpenDay.from, nextOpenDay.to)
      : null;

    const nextTime = nextOpenDay
      ? getWorkingHours(nextOpenDay.from, null, true)
      : null;
    return {
      isOpen,
      currentDay,
      nextOpenDay,
      nextOpenTime,
      nextTime,
    };
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //funtion for handleclickoutside function
  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const { isOpen, currentDay, nextOpenDay, nextOpenTime, nextTime } =
    getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        <button
          className="timedrp"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
          type="button"
        >
          <span style={{ color: isOpen ? "green" : "red" }}>
            {isOpen ? <b>Open</b> : <b>Closed Now</b>}
          </span>

          {isOpen ? (
            <>
              {" "}
              {/* (Closes at{" "}
              {new Date(`1970-01-01T${currentDay.to}Z`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              ) */}
            </>
          ) : (
            <>
              {" "}
              {/* Opens {nextOpenDay ? `${nextTime} at ${nextOpenDay.day}` : "soon"} */}
            </>
          )}
          <i
            className={`fa ${
              isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
            style={{ marginLeft: "8px" }}
          ></i>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="business-hours" ref={dropdownRef}>
          <ul>
            {days.map((day, index) => (
              <li
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{day.day} &nbsp;&nbsp; </span>
                {day.isHoliday ? (
                  <span>Holiday</span>
                ) : (
                  <span>{getWorkingHours(day.from, day.to)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Listingdetails;
