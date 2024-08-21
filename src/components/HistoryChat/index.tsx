import React, { useState } from 'react';

interface ChatHistoryBoxProps {
  theme: string;
  placeholder: string;
  changeHandler?: (e: any) => void;
}
const ChatHistoryBox: React.FC<ChatHistoryBoxProps> = ({changeHandler}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      "id": 1,
      "title": "Chat 1",
      "status": 1,
      "date": "12 June 2024",
      "time": "3:15pm",
      "messages": [
        {
          "id": 101,
          "role": "user",
          "content": " Please upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your accountPlease upload your test answer in your account.Please upload your test answer in your account.Please upload your test answer in your account.",
          "date": "Wed, 12/06"
        },
        {
          "id": 102,
          "role": "assistant",
          "content": "Your answer should be submitted by the end of today.",
          "date": "Wed, 12/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 103,
          "role": "user",
          "content": "Remember to check for any errors before submitting.",
          "date": "Wed, 12/06"
        },
        {
          "id": 104,
          "role": "user",
          "content": "Late submissions may incur a penalty.Late submissions may incur a penalty.Late submissions may incur a penalty.Late submissions may incur a penalty.",
          "date": "Wed, 12/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 105,
          "role": "user",
          "content": "Contact support if you encounter any issues.",
          "date": "Wed, 12/06"
        }
      ]
    },
    {
      "id": 2,
      "title": "Chat 2",
      "status": 2,
      "date": "10 June 2024",
      "time": "8:35pm",
      "messages": [
        {
          "id": 201,
          "role": "user",
          "content": "Your appointment is scheduled for tomorrow.",
          "date": "Mon, 10/06"
        },
        {
          "id": 202,
          "role": "assistant",
          "content": "Please arrive 15 minutes early.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 203,
          "role": "user",
          "content": "Bring any necessary documents with you.",
          "date": "Mon, 10/06"
        },
        {
          "id": 204,
          "role": "assistant",
          "content": "If you need to reschedule, contact us as soon as possible.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 205,
          "role": "user",
          "content": "Prepare any questions you might have for the appointment.",
          "date": "Mon, 10/06"
        },
        {
          "id": 206,
          "role": "assistant",
          "content": "Remember to follow any pre-appointment instructions given.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        }
      ]
    },
    {
      "id": 3,
      "title": "Chat 3",
      "status": 1,
      "date": "10 June 2024",
      "time": "10:16am",
      "messages": [
        {
          "id": 301,
          "role": "user",
          "content": "Your lab results are available now.",
          "date": "Mon, 10/06"
        },
        {
          "id": 302,
          "role": "assistant",
          "content": "Please review them at your earliest convenience.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 303,
          "role": "user",
          "content": "Consult with your doctor for further interpretation.",
          "date": "Mon, 10/06"
        },
        {
          "id": 304,
          "role": "assistant",
          "content": "If you have any questions, contact the lab directly.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 305,
          "role": "user",
          "content": "Make sure to follow any additional recommendations provided.",
          "date": "Mon, 10/06"
        },
        {
          "id": 306,
          "role": "assistant",
          "content": "Keep a copy of the results for your records.",
          "date": "Mon, 10/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        }
      ]
    },
    {
      "id": 4,
      "title": "Chat 4",
      "status": 2,
      "date": "09 June 2024",
      "time": "5:54am",
      "messages": [
        {
          "id": 401,
          "role": "user",
          "content": "Don't forget to complete your health survey.",
          "date": "Sun, 09/06"
        },
        {
          "id": 402,
          "role": "assistant",
          "content": "Your feedback is important to us.",
          "date": "Sun, 09/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 403,
          "role": "user",
          "content": "The survey should take about 10 minutes to complete.",
          "date": "Sun, 09/06"
        },
        {
          "id": 404,
          "role": "assistant",
          "content": "Please answer all questions honestly.",
          "date": "Sun, 09/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 405,
          "role": "user",
          "content": "If you need assistance, reach out to our support team.",
          "date": "Sun, 09/06"
        },
        {
          "id": 406,
          "role": "assistant",
          "content": "Survey responses are confidential.",
          "date": "Sun, 09/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 407,
          "role": "user",
          "content": "Completing the survey helps improve our services.",
          "date": "Sun, 09/06"
        }
      ]
    },
    {
      "id": 5,
      "title": "Chat 5",
      "status": 2,
      "date": "08 June 2024",
      "time": "11:03pm",
      "messages": [
        {
          "id": 501,
          "role": "user",
          "content": "New updates are available in your health portal.",
          "date": "Sat, 08/06"
        },
        {
          "id": 502,
          "role": "assistant",
          "content": "Check the portal for the latest information.",
          "date": "Sat, 08/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 503,
          "role": "user",
          "content": "Review any new messages or updates from your healthcare provider.",
          "date": "Sat, 08/06"
        },
        {
          "id": 504,
          "role": "user",
          "content": "Make sure to log in and check for any required actions.",
          "date": "Sat, 08/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 505,
          "role": "user",
          "content": "Contact us if you have trouble accessing the portal.",
          "date": "Sat, 08/06"
        },
        {
          "id": 506,
          "role": "assistant",
          "content": "Updates may include important health reminders or changes.",
          "date": "Sat, 08/06",
          "evaluation_status": null,
          "owner_evaluation": null,
          "owner_comments": null
        },
        {
          "id": 507,
          "role": "user",
          "content": "Keep your contact information up to date in the portal.",
          "date": "Sat, 08/06"
        }
      ]
    }
  ];

  const getLatestMessage = (messages: any[]) => {
    if (messages.length === 0) return '';
    const sortedMessages = messages.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedMessages[0].content;
  };

  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredNotifications = sortedNotifications.filter((notification) =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let lastDate: string | null = null;

  return (
    <>
      <div className="w-full h-[30px] mt-[5px] border border-[#383838] rounded-md flex justify-center items-center">
        <div className="w-[90%] h-[80%] border px-[10px] border-[#383838] rounded-md flex justify-start items-center bg-[#272727] overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-30 w-[15px]"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            className="w-[85%] bg-inherit text-white opacity-30 text-xs ml-[10px] active:outline-none focus:outline-none pl-[5px]"
            placeholder="Search for biomarkers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredNotifications.map((notification) => {
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
                {getLatestMessage(notification.messages)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ChatHistoryBox;