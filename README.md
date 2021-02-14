# jeuJS
CAO Nicolas - Mon premier jeu en JavaScript dans le cadre du module "Serveurs d'applications et environnement de développement J2" avec Michel BUFFA.

Difficultés rencontrées:
- Organisation du code et penser à commenter chaque opération
- Gestion des écrans
- Gestion des vies, niveaux, scores, etc...

Aides:
- https://jsbin.com/viwekol/ pour la gestion des tirs
- http://miageprojet2.unice.fr/@api/deki/files/2987/=script.js pour la gestion des assets
- Les cours, démonstrations et MOOC mis à disposition.

Bug(s) constaté(s):
- Dès le début, les ennemis tirent en même temps, et si le joueur se prend les projectiles, il meurt instantanément (il perd un nombre de vies égales au nombre de balles reçues).
Je pensais avoir résolu ça avec une fonction pour les faire tirer à une cadence aléatoire (Math.floor(Math.random() * 2000) + 1000) pour chaque ennemi...

Fonctionnalités:
- Un bonus apparaît tous les 5 secondes, si le joueur le prend, le bonus augmente la cadence de tir de 0.001, son apparition est aléatoire.
- Tirs du joueur avec souris ou barre d'espace
- Musique en arrière-plan et effets sonores à chaque tir (avec la souris, pas avec la barre d'espace).

Remarques:
- Mon CV est actuellement hébergé sur GitHub Pages, et je n'ai pas conservé toutes mes données pour le mettre à jour avec le projet donc je ne peux pas héberger le jeu via la plateforme.
