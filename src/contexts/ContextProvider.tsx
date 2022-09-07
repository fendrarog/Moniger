import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface StateVariable<T> {
  activeMenu: T;
  setActiveMenu: Dispatch<SetStateAction<T>>;
  isClicked: typeof initialState;
  setIsClicked: Dispatch<SetStateAction<typeof initialState>>;
  handleClick: (clicked: keyof typeof initialState) => void;
  screenSize: number | undefined;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
}

const StateContext = createContext<StateVariable<boolean>>(
  {} as StateVariable<boolean>
);

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

  const handleClick = (clicked: keyof typeof initialState) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
