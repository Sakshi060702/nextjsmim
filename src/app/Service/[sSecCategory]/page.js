import SthirdCatPage from "@/Components/Category/Services/SthirdCatPage";

async function getThirdCategoryData(params) {
    console.log("Fetching data for category:", params);
   
    return params; 
  }


export default async function SthirdCategory({params}) {
    const categoryData = await getThirdCategoryData(params); 

    console.log("Params in CthirdCategory:", categoryData);
  
    return <SthirdCatPage params={categoryData} />;
}