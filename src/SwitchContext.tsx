import { createContext, useState } from "react";

export const SwitchContext = createContext({});

export const SwitchProvider = (props) => {
  const { children } = props;
  const [switchInfo, setSwitchInfo] = useState({ isActive: false });

  return (
    <SwitchContext.Provider value={{ switchInfo, setSwitchInfo }}>
      {children}
    </SwitchContext.Provider>
  );
};
