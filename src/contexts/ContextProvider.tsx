import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface StateVariable {
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  isClicked: typeof initialState;
  setIsClicked: Dispatch<SetStateAction<typeof initialState>>;
  handleClick: (clicked: keyof typeof initialState) => void;
  handleCloseClick: () => void;
  screenSize: number | undefined;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
  currentColor: string;
  setColor: (color: string) => void;
  currentMode: string;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  themeSettings: boolean;
  setThemeSettings: Dispatch<SetStateAction<boolean>>;
}

const StateContext = createContext<StateVariable>({} as StateVariable);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

interface ContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("colorMode") || "#03C9D7"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("themeMode") || "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);

    localStorage.setItem("themeMode", e.target.value);

    setThemeSettings(false);
  };
  const setColor = (color: string) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);

    setThemeSettings(false);
  };

  const handleClick = (clicked: keyof typeof initialState) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const handleCloseClick = () => {
    setIsClicked({ ...initialState });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        handleCloseClick,
        screenSize,
        setScreenSize,
        currentColor,
        setColor,
        currentMode,
        setMode,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
