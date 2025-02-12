import { ConfigProvider, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const KeywordFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [size, setSize] = useState<SizeType>("middle");

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            paddingXXS: 18,
          },
        },
      }}
    >
      <div className="date-file-input" style={{ marginBottom: 20 }}>
        <div>
          <label>Filter by path : </label>
          <Input
            size={size}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter keyword to filter files"
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default KeywordFilter;
