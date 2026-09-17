# Anthony Pereira — CV / Portfolio

CV et portfolio interactif d'**Anthony Pereira** — directeur créatif, designer
d'expériences numériques, orchestrateur IA et formateur (Bordeaux).

Concept : **un profil · cinq territoires**.

## Les cinq territoires

| # | Territoire | Idée directrice |
|---|---|---|
| 01 | Direction créative | Construire une vision |
| 02 | IA & Formation | Partir du métier. Construire l'outil. Transmettre l'usage. |
| 03 | Business | Structurer la production |
| 04 | Atelier artistique | Créer avant d'en faire un métier |
| 05 | Collaborations | Connecter les disciplines |

Territoire par défaut : **Direction créative**.

Chaque territoire modifie le message, l'atmosphère visuelle, la hiérarchie de
contenu, la sélection de projets, l'ordre des familles de compétences, la lecture
du parcours, le CTA et le langage de mouvement — pas seulement la couleur.

## Ouverture locale

Un serveur statique est recommandé (le routage par hash et le rendu des
territoires fonctionnent aussi en `file://`, mais le serveur reflète la
production) :

```bash
python3 -m http.server 8080
# http://localhost:8080/
```

## URLs partageables

Chaque territoire possède une URL directe :

```text
#direction-creative   (défaut)
#ia-formation
#business
#atelier
#collaborations
```

Navigation avant/arrière du navigateur supportée, sans rechargement de page.

## Structure

```
CV/
├── index.html      — Ossature statique (identité, parcours, expertise, contact)
├── style.css       — Design system + 5 thèmes de territoire
├── script.js       — Modèle de données, rendu des blocs, interactions
├── README.md       — Ce fichier
└── assets/
    ├── img/
    └── icons/
        └── favicon.png   — marque TCD, référencée en chemin relatif
```

Le favicon est un fichier local référencé en chemin relatif
(`assets/icons/favicon.png`) afin de se résoudre correctement sous le
sous-chemin projet de GitHub Pages et de ne dépendre d'aucun hébergement
externe.

### Architecture

- `index.html` porte l'ossature partagée et le contenu indexable : identité,
  parcours (essentiel + complet), familles de compétences, outils, contact,
  données structurées `schema.org/Person`, et un repli `<noscript>` listant les
  projets.
- `script.js` contient le modèle de données central — registre de projets,
  familles de compétences, définition des cinq territoires — et un moteur de
  rendu par blocs typés (`feature`, `projects`, `pillars`, `field`, `process`,
  `levels`, `branches`, `gallery`, `convergence`, `openfield`, `note`).
- `style.css` définit les tokens de base puis un jeu de tokens par territoire
  (`[data-territory="…"]`), incluant rayon, tension typographique, rythme
  vertical et cadence d'animation.

## Fonctionnalités

- Navigateur de territoires accessible (rôle `tablist`, navigation clavier)
- Routage par hash + historique navigateur
- Hiérarchie de projets pondérée (produit phare, cas web, travaux mineurs)
- Parcours essentiel avec dépliage du parcours complet
- Compétences par familles, outils en couche secondaire
- Reveal au scroll, cadence propre à chaque territoire
- Support complet de `prefers-reduced-motion`
- Responsive 360px → 1440px+

## Technologies

HTML5 / CSS3 / JavaScript vanilla. Google Fonts (Inter, Space Grotesk,
JetBrains Mono). Aucun framework, aucune dépendance, aucun build.

---

© 2026 Anthony Pereira — Tony Creative Design · Bordeaux
