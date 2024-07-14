import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    onClickHandler?: () => void;
  }
const ButtonPrimary : React.FC<ButtonProps> = ({ onClickHandler, children,className, ...props }) => {
    return (
      <button
        onClick={onClickHandler}
        
        className={"text-black bg-brand-primary-color font-medium text-sm flex items-center justify-center gap-3  rounded-lg px-5 py-2 disabled:bg-[#999999]  "+ className}
        {...props}
      >
        {children}
      </button>
    );
  };
  const ButtonSecondary : React.FC<ButtonProps> = ({  className , onClickHandler ,children , ...props }) => {
    return (
      <button
      onClick={onClickHandler}
        className={
          "   text-primary-text font-medium rounded-lg text-sm border border-main-border flex items-center justify-center gap-3 bg-black-secondary  px-5 py-2   " +
          className
        }
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export {ButtonPrimary , ButtonSecondary};
  