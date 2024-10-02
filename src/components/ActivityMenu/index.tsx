// type MenuNames = 'Vital' | 'Blood Test' | 'Activity' | 'Client Profile' | "Weekly report"
type menuItem  = {
    name:string
}
interface ActivityMenuProps {
    onChangeMenuAction:(activeMenu:string) => void
    activeMenu:string;
    menus : menuItem[]

}

const ActivityMenu:React.FC<ActivityMenuProps> = ({onChangeMenuAction,activeMenu , menus}) => {
  
    return (
        <>
            <div className="flex  gap-1 text-primary-text text-xs ">
                {menus.map((menu) => {
                    return (
                        <>
                            <div
                            onClick={() => {
                                onChangeMenuAction(menu.name)
                            }}
                            className={` ${
                                activeMenu === menu.name && "bg-black-third"
                            } rounded-md w-[105px] h-[32px] flex items-center justify-center cursor-pointer   `}
                            >
                            {menu.name}
                            </div>                        
                        </>
                    )
                })}         
            </div>       
        </>
    )
}

export default ActivityMenu