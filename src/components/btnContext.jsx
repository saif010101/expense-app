import { createContext, use, useContext, useRef } from "react";

const btnContext = createContext();

export const BtnContextProvider = ({ children }) => {
//   const btnRef = useRef(null);
  const refs = {
    btnRef : useRef(null),
    profileRef : useRef(null),
    viewBtnRef : useRef(null)
  }

  return <btnContext.Provider value={refs}>{children}</btnContext.Provider>;
};

export const useBtnRef = () => useContext(btnContext).btnRef;
export const useProfileRef = () => useContext(btnContext).profileRef;
export const useViewBtnRef = () => useContext(btnContext).viewBtnRef;