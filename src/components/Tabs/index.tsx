import React from "react";
import  { useState } from "react";
import { Tab } from "./Tab";
import { useSelector } from "react-redux";
interface TabItem{
  text : string,
  path : string,
  icon ?: boolean,
  number ?: number
}
interface TabsWrapperProps {
  TabsInfo : TabItem[]
  handleTabClick ?: (path: string) => void;
}
const TabsWrapper: React.FC<TabsWrapperProps> = ({ TabsInfo , handleTabClick }) => {
  const [active, setActive] = useState("Overview");
  const theme = useSelector((state: any) => state.theme.value.name);
  const handleTabClickInternal = (path: string, tab: string) => {
    setActive(tab);
    handleTabClick?.(path);
  };

  return (
   
      <div className={`${theme}-tab-container `}>
        {TabsInfo?.map((item, index) => (
          <Tab
          handleClick={() => handleTabClickInternal(item.path, item.text)}
            theme={theme}
            key={item.text}
            text={item.text}
            icon={item.icon}
            number={item.number}
            active={active}
            setActive={setActive}
            isFirst={index === 0}
            isLast={index === TabsInfo.length - 1}
          />
        ))}
      </div>
  
  );
};
export default TabsWrapper;
