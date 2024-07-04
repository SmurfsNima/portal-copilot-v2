import {ColumnDef} from "@tanstack/react-table";
import {Link} from "react-router-dom";
import {FiExternalLink} from "react-icons/fi";
import {Badge} from "@/components";
import {PiChatBold} from "react-icons/pi";
import {useSelector} from "react-redux";

interface TableRowProps {
    patient: string;
    memberId: string;
    age: string;
    sex: string;
    weight: string;
    enroll: string;
    state: string;
    followUp: string;
    heartRate: string;
    pressure: string;
    temperature: string;
    oxygen: string;
    respiration: string;
    action: string;
    externalLink: string;
    stateColor: "green" | "red" | "yellow"
    lastColor?: "yellow" | "none"
    imageSrc: string
    last: string
}

const Theme = () => {
    return useSelector((state: any) => state.theme.value.name)
}
export const columns: ColumnDef<TableRowProps>[] = [
    {
        accessorKey: 'patient',
        header: 'Patient Name',
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-start gap-4">
                    <img
                        className="w-10 h-10 border rounded-full"
                        src={row.original.imageSrc}
                        alt={`${row.original.patient} image`}
                    />
                    <div className="">
                        <div className="font-semibold text-nowrap">{row.original.patient}</div>
                    </div>
                    <Link to={row.original.externalLink}>
                        <FiExternalLink/>
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: 'memberId',
        header: 'MemberId',
    }, {
        accessorKey: 'age',
        header: 'Age',
    }, {
        accessorKey: 'sex',
        header: 'Sex ',
    }, {
        accessorKey: 'weight',
        header: 'Weight',
        cell:({row})=>{
            return (
                <div className={" flex items-center justify-center"}>

                    {row.original.weight}
                </div>
            )
        }
    }, {
        accessorKey: 'enroll',
        header: 'Enroll',
    }, {
        accessorKey: 'state',
        header: 'State',
        cell:({row})=>{
            return(
                <Badge theme={Theme()} color={row.original.stateColor}>
                    {row.original.state}
                </Badge>
            )
        }
    }, {
        accessorKey: 'followUp',
        header: 'FollowUp',
    }, {
        accessorKey: 'heartRate',
        header: 'heartRate',
    }, {
        accessorKey: 'pressure',
        header: 'pressure',
    }, {
        accessorKey: 'temperature',
        header: 'temperature',
    }, {
        accessorKey: 'oxygen',
        header: 'oxygen',
    }, {
        accessorKey: 'respiration',
        header: 'respiration',
        filterFn: "includesString",
        cell: ({row})=>{
            return(
                <Badge theme={Theme()} color={row.original.lastColor || ""}>
                    {row.original.respiration}
                </Badge>
            )
        }
    }, {
        accessorKey: 'last',
        header: 'last',
    },{
        accessorKey: 'action',
        header: 'Action',
        cell:()=>{
            return(
                <PiChatBold className={`${Theme()}-icons-PiChatBold`}/>
            )
        }
    }
]