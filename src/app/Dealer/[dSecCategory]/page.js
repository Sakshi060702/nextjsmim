import DthirdCatPage from "@/Components/Category/Dealer/DthirdCatPage";

async function getThirdCategoryData(params) {
    console.log("Fetching data for category:", params);
   
    return params; 
  }


export default async function DthirdCategory({params}) {
    const categoryData = await getThirdCategoryData(params); 

    console.log("Params in DthirdCategory:", categoryData);
  
    return <DthirdCatPage params={categoryData} />;
}