import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout({category, setCategoryValue})
{
    return(
        <div className="pt-5 px-2 sm:px-12 flex flex-col min-h-screen">
        <Header category={category} setCategoryValue={setCategoryValue}/>
        <Outlet/>
        <Footer/>
        </div>
    );
}