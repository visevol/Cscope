import React, { useEffect, useState } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "../assets/styles/changeVolume.scss";
import DateAndFileInput from "../components/DateAndFileInput";
import BuddleGraphMetrics from "../components/BubbleGraphMetrix";
import { MetricsProps } from "../models/MetricsProps";
import SliderFilterMetrix from "../components/SliderFilterMetrix";
import { FileFolderCommits } from "../models/FileFolderCommits";
import BubbleGraphDisplay from "../components/BubbleGraphDisplay";
import { useParams } from "react-router-dom";
import { getFileData, getFileOverTime } from "../api";
import { SliderFilterCodeLine } from "../models/SliderFilterCodeLine";
import { Spin } from "antd";
import { getFileName } from "../utils/tooltipHelper";

const ChangeVolumePage: React.FC = () => {
  const {
    repository,
    repositoryId,
    setRepositoryId,
    startDate,
    endDate,
    filePath,
  } = useDataSettingContext();
  const [filterAddLineMetrics, setFilterAddLineMetrics] =
    useState<SliderFilterCodeLine>({
      codeLines: 0,
      maxCodeLine: 1000,
    });

  const [filterDeleteLineMetrics, setFilterDeleteLineMetrics] =
    useState<SliderFilterCodeLine>({
      codeLines: 0,
      maxCodeLine: 1000,
    });
  const [fileFolderDatas, setFileFolderDatas] = useState<FileFolderCommits[]>(
    []
  );
  const [ready, setReady] = useState<boolean>(false);

  const [bubbleMetrix, setBubbleMetrix] = useState<MetricsProps>({
    file: "No file",
    commitCount: 0,
    codeSize: 0,
    mainAuthor: "No author",
    modifiedDate: "No date",
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!repositoryId) {
      setRepositoryId(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (repository) {
      const fetchData = async () => {
        const data: FileFolderCommits[] = await getFileOverTime(
          repository.id,
          startDate,
          endDate
        );
        const maxAdditionsLines = Math.max(
          ...data.map((item) => item.total_additions)
        );
        const maxDeletionsLines = Math.max(
          ...data.map((item) => item.total_deletions)
        );
        setFilterAddLineMetrics({
          codeLines: 0,
          maxCodeLine: maxAdditionsLines,
        });
        setFilterDeleteLineMetrics({
          codeLines: 0,
          maxCodeLine: maxDeletionsLines,
        });

        const newPathFilterData = data.filter((item: FileFolderCommits) => {
          return filePath === "" || item.path === filePath;
        });

        if (data && data.length > 0) {
          let path = "";
          if (filePath === "") {
            const maxItem = data.reduce((max, item) =>
              item.total_modifications > max.total_modifications ? item : max
            );
            path = maxItem.path;
          } else {
            path = filePath;
          }

          if (path != "") {
            try {
              const fileData = await getFileData(repository.id, path);
              const date = new Date(fileData.last_modification_date);
              const formattedDate = date.toLocaleDateString("en-EN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              setBubbleMetrix({
                file: getFileName(path),
                commitCount: fileData.commits_count,
                codeSize: fileData.line_count,
                mainAuthor: fileData.main_contributor.author,
                modifiedDate: formattedDate,
              });
            } catch (error) { }
          }
        }

        setFileFolderDatas(newPathFilterData);
        setReady(true);
      };
      setReady(false);
      fetchData();
    }
  }, [repository, startDate, endDate, filePath]);

  return (
    <div className="container">
      <div className="row g-4">
        <div className="page col-12 col-lg-8">
          {ready ? (
            <BubbleGraphDisplay
              filterAddLineMetrics={filterAddLineMetrics}
              filterDeleteLineMetrics={filterDeleteLineMetrics}
              fileFolderDatas={fileFolderDatas}
              setBubbleMetrix={setBubbleMetrix}
            />
          ) : (
            <Spin size="large" />
          )}
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column">
            <DateAndFileInput />
            <SliderFilterMetrix
              filterAddLineMetrics={filterAddLineMetrics}
              setFilterAddLineMetrics={setFilterAddLineMetrics}
              filterDeleteLineMetrics={filterDeleteLineMetrics}
              setFilterDeleteLineMetrics={setFilterDeleteLineMetrics}
            />
            <BuddleGraphMetrics metricsProps={bubbleMetrix} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeVolumePage;
