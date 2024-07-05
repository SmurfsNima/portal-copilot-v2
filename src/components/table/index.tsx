/* eslint-disable @typescript-eslint/no-explicit-any */
import {TbFilterPlus} from "react-icons/tb";
import {RiUserAddLine} from "react-icons/ri";
import {useSelector} from "react-redux";
import {SearchBox} from "@/components";
import {columns} from "./tableTd.tsx"
import {fakeData} from "@/components/table/fakeData.ts";
import {useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {FaSort} from "react-icons/fa";


const Table = () => {

    const [data] = useState<Array<any>>(fakeData);
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
            }
        }
    });

    const theme = useSelector((state: any) => state.theme.value.name)
    const onFilterChange = (id: any, value: string) =>
        setColumnFilters((prev:any) =>
            prev
                .filter((f: any) => f.id !== id)
                .concat({
                    id,
                    value,
                })
        );
    console.log("table.getState().pagination.pageIndex + 1",table.getState().pagination.pageIndex + 1,table.getPageCount())
    return (
        <div className={" flex items-center justify-center gap-3 flex-col"}>
            <div className=" w-full top-0 shadow-md sm:rounded-lg py-4 ">
                <div className={`${theme}-Table-header-section`}>
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <SearchBox changeHandler={(e: any) => onFilterChange("patient", e.target.value)} theme={theme}
                               placeholder="Search for users"></SearchBox>
                    <button className={`${theme}-Button-primary`}>
                        <TbFilterPlus className={"w-5 h-5"}/>
                        Apply Filter
                    </button>
                    <button className={`${theme}-Button-primary`}>
                        <RiUserAddLine className={"w-5 h-5"}/>
                        Add Patient{" "}
                    </button>
                </div>
                <div className={`${theme}-Table-container h-[40vh]`}>
                    <table
                        className={`${theme}-table`}>
                        <thead className="text-xs text-gray-700  ">
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <tr key={headerGroup.id} className={"text-nowrap text-[#FFFFFF]"}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                className={`${theme}-Table-header`}
                                            >
                                                <div className={"flex items-center justify-center"}>

                                                    <>{header.column.columnDef.header}</>
                                                    {header.column.getCanSort() && (
                                                        <FaSort onClick={header.column.getToggleSortingHandler()}/>
                                                    )}
                                                    {
                                                        // {
                                                        //     asc: " 🔼",
                                                        //     desc: " 🔽 ",
                                                        // }[header.column.getIsSorted()]
                                                    }
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map((row) => {
                                return (
                                    <tr className="text-white space-y-7 ">
                                        {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <td className={`${theme}-Table-td`}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>

                </div>
            </div>
            {/* <Pagination table={table} theme={theme}/> */}
        </div>
    );
}

export default Table