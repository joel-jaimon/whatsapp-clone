import { createContext, useState } from "react";

interface MODALPARAMS {
  type: string;
  params: any;
}

export const globalModalContext = createContext({
  modal: null as MODALPARAMS | null,
  setModal: (x: any) => {},
});

export const GlobalModalProvider = ({ children }: any) => {
  const [modal, setModal] = useState<MODALPARAMS | null>(null);
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
