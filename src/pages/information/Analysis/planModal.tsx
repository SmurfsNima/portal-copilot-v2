import React from "react";
import { useSelector } from "react-redux";

interface SubCategory {
  name: string;
  isActive: boolean;
}

interface Priority {
  title: string;
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
  if (!isOpen) return null;
  const theme = useSelector((state: any) => state.theme.value.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black-secondary text-primary-text p-6 rounded-lg shadow-lg w-full max-w-[1260px]">
        <h2 className="text-xl font-semibold mb-4 w-full flex justify-between">
          Plan Priority <button onClick={onClose}>&times;</button>
        </h2>
        <p className="text-sm mb-6 flex gap-2">
          <img src="/Themes/Aurora/icons/info-circle2.svg" alt="" />
          Drag and drop the cards to set their priority in generating the
          client's plan. You can also activate or deactivate sub-categories for
          each category within the client's plan.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {priorities.map((priority, index) => (
            <div key={index} className=" p-4 rounded-md">
              <h3 className="text-lg font-bold mb-2">
                {priority.title} Priority
              </h3>
              <div className="bg-black-primary py-3 rounded-md mb-2">
                <div className="flex px-3 pb-1 justify-between items-center border-b border-main-border w-full">
                  <span className="flex items-center gap-2">
                    <div className="bg-black-background rounded-lg p-1 flex items-center justify-center">
                      <div
                        className={`${theme}-icons-${priority.category} bg-brand-secondary-color`}
                      ></div>{" "}
                    </div>

                    {priority.category}
                  </span>
                  <img
                    className="cursor-pointer"
                    src="/Themes/Aurora/icons/trash.svg"
                    alt=""
                  />{" "}
                </div>
                <ul className="mt-2max-h-[222px] overflow-auto ">
                  {priority.subCategories.map((subCategory, i) => (
                  <li key={i} className="flex items-center px-3 my-2 cursor-pointer">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 peer shrink-0 appearance-none w-6 h-6 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                    />
                    {subCategory.name}
                  </label>
                </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          {" "}
          <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-black py-2 px-4 rounded-md ">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanManagerModal;
