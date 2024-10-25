/* eslint-disable @typescript-eslint/no-explicit-any */

import { Application } from "@/api";
import { useEffect, useState, useRef } from "react";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
import { useNavigate } from "react-router-dom";
import ConfirmShareModal from "@/components/confirmShare";

interface ReportTableProps {
  data: Array<any>;
  memberId: number;
  onUpdate: () => void;
  email:string;
  onResolved: (data:any,reportId:string) => void;
}
const ReportTable: React.FC<ReportTableProps> = ({
  data,
  memberId,
  onResolved,
  email
}) => {
  // const handleDownload = (value: any) => {
  //   const link = document.createElement("a");
  //   link.href = `data:application/pdf;base64,` + value;
  //   link.download = "downloaded_file.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  useEffect(() => console.log(data), [data]);
  console.log(data.length);
  const navigate = useNavigate()
  const [shareReportId, setShareReportId] = useState<number | null>(null);
  const [showModal, setshowModal] = useState(true)
  const modalAiGenerateRef = useRef(null)
  const [isOpenShare,setISOpenShare] = useState(false)
  useModalAutoClose({
    refrence:modalAiGenerateRef,
    close:() => {
        setshowModal(false)
    }
  })
//   const ShareModal = ({ reportId }: { reportId: number }) => {
//     console.log(reportId);
   
// return(
//       <div ref={modalAiGenerateRef} className={` ${!showModal && 'hidden'} z-10  absolute w-[80px] h-[80px] text-xs bg-white dark:bg-black-third right-0 top-6 p-4 rounded-md shadow-md  flex flex-col justify-between`}>
        
       
//          <span className="text-[10px] text-light-secandary-text dark:text-primary-text cursor-pointer">Via Email</span> 
//        <div className="h-[1px] bg-light-border-color dark:bg-main-border w-full"></div>
//       <span className="text-[10px] text-light-secandary-text dark:text-primary-text cursor-pointer">Via SMS</span>
//       </div>)
  
//   };
  return (
    <>
      
      {data.length < 1 ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <div className="flex flex-col gap-1">
            <img src="./Themes/Aurora/icons/EmptyState.svg" alt="" />
            <span className="text-light-secandary-text dark:text-secondary-text text-base">
              No Result to Show
            </span>
          </div>
        </div>
      ) : (
        <div className=" bg-white border dark:border-none border-light-border-color dark:bg-[#272727] px-4 rounded-[6px]">
          <div className="flex justify-start items-center">
            <div className=" text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[250px] text-[14px]">
              Report Title
            </div>
            <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[360px] flex items-center justify-center text-[14px]">
              Create on
            </div>
            <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-5 w-[300px] flex items-center justify-end pr-10 text-[14px]">
              Action
            </div>
            {/* <Button onClick={onUpdate} theme="Aurora">
              Refresh
            </Button> */}
          </div>
          <div className=" border-light-border-color dark:border-black-third  border"></div>
          {data.length > 0 && (
            <div className="h-[35vh] overflow-y-scroll">
              {data.map((el) => {
                return (
                  <>
                    <div className="flex justify-start items-center my-1">
                      <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[250px] text-[12px]">
                        {el.Title}
                      </div>
                      <div className="text-light-secandary-text dark:text-[#FFFFFFDE] py-2 w-[360px] flex justify-center items-center text-[12px]">
                        {el["Created Date"]}
                      </div>
                      <div className="text-[#FFFFFFDE] py-2 w-[300px] gap-2 flex justify-end px-5 items-center text-[12px]">
                        <img
                          onClick={() => {
                            // Application.getReportString({
                            //   member_id: memberId,
                            //   report_id: el.report_id,
                            // }).then((res) => {
                            //   handleDownload(res.data);
                            // });
                            navigate("/weaklyReport/"+memberId+"/"+el.report_id)
                            // window.open(location.host+"/#/weaklyReport/"+memberId+"/"+el.report_id)
                          }}
                          className="cursor-pointer"
                          src={"./Themes/Aurora/icons/document-download3.svg"}
                        />
                        <div className="relative"> <img
                          onClick={() => {setShareReportId(el.report_id)
                          //  setshowModal(true)
                          setISOpenShare(true)
                          }
                          }
                          className="cursor-pointer"
                          src={"./Themes/Aurora/icons/share.svg"}
                        />
 {shareReportId === el.report_id && showModal && (
                            <></>
                          // <ShareModal reportId={el.report_id} />
                        )}</div>
                       
                        <img
                          onClick={() => {
                            Application.AiStudioShowSavedReport({
                              member_id:memberId,
                              report_id:el.report_id
                            }).then(res => {
                              onResolved(res.data,el.report_id)
                            })
                          }}
                          className="cursor-pointer"
                          src={"./Themes/Aurora/icons/edit4.svg"}
                        />
                      </div>
                    </div>
                    <div className=" border-light-border-color dark:border-black-third  border"></div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      )}
      <ConfirmShareModal title="Share File" content={`Are you sure you want to share this report with ‘${email}’?`} isOpen={isOpenShare} onClose={() => {setISOpenShare(false)}} onConfirm={()=>{
        Application.ShareWeaklyReport({
            type: 'email',   
            member_id:memberId,
            report_id:shareReportId
        })
        setISOpenShare(false)
      }} ></ConfirmShareModal>
    </>
  );
};

export default ReportTable;
