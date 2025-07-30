AzerType
 
AzerType est une application web interactive conçue pour améliorer vos compétences en dactylographie de manière ludique. Ce jeu, développé en JavaScript avec Tailwind CSS pour un design moderne et responsive, propose trois niveaux de difficulté (Facile, Moyen, Difficile) pour tester et perfectionner votre vitesse et précision au clavier.


## Fonctionnalités

Trois niveaux de difficulté :
Facile : Mots courts, 120 secondes, 10 points par mot correct.
Moyen : Mots de longueur moyenne, 90 secondes, 15 points par mot correct.
Difficile : Mots longs, 60 secondes, 25 points par mot correct.


Interface responsive : Compatible avec mobile, tablette et desktop grâce à Tailwind CSS.
Statistiques en temps réel : Suivi du score, du temps restant, des mots restants, de la précision et des mots par minute (WPM).
Animations fluides : Effets visuels pour les mots, les saisies correctes/incorrectes, et les transitions de page.
Modal de fin de partie : Affiche les résultats (score, mots corrects, WPM, précision) à la fin de chaque session.
Contrôles intuitifs : Boutons pour démarrer, mettre en pause et réinitialiser le jeu, avec des raccourcis clavier (Ctrl+espace pour démarrer/pause, Échap pour pause).

## Structure du projet
La structure du dépôt est organisée comme suit :
AzerType/
├── config/
│   └── tailwind.js        # Configuration de Tailwind CSS
├── js/
│   └── script.js          # Logique principale du jeu (gestion des mots, score, timer, etc.)
├── src/
│   └── index.html         # Fichier HTML principal
├── style/
│   └── style.css          # Styles personnalisés (animations, compléments à Tailwind CSS)
├── .vscode/
│   └── settings.json      # Configuration VS Code pour le live server projet
└── README.md              # Documentation du projet

## Prérequis
Pour exécuter ce projet localement, vous aurez besoin de :

Un navigateur web moderne (Chrome, Firefox, Edge, etc.).
Une connexion Internet pour charger les dépendances CDN (Tailwind CSS, Font Awesome).
(Facultatif) Un éditeur de code comme VS Code pour modifier le projet.
(Facultatif) Node.js et Tailwind CSS CLI si vous souhaitez compiler Tailwind localement.

## Installation

Cloner le dépôt :

git clone https://github.com/REBCDR07/AzerType.git
cd AzerType


Ouvrir le projet :

Ouvrez src/index.html directement dans un navigateur pour exécuter l'application (les dépendances Tailwind CSS et Font Awesome sont chargées via CDN).
Alternative : Si vous souhaitez personnaliser Tailwind CSS :
Installez Tailwind CSS CLI :npm install -D tailwindcss
npx tailwindcss init


Compilez les styles :npx tailwindcss -i ./style/style.css -o ./style/output.css --watch


Mettez à jour index.html pour inclure output.css à la place du CDN Tailwind.




## Configurer VS Code (facultatif) :

Le fichier .vscode/settings.json contient des configurations recommandées pour l'éditeur pour le live server (tester directement en live).



## Utilisation

Accéder à l'application :

Ouvrez src/index.html dans un navigateur.
La page d'accueil présente le projet et propose un bouton pour commencer à jouer.


## Jouer :

Cliquez sur "Jouer" dans la barre de navigation ou sur le bouton "Commencer à jouer".
Sélectionnez un niveau de difficulté (Facile, Moyen, Difficile).
Cliquez sur "Démarrer" pour commencer une partie.
Tapez les mots affichés dans le champ de saisie et validez avec la touche Entrée.
Utilisez Ctrl+Espace pour démarrer/mettre en pause, et Échap pour mettre en pause.
À la fin de la partie, un modal affiche vos résultats (score, mots corrects, WPM, précision).


## Personnalisation :

Modifiez js/script.js pour ajouter de nouveaux mots ou ajuster la logique du jeu.
Ajustez style/style.css ou config/tailwind.js pour personnaliser le design.



## Contribution
Les contributions sont les bienvenues ! Pour contribuer :

Forkez le dépôt.
Créez une branche pour votre fonctionnalité :git checkout -b feature/nouvelle-fonctionnalite


Commitez vos modifications :git commit -m "Ajout de nouvelle fonctionnalité"


Poussez votre branche :git push origin feature/nouvelle-fonctionnalite


Ouvrez une Pull Request sur GitHub.

Veuillez respecter les conventions de codage (formatage avec Prettier, commentaires clairs) et tester vos modifications avant de soumettre.


## Licence
Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de cette licence.
Contact
Pour toute question ou suggestion, contactez l'auteur via :

GitHub : https://github.com/REBCDR07
Email : eltonhounnou27@gmail.com


Créé avec passion pour aider à améliorer vos compétences en dactylographie !