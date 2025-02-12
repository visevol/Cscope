// TypeScript Code
type TypeFile = {
  name: string;
  value: number;
};

type Folder = {
  name: string;
  children: Array<TypeFile | Folder>;
};

// Fonction pour générer des noms de fichiers réalistes
export const generateFileName = (): string => {
  const prefixes = [
    "auth",
    "product",
    "order",
    "user",
    "checkout",
    "cart",
    "wishlist",
    "admin",
    "payment",
    "../api",
    "../utils",
  ];
  const suffixes = [
    "service",
    "controller",
    "model",
    "view",
    "component",
    "test",
    "helper",
    "routes",
    "hooks",
  ];
  const extensions = ["js", "ts", "jsx", "tsx", "json", "scss", "css"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const extension = extensions[Math.floor(Math.random() * extensions.length)];

  return `${prefix}_${suffix}.${extension}`;
};

// Génération de la structure des dossiers et fichiers
export const generateStructureSimple = (
  numFolders: number,
  numFiles: number
): Folder[] => {
  const structure: Folder[] = [];
  let folderCount = 0;
  let fileCount = 0;

  // Fonction pour créer un dossier et ses sous-éléments
  const createFolder = (
    name: string,
    maxFiles: number,
    maxFolders: number
  ): Folder => {
    const folder: Folder = { name, children: [] };

    // Ajouter des fichiers dans le dossier
    const numFilesInFolder = Math.floor(Math.random() * maxFiles) + 1;
    for (let i = 0; i < numFilesInFolder; i++) {
      if (fileCount < numFiles) {
        const file: TypeFile = {
          name: generateFileName(),
          value: Math.floor(Math.random() * 100) + 1,
        };
        folder.children.push(file);
        fileCount++;
      }
    }

    // Ajouter des sous-dossiers dans le dossier
    const numSubfolders =
      maxFolders > 0 ? Math.floor(Math.random() * maxFolders) + 1 : 0;
    for (let i = 0; i < numSubfolders; i++) {
      if (folderCount < numFolders) {
        const subfolderName = `Folder${folderCount}`;
        folderCount++;
        const subfolder = createFolder(
          subfolderName,
          maxFiles - 1,
          maxFolders - 1
        );
        folder.children.push(subfolder);
      }
    }

    return folder;
  };

  // Structure racine
  const root: Folder = { name: "Root", children: [] };
  for (let i = 0; i < numFolders; i++) {
    const folderName = `Folder${i}`;
    folderCount++;
    const folder = createFolder(folderName, 5, 2); // Limite de sous-dossiers et de sous-fichiers
    root.children.push(folder);
  }

  structure.push(root);
  return structure;
};

// Génération des données avec 40 dossiers et 200 fichiers
