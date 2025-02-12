import Repository from "../models/repository";
import { createContext, useContext } from "react";

interface DataSettingContextType {
  repository: Repository | null;
  setRepository: (Repo: Repository) => void;
  repositoryId: number | null;
  setRepositoryId: (id: number) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  filePath: string;
  setFilePath: (name: string) => void;
  files: string[];
  setFiles: (files: string[]) => void;
}

export const DataSettingContext = createContext<
  DataSettingContextType | undefined
>(undefined);

export const useDataSettingContext = (): DataSettingContextType => {
  const context = useContext(DataSettingContext);
  if (!context) {
    throw new Error(
      "useDateFileContext must be used within a DateFileProvider"
    );
  }
  return context;
};
