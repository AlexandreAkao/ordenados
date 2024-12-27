"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useInterval from "@/app/_hooks/useTimeout";
import { updatePlayerLastActive } from "@/app/repositories/playerRepository";

interface IInfoSystemData {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

type InfoSystemProviderProps = {
  children: ReactNode;
  token: string;
};

const InfoSystemContext = createContext<IInfoSystemData>({} as IInfoSystemData);

export const InfoSystemProvider = ({
  children,
  token,
}: InfoSystemProviderProps) => {
  const ONE_MINUTE = 1000 * 60;
  const [isLoading, setIsLoading] = useState(true);
  const { clear } = useInterval(() => {
    updatePlayerLastActive(new Date(), token);
  }, ONE_MINUTE);
  useEffect(() => {
    return clear;
  }, [clear]);

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
