/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { NumberBox } from ".."
import Icon1 from '../../assets/images/profile-tick.png';
import Icon2 from '../../assets/images/profile-tick2.png';
import Icon4 from '../../assets/images/profile-tick3.png';
import Icon3 from '../../assets/images/profile-delete.png';

const ReportNumberBox = () => {
    const theme = useSelector((state: any) => state.theme.value.name);
    return (
        <>
          <div
            className={
              "grid grid-cols-3 xl:grid-cols-4  gap-2 w-full"
            }
          >
            <NumberBox
              mode="added"
              value={0}
              title="Total Enrollment"
              theme={theme}
              icon={Icon2}

            />
            <NumberBox
              mode="increase"
              value={0}
              title="Critical Patients"
              theme={theme}
              icon={Icon3}

            />
            <NumberBox
              mode="reduction"
              value={0}
              title="At Risk Patients"
              theme={theme}
              icon={Icon1}
            />
            <NumberBox
              mode="increase"
              value={0}
              title="Normal Patients"
              theme={theme}
              icon={Icon4}

            />
          </div>
        </>
    )
}

export default ReportNumberBox