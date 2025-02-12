import random
import json
import uuid


# Enum pour différencier entre fichiers et dossiers
class TypeFileOrFolder:
    FILE = "File"
    FOLDER = "Folder"


# Listes pour des noms plus réalistes
prefixes = [
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
    "inventory",
    "shipping",
    "analytics",
    "report",
    "config",
    "dashboard",
    "notification",
    "database",
]
suffixes = [
    "service",
    "controller",
    "model",
    "view",
    "component",
    "test",
    "helper",
    "routes",
    "hooks",
    "validator",
    "config",
    "manager",
    "repository",
    "handler",
]
extensions = ["js", "ts", "jsx", "tsx", "json", "scss", "css", "md", "html"]


# Fonction pour générer un nom réaliste
def generate_file_folder_name(is_file=True):
    name = f"{random.choice(prefixes)}_{random.choice(suffixes)}"
    if is_file:
        name += f".{random.choice(extensions)}"
    return name


# Fonction pour générer un identifiant unique
def generate_id():
    return str(uuid.uuid4())


# Fonction pour générer un fichier ou un dossier avec un nom réaliste
def create_file_folder(typeFileOrFolder, parentId=None):
    name = generate_file_folder_name(
        is_file=(typeFileOrFolder == TypeFileOrFolder.FILE)
    )
    codeLines = (
        random.randint(10, 500) if typeFileOrFolder == TypeFileOrFolder.FILE else 0
    )
    codeHealth = random.uniform(0, 100)
    codeThreshold = random.uniform(0, 100)
    lineCoverage = random.uniform(0, 100)
    fileFolderNumber = 1 if typeFileOrFolder == TypeFileOrFolder.FILE else 0

    return {
        "id": generate_id(),
        "parendId": parentId,
        "typeFileOrFolder": typeFileOrFolder,
        "fileFolderNumber": fileFolderNumber,
        "fileFolderName": name,
        "codeLines": codeLines,
        "codeHealh": codeHealth,
        "codeThreshold": codeThreshold,
        "LineCoverage": lineCoverage,
    }


# Fonction récursive pour générer des dossiers et leurs contenus
def generate_structure(num_folders, num_files):
    data = []
    folder_count = 0
    file_count = 0

    # Créer le dossier racine "src"
    src_folder = create_file_folder(TypeFileOrFolder.FOLDER, None)
    src_folder["fileFolderName"] = "src"  # Nommer la racine 'src'
    data.append(src_folder)

    def create_folder(parent_id=None, depth=0):
        nonlocal folder_count, file_count
        folder = create_file_folder(TypeFileOrFolder.FOLDER, parent_id)
        folder_count += 1
        folder_id = folder["id"]

        # Ajouter ce dossier à la liste
        data.append(folder)

        # Ajouter des fichiers au dossier
        num_files_in_folder = random.randint(1, min(5, num_files - file_count))
        for _ in range(num_files_in_folder):
            if file_count < num_files:
                file = create_file_folder(TypeFileOrFolder.FILE, folder_id)
                data.append(file)
                file_count += 1
                # Agréger les valeurs au dossier
                folder["codeLines"] += file["codeLines"]
                folder["fileFolderNumber"] += 1
                folder["codeHealh"] += file["codeHealh"]
                folder["codeThreshold"] += file["codeThreshold"]
                folder["LineCoverage"] += file["LineCoverage"]

        # Ajouter des sous-dossiers
        remaining_folders = num_folders - folder_count
        num_subfolders = (
            random.randint(1, min(3, remaining_folders))
            if depth < 2 and remaining_folders > 0
            else 0
        )
        for _ in range(num_subfolders):
            if folder_count < num_folders:
                subfolder = create_folder(folder_id, depth + 1)
                # Agréger les valeurs du sous-dossier au dossier parent
                folder["codeLines"] += subfolder["codeLines"]
                folder["fileFolderNumber"] += subfolder["fileFolderNumber"]
                folder["codeHealh"] += subfolder["codeHealh"]
                folder["codeThreshold"] += subfolder["codeThreshold"]
                folder["LineCoverage"] += subfolder["LineCoverage"]

        # Calcul des moyennes pour les dossiers
        if folder["fileFolderNumber"] > 0:
            folder["codeHealh"] /= folder["fileFolderNumber"]
            folder["codeThreshold"] /= folder["fileFolderNumber"]
            folder["LineCoverage"] /= folder["fileFolderNumber"]

        return folder

    # Générer la structure des dossiers à partir du dossier "src"
    while folder_count < num_folders:
        create_folder(src_folder["id"])

    return data


# Générer les données de structure
generated_data = generate_structure(20, 200)

# Générer le contenu TypeScript
data_ts_content = f"""import {{ TypeFileOrFolder }} from "./TypeFileOrFolder";

export const fileFolderDatas: FileFolderCommits[] = {json.dumps(generated_data, indent=2)};
"""

# Écriture du fichier TypeScript
file_path = "fileFolderDatas.ts"
with open(file_path, "w") as file:
    file.write(data_ts_content)

print(f"Fichier généré avec succès : {file_path}")
