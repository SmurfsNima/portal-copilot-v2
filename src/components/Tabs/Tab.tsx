interface TabProps {
  text: string;
  icon?: boolean;
  number?: number;
  active: string;
  isVisible?:boolean;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isFirst?: boolean;
  isLast?: boolean;
  theme: string;
  handleClick: () => void;
}
export const Tab = ({
  text,
  active,
  icon,
  setActive,
  number,
  isFirst,
  isVisible,
  isLast,
  theme,
  handleClick,
}: TabProps) => {
  return (
    <div
      data-active={active === text}
      data-islast={isLast}
      data-isfirst={isFirst}
      className={`${theme}-tab ${isVisible == false &&'invisible'}`}
      onClick={() => {
        setActive(text);
        handleClick();
      }}
    >
      <img
        data-active={active === text}
        className={`${theme}-icons-${text.replace(/\s+/g, '')} ${
          !icon && "hidden"
        } w-[16px] h-[16px]`}
        alt=""
      />
   
        {text}
      <div
        className={`${!number && "hidden"} ${
          active === text ? "bg-black-background" : "bg-main-border "
        } rounded-xl px-3 py-2 text-primary-text  text-xs`}
      >
        {number}
      </div>
    </div>
  );
};
