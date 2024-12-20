/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components";
// import { PiChatBold } from "react-icons/pi";
// import { useSelector } from "react-redux";
import { Pationt } from "@/model";
import { useSelector } from "react-redux";
// import { Application } from "@/api";
import { publish } from "@/utils/event";

// import CircularProgressBar from "../charts/CircularProgressBar";
// eslint-disable-next-line react-refresh/only-export-components
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
        <Link to={`/information/${row.original.information.member_id}/Analysis`} className={"w-fit"}>
          <div className="flex items-center justify-start gap-4 w-[20vw]">
            <img
              className="w-10 h-10 border rounded-full"
              src={row.original.information.picture!= ''?row.original.information.picture:`https://ui-avatars.com/api/?name=${row.original.information.name}`}
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
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="w-[120px] flex justify-center">
          {row.original.information.member_id}
        </div>
      )
    }
  },
  {
    accessorKey: "information.age",
    header: "Age",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="w-[120px]">
          {row.original.information.age}
        </div>
      )
    }    
  },
  {
    accessorKey: "information.sex",
    header: "Sex",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="w-[120px]">
          {row.original.information.sex}
        </div>
      )
    }    
  },
  // {
  //   accessorKey: "information.weight",
  //   header: "Weight",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center justify-center">
  //         {row.original.information.weight}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "information.enroll_date",
    header: "Enroll Date",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="w-[120px]">
          {row.original.information.enroll_date}
        </div>
      )
    }    
  },
  // {
  //   accessorKey: "information.last_followup",
  //   header: "Last Follow-Up",
  // },
  {
    accessorKey: "information.status",
    header: "Status",
    enableSorting: false,
    
    cell: ({ row }) => {
      return (
        <div className="items-center justify-center w-[120px] flex ">
        <Badge theme={Theme()} status={row.original.information.status}>
          {row.original.information.status}
        </Badge>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "information.score",
  //   header: "Score",
  //   cell: ({ row }) => {
  //     return (
  //      <div>
  //       {row.original.information.score} <span className="text-secondary-text">/10</span>
  //      </div>
  //     );
  //   },
  // },
//   {
//     accessorKey: "information.progress",
//     header: "Progress",
//     cell: ({ row }) => {
      
//       return (
//        <div>
// <CircularProgressBar percentage={row.original.information.progress}></CircularProgressBar>       </div>
//       );
//     },
//   },
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
    accessorKey: "",
    header: "Action",
    enableSorting: false,
   cell: ({ row }) => {
      return (
        <div className="flex justify-center w-full">
          <img onClick={() => {
            publish("confirmDelete",{id:row.original.information.member_id,name:row.original.information.name})
            // const status = confirm("delete this member?")
            // if(status){
            //   Application.deleteClinic({
            //     member_id:row.original.information.member_id
            //   })
            // }
            // console.log(row.original.information.member_id)
          }} className="cursor-pointer" src="./Themes/Aurora/icons/trash.svg" alt="" />
        </div>
      );
    },
  },
];
