import {
  getTheme,
  themes,
  Themes,
  selectTheme,
  setTheme
} from "../store/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Main() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const Component = getTheme(theme).component;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const switchTheme = (theme: Themes["name"]) => {
    dispatch(setTheme(theme));
  };

  useEffect(() => {
    if (queryParams.get("theme")) {
      const selectedTheme = themes.find(
        (theme) => theme.name === queryParams.get("theme")
      );

      if (selectedTheme) {
        switchTheme(selectedTheme.name);
      }
    }
  }, []);

  return (
    <div className="bg-black-primary w-full  h-screen">
      <Component />
    </div>
  );
}

export default Main;
