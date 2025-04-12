# Interface utilisateur
## Utilisation de l'extension

Pour commencer à utiliser l'exension et voir les données des commits, il suffit de naviguer vers un dépôt de code public sur *GitHub*, par exemple https://github.com/visevol/Cscope, et appuyer sur le bouton **Analyze** qu ise trouve au bas de la page.

## Onglets de fonctionnalités
Voici le fonctionnement des 3 principaux onglets:
### Onglet Change volume
Permet de visualiser la volatilité des fichiers du projet.
En effet, plus le cercle représentant le fichier est gros, plus le nombre de modifications sur le fichier (en nombre de lignes) est élevé.
La couleur des cercles indique si les modifications sont majoritairement des lignes ajoutées ou des lignes retirées.
Une section dans le coin inférieur droit montre des données quant au nombre de commits qui ont affecté le fichier, la dernière date de modification et l'auteur principal.

### Onglet File history
Permet de visualiser, dans un graphique, le type des modifications selon le temps.
La dimension X représente la date du commit, tandis que la dimension Y représente le numéro d'identification du fichier modifié.
La couleur des points dans le graphique représente le type du changement:
- **Bleu** pour un ajout de fichier
- **Jaune** pour une modification de fichier
- **Rouge** pour une suppression de fichier.

### Onglet Developer's input
Permet de visualiser, dans un graphique, le l'auteur des modifications selon le temps.
La dimension X représente la date du commit, tandis que la dimension Y représente le numéro d'identification du fichier modifié.
La couleur des points dans le graphique représente le développeur associé à la modification.
Une légende est disponible dans le coin inférieur droit. Si plus de 10 développeurs sont affichés dans le tableau, les 9 ayant le plus de modifications seront affichés et le reste sera regroupé sous *Autre*.

## Filtres disponibles
Certains filtres reviennent dans plus d'un onglet, voici leur utilité:
### Filtre de sélection de fichier
Permet d'utiliser une liste déroulante pour choisir un fichier spécifique à analyser.
Le premier object sélectionnable permet d'annuler la sélection pour voir tous les fichiers confondus.
### Filtre de date
Permet de sélectionner la période à afficher pour l'analyse.
Les 2 éléments représentent la date de début et la date de fin.
On peut par exemple choisir les dates entre 2 versions du logiciel pour visualiser le *changelog*.
### Filtre des lignes ajoutées et supprimées
Permet de montrer seulement les fichiers ayant eu plus de X modifications du type choisi, soit en ajout ou en suppression de lignes.
Ce filtre pourrait par exemple servir à voir un fichier ayant eu beaucoup d'ajouts dans une certaine période.
### Filtre du chemin du fichier
Permet de filtrer selon des mots qui seraient présents dans le chemin du fichier, un peu comme une expression régulière.
On pourrait par exemple s'en servir avec le mot *test* pour voir les fichiers comprenant ce mot dans leur nom ou dans un dossier de tests.
### Filtre du type de fichier
Permet de choisir le type de fichier dans une liste déroulante.
Il existe plusieurs types, par exemple pour des langages de programmation ou des fichiers de configuration.
### Filtre du type de modification
Permet de cocher pour voir un ou plusieurs éléments parmis:
- Les fichiers ajoutés
- Les fichiers modifiés
- Les fichiers supprimés