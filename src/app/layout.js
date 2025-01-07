
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Rootlayoutclient from "./Rootlayoutclient";
import Footer from "@/Components/Home/Footer";
import Menu from "@/Components/Home/Menu";
import { UserProvider } from "@/context/UserContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Myinteriormart",
  description: "Generated by create next app",
  keywords:'Myinteriormart keywords',

  openGraph: {
    title: "Create Next App",
    description: "Generated by create next app",
    url: "https://yourwebsite.com", // Replace with your URL
    image: "/path/to/your/image.jpg", // Replace with your image URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Next App",
    description: "Generated by create next app",
    image: "/path/to/your/image.jpg", // Replace with your image URL
  },
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
        <Rootlayoutclient>
      <div className="sticky-menu">
      <Menu/>
        </div>
       
        <main>{children}</main>

        <div>
          <Footer/>
        </div>
      
      </Rootlayoutclient>
        </UserProvider>
     
        
      </body>
    </html>
    
    
  );
}
