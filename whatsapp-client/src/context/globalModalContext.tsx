import { createContext, useState } from "react";

export const globalModalContext = createContext({
  modal: null,
  setModal: (x: any) => {},
});

export const GlobalModalProvider = ({ children }: any) => {
  const [modal, setModal] = useState(null);
  return (
    <globalModalContext.Provider
      value={{
        modal: modal,
        setModal: setModal,
      }}
    >
      {children}
    </globalModalContext.Provider>
  );
};
