import React from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import "assets/styles/evolutionFileCommit.scss";
import DateAndFileInput from "components/DateAndFileInput";
import MotionChartDisplay from "components/MotionChartDisplay";

const EvolutionFileCommitPage: React.FC = () => {
  const { startDate, endDate, fileName } = useDataSettingContext();

  return (
    <div className="two-side-structure">
      <div className="page">
        <div className="visualization-placeholder">
          <MotionChartDisplay />
        </div>
      </div>
      <DateAndFileInput />
    </div>
  );
};

export default EvolutionFileCommitPage;
