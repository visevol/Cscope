import { ConfigProvider } from 'antd';
import { stringToHexColor } from '../utils/stringToHexColor';

const DeveloperColorList = ({ developers, showDevs }: { developers: string[], showDevs: boolean }) => {
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
            Developers : 
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
                      borderRadius: "50%"
                    }}
                  ></div>
                  <span  style={{color : "#2d3142", fontWeight: "bold"}}>{dev} - {stringToHexColor( dev )}</span>
                </li>
              ) )}
            </ul>
          ) : (
            <p style={{color : "#2d3142"}}>No colors available.</p>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeveloperColorList;
