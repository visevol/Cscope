import * as am5 from "@amcharts/amcharts5";
import { FileFolderCommits } from "../models/FileFolderCommits";
import { GraphNode } from "../models/GraphNode";

// Fonction utilitaire pour déterminer la couleur du nœud
const getNodeColor = (additions: number, deletions: number): am5.Color => {
  const totalChanges = additions - deletions;
  if (totalChanges >= 0) {
    return am5.color("#64f07d"); // vert pour plus d'addition de changements
  } else {
    return am5.color("#f4ca3b"); // jaune orange pour plus de suppression de changements
  }
};

const getFolderColor = (depth: number): am5.Color => {
  // Choix de couleur pour les dossiers en fonction de la profondeur
  const baseGray = 235;
  const grayValue = Math.max(0, baseGray - depth * 10); // Réduction de 10 pour chaque niveau de profondeur
  return am5.color(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
};

// Conversion des données en structure GraphNode
export const convertToGraphData = (
  fileFolderDatas: FileFolderCommits[]
): GraphNode[] => {
  // Création d'une racine "src"
  const rootNode: GraphNode = {
    name: "src",
    path: null,
    children: [],
    nodeSettings: { fill: am5.color("rgb(235, 235, 235)") },
  };

  // Map pour organiser les nœuds par chemin
  const pathMap: Record<string, GraphNode> = {};

  // Ajout des dossiers et fichiers à la structure
  fileFolderDatas.forEach((item) => {
    const parts = item.path.split("/"); // Divise le chemin en segments
    let currentPath = "";
    let currentNode: GraphNode = rootNode;

    parts.forEach((part, index) => {
      currentPath += (index === 0 ? "" : "/") + part;

      // Si le nœud n'existe pas encore, le créer
      if (!pathMap[currentPath]) {
        const isFile = index === parts.length - 1; // Dernier segment = fichier
        const newNode: GraphNode = {
          name: part,
          path: isFile ? currentPath : null,
          children: isFile ? null : [],
          value: isFile ? item.total_modifications : undefined,
          nodeSettings: {
            fill: isFile
              ? getNodeColor(item.total_additions, item.total_deletions)
              : getFolderColor(index + 1),
          },
        };

        // Ajouter le nouveau nœud à la hiérarchie
        if (currentNode.children) {
          currentNode.children.push(newNode);
        }

        // Sauvegarder dans le pathMap pour un accès futur
        pathMap[currentPath] = newNode;
      }

      // Passer au nœud suivant
      currentNode = pathMap[currentPath];
    });
  });

  return [rootNode]; // Retourne le nœud racine
};
