interface TabProps {
  text: string;
  icon? : boolean;
  number?: number,
  active: string;
  
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isFirst?: boolean;
  isLast?: boolean;
  theme:string,
  handleClick : () => void;
}
export const Tab = ({
  text,
  active,
  icon,
  setActive,
  number,
  isFirst,
  isLast,
  theme,
  handleClick
}: TabProps) => {
  return (
   
    <div
      data-active={active === text}
      data-islast={isLast}
      data-isfirst={isFirst}
      className={`${theme}-tab ${text=== "All" ?'px-[60px] xl:px-[85px] 2xl:px-[100px]' : "px-[30px] lg:px-[41px]   xl:px-[38px] min-[1310px]:px-[50px] 2xl:px-[65px]  3xl:px-[91px]"} `}
      onClick={() => {
        setActive(text);
        handleClick();
      }}
    >
    
    
      <img data-active={active === text} className={`${theme}-icons-${text} ${!icon && 'hidden'} w-[16px] h-[16px] xl:w-[24px] xl:h-[24px]`} alt="" />
      <h5 className= {` text-[10px] xl:text-sm font-normal ${active === text ? 'text-black-primary' : 'text-primary-text'}`}>{text}</h5>
      <div className={`${!number && 'hidden' } ${active===text ? 'bg-black-background' : 'bg-main-border '} rounded-xl px-3 py-2 text-primary-text  text-xs`}>{number}</div>
    </div>
    
  );
};
