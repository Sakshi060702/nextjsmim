import Image from "next/image";
import Menu from "@/Components/Home/Menu";
import Contractor from "@/Components/Category/Contractor";
import Service from "@/Components/Category/Service";
import Dealer from "@/Components/Category/Dealer";
import Footer from "@/Components/Home/Footer";

export default function Home() {
  return (
    <>
      <div></div>
      <div id="page">
        <main id="home_main">
          <div className="container">
            <Service></Service>
            <Contractor></Contractor>
            <Dealer></Dealer>
          </div>
        </main>
      </div>
      {/* <div>
        <Footer/>
      </div> */}
    </>
  );
}
