import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "./Tab";

interface TabItem {
  text: string;
  path: string;
  icon?: boolean;
  number?: number;
  isVisible?: boolean;
}

interface TabsWrapperProps {
  TabsInfo: TabItem[];
  handleTabClick?: (path: string) => void;
  isNotNavigate?: boolean;
  defaultActiveTab?: string; // New prop for default active tab
}

const TabsWrapper: React.FC<TabsWrapperProps> = ({
  TabsInfo,
  handleTabClick,
  isNotNavigate,
  defaultActiveTab = "Overview", // Default to "Summary" if not provided
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.theme.value.name);

  const getLastPathSegment = (path: string) => {
    const segments = path.split("/");
    return segments[segments.length - 1];
  };

  const getActiveTab = (path: string) => {
    const lastSegment = getLastPathSegment(path);
    const matchingTab = TabsInfo.find((tab) => lastSegment === tab.path && tab.isVisible !== false);
    return matchingTab ? matchingTab.text : defaultActiveTab;
  };

  const [active, setActive] = useState(() => getActiveTab(location.pathname));

  useEffect(() => {
    setActive(getActiveTab(location.pathname));
  }, [location.pathname]);

  const handleTabClickInternal = (path: string, tab: string) => {
    setActive(tab);
    if (!isNotNavigate) {
      navigate(path);
    }
    handleTabClick?.(path);
  };

  useEffect(() => {
    console.log("Active tab:", active);
  }, [active]);

  return (
    <div className={`${theme}-tab-container`}>
      {TabsInfo?.map((item, index) => (
        <Tab
          handleClick={() => handleTabClickInternal(item.path, item.text)}
          theme={theme}
          key={item.text}
          isVisible={item.isVisible}
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