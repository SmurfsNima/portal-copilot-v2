/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate  , useLocation} from "react-router-dom"

import { menus } from "./menu";
import { useSelector } from "react-redux";
import React, { useState , useEffect, useContext } from "react";
import TopBar from "../topBar";
import { AppContext } from "@/store/app";

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
    const appcontext = useContext(AppContext)
    return (
        <>
        <div className={`${theme}-SideMenu-container`}>
            <TopBar></TopBar>
            <nav className={`${theme}-SideMenu-nav`}>
                <div className={`${theme}-SideMenu-logo-container`}>
                    {appcontext.themeISLight ?
                        <img src="./Themes/Aurora/icons/Logo-Light.svg" alt="" />
                    :
                        <img src="./images/main-logo (1).svg" alt="" />
                    }
                </div>
                <div className={`${theme}-SideMenu-MenuList-container`}>
                    {menus.map((menu) => {
                        return (
                            <>
                                <div onClick={() => changeMenu(menu)} data-mode={activeMenu.name == menu.name?'active':''} className={`${theme}-SideMenu-MenuList-menu-container`}>
                                    {menu.name != 'Setting' ?
                                     <img data-mode={activeMenu.name == menu.name?'active':''}  className={`${theme}-icons-${menu.icon}`}  alt="" />
                                    :
                                    <>
                                    {menu.name == activeMenu.name ?
                                        <>
                                            {appcontext.themeISLight ?
                                                <img src={'./Themes/Aurora/icons/setting-wite-2.svg'}   alt="" />
                                            :
                                                <img src={'./Themes/Aurora/icons/setting-2.svg'}   alt="" />
                                            }
                                        </>
                                         :
                                         <>
                                            {appcontext.themeISLight ?
                                                <img src={'./Themes/Aurora/icons/setting-wite-light.svg'}   alt="" />
                                            :                                         
                                                <img src={'./Themes/Aurora/icons/setting-wite-2.svg'}   alt="" />
                                            }
                                         </>
                                    }
                                    </>
                                    }
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
                    <div className="text-[8px] text-light-secandary-text dark:text-secondary-text w-full justify-center flex gap-1 items-start ">
                        Powered by {appcontext.themeISLight ?
                            <img src="./Themes/Aurora/icons/Codie Logo- Light.svg" alt="" />
                        :
                            <img src="./images/sidebar-logo.svg" alt="" />
                        }
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