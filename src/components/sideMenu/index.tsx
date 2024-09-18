/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate  , useLocation} from "react-router-dom"

import { menus } from "./menu";
import { useSelector } from "react-redux";
import React, { useState , useEffect } from "react";
import TopBar from "../topBar";

const SideMenu:React.FC = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    const navigate = useNavigate();
    const location = useLocation();

    const resolveActiveMenu = () => {
        return menus.find(menu => menu.url === location.pathname) || menus[0];
    };

    const [activeMenu, setActiveMenu] = useState(resolveActiveMenu());

    useEffect(() => {
        const currentActiveMenu = resolveActiveMenu();
        if (currentActiveMenu.name !== activeMenu.name) {
            setActiveMenu(currentActiveMenu);
        }
    }, [location.pathname, activeMenu]);

    const changeMenu = (menu: any) => {
        setActiveMenu(menu);
        navigate(menu.url);
    };

    return (
        <>
        <div className={`${theme}-SideMenu-container`}>
            <TopBar></TopBar>
            <nav className={`${theme}-SideMenu-nav`}>
                <div className={`${theme}-SideMenu-logo-container`}>
                    <img src="/public/images/main-logo (1).svg" alt="" />
                </div>
                <div className={`${theme}-SideMenu-MenuList-container`}>
                    {menus.map((menu) => {
                        return (
                            <>
                                <div onClick={() => changeMenu(menu)} data-mode={activeMenu.name == menu.name?'active':''} className={`${theme}-SideMenu-MenuList-menu-container`}>
                                    <img data-mode={activeMenu.name == menu.name?'active':''}  className={`${theme}-icons-${menu.icon}`}  alt="" />
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
                    <div className="text-[8px] text-secondary-text w-full justify-center flex gap-1 items-center ">
                        Powered by <img src="/public/images/sidebar-logo.svg" alt="" />
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