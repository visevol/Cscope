import { MetricsProps } from "../models/MetricsProps";

const BuddleGraphMetrics = ({
  metricsProps,
}: {
  metricsProps: MetricsProps;
}) => {
  return (
    <div className="metrics">
      <div className="metrics__header">Metrics : {metricsProps.file}</div>
      <div className="metrics__item">
        <span>Commit</span>
        <span>{metricsProps.commitCount} commits</span>
      </div>
      <div className="metrics__item">
        <span>Size</span>
        <span>{metricsProps.codeSize} Lines of Code</span>
      </div>
      <div className="metrics__item">
        <span>Main Author</span>
        <span>{metricsProps.mainAuthor}</span>
      </div>
      <div className="metrics__item">
        <span>Modified</span>
        <span>{metricsProps.modifiedDate}</span>
      </div>
    </div>
  );
};

export default BuddleGraphMetrics;
