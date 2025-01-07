import CthirdCatPage from "@/Components/Category/Contractor/CthirdCatPage";

async function getThirdCategoryData(params) {
    console.log("Fetching data for category:", params);
   
    return params; 
  }


export default async function CthirdCategory({params}) {
    const categoryData = await getThirdCategoryData(params); 

    console.log("Params in CthirdCategory:", categoryData);
  
    return <CthirdCatPage params={categoryData} />;
}