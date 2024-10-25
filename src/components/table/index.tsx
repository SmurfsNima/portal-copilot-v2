/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TbFilterPlus } from "react-icons/tb";
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
import { useEffect, useState  } from "react";
import { Pationt } from "@/model/index.ts";
import AddClientModal from "@/pages/patientList/addClientModal.tsx";
import Pagination from "../pagination/index.tsx";
import ClientPreview from "@/pages/patientList/ClientPreview.tsx";
import { useNavigate } from "react-router-dom";
// import Application from "@/api/app.ts";
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
  const [isProfileClientOpen, setisProfileClientOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [memberID, setMemberID] = useState<number>()

  // calculate the height of table
  const pageSize =  (window.innerHeight*.67)/65; // 100vh in pixels

  useEffect(() => {
    setData(classData);
  }, [classData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter, 
      pagination: {
        pageIndex: currentPage,
        pageSize // Link page index to currentPage
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex:0,
        pageSize
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
  const [email,setEmail]= useState('')
  const [name,setName] = useState("")
  const navigate = useNavigate()
  const handleAddClient = (clientData: any) => {
    console.log("Client Added:", clientData);
    setEmail(clientData.email)
    setName(clientData.fullName)
    navigate("/helthProfile/"+clientData.memberId+`?name=${clientData.fullName}&email=${clientData.email}`)
    // setisProfileClientOpen(true)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  const sendClientData = async (clientData: { fullName: string; email: string; wearableDevice: string,memberId:number }) => {
    setMemberID(clientData.memberId)
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full top-0 dark:shadow-md sm:rounded-lg py-1">
        <div className={`${theme}-Table-header-section `}>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <h5 className=" text-sm font-medium py-2 text-light-primary-text dark:text-[#ffffffc3]">Client List</h5>
          <div className="flex items-center gap-1  ">
            <SearchBox
              changeHandler={(e: any) => setGlobalFilter(e.target.value)} // Update global filter on input change
              theme={theme}
              placeholder="Search for client"
            />
            {/* <div className="w-[236px] h-[32px] bg-[#1E1E1E] border border-[#333333] rounded-[6px] flex items-center justify-between gap-1 text-[11px] text-[#ffffffc3] px-[25px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[11px]" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
              <p>21 April, 2024 - 29 April, 2024</p>
              <p className="cursor-pointer text-[15px]">x</p>
            </div> */}
            {/* <Button theme={`${theme}-secondary`}>
              <TbFilterPlus className="w-5 h-5" />
              Apply Filter
            </Button> */}
            <Button onClick={handleOpenModal}  theme={theme}>
             <img src="/public/Themes/Aurora/icons/user-add.svg" alt="" />
              Add Client{" "}
              </Button>
          </div>
          {isModalOpen && 
          <AddClientModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddClient}
            sendCLientData={sendClientData}
          />
          }
          {isProfileClientOpen &&
          <ClientPreview
            isOpen={isProfileClientOpen}
            email={email}
            name={name}
            memberID={memberID}
            onClose={() => setisProfileClientOpen(false)}    
            onSubmit={() =>{}}      
          ></ClientPreview>
          }
        </div>
        <div className={`${theme}-Table-container h-[68vh] ${theme}-scrollBar`}>
          {table.getRowModel().rows.length > 0 ? (
            <table className={`${theme}-table ${theme}-scrollBar w-full`}>
              <thead className="text-xs text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="text-nowrap text-secondary-color dark:text-[#FFFFFF]">
                    {headerGroup.headers.map((header,index) => (
                      <th key={header.id} className={`${theme}-Table-header`}>
                        <div className={`flex items-center  ${index == 0?'justify-start w-[20vw]':'justify-center  w-[135px]'} `}>
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
                  <tr className="text-light-secandary-text dark:text-white space-y-7" key={row.id}>
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
      <Pagination currentPage={currentPage + 1}  totalPages={Math.ceil(data.length / pageSize)} onPageChange={handlePageChange} />
    </div>
  );
  
};

export default Table;
