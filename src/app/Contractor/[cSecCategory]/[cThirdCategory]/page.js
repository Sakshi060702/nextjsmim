import React from "react";
import CfourthCatPage from "@/Components/Category/Contractor/CfourthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await params.searchParams;

  console.log("Fetching data for categoryNEXT:", resolvedParams);

  return { resolvedParams, resolvedSearchParams }; 
}

export default async function CfourthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryNEXT:", categoryData);

  
  return <CfourthCatPage params={categoryData} />;
}
