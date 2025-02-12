import { ConfigProvider, Slider } from "antd";
import { SliderFilterCodeLine } from "../models/SliderFilterCodeLine";
import { useEffect, useState } from "react";

const colorRanges = [
  { threshold: -50, color: "#e45b3f" }, // Rouge grisé
  { threshold: 0, color: "#f4ca3b" }, // Jaune orange
  { threshold: 50, color: "#e2e43f" }, // Jaune vert
  { threshold: 100, color: "#64f07d" }, // Vert pale
];

// Fonction pour obtenir la couleur basée sur la valeur
function getSliderColor(value: number): string {
  const range = colorRanges.find((range) => value <= range.threshold);
  return range ? range.color : "#64f07d"; // Vert pale par défaut
}

const codeColorAddLines = "#64f07d";
const codeColorDeleteLines = "#f4ca3b";

const SliderFilterMetrix = ({
  filterAddLineMetrics,
  setFilterAddLineMetrics,
  filterDeleteLineMetrics,
  setFilterDeleteLineMetrics,
}: {
  filterAddLineMetrics: SliderFilterCodeLine;
  setFilterAddLineMetrics: React.Dispatch<
    React.SetStateAction<SliderFilterCodeLine>
  >;
  filterDeleteLineMetrics: SliderFilterCodeLine;
  setFilterDeleteLineMetrics: React.Dispatch<
    React.SetStateAction<SliderFilterCodeLine>
  >;
}) => {
  const [filterAddLinePanelMetrics, setFilterAddLinePanelMetrics] = useState<{
    codeLines: number;
  }>({ ...filterAddLineMetrics });

  const [filterDeleteLinePanelMetrics, setFilterDeleteLinePanelMetrics] =
    useState<{
      codeLines: number;
    }>({ ...filterDeleteLineMetrics });

  useEffect(() => {
    setFilterAddLinePanelMetrics({ ...filterAddLineMetrics });
  }, [filterAddLineMetrics]);

  useEffect(() => {
    setFilterDeleteLinePanelMetrics({ ...filterDeleteLineMetrics });
  }, [filterDeleteLineMetrics]);

  return (
    <div>
      <div className="slider-container">
        <label>Filter by lines added (More than)</label>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                trackBg: codeColorAddLines,
                trackHoverBg: codeColorAddLines,
                handleColor: codeColorAddLines,
                handleActiveColor: codeColorAddLines,
                handleActiveOutlineColor: codeColorAddLines,
                dotActiveBorderColor: codeColorAddLines,
                colorPrimaryBorderHover: codeColorAddLines,
              },
            },
          }}
        >
          <Slider
            min={0}
            max={filterAddLineMetrics.maxCodeLine}
            value={filterAddLinePanelMetrics.codeLines}
            onChange={(value) => {
              setFilterAddLinePanelMetrics({
                ...filterAddLinePanelMetrics,
                codeLines: value,
              });
            }}
            onChangeComplete={(value) => {
              setFilterAddLineMetrics({
                ...filterAddLineMetrics,
                codeLines: value,
              });
            }}
          />
        </ConfigProvider>

        <label>Filter by lines removed (More than)</label>
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                trackBg: codeColorDeleteLines,
                trackHoverBg: codeColorDeleteLines,
                handleColor: codeColorDeleteLines,
                handleActiveColor: codeColorDeleteLines,
                handleActiveOutlineColor: codeColorDeleteLines,
                dotActiveBorderColor: codeColorDeleteLines,
                colorPrimaryBorderHover: codeColorDeleteLines,
              },
            },
          }}
        >
          <Slider
            min={0}
            max={filterDeleteLineMetrics.maxCodeLine}
            value={filterDeleteLinePanelMetrics.codeLines}
            onChange={(value) => {
              setFilterDeleteLinePanelMetrics({
                ...filterDeleteLinePanelMetrics,
                codeLines: value,
              });
            }}
            onChangeComplete={(value) => {
              setFilterDeleteLineMetrics({
                ...filterDeleteLineMetrics,
                codeLines: value,
              });
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SliderFilterMetrix;
