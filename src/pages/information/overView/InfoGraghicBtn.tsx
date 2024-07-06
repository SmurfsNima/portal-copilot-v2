/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import arrowUp from "/public/Themes/Aurora/icons/chevron-up.svg";
import arrowDown from "/public/Themes/Aurora/icons/chevron-down.svg";
import check from '/Themes/Aurora/icons/check.svg'
import calender from '/Themes/Aurora/icons/calender.svg'
import { appointments } from "./Data";

interface InfoGraphicBtnProps {
  text: string;
  number?: number;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export const InfoGraghicBtn = ({
  text,
  number,
  active,
  setActive,
}: InfoGraphicBtnProps) => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [height, setHeight] = useState<number | undefined>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (active === text) {
      setHeight(contentRef.current?.scrollHeight || 0);
      setTimeout(() => {
        setActive("");
      }, 10);
    } else {
      setActive(text);
      setHeight(contentRef.current?.scrollHeight || 0);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      if (active === text) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setTimeout(() => {
          setHeight(0);
        }, 10);
      }
    }
  }, [active, text]);

  const handleTransitionEnd = () => {
    if (active === text) {
      setHeight(undefined);
    }
  };

  return (
    <>
      <div data-isactive={active===text} onClick={handleClick} className={`${theme}-graphicinfo-btn-container`}>
        <div className="flex items-center gap-1">
          <h2 className={`${theme}-graphicinfo-btn-text`}>{text}</h2>
          <span className={`${theme}-graphicinfo-btn-number ${!number && "hidden"}`}>
            ({number})
          </span>
        </div>
        <img src={active === text ? arrowUp : arrowDown} alt="" />
      </div>
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-height duration-500 ease-in-out"
        onTransitionEnd={handleTransitionEnd}
      >
          <div className={`${theme}-graphicinfo-btn-list-container`}>
            {appointments.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="relative">
                  <img width={32} className='object-contain' src={item.isDone ? check : calender} alt="" />
                  <div className="h-[42px] w-[1px]  bg-main-border absolute top-9  left-[14px]" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`${theme}-graphicinfo-btn-text`}>{item.date}</h2>
                    <p className="text-[10px] font-normal text-third-text">{item.time}</p>
                  </div>
                  <h2 className="text-secondary-text text-xs">{item.doctor}</h2>
                  <a className="underline text-primary-color cursor-pointer text-xs">{item.details}</a>
                </div>
              </div>
            ))}
          </div>
      </div>
      </>
  );
};