import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "./Tab";

interface TabItem {
  text: string;
  path: string;
  icon?: boolean;
  number?: number;
}

interface TabsWrapperProps {
  TabsInfo: TabItem[];
  handleTabClick?: (path: string) => void;
}

const TabsWrapper: React.FC<TabsWrapperProps> = ({ TabsInfo, handleTabClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.theme.value.name);

  const getLastPathSegment = (path: string) => {
    const segments = path.split("/");
    return segments[segments.length - 1];
  };
  const getActiveTab = (path: string) => {
    const lastSegment = getLastPathSegment(path);
    const matchingTab = TabsInfo.find(tab => lastSegment === tab.path);
    return matchingTab ? matchingTab.text : null;
  };
  const [active, setActive] = useState(getActiveTab(location.pathname) || "Overview");

  useEffect(() => {
    setActive(getActiveTab(location.pathname) || "Overview");
  }, [location.pathname]);

  const handleTabClickInternal = (path: string, tab: string) => {
    setActive(tab);
    navigate(path);
    handleTabClick?.(path);

  };

  return (
    <div className={`${theme}-tab-container`}>
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