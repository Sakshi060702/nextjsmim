import React from "react";
import DSixthCatPage from "@/Components/Category/Dealer/DSixthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsS = await params;
  const resolvedSearchParamsS = await params.searchParams;

  console.log("Fetching data for categoryFifthSIXTH:", resolvedParamsS);

  return { resolvedParamsS, resolvedSearchParamsS }; 
}

export default async function DsixthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategorySixthSIXTH:", categoryData);

  
  return <DSixthCatPage params={categoryData} />;
}
