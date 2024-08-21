import { InfoCard, HistoryBox, ChatHistoryBox } from "@/components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Clinic from "../../assets/images/clinic.png";

export const Messages = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [TabBar, setTabBar] = useState(2);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuId]);

  const handleMenuClick = (id: number) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <InfoCard />
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
              className={
                TabBar === 2
                  ? "bg-[#03DAC5] w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]"
                  : "w-[144px] h-[24px] rounded-md text-[#FFFFFF] text-[12px] flex items-center justify-center gap-[8px] cursor-pointer hover:bg-[#03DAC5] hover:text-[#383838]"
              }
              onClick={() => setTabBar(2)}
            >
              Notification History
            </div>
          </div>
         

          <div className=" w-full flex items-start flex-col overflow-auto hidden-scrollBar


">
            {TabBar === 1 ? (
              <div className="w-full">
                <ChatHistoryBox
                  theme={theme}
                  placeholder="Search chat history"
                  changeHandler={(notification) => setSelectedNotification(notification)}
                />
              </div>
            ) : null}
            {TabBar === 2 ? (
              <div className="w-full">
                <HistoryBox
                  theme={theme}
                  placeholder="Search chat history"
                  changeHandler={(notification) => setSelectedNotification(notification)}
                />
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
                className="w-[19px] text-[#FFFFFF] mr-[10px]"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
              <p className="text-xs text-[#ffffffbe]">
                {selectedNotification?.title || 'Notification Title'}
              </p>
            </div>
          </div>
          <div className="w-full text-xs text-[#ffffff77] h-[2rem] flex items-center justify-center mb-4">
            {selectedNotification?.date || ''}
          </div>
          <div className="w-full h-[77%] overflow-auto flex items-start flex-col pb-[7rem]">
            {selectedNotification ? (
              selectedNotification.messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`w-full p-[1rem] flex ${
                    message.role === "assistant" ? "justify-end" : "justify-start"
                  } relative`}
                >
                  <div
                    className={`w-[35rem] flex items-start  ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                    style={{
                      direction: message.role === "assistant" ? "rtl" : "rtl",
                    }}
                  >
                    <div className=" w-10 h-10 mt-8 relative flex items-center justify-center text-white/85 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        onClick={handleMenuClick(message.id)}
                        className="w-5 mb-4.5 cursor-pointer"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      </svg>
                      {openMenuId === message.id ? (
                        <div
                          className={`w-32 absolute top-0 bg-[#272727] ${
                            message.role === "assistant" ? 'right-0' : 'left-0'
                          } rounded-md border border-[#383838] flex flex-col items-start p-1`}
                        >
                          <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">
                            Copy
                          </button>
                          <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">
                            Copy
                          </button>
                          
                          <button className="w-full text-xs border-b border-[#383838] py-1.5 rounded-md hover:bg-[#03DAC5] hover:text-[#383838] last:border-none">
                            Copy
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className="flex items-start flex-col relative max-w-[80%]"
                      style={{ justifyContent: message.role === "assistant" ? "right" : "left" }}
                    >
                      <p className="w-full text-[#ffffff66] mb-1.5 text-right">
                        {selectedNotification.time}
                      </p>
                      <div className="bg-[#272727]  p-4 rounded-[20px_0_20px_20px] border border-[#383838]">
                        <p
                        className={`text-xs text-[#ffffffd8] text-left  ${
                          message.role === "assistant" ? "text-right" : "text-left"
                        }`}
                         
                          style={{ direction: 'ltr' }}
                        >
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center ml-4">
                      <img src={Clinic} alt="Clinic" className="w-[40px]" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#ffffff66]">
                Select a notification to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



