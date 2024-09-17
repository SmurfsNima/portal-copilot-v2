import React, { useState } from "react";

interface Test {
  name: string;
  testLevel1: string;
  testLevel2: string;
  result: string;
  performance: string;
}

interface BenchmarkArea {
  area: string;
  tests: Test[];
}

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benchmarks: BenchmarkArea[] = [
  {
    area: "Physiological",
    tests: [
      {
        name: "Recovery",
        testLevel1: "Sleep quality",
        testLevel2: "Sleep quality",
        result: "1 day > 8 hours sleep",
        performance: "ok",
      },
      {
        name: "Recovery",
        testLevel1: "Time spent outside",
        testLevel2: "",
        result: "75% of days got outside for more than 15 minutes",
        performance: "Good",
      },
    ],
  },
  {
    area: "Fitness",
    tests: [
      {
        name: "Mobility",
        testLevel1: "Lower Body",
        testLevel2: "Lower Body",
        result: "Above hip height",
        performance: "Needs Focus",
      },
      {
        name: "Mobility",
        testLevel1: "Lower Body",
        testLevel2: "Lower Body",
        result: "Back hinging suggests weak hamstring",
        performance: "Needs Focus",
      },
      {
        name: "Upper Body",
        testLevel1: "Upper Body",
        testLevel2: "Upper Body",
        result: "ok",
        performance: "Good",
      },
      {
        name: "Upper Body",
        testLevel1: "Upper Body",
        testLevel2: "Upper Body",
        result: "Some limitation",
        performance: "Needs Focus",
      },
    ],
  },
  {
    area: "Emotional",
    tests: [
      {
        name: "Emotional Fitness",
        testLevel1: "Motivation",
        testLevel2: "",
        result: "23",
        performance: "Good",
      },
      {
        name: "Stress Management",
        testLevel1: "Stages of Change",
        testLevel2: "Stages of Change",
        result: "Contemplation",
        performance: "ok",
      },
      {
        name: "Stress Management",
        testLevel1: "Stress Management",
        testLevel2: "Stress Management",
        result: "104 v 85 Benchmark",
        performance: "Needs Focus",
      },
    ],
  },
];

const BenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [data] = useState<BenchmarkArea[]>(benchmarks);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClickOutside}
    >
      <div className="bg-black-secondary text-primary-text p-4 rounded-lg shadow-lg w-[80%]  relative">
        <button
          onClick={onClose}
          className="text-secondary-text hover:text-primary-text text-xl absolute right-5 top-5"
        >
          ✕
        </button>

        <table className="w-full text-sm mt-8 border-collapse">
          <thead>
            <tr className="text-sm ">
              <th className="border-b border-third-text border-opacity-30 text-nowrap py-2 pr-16 text-left border-r">
                Benchmark Areas
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r">
                Test Level 1
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r">
                Test Level 2
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r">
                Result
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center">
                Benchmark Performance
              </th>
            </tr>
          </thead>
          <tbody >
            {data.map((area) =>
              area.tests.map((test, index) => (
                <tr
                  key={`${area.area}-${index}`}
                  className={` ${
                    test.performance === "Needs Focus"
                      ? "bg-[#FBAD37] bg-opacity-25 "
                      : "bg-transparent"
                  }`}
                >
                  <td className="border-b border-third-text border-opacity-30 pl-4 py-2 border-r ">
                    {index === 0 ? area.area : ""}
                  </td>
                  <td className="border-b border-third-text border-opacity-30 py-2 border-r text-center">
                    {test.testLevel1}
                  </td>
                  <td className="border-b border-third-text border-opacity-30 py-2 border-r text-center">
                    {test.testLevel2}
                  </td>
                  <td className="border-b border-third-text border-opacity-30 text-nowrap pl-4 py-2 border-r">
                    {test.result}
                  </td>
                  <td className="border-b border-third-text border-opacity-30 text-center py-2">
                    {test.performance}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenchmarkModal;