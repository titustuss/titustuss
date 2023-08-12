import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout({category, setCategoryValue})
{
    return(
        <div className="py-5 px-6 sm:px-12 flex flex-col min-h-screen">
        <Header category={category} setCategoryValue={setCategoryValue}/>
        <Outlet/>
        </div>
    );
}