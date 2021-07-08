import { createContext, useState } from "react";

export const dropDownContext = createContext({
  dropMenu: false,
  setDropMenu: (x: any) => {},
});

export const DropDownContextProvider = ({ children }: any) => {
  const [dropMenu, setDropMenu] = useState<boolean | any>(false);
  return (
    <dropDownContext.Provider
      value={{
        dropMenu: dropMenu,
        setDropMenu: setDropMenu,
      }}
    >
      {children}
    </dropDownContext.Provider>
  );
};
