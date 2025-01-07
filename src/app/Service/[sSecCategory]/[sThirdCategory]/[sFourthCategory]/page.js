import React from "react";
import SfifthCatPage from "@/Components/Category/Services/SfifthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsF = await params;
  const resolvedSearchParamsF = await params.searchParams;

  console.log("Fetching data for categoryFifthNEXTF:", resolvedParamsF);

  return { resolvedParamsF, resolvedSearchParamsF }; 
}

export default async function SfifthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryFifthNEXTF:", categoryData);

  
  return <SfifthCatPage params={categoryData} />;
}
