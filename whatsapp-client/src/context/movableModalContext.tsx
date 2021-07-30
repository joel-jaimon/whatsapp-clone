import { createContext, useState } from "react";

interface MODALPARAMS {
  type: string;
  params: any;
}

export const movalbleModalContext = createContext({
  movableModal: null as MODALPARAMS | null,
  setMovableModal: (x: any) => {},
});

export const MovableModalContextProvider = ({ children }: any) => {
  const [movableModal, setMovableModal] = useState<any>(null);
  return (
    <movalbleModalContext.Provider
      value={{
        movableModal: movableModal,
        setMovableModal: setMovableModal,
      }}
    >
      {children}
    </movalbleModalContext.Provider>
  );
};
