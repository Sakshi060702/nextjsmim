import React from "react";

import DfourthCatPage from "@/Components/Category/Dealer/DfourthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await params.searchParams;

  console.log("Fetching data for categoryNEXT:", resolvedParams);

  return { resolvedParams, resolvedSearchParams }; 
}

export default async function DfourthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryNEXT:", categoryData);

  
  return <DfourthCatPage params={categoryData} />;
}
