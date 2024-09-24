type MenuNames = 'Vital' | 'Blood Test' | 'Activity' | 'Client Profile'
type menuItem  = {
    name:MenuNames
}
interface ActivityMenuProps {
    onChangeMenuAction:(activeMenu:MenuNames) => void
    activeMenu:MenuNames

}

const ActivityMenu:React.FC<ActivityMenuProps> = ({onChangeMenuAction,activeMenu}) => {
    const menus:Array<menuItem> = [
        {name :'Vital' },
        {name :'Blood Test' },
        {name :'Activity' },
        {name :'Client Profile' },
    ]
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