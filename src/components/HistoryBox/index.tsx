import React from 'react';

interface HistoryBoxProps {
  theme: string;
  placeholder: string;
  changeHandler?: (e: any) => void;
}

const HistoryBox: React.FC<HistoryBoxProps> = ({ changeHandler }) => {
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[22px]"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
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

export default HistoryBox;
