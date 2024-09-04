import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const theme = useSelector((state: any) => state.theme.value.name);
  const [items, setItems] = useState(priorities);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, movedItem);

    setItems(newItems);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-black-secondary text-primary-text p-6 rounded-lg shadow-lg w-full max-w-[1260px]">
        <h2 className="text-sm font-medium mb-4 w-full flex justify-between">
          Plan Priority <button className="text-4xl font-medium" onClick={onClose}>&times;</button>
        </h2>
        <p className="text-xs font-normal mb-6 flex items-center gap-2">
          <img src="/Themes/Aurora/icons/info-circle2.svg" alt="" />
          Drag and drop the cards to set their priority in generating the
          client's plan. You can also activate or deactivate sub-categories for
          each category within the client's plan.
        </p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {items.map((priority, index) => (
            <h3
              key={index}
              className="text-secondary-text text-xs font-medium  mb-2 text-center"
            >
              {priority.title} Priority
            </h3>
          ))}
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-4 gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((priority, index) => (
                  <Draggable
                    key={index}
                    draggableId={priority.category}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 rounded-md bg-black-primary"
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="w-full flex justify-center">
          <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-black py-2 px-4 rounded-md ">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanManagerModal;