# Document SRS PFE Hiver 2025
## Auteurs
- Julien Boisvert-Simard - DUFF08079701
- Cédric Audy - AUDC08089302
- Félix Dufresne - DUFF08079701
- Eddy Allard - ALLE75070006
- Ludovick Martin - MARL08069904
- Félix Lavoie - LAVF75030009
- William Nolin - NOLW76060101
- Alexis Castonguay - CASA84020104
### Dans le cadre de 
LOG795 – Projet de fin d’étude 


# Table des matières
1. [Introduction](#introduction)
2. [Description générale](#description_generale)
3. [Cas d'utilisation](#cas_utilisation)
4. [Exigences](#exigences)
5. [Documentation pour l'utilisateur et exigences du système](#documentation)
6. [Contraintes de conception](#contraintes)
7. [Interfaces](#interfaces)
8. [Exigences de licence](#licence)
9. [Remarques légales, de droits d'auteur et diverses](#remarques)
10. [Normes applicables](#normes)
11. [Annexes](#annexes)


## 1. Introduction <a name="introduction"></a>
### 1.1. Objectif de ce document
Ce document a pour but de fournir une spécification des exigences logicielles (SRS) pour le développement d'un outil de visualisation interactive de l’évolution du code des logiciels sur GitHub. Il vise à définir les besoins et les fonctionnalités du projet, à clarifier les attentes des utilisateurs, et à servir de référence pour le développement et la validation du produit.
### 1.2. Portée de ce document
Ce document couvre les fonctionnalités principales du système, les exigences fonctionnelles et non-fonctionnelles, les interfaces utilisateur, ainsi que les contraintes de conception. Il décrit également le contexte et la motivation du projet, l'environnement opérationnel et les utilisateurs cibles. Il inclut une estimation du temps requis.
Ci-dessus, on peut voir comment le système et les entitées externes intéragissent.
![Diagramme de Cas d'Utilisation](out/diagrammes-srs/portee/portee.svg)
### 1.3. Définitions
|Terme|Définition|
|:-:|:-:|
|Développeur |Toute personne contribuant à un projet GitHub.|
|Gestionnaire|Toute personne supervisant le déroulement d'un projet.|
|Commit|Unité de modification enregistrée dans un système de contrôle de versions.|
|GitHub|Plateforme de gestion de versions et de collaboration pour le développement de logiciels.|
|API|Interface de programmation permettant à des applications de communiquer entre elles.|
### 1.4. Aperçu du Projet
Le projet vise à développer un outil permettant de visualiser l’évolution des changements des différents types de fichiers de code au niveau des commits sur [GitHub](https://github.com/). Il identifiera visuellement les fichiers ajoutés, les types de fichiers modifiés, la fréquence des changements, la stabilité des fichiers, et les fichiers modifiés simultanément. L'outil apportera des informations pertinentes pour les gestionnaires de projet et les développeurs afin de comprendre l'historique d'évolution du code.


## 2. Description générale <a name="description_generale"></a>
### 2.1 Contexte et Motivation
Les systèmes de gestion de versions, comme GitHub, sont largement utilisés pour la collaboration dans les projets de développement logiciel. Cependant, malgré leur efficacité pour le contrôle de version et la gestion des branches, ils offrent des fonctionnalités limitées pour la visualisation des changements au fil du temps. Cela pose un défi pour les développeurs et les gestionnaires de projets qui souhaitent analyser les tendances, comprendre l'évolution du code et identifier rapidement les zones de modifications fréquentes ou les contributions clés. Une solution robuste de visualisation des données peut grandement améliorer la compréhension et la gestion du cycle de vie du développement logiciel.
Notre mission consiste donc à développer une solution permettant de collecter et de visualiser les données relatives à l'évolution du code source dans un répertoire Git.
### 2.2 Objectifs du projet
Dans ce projet, nous développerons un outil permettant de visualiser l’évolution des changements de code source au niveau des commits dans les systèmes de contrôle de versions. Notre objectif principal est de fournir aux gestionnaires de projet, aux développeurs et aux clients une compréhension claire et détaillée des modifications du code source au fil du temps.
### 2.3 Méthodologie
Pour atteindre les objectifs de ce projet, nous adopterons une méthodologie agile, ce qui nous permettra d'être flexibles et adaptatifs face aux changements et aux défis rencontrés au cours du développement. Nous utiliserons la méthode Kanban pour gérer et visualiser les tâches à accomplir et nous tiendrons des réunions hebdomadaires pour identifier et résoudre les obstacles. Les échéanciers seront aussi revus chaque semaine afin de les respecter le plus possible et de s’adapter le plus rapidement possible en cas de changement.


## 3. Cas d'utilisation <a name="cas_utilisation"></a>
**Diagramme de Cas d'Utilisation** :
![Diagramme de Cas d'Utilisation](PFE_use_case.svg)
### 3.1. Comprendre l'historique des modifications d'un fichier spécifique
**Description** : Un développeur souhaite comprendre l'historique des modifications d'un fichier spécifique pour identifier les changements effectués, par qui et quand.
**Acteurs** : Développeur
**Préconditions** :
- Le répertoire GitHub est déjà chargé dans l'application.
**Postconditions** :
- Le développeur peut visualiser l'historique des modifications du fichier sélectionné.
**Cas de Variations** :
- Le fichier n'existe pas dans le répertoire.
- Le développeur n'a pas les droits d'accès au répertoire.
### 3.2. Identifier les fichiers les plus modifiés pour évaluer les zones de risque du projet
**Description** : Un gestionnaire de projet souhaite identifier les fichiers les plus modifiés pour évaluer les zones de risque du projet.
**Acteurs** : Gestionnaire de projet
**Préconditions** :
- Le répertoire GitHub est déjà chargé dans l'application.
**Postconditions** :
- Le gestionnaire de projet peut visualiser les fichiers les plus modifiés et évaluer les zones de risque.
**Cas de Variations** :
- Le gestionnaire n'a pas les droits d'accès au répertoire.
- Les données de modification ne sont pas disponibles.
### 3.3. Obtenir une vue d'ensemble des changements apportés à une version du logiciel
**Description** : Un client souhaite obtenir une vue d'ensemble des changements apportés à une version du logiciel pour comprendre les améliorations et les correctifs.
**Acteurs** : Client
**Préconditions** :
- Le répertoire GitHub est déjà chargé dans l'application.
**Postconditions** :
- Le client peut visualiser les changements apportés à une version du logiciel.
**Cas de Variations** :
- Le client n'a pas les droits d'accès au répertoire.
- La version du logiciel n'est pas disponible.


## 4. Exigences <a name="exigences"></a>
### Récits utilisateurs
-- À Faire
### Exigences fonctionnelles
#### Description détaillée des fonctionnalités
1. **Visualisation des commits**
   - Afficher un graphique permettant la visualisation des modifications de fichiers dans un répertoire GitHub public.
   - Permettre de filtrer et de trier les commits par date et type de fichier.
2. **Identification des Types de Modifications**
   - Marquer visuellement les ajouts, suppressions et modifications de fichiers.
   - Afficher des résumés des changements pour chaque commit.
3. **Visualisation des Types de Fichiers Modifiés**
   - Classer les fichiers modifiés par type (code de production, code de test, configuration, documentation).
   - Fournir des graphiques montrant la répartition des types de fichiers modifiés au fil du temps.
4. **Fréquence des Changements et Stabilité des Fichiers**
   - Afficher des graphiques montrant la fréquence des changements de chaque fichier.
   - Identifier les fichiers les plus stables et les plus modifiés.
5. **Changements Simultanés de Fichiers**
   - Visualiser les fichiers modifiés ensemble dans le même commit.
   - Permettre d'identifier les dépendances entre fichiers.

### Exigences de Performance
#### Temps de Réponse et Efficacité
L'outil doit fournir des temps de réponse rapides lors du chargement et de l'affichage des données des commits. Les graphiques interactifs doivent se mettre à jour en temps réel lors de l'application des filtres.
#### Contraintes de Capacité
L'outil doit être capable de gérer de grands volumes de données de commits sans perte de performance. Il doit être testé avec des projets GitHub de grande taille pour assurer son efficacité.

### Attributs non-fonctionnels
#### Sécurité
L'application doit garantir la sécurité des données des utilisateurs et protéger l'accès aux informations sensibles des projets GitHub dans un cas où celles-ci devaient être sauvegardées.
#### Portabilité
L'application doit être compatible avec les principaux navigateurs Web et fonctionnelle sur différentes plateformes (desktop, mobile). L'utilisation de Docker permet de garantir que l'application peut être facilement déployée et exécutée sur différents environnements sans problème de compatibilité.
#### Fiabilité et disponibilité
L'application doit être fiable et disponible à tout moment, avec un minimum de temps d'arrêt, dans un cas où l'application serait hébergée.
#### Scalabilité
L'application doit pouvoir évoluer pour gérer une augmentation du nombre de projets GitHub.

### Planification préliminaire et budget
#### Estimation du temps de développement
Comme le projet est open source et sujet à des sessions de PFE, il est difficile d'estimer le temps de développement. Des équipes vont se léguer le projet selon un cycle d'environ 4 mois. Chacun de ces cycles comprendra les phases de conception, de développement, de test et de déploiement.
#### Estimation des coûts
Aucun coût ne sera relié au développement de l'application dans le contexte de notre PFE.


## 5. Documentation pour l'utilisateur et exigences du système <a name="documentation"></a>
- **ED-01** : La documentation doit être rédigée en français uniquement.
- **ED-02** : La documentation doit être accessible à partir de GitHub.
- **ED-03** : La documentation doit consister en un ou plusieurs documents à part entière
- **ED-04** : Le répertoire GitHub doit contenir un README.md qui contiendra un guide d’installation du logiciel, les dépendances et un résumé d’utilisation.


## 6. Contraintes de conception <a name="contraintes"></a>
### Contraintes de programmation
- Le back-end logiciel doit être écrit en Ruby, utiliser le cadriciel Ruby on Rails et respecter les normes d’écriture de ce langage.
- Le front-end logiciel doit être écrit en React et respecter les normes d’écriture de ce langage.
- La base de données utilisée doit être SQLite.
### Contraintes logicielles
- Le service GitHub doit être en ligne pour pouvoir avoir accès aux dépôts.
### Limites techniques et technologiques
- Utilisation de la librairie PyDriller pour accéder aux données des commits.
- Développement de l'interface utilisateur en utilisant des technologies Web modernes comme React.js.
- Hébergement de l'application sur une plateforme cloud compatible avec les standards open source.
- Déploiement de l'application en utilisant Docker pour une meilleure gestion des environnements et une portabilité accrue.


## 7. Interfaces <a name="interfaces"></a>
### Interfaces utilisateur
L'interface utilisateur sera une application Web interactive avec des éléments graphiques pour visualiser les données des commits.
Elle comprendra :
- Un champ permettant d'entrer l'URL du répertoire GitHub à visualiser.
- Des champs permettant de filtrer les commits.
- Un graphique permettant la visualisation des modifications.
    - L'axe des x contient les commits.
    - L'axe des y contient les fichiers.
    - Un point sur le graphique représente un ajout, une modification ou une suppression.
    - Au survol d'un point sur le graphique, une section contenant le nom du fichier, le nombre de lignes ajoutées et le nombre de lignes supprimées s'affiche.
    - Les cellules sont séparées par type via leur couleur :
        - Source ajoutée
        - Source modifiée
        - Test ajouté
        - Test modifié
        - Base de données ajoutée
        - Base de données modifiée
        - Documentation ajoutée
        - Documentation modifiée
    - Une légende contenant les différents types ainsi que leur couleur.
#### Page de base pour entrer l'URL d'un dépôt
![Page de base pour entrer l'URL d'un dépôt.](resources/homepage.png "Page de base pour entrer l'URL d'un dépôt.")
#### Page de visualisation de la taille des changements dans le dépôt
![Page de visualisation de la taille des changements dans le dépôt.](resources/change_volume.png "Page de visualisation de la taille des changements dans le dépôt")
#### Page de visualisation de l'historique des modifications sur un ou des fichiers
![Page de visualisation de l'historique des modifications sur un ou des fichiers.](resources/file_history.png "Page de visualisation de l'historique des modifications sur un ou des fichiers")
#### Page du futur Developer's Input
![Page du futur Developer's Input](resources/developer_input.png "Page du futur Developer's Input")

### Interfaces logicielles
- La communication entre Cscope et GitHub doit se faire via l'API de GitHub.
- Utilisation de la librairie PyDriller pour extraire les données des commits de Git.
- Utilisation de librairies javascript pour la visualization des données:
    - [React.js](https://react.dev/)
    - [Recharts](https://recharts.org/en-US/)
    - [TailwindCSS](https://tailwindcss.com/)
- L'application sera déployée et exécutée dans des conteneurs Docker pour assurer une portabilité et une isolation des environnements.


## 8. Exigences de licence <a name="licence"></a>
Le code source du projet CScope est sous licence MIT. Une traduction de la license est disponible ici: https://www.debian.org/legal/licenses/mit.
Pour plus d'informations, vérifier le fichier *LICENSE.md* du dépôt.


## 9. Remarques légales, de droits d'auteur et diverses <a name="remarques"></a>
La seule remarque concernant ce projet est que le code source doit être à source ouverte
(open source) pour respecter les requis du PFE.


## 10. Normes applicables <a name="normes"></a>
Les normes de nomenclature des langages de programmation utilisés doivent être respectées. Le logiciel doit être fonctionnel sur une machine Linux.


## Annexes <a name="annexes"></a>
### Références
- PyDriller : https://pydriller.readthedocs.io/en/latest/#
- Recharts : https://recharts.org/en-US/
- React : https://fr.react.dev/
- TailwindCSS : https://tailwindcss.com/
- SRS document by GeeksForGeeks : https://www.geeksforgeeks.org/software-requirement-specification-srs-format/#introduction
- FastAPI : https://fastapi.tiangolo.com/
- GitHub Actions : https://docs.github.com/fr/actions
- Docker : https://www.docker.com/
