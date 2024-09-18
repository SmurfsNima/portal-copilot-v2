import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";

interface Benchmark {
  Benchmark: string;
  Value: number;
  checked: boolean;
}

interface BenchmarkArea {
  Name: string;
  Benchmarks: Benchmark[];
  checked: boolean;
}

interface Category {
  BenchmarkAreas: BenchmarkArea[];
}

interface PlanManagerModalProps {
  data: Record<string, Category>;
}

const PlanManagerModal: React.FC<PlanManagerModalProps> = ({ data }) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [buttonState, setButtonState] = useState("initial");

 
  const handleClick = () => {
    setButtonState("loading");

    setTimeout(() => {
      setButtonState("completed");
    }, 3000);
    setTimeout(() => {
      setButtonState("initial");
    }, 6000);
  };
  const [selectedLevels, setSelectedLevels] = useState(() => {
    const levels: Record<string, number> = {};
    Object.entries(data).forEach(([categoryName, category]) => {
      category.BenchmarkAreas.forEach((area, areaIndex) => {
        area.Benchmarks.forEach((benchmark, benchmarkIndex) => {
          const key = `${categoryName}-${areaIndex}-${benchmarkIndex}`;
          levels[key] = benchmark.Value; // Initialize with the benchmark's default Value
        });
      });
    });
    return levels;
  });

  const toggleExpand = (category: string, areaIndex: number) => {
    const key = `${category}-${areaIndex}`;
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLevelChange = (
    category: string,
    areaIndex: number,
    benchmarkIndex: number,
    level: number
  ) => {
    const key = `${category}-${areaIndex}-${benchmarkIndex}`;
    setSelectedLevels((prev) => ({
      ...prev,
      [key]: level,
    }));
  };

  return (
    <div className="bg-black-secondary text-primary-text p-4 rounded-md border border-main-border shadow-lg w-full h-[85%]">
      <div className="w-full flex justify-between gap-3">
        {Object.entries(data).map(([categoryName, category], categoryIndex) => (
          <div
            key={categoryIndex}
            className="p-4 rounded-md bg-black-primary select-none w-[365px] h-[450px] overflow-auto"
          >
            <div className="flex px-3 pb-1 justify-between items-center border-b border-main-border w-full">
              <span className="flex items-center gap-2 text-xs font-medium">
                <div className="bg-black-background rounded-lg p-1 flex items-center justify-center">
                  <div
                    className={`${theme}-icons-${categoryName} w-4 h-4 bg-brand-secondary-color`}
                  ></div>
                </div>
                {categoryName}
              </span>
            </div>
            <ul className="mt-2">
              {category.BenchmarkAreas.map((area, areaIndex) => (
                <li key={areaIndex} className="flex flex-col px-3 my-2">
                  <div className="flex items-center">
                  <img
                        src="./Themes/Aurora/icons/chevron-up.svg"
                        onClick={() =>
                          toggleExpand(categoryName, areaIndex)
                        }
                        className={`${
                          expanded[`${categoryName}-${areaIndex}`]
                            ? "rotate-180"
                            : "rotate-90"
                        } transition-transform -ml-5`}
                      />
                    <label className="flex gap-1 items-center justify-start cursor-pointer text-xs font-normal text-secondary-text">
                      <input
                        type="checkbox"
                        checked={area.checked}
                        className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                      />
                     
                      <div className="peer-checked:text-primary-text">
                        {area.Name}
                      </div>
                    </label>
                  </div>
                  {expanded[`${categoryName}-${areaIndex}`] && (
                    <ul className="ml-4">
                      {area.Benchmarks.map((benchmark, benchmarkIndex) => (
                        <li
                          key={benchmarkIndex}
                          className="flex items-center my-1"
                        >
                          <label className="flex items-center cursor-pointer text-xs font-normal text-secondary-text">
                            <input
                              type="checkbox"
                              checked={benchmark.checked}
                              className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center"
                            />
                            <div className="peer-checked:text-primary-text">
                              {benchmark.Benchmark}
                            </div>
                          </label>
                          <div className="w-full flex items-center justify-end ml-2">
                            <span className="text-[10px] text-secondary-text mr-2">
                              Level
                            </span>
                            <div className="flex border border-main-border">
                              {Array.from({ length: 3 }, (_, i) => (
                                <button
                                  key={i}
                                  onClick={() =>
                                    handleLevelChange(
                                      categoryName,
                                      areaIndex,
                                      benchmarkIndex,
                                      i + 1
                                    )
                                  }
                                  className={`w-6 h-6 flex items-center justify-center text-xs ${
                                    selectedLevels[
                                      `${categoryName}-${areaIndex}-${benchmarkIndex}`
                                    ] === i + 1
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
        <Button         onClick={handleClick}
 theme={"Aurora"}> {buttonState === "initial" && (
  "Save Changes"
)}
{buttonState === "loading" && (
  <div className="flex space-x-2">
    <span className="animate-ping">•</span>
    <span className="animate-ping">•</span>
    <span className="animate-ping">•</span>
  </div>
)}
{buttonState === "completed" && (
  <>
    <div className={`${theme}-icons-check`} />
   Saved Changes
  </>
)}</Button>
      </div>
    </div>
  );
};

export default PlanManagerModal;