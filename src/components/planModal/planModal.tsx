import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";

interface SubMenu {
  name: string;
  isActive: boolean;
  level: number;
}

interface SubCategory {
  name: string;
  isActive: boolean;
  level: number;
  subMenus?: SubMenu[];
}

interface Priority {
  category: string;
  subCategories: SubCategory[];
}

interface PlanManagerModalProps {
  priorities: Priority[];
}

const PlanManagerModal: React.FC<PlanManagerModalProps> = ({ priorities }) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [items, setItems] = useState(priorities);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (category: string, subCategoryIndex: number) => {
    const key = `${category}-${subCategoryIndex}`;
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (categoryIndex: number, subCategoryIndex: number, subMenuIndex?: number) => {
    const newItems = [...items];
    if (subMenuIndex !== undefined) {
      newItems[categoryIndex].subCategories[subCategoryIndex].subMenus![subMenuIndex].isActive =
        !newItems[categoryIndex].subCategories[subCategoryIndex].subMenus![subMenuIndex].isActive;
    } else {
      newItems[categoryIndex].subCategories[subCategoryIndex].isActive =
        !newItems[categoryIndex].subCategories[subCategoryIndex].isActive;
    }
    setItems(newItems);
  };

  const handleLevelChange = (categoryIndex: number, subCategoryIndex: number, level: number, subMenuIndex?: number) => {
    const newItems = [...items];
    if (subMenuIndex !== undefined) {
      newItems[categoryIndex].subCategories[subCategoryIndex].subMenus![subMenuIndex].level = level;
    } else {
      newItems[categoryIndex].subCategories[subCategoryIndex].level = level;
    }
    setItems(newItems);
  };

  return (
    <div className="bg-black-secondary text-primary-text p-4 rounded-md border border-main-border shadow-lg w-full h-full">
      <div className="w-full flex justify-between gap-3">
        {items.map((priority, index) => (
          <div
            key={priority.category}
            className="p-4 rounded-md bg-black-primary select-none w-[350px]"
            data-id={priority.category}
          >
            <div className="flex px-3 pb-1 justify-between items-center border-b border-main-border w-full">
              <span className="flex items-center gap-2 text-xs font-medium">
                <div className="bg-black-background rounded-lg p-1 flex items-center justify-center">
                  <div className={`${theme}-icons-${priority.category} w-4 h-4 bg-brand-secondary-color`}></div>
                </div>
                {priority.category}
              </span>
            </div>
            <ul className="mt-2">
              {priority.subCategories.map((subCategory, subIndex) => (
                <li key={subIndex} className="flex flex-col px-3 my-2">
                  <div className="flex justify-between items-center">
                    <label className="flex gap-1 items-center cursor-pointer text-xs font-normal text-secondary-text">
                      {subCategory.subMenus && (
                        <img
                          src="/public/Themes/Aurora/icons/chevron-up.svg"
                          onClick={() => toggleExpand(priority.category, subIndex)}
                          className={`${
                            expanded[`${priority.category}-${subIndex}`] ? 'rotate-180' : 'rotate-90'
                          } transition-transform`}
                        />
                      )}
                      <input
                        type="checkbox"
                        checked={subCategory.isActive}
                        onChange={() => handleCheckboxChange(index, subIndex)}
                        className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                      />
                      <div className="peer-checked:text-primary-text">
                        {subCategory.name}
                      </div>
                    </label>
                    <div className="flex items-center my-1">
                      <span className="text-[10px] text-secondary-text mr-2">Level</span>
                      <div className="flex border border-main-border">
                        {Array.from({ length: 3 }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => handleLevelChange(index, subIndex, i + 1)}
                            className={`w-6 h-6 flex border-r border-main-border items-center justify-center text-xs ${
                              subCategory.level === i + 1
                                ? "bg-black-fourth text-brand-secondary-color"
                                : "bg-black-secondary text-secondary-text"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {expanded[`${priority.category}-${subIndex}`] && subCategory.subMenus && (
                    <ul className="ml-4">
                      {subCategory.subMenus.map((subMenu, subMenuIndex) => (
                        <li key={subMenuIndex} className="flex items-center my-1">
                          <label className="flex items-center cursor-pointer text-xs font-normal text-secondary-text">
                            <input
                              type="checkbox"
                              checked={subMenu.isActive}
                              onChange={() => handleCheckboxChange(index, subIndex, subMenuIndex)}
                              className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                            />
                            <div className="peer-checked:text-primary-text">
                              {subMenu.name}
                            </div>
                          </label>
                          <div className="w-full flex items-center justify-end ml-2">
                            <span className="text-[10px] text-secondary-text mr-2">Level</span>
                            <div className="flex border border-main-border">
                              {Array.from({ length: 3 }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleLevelChange(index, subIndex, i + 1, subMenuIndex)}
                                  className={`w-6 h-6 flex items-center justify-center text-xs ${
                                    subMenu.level === i + 1
                                      ? "bg-black-fourth text-brand-secondary-color"
                                      : "bg-black-secondary text-secondary-text"
                                  }`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button theme={"Aurora"}>Save Changes</Button>
      </div>
    </div>
  );
};

export default PlanManagerModal;