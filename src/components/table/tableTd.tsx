/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components";
import { PiChatBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Pationt } from "@/model";

import CircularProgressBar from "../charts/CircularProgressBar";
const Theme = () => {
  return useSelector((state: any) => state.theme.value.name);
};

export const columns: ColumnDef<Pationt>[] = [
  {
    accessorKey: "information.name",
    header: "Client Name",
    enableSorting: false,

    cell: ({ row }) => {
      
      
      return (
        <Link to={`/information/${row.original.information.member_id}`}>
          <div className="flex items-center justify-start gap-4">
            <img
              className="w-10 h-10 border rounded-full"
              src={row.original.information.picture}
              alt={`${row.original.information.name} image`}
            />
            
              <div className="font-semibold text-nowrap flex items-center gap-3">
                {row.original.information.name}
                <FiExternalLink />
              </div>
            
            
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "information.member_id",
    header: "Member ID",
  },
  {
    accessorKey: "information.age",
    header: "Age",
  },
  {
    accessorKey: "information.sex",
    header: "Sex",
    enableSorting: false,
  },
  {
    accessorKey: "information.weight",
    header: "Weight",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.original.information.weight}
        </div>
      );
    },
  },
  {
    accessorKey: "information.enroll_date",
    header: "Enroll Date",
  },
  {
    accessorKey: "information.last_followup",
    header: "Last Follow-Up",
  },
  {
    accessorKey: "information.status",
    header: "Status",
    enableSorting: false,

    cell: ({ row }) => {
      return (
        <div className="items-center justify-center flex ">
        <Badge theme={Theme()} status={row.original.information.status}>
          {row.original.information.status}
        </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "information.score",
    header: "Score",
    cell: ({ row }) => {
      return (
       <div>
        {row.original.information.score} <span className="text-secondary-text">/10</span>
       </div>
      );
    },
  },
  {
    accessorKey: "information.progress",
    header: "Progress",
    cell: ({ row }) => {
      
      return (
       <div>
<CircularProgressBar percentage={row.original.information.progress}></CircularProgressBar>       </div>
      );
    },
  },
  // {
  //   accessorKey: "information.heart_rate",
  //   header: "Heart Rate",
  // },
  // {
  //   accessorKey : 'information.heart_rate',
  //   header: "Heart Rate",
  //   cell: ({ row }) => {
  //     console.log(row.original.getBiomarkers());

  //     const biomarker = row.original.getBiomarkers().find((bio: any) => Object.keys(bio)[0] === "Heart Rate");
  //     console.log(biomarker);

  //     let value = "N/A";
  //     if (biomarker) {
  //       const nestedValue = Object.values(biomarker)[0].value;
  //       value = typeof nestedValue === "object" ? nestedValue.value?.value ?? "N/A" : nestedValue;
  //     }
  //     return <div className="flex items-center justify-center">{value}</div>;
  //   },
  // },

  // {
  //   accessorKey: "information.blood_pressure",
  //   header: "Blood Pressure",
  // },
  // {
  //   accessorKey: "information.temperatue",
  //   header: "Temperature",
  // },
  // {
  //   accessorKey: "information.blood_oxygen",
  //   header: "Blood Oxygen",
  // },

  // {
  //   accessorKey: "infomation.respiration_rate",
  //   header: "respiration",
  //   filterFn: "includesString",
  //   cell: ({ row }) => {
  //     return (
  //       <Badge
  //         theme={Theme()}
  //         status={resolveRespiration(row.original.information.respiration_rate)}
  //       >
  //         {row.original.information.respiration_rate}
  //       </Badge>
  //     );
  //   },
  // },

  {
    accessorKey: "information.action",
    header: "Action",
    enableSorting: false,

    cell: () => {
      return <PiChatBold className={`${Theme()}-icons-PiChatBold w-full`} />;
    },
  },
];
