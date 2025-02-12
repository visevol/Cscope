import React from "react";
import { useDataSettingContext } from "../context/DataSettingContext";
import { ConfigProvider, DatePicker, DatePickerProps, Select } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const DateAndFileInput: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filePath,
    setFilePath,
    files,
  } = useDataSettingContext();

  const onDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    }
  };

  const handleChangeFile = (value: string) => {
    setFilePath(value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {},
        },
      }}
    >
      <div className="date-file-input">
        <div>
          <label>Choose file : </label>
          <Select
            showSearch
            placeholder="Search by filename"
            optionFilterProp="label"
            value={filePath}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={files.map((f: string) => {
              return { value: f, label: f };
            })}
            onChange={handleChangeFile}
          />
        </div>
        <div>
          <div>
            <label>Start date : </label>
          </div>
          <div>
            <label>End date : </label>
          </div>
        </div>
        <div>
          <RangePicker
            className="w-100"
            value={[dayjs(startDate), dayjs(endDate)]}
            onChange={onDateChange}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DateAndFileInput;
