import React, { useEffect, useState } from "react";
import "../assets/styles/addRepository.scss";
import { Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  createRepositoryByUrl,
  getRepositoryById,
  searchRepositoryByUrl,
} from "../api";
import { useDataSettingContext } from "../context/DataSettingContext";
import { useGithub } from "../hooks/github";

const AddRepository: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [loadRepository, setLoadRepository] = useState<boolean>(false);
  const {
    setRepository,
    setRepositoryId,
    setFilePath,
    setStartDate,
    setEndDate,
  } = useDataSettingContext();
  const navigate = useNavigate();

  useEffect(() => {
    //Implementing the setInterval method
    if (loadRepository) {
      let interval: any;

      const fetchData = async () => {
        const data = await createRepositoryByUrl(url);

        interval = setInterval(async () => {
          try {
            const repo = await getRepositoryById(data.id);
            if (repo.last_synced_at) {
              setStartDate(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
              setEndDate(dayjs().format("YYYY-MM-DD"));
              setFilePath("");
              setRepository(data);
              setRepositoryId(data.id);
              setLoadRepository(false);
              return navigate(`/repository/${data.id}/change-volume`);
            }
          } catch (error) {}
        }, 1000);
      };

      fetchData();
      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [loadRepository]);

  const handleEnterPress = async () => {
    analyseRepository(url);
  };

  const analyseRepository = async (url: string) => {
    try {
      const result = await searchRepositoryByUrl(url);
      if (result.repository) {
        setStartDate(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
        setEndDate(dayjs().format("YYYY-MM-DD"));
        setFilePath("");
        setRepository(result.repository);
        setRepositoryId(result.repository.id);
        return navigate(`/repository/${result.repository.id}/change-volume`);
      }

      if (result.remoteRepository) {
        setLoadRepository(true);
      } else {
        alert(`repository: ${url} does not exists.`);
      }
    } catch (error) {
      console.error(error);
      alert(`repository: ${url} does not exists.`);
    }
  };

  const repoUrl = useGithub();
  useEffect(() => {
    if (repoUrl) {
      setUrl(repoUrl);
    }
  }, [repoUrl]);

  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      {!repoUrl && <p className="cscope__subtitle">Insert repository URL</p>}
      <div className="cscope__search">
        {!loadRepository ? (
          <div>
            {!repoUrl ? (
              <>
                <Input
                  className="cscope__input"
                  value={url}
                  placeholder="Insert URL and press enter"
                  onPressEnter={handleEnterPress}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  className="cscope__button"
                  type="button"
                  onClick={handleEnterPress}
                >
                  Confirm
                </button>
              </>
            ) : (
              <button
                className="cscope__button"
                type="button"
                onClick={handleEnterPress}
              >
                Analyze
              </button>
            )}
          </div>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};

export default AddRepository;
