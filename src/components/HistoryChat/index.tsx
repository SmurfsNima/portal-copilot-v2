/* eslint-disable @typescript-eslint/no-explicit-any */

interface ChatHistoryBoxProps {
  theme: string;
  placeholder: string;
  changeHandler?: (e: any) => void;
}
const ChatHistoryBox: React.FC<ChatHistoryBoxProps> = () => {
  return (
    <>
        <div className="w-full flex items-start flex-col mt-2.5">
        <label htmlFor="" className="w-full text-[10px] mb-[5px] text-[#ffffff5e]">Previous 17 days
        </label>
        <div className="w-[328px] h-[64px] rounded-md border border-[#383838] text-[#ffffffb0] flex items-center justify-center flex-col mb-[5px] cursor-pointer hover:bg-[#03DAC5] hover:text-black">
          <div className="w-[296px] h-1/2 flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[22px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>{" "}
            <p className="text-xs w-[70%]">Notification_ID_672384590216</p>
            <p className="text-[10px]">03:45AM</p>
          </div>
          <p className="w-[296px] overflow-hidden whitespace-nowrap text-xs mt-[2px] text-ellipsis">
            There are many variations of massages that we can show you
            isdffsfsdfsfsdff
          </p>
        </div>
        <div className="w-[328px] h-[64px] rounded-md border border-[#383838] text-[#ffffffb0] flex items-center justify-center flex-col mb-[5px] cursor-pointer hover:bg-[#03DAC5] hover:text-black">
        <div className="w-[296px] h-1/2 flex items-center justify-between">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[22px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>{" "}
            <p className="text-xs w-[70%]">Notification_ID_672384590216</p>
            <p className="text-[10px]">03:45AM</p>
          </div>
          <p className="w-[296px] overflow-hidden whitespace-nowrap text-xs mt-[2px] text-ellipsis">
            There are many variations of massages that we can show you
            isdffsfsdfsfsdff
          </p>
        </div>
      </div>

      <div className="w-full flex items-start flex-col mt-2.5">
        <label htmlFor="" className="w-full text-[10px] mb-[5px] text-[#ffffff5e]">Previous 27 days</label>
        <div className="w-[328px] h-[64px] rounded-md border border-[#383838] text-[#ffffffb0] flex items-center justify-center flex-col mb-[5px] cursor-pointer hover:bg-[#03DAC5] hover:text-black">
          <div className="w-[296px] h-1/2 flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[22px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>{" "}
            <p className="text-xs w-[70%]">Notification_ID_672384590216</p>
            <p className="text-[10px]">03:45AM</p>
          </div>
          <p className="w-[296px] overflow-hidden whitespace-nowrap text-xs mt-[2px] text-ellipsis">
            There are many variations of massages that we can show you
            isdffsfsdfsfsdff
          </p>
        </div>
        <div className="w-[328px] h-[64px] rounded-md border border-[#383838] text-[#ffffffb0] flex items-center justify-center flex-col mb-[5px] cursor-pointer hover:bg-[#03DAC5] hover:text-black">
        <div className="w-[296px] h-1/2 flex items-center justify-between">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[22px]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>{" "}
            <p className="text-xs w-[70%]">Notification_ID_672384590216</p>
            <p className="text-[10px]">03:45AM</p>
          </div>
          <p className="w-[296px] overflow-hidden whitespace-nowrap text-xs mt-[2px] text-ellipsis">
            There are many variations of massages that we can show you
            isdffsfsdfsfsdff
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatHistoryBox;