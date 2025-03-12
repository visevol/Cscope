import { Checkbox, ConfigProvider, Select } from 'antd'
import { categoryToEvolutionType, typeEvolutionOptions } from '../utils/tooltipHelper'
import { stringToHexColor } from '../utils/stringToHexColor'


const DeveloperColorList = ({developers}:{developers: string[]}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            paddingXXS: 18,
          },
        },
      }}
    >
      <div className="date-file-input" style={{ marginTop: 20 }}>
        <div>
          <label>Developers color legend</label>
          {developers.length > 0 ? (
            <ul>
              {developers.map((dev, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: stringToHexColor( dev ),
                      borderRadius: "4px",
                      border: "1px solid #000"
                    }}
                  ></div>
                  <span>{dev} - {stringToHexColor( dev )}</span>
                </li>
              ) )}
            </ul>
          ) : (
            <p>No colors available.</p>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeveloperColorList;