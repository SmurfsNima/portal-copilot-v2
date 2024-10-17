/* eslint-disable @typescript-eslint/no-explicit-any */
import {Link} from "react-router-dom";

export const IntegrationPage = () => {
    const listDevice=[
        {
            name:"Cardio",
            icon:"Cardio.svg",
            link:"https://zapier.com/shared/ed430c2bea6b88009eb8634fed26432727b643e4"

        },
        {
            name:"Habit",
            icon:"habitIcon.svg",
            link:"https://zapier.com/shared/habit/6b2af59bd30e319f22f8bc1a657debf98aa4d668"
        },
        {
            name:"Nutrition",
            icon:"Nutrition.svg",
            link:"https://zapier.com/shared/6db2f42af0e9c7ac651cab6fef47e12110b4e811"
        },
        {
            name:"Workout",
            icon:"Workout.svg",
            link:"https://zapier.com/shared/workout/b30762081137523467c98261e131b183d2bfb275"
        },
    ]

    return (
        <div className="  w-full flex h-[535px] flex-col items-center gap-5 justify-start pt-10 px-10  dark:bg-black-primary border dark:border-none rounded-md">
            <div className={" py-2 space-y-2"}>
                <h1 className={"text-light-secandary-text dark:text-white"}>
                    IntegrationPage
                </h1>
                <p className={"text-light-secandary-text dark:text-secondary-text"}>Connect seamlessly with external platforms to streamline data and enhance workflow efficiency. Manage all integrations in one place for a unified experience.</p>
            </div>
            <div className={"w-full space-y-2"}>
                {listDevice.map(item=>{
                    return (
                        // public/Themes/Aurora/icons/stuffIcon.svg
                        <div
                            className={"flex bg-gray-100 w-full items-center justify-between px-4 dark:bg-black-secondary py-3 rounded-md"}>
                            <div className={"flex items-center space-x-2 "}>
                                <img className={"w-8 h-8"} src={`/Themes/Aurora/icons/${item.icon}`}/>
                                <h1 className={"text-light-secandary-text dark:text-white"}>{item.name}</h1>
                            </div>
                            <Link to={item.link}
                                  className={"border flex items-center justify-center px-2 py-1.5 rounded-md gap-2 dark:border-brand-primary-color"}>
                                <img className={"w-4 h-4"} src={"/Themes/Aurora/icons/folder-connection.svg"}/>
                                <p className={"text-light-secandary-text  dark:text-brand-primary-color text-xs "}>Connect</p>
                            </Link>
                        </div>

                    )
                })}
            </div>
        </div>
    );
};
