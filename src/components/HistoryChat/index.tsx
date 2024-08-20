/* eslint-disable @typescript-eslint/no-explicit-any */

interface ChatHistoryBoxProps {
  theme: string;
  placeholder: string;
  changeHandler?: (e: any) => void;
}
const ChatHistoryBox: React.FC<ChatHistoryBoxProps> = ({changeHandler}) => {
  const notifications = [
    {
      id: 1,
      title: "Notification 1",
      status: 1,
      date: "12 June 2024",
      time: "3:15pm",
      message: "Please upload your test answer in your account.",
    },
    {
      id: 2,
      title: "Notification 2",
      status: 2,
      date: "10 June 2024",
      time: "8:35pm",
      message: "Your appointment is scheduled for tomorrow.",
    },
    {
      id: 3,
      title: "Notification 3",
      status: 1,
      date: "10 June 2024",
      time: "10:16am",
      message: "Your lab results are available now.",
    },
    {
      id: 4,
      title: "Notification 4",
      status: 2,
      date: "09 June 2024",
      time: "5:54am",
      message: "Don't forget to complete your health survey.",
    },
    {
      id: 5,
      title: "Notification 5",
      status: 2,
      date: "08 June 2024",
      time: "11:03pm",
      message: "New updates are available in your health portal.",
    },
  ];

  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let lastDate: string | null = null;
  return (
    <>
       {sortedNotifications.map((notification) => {
        const showDate = notification.date !== lastDate;
        lastDate = notification.date;

        return (
          <div key={notification.id} className="w-full flex items-start flex-col mt-1">
            {showDate && (
              <label
                htmlFor=""
                className="w-full text-[10px] mb-[5px] mt-[10px] text-[#ffffff5e]"
              >
                {notification.date}
              </label>
            )}
            <div
              key={notification.id}
              onClick={() => changeHandler && changeHandler(notification)}
              className="w-[328px] h-[64px] bg-[#1E1E1E] rounded-md border border-[#383838] text-[#ffffffb0] flex items-center justify-center flex-col mb-[5px] cursor-pointer hover:bg-[#03DAC5] hover:text-black"
            >
              <div className="w-[296px] h-1/2 flex items-center justify-between">
              
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="w-[22px]" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg>
                <p className="text-xs w-[70%]">{notification.title}</p>
                <p className="text-[10px]">{notification.time}</p>
              </div>
              <p className="w-[296px] overflow-hidden whitespace-nowrap text-xs mt-[2px] text-ellipsis">
                {notification.message}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatHistoryBox;