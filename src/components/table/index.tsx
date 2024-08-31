/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbFilterPlus } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { SearchBox } from "@/components";
import { columns } from "./tableTd.tsx";
import NullPage from '../../assets/images/Group.png';


import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
import { Button } from "symphony-ui";
import { useEffect, useState } from "react";
import { Pationt } from "@/model/index.ts";
import AddClientModal from "@/pages/patientList/addClientModal.tsx";
import Pagination from "../pagination/index.tsx";

interface TableProps {
  classData: Array<Pationt>;
}

// Custom filter function to handle nested fields
const nestedFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const rowValue = row.getValue(columnId);
  if (typeof rowValue === "object" && rowValue !== null) {
    return Object.values(rowValue).some((val) =>
      String(val).toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
};

const Table: React.FC<TableProps> = ({ classData }) => {
  const [data, setData] = useState(classData);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  useEffect(() => {
    setData(classData);
  }, [classData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter, 
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    globalFilterFn: nestedFilter, 
    onGlobalFilterChange: setGlobalFilter, // Handle global filter changes
  });

  const theme = useSelector((state: any) => state.theme.value.name);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddClient = (clientData: any) => {
    console.log("Client Added:", clientData);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full top-0 shadow-md sm:rounded-lg py-1">
        <div className={`${theme}-Table-header-section `}>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <h5 className=" text-sm font-medium py-2 text-[#ffffffc3]">Client List</h5>
          <div className="flex items-center gap-1  ">
            <SearchBox
              changeHandler={(e: any) => setGlobalFilter(e.target.value)} // Update global filter on input change
              theme={theme}
              placeholder="Search for users"
            />
            <div className="w-[236px] h-[32px] bg-[#1E1E1E] border border-[#333333] rounded-[6px] flex items-center justify-between gap-1 text-[11px] text-[#ffffffc3] px-[25px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[11px]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
              <p>21 April, 2024 - 29 April, 2024</p>
              <p className="cursor-pointer text-[15px]">x</p>
            </div>
            <Button theme={`${theme}-secondary`}>
              <TbFilterPlus className="w-5 h-5" />
              Apply Filter
            </Button>
            <Button onClick={handleOpenModal} theme={theme}>
              <RiUserAddLine className="w-5 h-5" />
              Add Patient{" "}
            </Button>
          </div>
          <AddClientModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddClient}
          />
        </div>
        <div className={`${theme}-Table-container h-[50vh] ${theme}-scrollBar`}>
          {table.getRowModel().rows.length > 0 ? (
            <table className={`${theme}-table ${theme}-scrollBar w-full`}>
              <thead className="text-xs text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="text-nowrap text-[#FFFFFF]">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className={`${theme}-Table-header`}>
                        <div className="flex items-center justify-center">
                          <div
                            className="flex items-center justify-center"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && header.column.getIsSorted() === false && (
                              <FaSort className="cursor-pointer" />
                            )}
                            {header.column.getIsSorted() === "asc" && " 🔼"}
                            {header.column.getIsSorted() === "desc" && " 🔽"}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr className="text-white space-y-7" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className={`${theme}-Table-td`} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" w-full h-full flex items-center justify-center flex-col">
              <img src={NullPage} alt="No Data Available" className="mx-auto w-[102px] h-[99px]" />
              <p className="text-[#ffffffa4] mt-[8px] text-[16px]">No Result to Show</p>

            </div>
          )}
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
  
};

export default Table;
