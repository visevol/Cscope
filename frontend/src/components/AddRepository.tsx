import React, { useEffect, useState } from "react";
import "assets/styles/addRepository.scss";
import { Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import {
  createRepositoryByUrl,
  getRepositoryById,
  searchRepositoryByUrl,
} from "api";
import { useDataSettingContext } from "context/DataSettingContext";

const AddRepository: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [loadRepository, setLoadRepository] = useState<boolean>(false);
  const { setRepository, setRepositoryId } = useDataSettingContext();
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
            console.log(repo);
            if (repo.last_synced_at) {
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
    try {
      const result = await searchRepositoryByUrl(url);

      if (result.repository) {
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
      alert(`repository: ${url} does not exists.`);
    }
  };

  return (
    <div className="cscope">
      <h1 className="cscope__title">CScope</h1>
      <p className="cscope__subtitle">Insert repository URL</p>
      <div className="cscope__search">
        {!loadRepository ? (
          <Input
            className="cscope__input"
            value={url}
            placeholder="Insert URL and press enter"
            onPressEnter={handleEnterPress}
            onChange={(e) => setUrl(e.target.value)}
          />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};

export default AddRepository;
