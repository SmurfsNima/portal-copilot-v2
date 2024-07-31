/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import Badge from "../badge";
import { FC } from "react";
import { PiChatBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { biomarker } from "@/types";

interface TableRowProps {
  name: string;
  photo: string;
  member_id: string;
  age: number;
  sex: "male" | "female";
  status: "critical" | "normal" | "at-risk";
  enroll_date: string;
  last_followup: string;
  heart_rate: number;
  blood_pressure: number;
  temperatue: number;
  blood_oxygen: number;
  respiration_rate: string;
  biomarkers: biomarker[];
}
export const TableRow: FC<TableRowProps> = ({
  member_id,
  name,
  photo,
  age,
  sex,

  enroll_date,
  status,
  last_followup,
}) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  return (
    <>
      <tr className="text-white space-y-7 ">
        <td className={`${theme}-Table-td`}>
          <img
            className="w-10 h-10 border rounded-full"
            src={photo}
            alt="Jese image"
          />
          <div className="flex items-center">
            {name}
            <Link to={`/information`}>
              <FiExternalLink></FiExternalLink>
            </Link>
          </div>
        </td>
        <td className={`${theme}-Table-td`}>{member_id}</td>
        <td className={`${theme}-Table-td`}>{age}</td>
        <td className={`${theme}-Table-td`}>{sex}</td>

        <td className={`${theme}-Table-td`}>{enroll_date}</td>

        <td className={`${theme}-Table-td`}>{last_followup}</td>
        <td className={`${theme}-Table-td`}>
          <Badge theme={theme} status={status}>
            {status}
          </Badge>
        </td>
        {/* {
                biomarkers.map((el)=>{
                    return(<td className={`${theme}-Table-td`}>{el.}</td>)
                })
              } */}
        <td className={`${theme}-Table-td`}>
          <PiChatBold className={`${theme}-icons-PiChatBold`} />
        </td>
      </tr>
    </>
  );
};
