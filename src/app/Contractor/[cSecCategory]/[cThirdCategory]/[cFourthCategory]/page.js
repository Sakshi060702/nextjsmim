import React from "react";
import CfifthCatPage from "@/Components/Category/Contractor/CfifthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsF = await params;
  const resolvedSearchParamsF = await params.searchParams;

  console.log("Fetching data for categoryFifthN:", resolvedParamsF);

  return { resolvedParamsF, resolvedSearchParamsF }; 
}

export default async function CfourthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryFifthN:", categoryData);

  
  return <CfifthCatPage params={categoryData} />;
}
