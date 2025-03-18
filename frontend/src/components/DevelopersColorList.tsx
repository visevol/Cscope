import { ConfigProvider } from 'antd'
import { stringToHexColor } from '../utils/stringToHexColor'

const DeveloperColorList = ({ developers, showDevs, onChange }: { developers: string[], showDevs: boolean,  onChange: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            paddingXXS: 18
          }
        }
      }}
    >
      <div className="date-file-input" style={{ marginTop: 20 }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={showDevs}
              onChange={() => onChange(prev => !prev)}
            />
            Show developers
          </label>

          {developers.length > 0 ? (
            <ul style={{ display: showDevs ? 'block' : 'none' }}>
              {developers.map( ( dev, index ) => (
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
}

export default DeveloperColorList;
