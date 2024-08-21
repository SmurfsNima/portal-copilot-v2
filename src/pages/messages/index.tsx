/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCard, HistoryBox, ChatHistoryBox } from "@/components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import Seartch from "../../assets/images/icons8-search-64.png";
import Clinic from "../../assets/images/clinic.png";

export const Messages = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [TabBar, setTabBar] = useState(2);
  const [MenueBar, setMenueBar] = useState(0);

  useEffect(() => {
    const handleClickOutside = () => {
      // Check if the click is outside the menu and menu is open
      if (MenueBar === 1) {
        setMenueBar(0);
      }
    };

    // Attach event listener to document
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [MenueBar]);

  const handleMenuClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation(); 
    setMenueBar(1);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <InfoCard></InfoCard>
      <div className="flex justify-between gap-4">
        <div className="w-[329px] h-[400px] flex items-start flex-col">
          <div className="w-[329px] h-[32px] rounded-md border border-[#383838] px-[12px] flex justify-between items-center">
            <div
              className={
                TabBar === 1
                  ? "bg-[#03DAC5] w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]"
                  : "w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]"
              }
              onClick={() => setTabBar(1)}
            >
              Chat History
            </div>
            <div
              className={TabBar === 2 ? "bg-[#03DAC5]  w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] top-[214px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]" : "w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] top-[214px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]"}
              onClick={() => setTabBar(2)}
            >
              Notification History
            </div>
          </div>
         

          <div className="w-full flex items-start flex-col overflow-auto">
            {/* <div className="w-[328px] h-[36.33px] rounded-md border border-[#383838] mt-[10px] mb-[15px] overflow-hidden flex items-center justify-center">
              <div className="w-[308px] h-[24px] bg-[#272727] flex items-center justify-evenly border border-[#383838] rounded-md overflow-hidden">
                <img src={'./Themes/Aurora/icons/search-normal.svg'} alt="" className="w-[20px]" />
                <input className="w-[80%] h-full bg-[#03dac500] text-[#FFFFFF] text-[12px] placeholder:text-[#ffffff80] placeholder:text-[10px] focus:outline-none active:outline-none" type="text" placeholder="Search for biomarkers..." />
              </div>
            </div> */}


            {TabBar === 1 ? (
              <div className="w-full">
                <ChatHistoryBox
                  theme={theme}
                  placeholder="Search chat history"
                />
              </div>
            ) : null}
            {TabBar === 2 ? (
              <div className="w-full">
                <HistoryBox theme={theme} placeholder="Search chat history" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full h-[400px] rounded-md bg-[#1E1E1E] border border-[#383838] flex items-start flex-col relative">
          <div className="w-full h-[37px] border-b border-[#383838] flex items-center justify-start">
            <div className="w-[40%] h-[90%] flex items-center justify-start pl-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={handleMenuClick}
                className="w-[19px] text-[#FFFFFF] mr-[10px]"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
              <p className="text-xs text-[#ffffffbe]">Notification_ID_183957420786</p>
            </div>
          </div>
          <div className="w-full text-xs text-[#ffffff77] h-[2rem] flex items-center justify-center mb-4">12 June 2024</div>
          <div className="w-full h-[77%] overflow-auto flex items-start flex-col">
            {/* ///////Sender box////////////// */}

            <div className="w-full h-[10rem] flex justify-end relative" style={{justifyContent:'right'}}>
              <div className="w-[30rem] h-[10rem] absolute flex items-start justify-end px-4 right-0" >
              <div className="w-10 h-10 mt-8 relative flex items-center justify-center text-white/85">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={handleMenuClick}
                    className="w-5 mb-4.5 cursor-pointer"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                  {MenueBar == 1 ? (
                    <div className="w-32 absolute bg-[#272727] top-0 right-0 rounded-md border border-[#383838] flex flex-col items-start p-1">
                      <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">Copy</button>
                      <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">Copy</button>
                      <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">Copy</button>

                    </div>
                  ) : null}
                </div>

                <div className="flex items-start flex-col relative" style={{justifyContent:'right'}}>
                  <p className="w-full text-[#ffffff66] mb-1.5 text-right">11:46</p>
                  <div className="bg-[#272727] w-[255px] p-4 rounded-[20px_0_20px_20px] border border-[#383838]">
                    <p className="text-xs text-[#ffffffd8] text-left" style={{direction:'ltr'}}>Please upload your test answer in your account.</p>
                  </div>
                  <p className="text-xs text-[#ffffff5f] absolute bottom-[-30px] right-0">Delivered</p>
                </div>
                <div className="rounded-full w-[40px] h-[40px] bg-[#383838] flex items-center justify-center ml-4">
                  <img src={Clinic} alt="Clinic" className="w-[42px]" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
