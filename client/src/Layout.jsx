import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout({category, setCategoryValue, searchInput, setSearchInputValue})
{
    return(
        <div className="pt-5 px-2 z-1 sm:px-12 flex flex-col min-h-screen">
        <Header category={category} setCategoryValue={setCategoryValue} searchInput={searchInput} setSearchInputValue={setSearchInputValue}/>
        <Outlet/>
        <Footer/>
        </div>
    );
}