/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router-dom"
import icon from '@/assets/images/icon.png';
import { menus } from "./menu";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import TopBar from "../topBar";

const SideMenu:React.FC = () => {
    const theme = useSelector((state:any) => state.theme.value.name)
    const resolveMenuFromRoute = () => {
        switch (window.location.pathname) {
            case "":
            return "Patient List";
            case "/patientlist":
            return "Patient List";
            default:
            return window.location.pathname.replace("/", "");
        }
    };  
    const navigate = useNavigate()    
    const resolveActiveMenu = () => {
        return menus.filter(menue => menue.name == resolveMenuFromRoute()).length>0 ?menus.filter(menue => menue.name == resolveMenuFromRoute())[0] :menus[0]
    }      
    const [activeMenu,setActiveMenu] = useState(resolveActiveMenu())
    

    const changeMenu = (menu:any) => {
        setActiveMenu(menu)
        navigate(menu.url)
    } 

    return (
        <>
        <div className={`${theme}-SideMenu-container`}>
            <TopBar></TopBar>
            <nav className={`${theme}-SideMenu-nav`}>
                <div className={`${theme}-SideMenu-logo-container`}>
                    <img src={icon} alt="" />
                </div>
                <div className={`${theme}-SideMenu-MenuList-container`}>
                    {menus.map((menu) => {
                        return (
                            <>
                                <div onClick={() => changeMenu(menu)} data-mode={activeMenu.name == menu.name?'active':''} className={`${theme}-SideMenu-MenuList-menu-container`}>
                                    <img data-mode={activeMenu.name == menu.name?'active':''} className={`${theme}-icons-${menu.icon}`}  alt="" />
                                    { activeMenu.name === menu.name && menu.name}
                                </div>
                            </>
                        )
                    })}

                </div>

                <div className={`${theme}-SideMenu-MenuList2-container`}>
                    <div className={`${theme}-SideMenu-MenuList2-Line-Container`}>
                        <div className={`${theme}-SideMenu-MenuList2-Line`}></div>
                    </div>
                    <div onClick={() => {
                        navigate('/login')
                        localStorage.clear()
                    }} className={`${theme}-SideMenu-MenuList2-logOut`}>
                        <img className={`${theme}-icons-logOut`}  alt="" />
                    </div>
                </div>
            </nav>   
            <div className={`${theme}-SideMenu-content`}>
                <Outlet></Outlet>
            </div> 

        </div>
        </>
    )
}
export default SideMenu