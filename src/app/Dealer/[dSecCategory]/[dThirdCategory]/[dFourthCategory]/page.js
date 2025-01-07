import React from "react";
import DfifthCatPage from "@/Components/Category/Dealer/DfifthCatPage";


async function getCategoryData(params) {
  // Resolve the promises for params and searchParams
  const resolvedParamsF = await params;
  const resolvedSearchParamsF = await params.searchParams;

  console.log("Fetching data for categoryFifthN:", resolvedParamsF);

  return { resolvedParamsF, resolvedSearchParamsF }; 
}

export default async function DfifthCategory({ params }) {
  
  const categoryData = await getCategoryData(params);

  console.log("Params in CthirdCategoryFifthN:", categoryData);

  
  return <DfifthCatPage params={categoryData} />;
}
