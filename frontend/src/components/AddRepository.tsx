import React, { useEffect, useState } from "react";
import "assets/styles/addRepository.scss";
import { Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { createRepositoryByUrl, getFileTree, searchRepositoryByUrl } from "api";
import { useDataSettingContext } from "context/DataSettingContext";

const AddRepository: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [loadRepository, setLoadRepository] = useState<boolean>(false);
  const { setRepository } = useDataSettingContext();
  const navigate = useNavigate();

  useEffect(() => {
    //Implementing the setInterval method
    if (loadRepository) {
      let interval: any;

      const fetchData = async () => {
        const data = await createRepositoryByUrl(url);

        let checkRepository: any;
        interval = setInterval(async () => {
          try {
            checkRepository = await getFileTree(data.id); // FAKE REQUEST JUST TO TEST
            setLoadRepository(false);
            setRepository(data);
            return navigate(`/repository/change-volume`);
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
        return navigate(`/repository/change-volume`);
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
