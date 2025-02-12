import { DataSettingContext } from "../context/DataSettingContext";
import React, { useState, ReactNode, useEffect } from "react";
import dayjs from "dayjs";
import { getFilesRepository, getRepositoryById } from "../api";
import Repository from "../models/repository";

export const DataSettingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [repositoryId, setRepositoryId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [filePath, setFilePath] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (repositoryId) {
        if (repository) {
          const data = await getFilesRepository(Number(repository.id));
          setFiles(["", ...data]);
        } else {
          const repository = await getRepositoryById(Number(repositoryId));
          setRepository(repository);
        }
      }
    };

    fetchData();
  }, [repository, repositoryId]);

  return (
    <DataSettingContext.Provider
      value={{
        repository,
        setRepository,
        repositoryId,
        setRepositoryId,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filePath,
        setFilePath,
        files,
        setFiles,
      }}
    >
      {children}
    </DataSettingContext.Provider>
  );
};
