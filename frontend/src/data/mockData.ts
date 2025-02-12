// src/data/mockData.ts
import * as am5 from "@amcharts/amcharts5";
import Project from "../models/Project";

export const mockFiles = [
  { filename: "file1.cpp", codeHealth: 9, commits: 20, lineCoverage: 80 },
  { filename: "file2.cpp", codeHealth: 5, commits: 15, lineCoverage: 60 },
  { filename: "file3.cpp", codeHealth: 7, commits: 10, lineCoverage: 90 },
];

export const mockProjets: Project[] = [
  {
    id: "1728710478925",
    repoUrl: "http://localhost:3000/project/1728710478925",
    name: "Small project",
    type: 0,
  },
  {
    id: "1728710481833",
    repoUrl: "http://localhost:3000/project/1728710481833",
    name: "Medium project",
    type: 1,
  },
  {
    id: "1728710484371",
    repoUrl: "http://localhost:3000/project/1728710484371",
    name: "Big project",
    type: 2,
  },
];
