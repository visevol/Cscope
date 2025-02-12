import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../assets/styles/mainLayout.scss";
import { HomeFilled, ReloadOutlined } from "@ant-design/icons";
import { useDataSettingContext } from "../context/DataSettingContext";
import { syncRepositoryById } from "../api";

const MainLayout: React.FC = () => {
  const { repository, setRepository } = useDataSettingContext();
  const handleReloadEvent = () => {
    const fetchData = async () => {
      if (repository) {
        const repo = await syncRepositoryById(repository.id);
        setRepository(repo);
      }
    };

    fetchData();
  };

  return (
    <div className="back-svg-forme">
      <div className="main-layout">
        <header className="mb-4">
          <div className="container">
            <div className="row mb-3">
              <div className="col h1 d-flex flex-row justify-content-between mb-0">
                <div className="text-primary fs-1 fw-normal" style={{ letterSpacing: "0.2rem" }}>
                  <span className="me-2">Visualisation</span>
                  <a href={"https://github.com/" + repository?.path} target="_blank" rel="noopener noreferrer">
                    {repository?.name}
                  </a>
                </div>
                <div className="d-flex flex-row">
                  <div onClick={handleReloadEvent} className="icon-button">
                    <ReloadOutlined className="text-primary" />
                  </div>
                  <NavLink to="/" className="icon-button ms-3">
                    <HomeFilled />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <nav>
                  <NavLink to="change-volume">Change volume</NavLink>
                  <NavLink to="history-file">File history</NavLink>
                  <NavLink to="developers-input">Developer's input</NavLink>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
