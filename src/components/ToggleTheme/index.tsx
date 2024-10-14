import { AppContext } from '@/store/app';
import { useState, useEffect, useContext } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  const appcontext = useContext(AppContext)
  useEffect(() => {
    // Check the user's saved preference
    const savedTheme = localStorage.getItem('theme-base');
    if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    //   document.documentElement.classList.add(savedTheme === 'dark' ? 'dark' : '');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme-base', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      appcontext.setThemeIsLight(false)
    } else {
      document.documentElement.classList.remove('dark');
      appcontext.setThemeIsLight(true)
    }
  };

  return (
    <div className='flex justify-end items-center gap-2'>
      <img className='invert dark:invert-0' src="./Themes/Aurora/icons/sun.svg" alt="" />
      <div>
        {theme == 'light' ? 
        <><div className='text-[14px] text-light-secandary-text'>Dark Mode</div></>
      :
        <><div className='text-[14px] text-[#FFFFFFDE]'>Light Mode</div></>
        }
      </div>
      <div onClick={() => {
        toggleTheme()
      }} className={`w-[40px] relative h-4 ${theme =='light'?' bg-light-blue-active':'bg-[#383838] '} rounded-[16px] cursor-pointer`}>
        <div className={`absolute  w-[24px] h-[24px] ${theme =='light'?'right-0 bg-white border border-light-blue-active':'left-0 bg-[#F5F7FA]'} rounded-full top-[-4px]`}></div>
      </div>
    </div>
    // <button
    //   onClick={toggleTheme}
    //   className="p-2 text-[10px] rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
    // >
    //   {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    // </button>
  );
};

export default ThemeToggle;