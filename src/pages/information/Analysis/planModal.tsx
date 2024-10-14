/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Sortable from "sortablejs";
import { Button } from "symphony-ui";

interface SubCategory {
  name: string;
  isActive: boolean;
}

interface Priority {
  category: string;
  subCategories: SubCategory[];
}

interface PlanManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  priorities: Priority[];
}

const PlanManagerModal: React.FC<PlanManagerModalProps> = ({
  isOpen,
  onClose,
  priorities,
}) => {
  // Hooks should always be at the top level
  const theme = useSelector((state: any) => state.theme.value.name);
  const [items, setItems] = useState(priorities);
  const sortableRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize SortableJS
  useEffect(() => {
    if (sortableRef.current) {
      Sortable.create(sortableRef.current, {
        animation: 150,
        swapThreshold: 0.67,
        onEnd: (evt) => {
          const newItems = Array.from(items);
          const [movedItem] = newItems.splice(evt.oldIndex!, 1);
          newItems.splice(evt.newIndex!, 0, movedItem);
          setItems(newItems);
        },
      });
    }
  }, [items]);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Render nothing if the modal isn't open
  if (!isOpen) return null;

  const headers = ["first", "second", "third", "fourth"];
  const handleCheckboxChange = (categoryIndex: number, subCategoryIndex: number) => {
    const newItems = [...items];
    newItems[categoryIndex].subCategories[subCategoryIndex].isActive = 
      !newItems[categoryIndex].subCategories[subCategoryIndex].isActive;
    setItems(newItems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div ref={modalRef} className="bg-black-secondary text-primary-text p-6 rounded-lg shadow-lg w-full max-w-[1260px]">
        <h2 className="text-sm font-medium mb-4 w-full flex justify-between items-center">
          Plan Priority <button className="text-4xl font-medium" onClick={onClose}>&times;</button>
        </h2>
        <p className="text-xs font-normal mb-6 flex items-center gap-2">
          <img src="/Themes/Aurora/icons/info-circle2.svg" alt="" />
          Drag and drop the cards to set their priority in generating the
          client's plan. You can also activate or deactivate sub-categories for
          each category within the client's plan.
        </p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {headers.map((header, index) => (
            <h3
              key={index}
              className="text-secondary-text text-xs font-medium font-bold mb-2 text-center"
            >
              {header} Priority 
            </h3>
          ))}
        </div>
        <div ref={sortableRef} className="grid grid-cols-4 gap-4">
          {items.map((priority, index) => (
            <div
              key={priority.category}
              className="p-4 rounded-md bg-black-primary select-none "
              data-id={priority.category}
            >
              <div className="flex px-3 pb-1 justify-between items-center border-b border-main-border w-full">
                <span className="flex items-center gap-2 text-xs font-medium">
                  <div className="bg-black-background rounded-lg p-1 flex items-center justify-center">
                    <div
                      className={`${theme}-icons-${priority.category} bg-brand-secondary-color`}
                    ></div>
                  </div>
                  {priority.category}
                </span>
                <img
                  className="cursor-pointer"
                  src="/Themes/Aurora/icons/trash.svg"
                  alt=""
                />
              </div>
              <ul className="mt-2 max-h-[222px] overflow-auto">
                {priority.subCategories.map((subCategory, i) => (
                  <li
                    key={i}
                    className="flex items-center px-3 my-2 cursor-pointer"
                  >
                    <label className="flex items-center cursor-pointer text-xs font-normal text-secondary-text">
                      <input
                        type="checkbox"
                        checked={subCategory.isActive}
                        onChange={() => handleCheckboxChange(index, i)}
                        className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                      />
                      <div className="peer-checked:text-primary-text">
                        {subCategory.name}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-8">
            <Button theme={"Aurora"}>   Save Changes</Button>
         
        </div>
      </div>
    </div>
  );
};

export default PlanManagerModal;