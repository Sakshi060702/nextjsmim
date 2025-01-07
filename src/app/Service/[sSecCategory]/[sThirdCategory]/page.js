import React from "react";
import SfourthCatPage from "@/Components/Category/Services/SfourthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await params.searchParams;

  console.log("Fetching data for categoryNEXT:", resolvedParams);
  console.log('resolvedSearchParams',resolvedSearchParams);

  return { resolvedParams, resolvedSearchParams }; 
}

export default async function SfourthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryNEXT:", categoryData);

  
  return <SfourthCatPage params={categoryData} />;
}
