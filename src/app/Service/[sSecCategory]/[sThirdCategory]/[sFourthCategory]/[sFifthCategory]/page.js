import React from "react";
import SSixthCatPage from "@/Components/Category/Services/SSixthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsS = await params;
  const resolvedSearchParamsS = await params.searchParams;

  console.log("Fetching data for categoryFifthNextS:", resolvedParamsS);

  return { resolvedParamsS, resolvedSearchParamsS }; 
}

export default async function CsixthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategorySixthNEXTS:", categoryData);

  
  return <SSixthCatPage params={categoryData} />;
}
