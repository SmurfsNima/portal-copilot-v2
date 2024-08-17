import React, {FC} from "react";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
    theme:string
    children?: React.ReactNode;
}

const Card: FC<CardProps> = ({theme, children, ...props}) => {
    return (

        <div {...props} className={` w-full h-[103px] bg-black-primary border border-main-border rounded-md px-4 py-2 `}>
            {children}
        </div>
    );
};

export default Card