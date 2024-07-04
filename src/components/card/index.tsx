import React, {FC} from "react";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
    theme:string
    children?: React.ReactNode;
}

const Card: FC<CardProps> = ({theme, children, ...props}) => {
    return (

        <div {...props} className={`${theme}-card-container`}>
            {children}
        </div>
    );
};

export default Card