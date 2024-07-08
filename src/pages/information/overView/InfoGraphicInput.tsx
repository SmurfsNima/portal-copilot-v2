/* eslint-disable @typescript-eslint/no-explicit-any */
import stars from "/Themes/Aurora/icons/stars.svg";
import logo from "/Themes/Aurora/icons/input-logo.svg";
import camera from "/Themes/Aurora/icons/camera.svg";
import microphone from "/Themes/Aurora/icons/input-microphone.svg";
import {useSelector} from "react-redux";
import { useState } from "react";
interface InfoGraphicInputProps{
  handleSendMessage: (message:string) => void
}
export const InfoGraphicInput : React.FC<InfoGraphicInputProps> = ({handleSendMessage}) => {
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
    <div className="flex fixed bottom-4 flex-col gap-1">
      <div className="flex gap-1">
        <img src={logo} width={24} alt="" />
        <h2 className="text-primary-text text-14 font-medium">AI-Copilot</h2>
      </div>
      <div className={`${theme}-graphicinfo-input-container`}>
        <img width={24} src={stars} alt="" />
        <input
          className={`${theme}-graphicinfo-input`}
          type="text"
          placeholder="Enter a prompt here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2 items-center">
          <img className="cursor-pointer" src={camera} alt="" />
          <img className="cursor-pointer" src={microphone} alt="" />
        </div>
      </div>
    </div>
  );
};
