/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbFilterPlus } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { SearchBox } from "@/components";
import { columns } from "./tableTd.tsx";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
// import { Pationt } from "@/model/index.ts";
import { Button } from "symphony-ui";
import { useEffect, useState } from "react";
import { Pationt } from "@/model/index.ts";
import AddClientModal from "@/pages/patientList/addClientModal.tsx";
import Pagination from "../pagination/index.tsx";
interface TableProps {
  classData: Array<Pationt>;
}

const Table: React.FC<TableProps> = ({ classData }) => {
  
  
  const [data, setData] = useState(classData);
  useEffect(() => {
    setData(classData);
  }, [classData]);
  console.log( "class data : " ,data);
  
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 6, //custom default page size
      },
    },
  });

  const theme = useSelector((state: any) => state.theme.value.name);
  const onFilterChange = (id: any, value: string) =>
    setColumnFilters((prev: any) =>
      prev
        .filter((f: any) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleAddClient = (clientData : any) => {
      console.log('Client Added:', clientData);
    };
    const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className={" flex items-center justify-center  flex-col"}>
      <div className=" w-full top-0 shadow-md sm:rounded-lg py-1 ">
        <div className={`${theme}-Table-header-section`}>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <h5 className="text-primary-text text-sm font-medium py-2">Client List</h5>
          <div className="flex items-center gap-1">
          <SearchBox
            changeHandler={(e: any) => onFilterChange("name", e.target.value)}
            theme={theme}
            placeholder="Search for users"
          ></SearchBox>
          <Button  theme={theme+'-secondary'}>
         
            <TbFilterPlus className={"w-5 h-5"} />
            Apply Filter
          </Button>
          <Button onClick={handleOpenModal} theme={theme}>
            <RiUserAddLine className={"w-5 h-5"} />
            Add Patient{" "}
          </Button>
          </div>
          <AddClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddClient}
      />
        </div>
        <div className={`${theme}-Table-container h-[40vh] ${theme}-scrollBar`}>
          <table className={`${theme}-table  ${theme}-scrollBar w-full`}>
            <thead className="text-xs text-gray-700  ">
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr
                    key={headerGroup.id}
                    className={"text-nowrap text-[#FFFFFF]"}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th className={`${theme}-Table-header`}>
                          <div className={"flex items-center justify-center"}>
                            <>{header.column.columnDef.header}</>
                            {header.column.getCanSort() && (
                              <FaSort
                                onClick={header.column.getToggleSortingHandler()}
                              />
                            )}
                            {
                              // {
                              //     asc: " 🔼",
                              //     desc: " 🔽 ",
                              // }[header.column.getIsSorted()]
                            }
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr className="text-white space-y-7 ">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td className={`${theme}-Table-td`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />      {/* <Pagination table={table} theme={theme}/> */}
    </div>
  );
};

export default Table;
