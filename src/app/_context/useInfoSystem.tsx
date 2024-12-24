"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface IInfoSystemData {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const InfoSystemContext = createContext<IInfoSystemData>({} as IInfoSystemData);

export const InfoSystemProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InfoSystemContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </InfoSystemContext.Provider>
  );
};

export function useInfoSystem(): IInfoSystemData {
  const context = useContext(InfoSystemContext);

  if (Object.keys(context).length <= 0) {
    throw new Error("useInfoSystem must be used within an InfoSystemProvider");
  }

  return context;
}
