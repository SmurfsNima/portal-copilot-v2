import {Link} from "react-router-dom";
import {FiExternalLink} from "react-icons/fi";
import {Badge} from "../badge";
import {FC} from "react";
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

export const TableRow: FC<TableRowProps> = ({
                                                patient,
                                                memberId,
                                                age,
                                                sex,
                                                weight,
                                                enroll,
                                                state,
                                                followUp,
                                                heartRate,
                                                pressure,
                                                temperature,
                                                oxygen,
                                                respiration,
                                                stateColor,
                                                lastColor = "none",
                                                imageSrc,
                                                last
                                            }) => {
    const theme = useSelector((state: any) => state.theme.value.name)
    return (
        <>
            <tr className="text-white space-y-7 ">

                <td
                    className={`${theme}-Table-td text-xs flex items-center gap-3 py-2 pl-2 pr-10 text-white`}>
                    <img className="w-10 h-10 border rounded-full" src={imageSrc}
                         alt="Jese image"/>
                    <div className="">
                        <div className="font-semibold text-nowrap">{patient}</div>
                    </div>
                    <Link to='infoGraphic'>
                        <FiExternalLink/>
                    </Link>
                </td>
                <td className={`${theme}-Table-td`}>
                    {memberId}
                </td>
                <td className={`${theme}-Table-td`}>

                    {age}

                </td>
                <td className={`${theme}-Table-td`}>
                    {sex}
                </td>
                <td className={`${theme}-Table-td`}>
                    <div className={" flex items-center justify-center"}>

                        {weight}
                    </div>
                </td>
                <td className={`${theme}-Table-td`}>

                    {enroll}
                </td>
                <td className={`${theme}-Table-td`}>

                    {followUp}
                </td>
                <td className={`${theme}-Table-td`}>

                    {last}
                </td>
                <td className={`${theme}-Table-td`}>
                    <Badge theme={theme} color={stateColor}>
                        {state}
                    </Badge>
                </td>
                <td className={`${theme}-Table-td`}>

                    {heartRate}
                </td>
                <td className={`${theme}-Table-td`}>

                    {pressure}
                </td>
                <td className={`${theme}-Table-td`}>

                    {temperature}
                </td>
                <td className={`${theme}-Table-td`}>

                    {oxygen}
                </td>
                <td className={`${theme}-Table-td`}>

                        <Badge theme={theme} color={lastColor}>
                            {respiration}
                        </Badge>

                </td>
                <td className={`${theme}-Table-td`}>

                    <PiChatBold className={`${theme}-icons-PiChatBold`}/>
                </td>
            </tr>
        </>
    );
};
