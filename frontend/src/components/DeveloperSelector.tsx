import { ConfigProvider, Select } from 'antd';
import React from 'react';

const DeveloperSelector = ({
  developer,
  setDeveloper,
  developers,
}: {
  developer: string;
  setDeveloper: React.Dispatch<React.SetStateAction<string>>;
  developers: string[];
}) => {
  const handleChangeDev = (value: string) => {
    setDeveloper(value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {

          },
        },
      }}
    >
      <div className="date-file-input" style={{ marginTop: 20 }}>
        <div>
          <label>Choose developer: </label>
          <Select
            showSearch
            placeholder="Search by developer"
            optionFilterProp="label"
            value={developer}
            filterSort={(optionA, optionB) =>
              optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
            }
            options={developers.map((developerName) => ({
              value: developerName,
              label: developerName,
            }))}
            onChange={handleChangeDev}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeveloperSelector;
