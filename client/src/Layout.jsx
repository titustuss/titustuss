import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout({category, setCategoryValue})
{
    return(
        <div className="py-4 px-10 flex flex-col min-h-screen">
        <Header category={category} setCategoryValue={setCategoryValue}/>
        <Outlet/>
        </div>
    );
}