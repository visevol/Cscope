import React from "react";
import { MemoryRouter, useRoutes } from "react-router-dom";
import routes from "./routes";
import "./assets/styles/_global.scss";
import { DataSettingProvider } from "./provider/DataSettingProvider";

const App: React.FC = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

const AppWrapper: React.FC = () => (
  <MemoryRouter>
    <DataSettingProvider>
      <App />
    </DataSettingProvider>
  </MemoryRouter>
);

export default AppWrapper;
