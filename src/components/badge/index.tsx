import {FC} from "react";

interface BadgeProps {
    // color: string;
    status:'Normal'|'At-Risk'|'Critical'
    theme:string;
    children?: React.ReactNode;
}

const Badge: FC<BadgeProps> = ({status,theme, children}) => {
    return (
        <div data-status={status} className={`${theme}-Badge-container`}>
            {children}
        </div>
    );
};

export default Badge