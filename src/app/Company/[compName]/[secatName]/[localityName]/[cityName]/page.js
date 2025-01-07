
import Listingdetails from "@/Components/Listing/Listingdetails";

export async function generateMetadata({ searchParams }) {
    const listingId = searchParams?.listingEncyt;
    const secondCategoryId = searchParams?.secondCategoryId;
    const currentPage = searchParams?.page||1;
    const itemsPerPage = searchParams?.itemperpage||10;
    console.log('listingid',listingId);
    console.log('secondCategoryId',secondCategoryId)
    console.log('page',currentPage)
    console.log('itemperpage',itemsPerPage)

  
    // Fetch listing details from your API
    const response = await fetch(
      `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}`
    );
    const data = await response.json();
  
    const listingDetails = data.find(
      (listing) => listing.listingId.toString() === listingId
    );
  
    return {
      title: listingDetails
        ? `${listingDetails.companyName}`
        : "Myinteriormart",
      description: listingDetails
        ? ` ${listingDetails.description}.`
        : "Myinteriormart.",
        keywords:listingDetails ? `${listingDetails.keyword.map((keyitem)=>keyitem.name).join(',')}`:'Myinteriormart',
        openGraph:{
            title: listingDetails ? listingDetails.companyName : "Myinteriormart",
            description: listingDetails
        ? listingDetails.description
        : "Discover great companies on Myinteriormart.",
      url: `https://myinteriormart.com`, 
      image: listingDetails?.logoImage?.imagePath
            ? `https://apidev.myinteriormart.com${listingDetails.logoImage.imagePath}`
            : "Frontend\img\whatsapp.png",
        },

        twitter: {
            card: "summary_large_image",
            title: listingDetails ? listingDetails.companyName : "Myinteriormart",
            description: listingDetails
              ? listingDetails.description
              : "Discover great companies on Myinteriormart.",
            // image: listingDetails?.companyLogoUrl || "/default-image.jpg", // Adjust image URL
          },
    };
  }
  

export default function CompanyListingPage() {
  return (
   <>
   
<Listingdetails></Listingdetails>
  
   </>
  );
}
