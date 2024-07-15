
import {useSelector} from "react-redux";
import { useState } from "react";
interface ChatBoxProps{
  handleSendMessage: (message:string) => void
}
export const ChatBox : React.FC<ChatBoxProps> = ({handleSendMessage}) => {
  const theme = useSelector((state: any) => state.theme.value.name)
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(message);
      setMessage("");
    }
  };
  return (
    <div className=" w-full">
      <div className="flex my-4">
        <img className={`${theme}-icons-logo`} width={24} alt="" />
        <h2 className="text-primary-text text-14 font-medium">AI-Copilot</h2>
      </div>
      <div className={`${theme}-chatBox-container`}>
        <img className={`${theme}-icons-stars`} alt="" />
        <input
          className={`${theme}-chatBox`}
          type="text"
          placeholder="Enter a prompt here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2 items-center">
          <img className={`${theme}-icons-camera cursor-pointer`} alt="" />
          <img className={`${theme}-icons-microphone cursor-pointer`} alt="" />
        </div>
      </div>
    </div>
  );
};
