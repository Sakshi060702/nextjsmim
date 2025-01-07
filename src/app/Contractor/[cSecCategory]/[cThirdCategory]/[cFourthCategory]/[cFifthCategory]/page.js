import React from "react";
import CSixthCatPage from "@/Components/Category/Contractor/CSixthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsS = await params;
  const resolvedSearchParamsS = await params.searchParams;

  console.log("Fetching data for categoryFifthSIXTH:", resolvedParamsS);

  return { resolvedParamsS, resolvedSearchParamsS }; 
}

export default async function CfourthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategorySixthSIXTH:", categoryData);

  
  return <CSixthCatPage params={categoryData} />;
}
