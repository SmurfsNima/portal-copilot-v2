/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components";
import { PiChatBold } from "react-icons/pi";
import { useSelector } from "react-redux";
// import { PationtInformation } from "@/types";
// import { resolveRespiration } from "@/utils/status";
import { Pationt } from "@/model";

const Theme = () => {
  return useSelector((state: any) => state.theme.value.name);
};
export const columns: ColumnDef<Pationt>[] = [
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-4">
          <img
            className="w-10 h-10 border rounded-full"
            src={row.original.information.photo}
            alt={`${row.original.information.name} image`}
          />
          <div className="">
            <div className="font-semibold text-nowrap">
              {row.original.information.name}
            </div>
          </div>
          <Link to={`/information/${row.original.information.member_id}`}>
            <FiExternalLink />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "information.member_id",
    header: "MemberId",
  },
  {
    accessorKey: "information.age",
    header: "Age",
  },
  {
    accessorKey: "information.sex",
    header: "Sex ",
  },
  // , {
  //     accessorKey: 'weight',
  //     header: 'Weight',
  //     cell:({row})=>{
  //         return (
  //             <div className={" flex items-center justify-center"}>

  //                 {row.original.weight}
  //             </div>
  //         )
  //     }
  // },
  {
    accessorKey: "information.enroll_date",
    header: "Enroll",
  },
  {
    accessorKey: "information.status",
    header: "State",
    cell: ({ row }) => {
      return (
        <Badge theme={Theme()} status={row.original.information.status}>
          {row.original.information.status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "information.last_followup",
    header: "FollowUp",
  },
  {
    accessorKey: "information.biomarkers",
    header: "Heart Rate",
    cell: ({ row }) => {
      const biomarkers = row.original.information.biomarkers;
      const heartRateData = biomarkers.find((b) => b.heart_rate)?.heart_rate[0]
        ?.value;
      const heartRate =
        typeof heartRateData === "number"
          ? heartRateData
          : heartRateData?.value;
      return <div>{heartRate ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "information.biomarkers",
    header: "Blood Pressure",
    cell: ({ row }) => {
      const biomarkers = row.original.information.biomarkers;
      const bloodPressureData = biomarkers.find((b) => b.blood_pressure)
        ?.blood_pressure[0]?.value;

      if (bloodPressureData && typeof bloodPressureData !== "number") {
        return (
          <div>{`${bloodPressureData.Low ?? "N/A"}/${
            bloodPressureData.High ?? "N/A"
          }`}</div>
        );
      }
      return <div>N/A</div>;
    },
  },
  {
    accessorKey: "information.biomarkers",
    header: "Temperature",
    cell: ({ row }) => {
      const biomarkers = row.original.information.biomarkers;
      const temperatureData = biomarkers.find((b) => b.temperature)
        ?.temperature[0]?.value;
      const temperature =
        typeof temperatureData === "number"
          ? temperatureData
          : temperatureData?.value;
      return <div>{temperature ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "information.biomarkers",
    header: "Oxygen",
    cell: ({ row }) => {
      const biomarkers = row.original.information.biomarkers;
      const oxygenData = biomarkers.find((b) => b.blood_oxygen)?.blood_oxygen[0]
        ?.value;
      const oxygen =
        typeof oxygenData === "number" ? oxygenData : oxygenData?.value;
      return <div>{oxygen ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "information.biomarkers",
    header: "Respiration",
    cell: ({ row }) => {
      const biomarkers = row.original.information.biomarkers;
      const respirationData = biomarkers.find((b) => b.respiration_rate)
        ?.respiration_rate[0]?.value;
      const respiration =
        typeof respirationData === "number"
          ? respirationData
          : respirationData?.value;
      return <div>{respiration ?? "N/A"}</div>;
    },
  },
  // {
  //     accessorKey: 'last',
  //     header: 'last',
  // },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return <PiChatBold className={`${Theme()}-icons-PiChatBold`} />;
    },
  },
];
