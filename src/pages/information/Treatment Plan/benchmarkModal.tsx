import { Application } from "@/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Test {
  "Benchmark areas": string;
  "Test L1": string;
  "Test L2": string;
  Result: string;
  "Benchmark performance": string;
}

interface BenchmarkArea {
  Category: string;
  tests: Test[];
}

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BenchmarkArea[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.getTreatmentPlanModalData({
          member_id: Number(id),
        });
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!isOpen) return null;

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
      <div className="z-50 bg-black-secondary text-primary-text p-4 rounded-lg shadow-lg w-[85%] max-h-[400px] overflow-y-auto   relative">
        <button
          onClick={onClose}
          className="text-secondary-text hover:text-primary-text text-xl absolute right-5 top-5"
        >
          ✕
        </button>

        <table className="w-full text-sm mt-8  ">
          <thead>
            <tr className="text-sm  ">
              <th className="border-b border-third-text border-opacity-30 text-nowrap py-2 pr-16 text-left border-r font-medium">
                Benchmark Areas
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r font-medium">
                Test Level 1
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r font-medium">
                Test Level 2
              </th>
              <th className="border-b border-third-text border-opacity-30  px-7 py-2 text-nowrap text-center border-r font-medium">
                Result
              </th>
              <th className="border-b border-third-text border-opacity-30 font-medium  px-7 py-2 text-nowrap text-center">
                Benchmark Performance
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((area) =>
                area.tests.map((test, index) => (
                  <tr
                    key={`${area.Category}-${index}`}
                    className={` ${
                      test["Benchmark performance"] === "Needs Focus" ||
                      test["Benchmark performance"] === "Needs focus"
                        ? "bg-[#FBAD37] bg-opacity-25 "
                        : "bg-transparent"
                    }`}
                  >
                    <td className="border-b border-third-text border-opacity-30 pl-4 py-2 border-r text-xs">
                      {index === 0 ? area.Category : ""}
                    </td>
                    <td className="border-b border-third-text border-opacity-30 py-2 px-4 border-r text-center text-xs">
                      {test["Test L1"]}
                    </td>
                    <td className="border-b border-third-text border-opacity-30 py-2 px-4 border-r text-center text-xs font-medium">
                      {test["Test L2"]}
                    </td>
                    <td className="border-b border-third-text text-center border-opacity-30 text-nowrap pl-4 py-2 border-r text-xs font-medium">
                      {test.Result || "-"}
                    </td>
                    <td className="border-b border-third-text border-opacity-30 text-center py-2 text-xs font-medium">
                      {test["Benchmark performance"] || "-"}
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
