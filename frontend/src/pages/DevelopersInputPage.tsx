import React, { useEffect } from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "../assets/styles/developersInput.scss";
import DateAndFileInput from "../components/DateAndFileInput";
import { useParams } from "react-router-dom";

const DevelopersInputPage: React.FC = () => {
  const { repositoryId, setRepositoryId } = useDataSettingContext();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!repositoryId) {
      setRepositoryId(Number(id));
    }
  }, [id]);

  return (
    <div className="container">
      <div className="row g-4">
        <div className="page col-12 col-lg-8">
          <div className="visualization-placeholder">[Coming soon...]</div>
        </div>
        <div className="col-12 col-lg-4">
          <DateAndFileInput />
        </div>
      </div>
    </div>
  );
};

export default DevelopersInputPage;
