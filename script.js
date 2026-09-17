/* ============================================================
   Anthony Pereira — CV / Portfolio
   v3.0 · Un profil · Cinq territoires
   Data model + renderer + interaction layer
   ============================================================ */

(() => {
  'use strict';

  /* Motion preference is read live: a visitor can flip it while the page is open,
     and the JS motion branch must follow the CSS rather than stay stuck at load state. */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = motionQuery.matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  /* ============================================================
     0. PROJECT REGISTRY — verified names, contexts and public URLs
     ============================================================ */
  const PROJECTS = {
    moodbase: {
      name: 'MoodBase',
      url: 'https://app.tonycreativedesign.fr/',
      context: 'Projet propriétaire',
      kicker: 'PRODUIT · APPLICATION WEB',
      desc: 'Application qui transforme une inspiration visuelle floue en pré-moodboard structuré et exploitable.',
      tags: ['Produit', 'UX/UI', 'Interface'],
      mark: 'layers', glyph: 'MB'
    },
    mlmassage: {
      name: 'ML Massage',
      url: 'https://www.mlmassage.fr/',
      context: 'Projet client',
      kicker: 'SITE MÉTIER & PARCOURS DE RÉSERVATION',
      desc: 'Identité visuelle complète et site d’une praticienne bien-être : présentation de l’activité, lisibilité des prestations et parcours menant le visiteur de la découverte à la prise de rendez-vous.',
      facets: [
        { k: 'Périmètre', v: 'Logo · Charte graphique · Site' },
        { k: 'Enjeu', v: 'Présence numérique autonome' },
        { k: 'Parcours', v: 'Découverte → prestation → rendez-vous' }
      ],
      tags: ['Site métier', 'Parcours', 'Identité'],
      mark: 'wave', glyph: 'ML'
    },
    tcd: {
      name: 'Tony Creative Design',
      url: 'https://www.tonycreativedesign.fr/',
      context: 'Écosystème TCD',
      kicker: 'STUDIO · ÉCOSYSTÈME CRÉATIF',
      desc: 'Site du studio et colonne vertébrale de l’écosystème : positionnement, offres, portfolio et points d’entrée vers les autres territoires.',
      tags: ['Studio', 'Branding', 'Web'],
      mark: 'orbit', glyph: 'TCD'
    },
    graphikly: {
      name: 'Graphikly',
      url: 'https://graphikly.fr/',
      context: 'Écosystème TCD',
      kicker: 'SITE & SERVICE CRÉATIF B2B',
      desc: 'Site de l’offre de production créative récurrente : promesse, niveaux de partenariat et mécanique d’entrée en relation.',
      tags: ['B2B', 'Service', 'Web'],
      mark: 'hex', glyph: 'GR'
    },
    iacd: {
      name: 'IA-CreativeDesign',
      url: 'https://www.ia-creativedesign.fr/',
      context: 'Écosystème TCD',
      kicker: 'PLATEFORME · IA APPLIQUÉE',
      desc: 'Plateforme dédiée aux solutions d’IA appliquées aux métiers : interfaces, assistants, robots métier et automatisations.',
      tags: ['IA', 'Plateforme', 'Interfaces'],
      mark: 'node', glyph: 'IACD'
    },
    atelier: {
      name: 'L’Atelier de Tony',
      url: 'https://www.latelierdetony.fr/',
      context: 'Projet propriétaire',
      kicker: 'SITE ARTISTIQUE & COMMANDES',
      desc: 'Univers artistique autonome : présentation des œuvres, des portraits et du parcours de commande.',
      tags: ['Art', 'Galerie', 'Commandes'],
      mark: 'stroke', glyph: 'LAT'
    },
    tmelec: {
      name: 'TMELEC',
      url: 'https://www.tm-elec.fr/',
      context: 'Projet client',
      kicker: 'IDENTITÉ NUMÉRIQUE PROFESSIONNELLE',
      desc: 'Identité numérique et site vitrine d’une entreprise d’électricité : présentation des prestations, crédibilité professionnelle et présence digitale cohérente.',
      facets: [
        { k: 'Périmètre', v: 'Identité · Site vitrine' },
        { k: 'Enjeu', v: 'Crédibilité professionnelle' },
        { k: 'Parcours', v: 'Prestations → confiance → contact' }
      ],
      tags: ['Identité numérique', 'Site vitrine', 'WordPress'],
      mark: 'circuit', glyph: 'TM'
    },
    studio341: {
      name: '341STUDIO',
      url: 'https://www.tonycreativedesign.fr/creation-site-web-bordeaux/',
      context: 'Projet culturel propriétaire',
      kicker: 'DIRECTION ARTISTIQUE · CULTURE',
      desc: 'Territoire créatif et culturel mené en propre, autour de la musique et de l’image : direction artistique et conception visuelle.',
      tags: ['DA', 'Culture', 'Musique'],
      mark: 'peak', glyph: '341'
    },
    polybats: {
      name: 'Polybats',
      url: 'https://www.polybats.com/',
      context: 'Projet client',
      kicker: 'LOGO & SITE · RÉNOVATION DE FAÇADES',
      desc: 'Logo et site pour une entreprise de rénovation de façades.',
      tags: ['Logo', 'Site web'],
      mark: 'lens', glyph: 'PB'
    },
    alma: {
      name: 'ALMA',
      url: null,
      context: 'Projet client',
      kicker: 'LOGO · MARQUE DE VÊTEMENT',
      desc: 'Création du logo et de l’identité visuelle d’une marque de vêtement.',
      tags: ['Logo', 'Identité visuelle'],
      mark: 'lens', glyph: 'AL'
    },
    emna: {
      name: 'EMNA',
      url: null,
      context: 'Projet client',
      kicker: 'IDENTITÉ & SUPPORTS',
      desc: 'Projet client en identité visuelle et supports de communication.',
      tags: ['Identité', 'Supports'],
      mark: 'hex', glyph: 'EM'
    },
    vnlab: {
      name: 'VN-LAB',
      url: 'https://vn-lab.fr/',
      context: 'Projet propriétaire',
      kicker: 'LABORATOIRE DE DESIGN · EN DÉVELOPPEMENT',
      desc: 'Laboratoire de design en développement. Une nouvelle toile prend forme.',
      tags: ['Laboratoire', 'Direction artistique'],
      mark: 'weave', glyph: 'VN'
    },
    superofficiel: {
      name: 'SuperOfficiel',
      url: 'https://www.superofficiel.com/fr/2-accueil',
      context: 'Projet client',
      kicker: 'IDENTITÉ · SUPPORTS DIGITAUX',
      desc: 'Conception de l’identité visuelle et des supports digitaux.',
      tags: ['Identité', 'Digital'],
      mark: 'hex', glyph: 'SO'
    },
    friction: {
      name: 'Controlled Friction',
      url: null,
      context: 'Recherche graphique',
      kicker: 'RECHERCHE VISUELLE · ARTISTIQUE',
      desc: 'Recherche visuelle mêlant voyage, architecture, présence humaine, photographie, direction graphique et IA générative. Le projet part du réel, croise les disciplines et met la technologie au service d’une idée visuelle.',
      tags: ['Recherche', 'Photographie', 'IA générative'],
      mark: 'grain', glyph: 'CF'
    },
    chroma: {
      name: 'Chroma Studio',
      url: null,
      context: 'Projet propriétaire',
      kicker: 'APPLICATION · EXPLORATION D’INTERFACE',
      desc: 'Application de création de palettes chromatiques — une exploration d’interface et d’outil de design pensée comme un objet numérique autonome.',
      tags: ['Application', 'Design tool', 'Interface'],
      mark: 'spectrum', glyph: 'CS'
    }
  };

  /* ============================================================
     0b. SVG MARKS — one geometric signature per project family
     ============================================================ */
  const MARKS = {
    orbit: '<circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="0.7" stroke-opacity="0.55"/><circle cx="100" cy="100" r="36" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="100" y1="22" x2="100" y2="178" stroke="currentColor" stroke-width="0.4" stroke-opacity="0.45"/><line x1="22" y1="100" x2="178" y2="100" stroke="currentColor" stroke-width="0.4" stroke-opacity="0.45"/><circle cx="100" cy="38" r="3" fill="currentColor"/>',
    layers: '<rect x="46" y="58" width="108" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="46" y="92" width="108" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.65"/><rect x="46" y="126" width="108" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="0.7" stroke-opacity="0.4"/><circle cx="62" cy="71" r="4" fill="currentColor"/>',
    wave: '<circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2 5" transform="rotate(45 100 100)"/><path d="M68 100 Q100 68 132 100 T100 132" fill="none" stroke="currentColor" stroke-width="1"/>',
    hex: '<polygon points="100,32 164,68 164,132 100,168 36,132 36,68" fill="none" stroke="currentColor" stroke-width="1.3"/><polygon points="100,62 138,82 138,118 100,138 62,118 62,82" fill="none" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.6"/><circle cx="100" cy="100" r="5" fill="currentColor"/>',
    node: '<rect x="38" y="64" width="42" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="120" y="64" width="42" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="79" y="122" width="42" height="32" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M80 80 H120 M59 96 V138 H79 M141 96 V138 H121" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/><circle cx="100" cy="80" r="3.5" fill="currentColor"/>',
    stroke: '<path d="M42 158 Q62 58 102 98 T 160 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M52 130 Q92 80 132 120 T 168 72" fill="none" stroke="currentColor" stroke-width="1.1" stroke-opacity="0.55"/><circle cx="42" cy="158" r="3" fill="currentColor"/><circle cx="160" cy="40" r="3" fill="currentColor"/>',
    circuit: '<polyline points="62 40, 62 108, 100 108, 100 160, 140 160" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="62" cy="40" r="4" fill="currentColor"/><circle cx="140" cy="160" r="4" fill="currentColor"/>',
    peak: '<line x1="42" y1="160" x2="100" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="100" y1="42" x2="158" y2="160" stroke="currentColor" stroke-width="1.8"/><line x1="62" y1="122" x2="138" y2="122" stroke="currentColor" stroke-width="0.9" stroke-opacity="0.6"/><circle cx="100" cy="42" r="3.5" fill="currentColor"/>',
    lens: '<circle cx="82" cy="100" r="34" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="118" cy="100" r="34" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="100" cy="100" r="13" fill="currentColor" fill-opacity="0.32"/>',
    grain: '<rect x="44" y="52" width="112" height="96" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M44 118 L84 88 L108 110 L136 78 L156 96" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="126" cy="74" r="6" fill="none" stroke="currentColor" stroke-width="1"/><path d="M44 134 H156" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 5"/>',
    spectrum: '<rect x="44" y="70" width="28" height="60" fill="currentColor" fill-opacity="0.5"/><rect x="76" y="70" width="28" height="60" fill="currentColor" fill-opacity="0.34"/><rect x="108" y="70" width="28" height="60" fill="currentColor" fill-opacity="0.2"/><rect x="140" y="70" width="16" height="60" fill="none" stroke="currentColor" stroke-width="1"/>',
    /* A canvas still being woven — a new surface taking shape. */
    weave: '<path d="M52 62 H148 M52 84 H148 M52 106 H148 M52 128 H120" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/><path d="M68 48 V142 M92 48 V142 M116 48 V142 M140 48 V120" stroke="currentColor" stroke-width="1" stroke-opacity="0.45"/><rect x="52" y="48" width="96" height="94" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="140" cy="128" r="4.5" fill="currentColor"/>'
  };

  /* ============================================================
     0c. EXPERTISE FAMILIES — capability-first, tools stay secondary
     ============================================================ */
  const FAMILIES = {
    creative: {
      name: 'Direction créative',
      lead: 'Donner une direction et la tenir du concept à l’exécution.',
      items: ['Direction artistique', 'Identité visuelle', 'Systèmes de marque', 'Typographie', 'Composition éditoriale', 'Production créative']
    },
    digital: {
      name: 'Expérience numérique',
      lead: 'Concevoir des interfaces et des parcours qui se traversent sans effort.',
      items: ['Webdesign', 'UX/UI', 'Interfaces numériques', 'Design responsive', 'Parcours de conversion', 'Prototypage']
    },
    ai: {
      name: 'Orchestration IA',
      lead: 'Choisir, assembler et intégrer les bons outils autour d’un usage réel.',
      items: ['IA générative', 'Prompt engineering', 'Cadrage des usages métier', 'Choix des modèles et outils', 'Assistants', 'Workflows & automatisations', 'Prototypage assisté par IA']
    },
    training: {
      name: 'Formation & transmission',
      lead: 'Rendre l’outil utilisable par ceux qui vont réellement s’en servir.',
      items: ['Formation professionnelle', 'Ateliers', 'Adoption', 'Cas d’usage', 'Pédagogie', 'Documentation', 'Transfert de compétences']
    },
    art: {
      name: 'Pratique artistique',
      lead: 'Le geste, la matière et la couleur — avant tout logiciel.',
      items: ['Peinture', 'Dessin', 'Illustration', 'Composition', 'Couleur', 'Œuvres sur commande']
    },
    business: {
      name: 'Business & delivery',
      lead: 'Structurer la production pour qu’elle tienne dans la durée.',
      items: ['Gestion de projet', 'Briefing', 'Organisation de production', 'Relation client', 'Documentation', 'Conception de services récurrents']
    }
  };

  /* ============================================================
     0d. TERRITORIES — the five professional lenses
     ============================================================ */
  const TERRITORIES = [
    {
      slug: 'direction-creative',
      role: 'Directeur artistique · Designer d’expériences numériques',
      roleSub: 'Fondateur de Tony Creative Design',
      num: '01',
      nav: 'Direction créative',
      navSub: 'Studio · Identité · Expérience',
      docTitle: 'Direction créative',
      themeColor: '#07080D',
      idea: 'Construire une vision',
      title: 'Direction créative',
      signature: 'Tony Creative Design — Studio indépendant · Bordeaux',
      heroMessage: 'Je construis des identités, des systèmes visuels et des expériences numériques capables de transformer une idée en univers cohérent.',
      meta: [
        { k: 'Période', v: '2021 → aujourd’hui' },
        { k: 'Champ', v: 'Design · Web · UX' },
        { k: 'Base', v: 'Bordeaux' }
      ],
      manifesto: [
        'Je travaille la marque comme un système : une idée, une structure, un vocabulaire visuel, puis une exécution tenue du logo jusqu’à l’interface.',
        'Direction artistique, identité visuelle, typographie, composition éditoriale, webdesign, UX/UI et prototypage — la même exigence du concept à la livraison. L’IA y intervient comme outil de création, jamais comme substitut à la direction.'
      ],
      careerNote: 'Lecture orientée studio : création de Tony Creative Design, années freelance en graphisme et web, formation design et UX.',
      emphasis: ['tcd', 'freelance', 'edu-piscine', 'edu-iscod'],
      families: ['creative', 'digital', 'ai', 'business', 'training', 'art'],
      cta: {
        title: 'Un projet d’identité, de site ou d’expérience numérique ?',
        lead: 'Parlons du problème avant de parler de la solution.',
        primary: { label: 'Démarrer une conversation', href: '#contact' },
        ghost: { label: 'Voir le studio', href: 'https://www.tonycreativedesign.fr/', external: true }
      },
      blocks: [
        {
          type: 'feature',
          kicker: 'PRODUIT PHARE · CAS D’ÉTUDE',
          project: 'moodbase',
          subtitle: 'Transformer une inspiration floue en pré-moodboard exploitable',
          lead: 'MoodBase est né d’un irritant que je rencontre au début de presque chaque projet : un client sait ce qu’il aime, mais ne sait pas encore le formuler. L’application structure cette matière visuelle diffuse en un pré-moodboard clair, lisible et réellement exploitable en production.',
          facets: [
            { k: 'Rôle', v: 'Conception produit · UX/UI · Direction créative' },
            { k: 'Nature', v: 'Application web' },
            { k: 'Écosystème', v: 'Tony Creative Design' },
            { k: 'Statut', v: 'En ligne' }
          ],
          points: [
            { n: '01', t: 'Cadrage du problème', d: 'Partir d’un écart réel du métier : entre ce que le client ressent et ce qu’un studio peut produire.' },
            { n: '02', t: 'Architecture de l’information', d: 'Organiser la collecte, le tri et la hiérarchisation des références visuelles.' },
            { n: '03', t: 'Design d’interface', d: 'Une interface sobre qui laisse l’image parler et rend la décision facile.' },
            { n: '04', t: 'Du concept au produit', d: 'Prototypage, itérations et mise en ligne d’une version réellement utilisable.' }
          ]
        },
        {
          type: 'projects',
          kicker: 'PROPRIÉTÉ · PLATEFORMES CONÇUES ET OPÉRÉES',
          title: 'Écosystèmes & plateformes propriétaires',
          lead: 'Marques, plateformes et territoires que je conçois, dirige et fais vivre en propre.',
          variant: 'owned',
          items: ['tcd', 'graphikly', 'iacd', 'atelier', 'studio341']
        },
        {
          type: 'clients',
          kicker: 'SITES · IDENTITÉS · EXPÉRIENCES NUMÉRIQUES',
          title: 'Projets clients',
          lead: 'Commandes conçues et produites pour des entreprises et des indépendants.',
          featured: ['mlmassage', 'tmelec'],
          secondary: ['polybats', 'superofficiel', 'emna', 'alma']
        },
        {
          type: 'projects',
          kicker: 'RECHERCHE · PROTOTYPES · EN COURS',
          title: 'Explorations & projets en développement',
          lead: 'Travaux ouverts, plus libres — la part de recherche qui tient la pratique vivante.',
          variant: 'minor',
          items: ['friction', 'chroma', 'vnlab']
        }
      ]
    },

    {
      slug: 'ia-formation',
      role: 'Formateur en intelligence artificielle · Orchestrateur & concepteur de solutions IA',
      roleSub: 'Du cadrage métier à l’outil livré et transmis',
      num: '02',
      nav: 'IA & Formation',
      navSub: 'Orchestration · Transmission',
      docTitle: 'IA & Formation',
      themeColor: '#04070E',
      idea: 'Partir du métier. Construire l’outil. Transmettre l’usage.',
      title: 'IA & Formation',
      signature: 'Orchestrateur IA · Formateur freelance · Concepteur de solutions',
      heroMessage: 'J’aide les entreprises et les professionnels à comprendre, intégrer et exploiter l’intelligence artificielle — de la transmission des usages jusqu’à la conception de systèmes, interfaces, assistants, robots et workflows adaptés à leurs métiers.',
      meta: [
        { k: 'Trajectoire', v: 'Terrain → Digital → IA' },
        { k: 'Intervention', v: 'Formation' },
        { k: 'Méthode', v: 'Orchestration' }
      ],
      manifesto: [
        'L’IA n’est pas un sujet technique : c’est un sujet de métier. La question n’est jamais « quel modèle ? » mais « quel travail réel voulons-nous rendre plus simple ? ».',
        'Je pars du terrain, j’identifie les frictions, je conçois l’outil autour de l’utilisateur — puis je transmets l’usage pour que l’outil survive à mon départ.'
      ],
      careerNote: 'Lecture orientée usages : industrie, logistique, bâtiment et travaux publics avant le numérique — une connaissance directe des contraintes que l’IA doit servir.',
      emphasis: ['terrain', 'omega', 'tcd'],
      families: ['ai', 'training', 'digital', 'creative', 'business', 'art'],
      cta: {
        title: 'Former vos équipes, ou concevoir l’outil dont elles ont besoin ?',
        lead: 'On commence toujours par observer le travail réel.',
        primary: { label: 'Parler de votre besoin', href: '#contact' },
        ghost: { label: 'Voir IA-CreativeDesign', href: 'https://www.ia-creativedesign.fr/', external: true }
      },
      blocks: [
        {
          type: 'pillars',
          kicker: 'TROIS PILIERS',
          title: 'Transmettre, orchestrer, concevoir',
          items: [
            {
              n: '01', t: 'Formation & transmission',
              lead: 'Rendre l’IA utilisable par des professionnels qui ne sont pas des spécialistes.',
              list: ['Formation professionnelle à l’IA', 'Ateliers', 'Adoption de l’IA générative', 'Cas d’usage concrets', 'Prompting', 'Méthodologie', 'Workflows professionnels', 'Usage responsable', 'Exercices pratiques']
            },
            {
              n: '02', t: 'Orchestration & conseil',
              lead: 'Comprendre le métier avant de choisir le moindre outil.',
              list: ['Comprendre l’activité', 'Structurer le besoin', 'Identifier les cas d’usage utiles', 'Sélectionner outils et modèles', 'Concevoir le workflow', 'Intégrer', 'Tester', 'Documenter', 'Transmettre']
            },
            {
              n: '03', t: 'Conception de solutions',
              lead: 'Matérialiser l’usage dans un objet réellement utilisable.',
              list: ['Interfaces', 'Assistants', 'Robots métier', 'Automatisations simples', 'Workflows', 'Agents quand c’est pertinent', 'Prototypes', 'Applications assistées par IA']
            }
          ]
        },
        {
          type: 'field',
          kicker: 'ORIGINE · PARCOURS',
          title: 'Avant l’IA, le terrain.',
          paras: [
            'Avant de concevoir des outils numériques, j’ai travaillé plusieurs années dans l’industrie, la logistique, le bâtiment et les travaux publics. Cette expérience me permet aujourd’hui d’aborder l’IA à partir des réalités métier : contraintes terrain, temps perdu, répétition, transmission d’information, sécurité, coordination et productivité.',
            'Je ne cherche pas à ajouter de l’IA là où elle n’apporte rien. Je pars du travail réel, j’identifie les frictions et je conçois l’outil autour de l’utilisateur.'
          ],
          chain: ['Bâtiment', 'Travaux publics', 'Industrie / Logistique', 'Design', 'UX', 'IA'],
          closing: 'Mon parcours n’est pas une rupture entre le terrain et le numérique. C’est ce qui me permet aujourd’hui de concevoir le numérique à partir du réel.'
        },
        {
          type: 'process',
          kicker: 'MÉTHODE',
          title: 'De l’activité à l’usage transmis',
          lead: 'Une séquence stable, quel que soit le métier concerné.',
          layout: 'flow',
          steps: [
            { n: '01', t: 'Métier', d: 'Observer l’activité réelle.' },
            { n: '02', t: 'Besoin', d: 'Nommer ce qui coince.' },
            { n: '03', t: 'Cadrage', d: 'Délimiter ce qui vaut la peine.' },
            { n: '04', t: 'Outils / Modèles', d: 'Choisir ce qui est adapté.' },
            { n: '05', t: 'Conception', d: 'Dessiner l’outil autour de l’usage.' },
            { n: '06', t: 'Intégration', d: 'Le brancher au travail existant.' },
            { n: '07', t: 'Test', d: 'Confronter au réel, ajuster.' },
            { n: '08', t: 'Transmission', d: 'Rendre l’équipe autonome.' }
          ]
        },
        {
          type: 'note',
          kicker: 'PLATEFORME',
          title: 'IA-CreativeDesign',
          text: 'Là où l’expertise se matérialise : IA-CreativeDesign est la plateforme sur laquelle je conçois et déploie les interfaces, assistants, robots métier et automatisations. L’expertise humaine — orchestration, conseil, formation — reste de mon côté ; la plateforme est l’endroit où elle prend forme.',
          link: { label: 'Découvrir la plateforme', href: 'https://www.ia-creativedesign.fr/', external: true },
          aside: { label: 'Référence externe', text: 'Profil formateur SENZA', href: 'https://senza-formations.com/formateur/profil-606-anthony' }
        }
      ]
    },

    {
      slug: 'business',
      role: 'Graphiste · Webdesigner UX/UI · Partenaire créatif B2B',
      roleSub: 'Graphikly — une offre Tony Creative Design',
      num: '03',
      nav: 'Business',
      navSub: 'Graphikly · Production B2B',
      docTitle: 'Business',
      themeColor: '#F5F3EC',
      idea: 'Structurer la production',
      title: 'Business',
      signature: 'Graphikly — Production créative B2B · Une offre Tony Creative Design',
      heroMessage: 'Une équipe créative externalisée, sans la complexité d’une agence.',
      meta: [
        { k: 'Offre', v: 'Graphikly' },
        { k: 'Modèle', v: 'Production continue' },
        { k: 'Marché', v: 'B2B' }
      ],
      manifesto: [
        'Savoir concevoir ne suffit pas : il faut aussi savoir produire, mois après mois, sans que la qualité dépende de l’urgence du moment.',
        'Graphikly est ma réponse à cette question. Un modèle de production créative récurrente, avec un cadre clair : ce qui entre, ce qui sort, dans quel ordre et sous quelle forme.'
      ],
      careerNote: 'Lecture orientée structuration : construction du studio, entrepreneuriat indépendant depuis 2021 et conception d’une offre de service récurrente.',
      emphasis: ['tcd', 'freelance'],
      families: ['business', 'creative', 'digital', 'ai', 'training', 'art'],
      cta: {
        title: 'Un besoin créatif récurrent à absorber ?',
        lead: 'Le modèle compte plus que le tarif — commençons par vos volumes réels.',
        primary: { label: 'Étudier votre besoin', href: '#contact' },
        ghost: { label: 'Découvrir Graphikly', href: 'https://graphikly.fr/', external: true }
      },
      blocks: [
        {
          type: 'feature',
          kicker: 'OFFRE · PRODUCTION CRÉATIVE B2B',
          project: 'graphikly',
          subtitle: 'Un partenaire créatif externalisé, cadré et continu',
          lead: 'Graphikly s’adresse aux entreprises dont les besoins créatifs sont réguliers mais rarement assez volumineux pour justifier une équipe interne — ou assez prévisibles pour supporter le fonctionnement d’une agence. Le studio devient une extension de leur organisation, avec un cadre de production explicite.',
          facets: [
            { k: 'Nature', v: 'Service créatif récurrent' },
            { k: 'Porté par', v: 'Tony Creative Design' },
            { k: 'Périmètre', v: 'Design graphique · Webdesign · UX/UI' },
            { k: 'Relation', v: 'Continue' }
          ],
          points: [
            { n: '01', t: 'Onboarding', d: 'Comprendre la marque, ses gabarits, ses contraintes et son rythme réel.' },
            { n: '02', t: 'Brief & backlog', d: 'Un point d’entrée unique, une file de travail visible et priorisée.' },
            { n: '03', t: 'Production & révision', d: 'Des cycles courts, une boucle de retour claire, des versions tracées.' },
            { n: '04', t: 'Livraison & continuité', d: 'Des fichiers exploitables et une relation qui capitalise dans le temps.' }
          ]
        },
        {
          type: 'process',
          kicker: 'MÉCANIQUE',
          title: 'Le cycle de production',
          lead: 'Cinq étapes, répétées — c’est la répétition qui crée la fiabilité.',
          layout: 'line',
          steps: [
            { n: '01', t: 'Brief', d: 'Le besoin entre par un point unique.' },
            { n: '02', t: 'Backlog', d: 'Il est qualifié et priorisé.' },
            { n: '03', t: 'Production', d: 'Il est produit par cycles courts.' },
            { n: '04', t: 'Révision', d: 'Il est ajusté sur retour client.' },
            { n: '05', t: 'Livraison', d: 'Il repart exploitable.' }
          ]
        },
        {
          type: 'levels',
          kicker: 'RELATION',
          title: 'Trois niveaux de partenariat',
          lead: 'Des niveaux d’engagement, pas des paliers tarifaires : le bon niveau est celui qui correspond à votre volume réel.',
          items: [
            { n: '01', t: 'Essentiel', d: 'Pour un besoin régulier mais mesuré — garder une production visuelle vivante sans immobiliser de ressource.' },
            { n: '02', t: 'Croissance', d: 'Pour une activité qui accélère — plus de volume, plus de formats, un rythme de production soutenu.' },
            { n: '03', t: 'Partenaire', d: 'Pour une intégration forte — le studio agit comme le pôle créatif de l’entreprise, dans la durée.' }
          ],
          note: 'Le détail des conditions et des tarifs est présenté sur le site Graphikly.'
        }
      ]
    },

    {
      slug: 'atelier',
      role: 'Artiste peintre · Dessinateur · Illustrateur',
      roleSub: 'L’Atelier de Tony — œuvres originales et sur commande',
      num: '04',
      nav: 'Atelier artistique',
      navSub: 'Peinture · Dessin · Commandes',
      docTitle: 'Atelier artistique',
      themeColor: '#070707',
      idea: 'Créer avant d’en faire un métier',
      title: 'Atelier artistique',
      signature: 'L’Atelier de Tony — Artiste peintre · Dessin · Œuvres sur commande',
      heroMessage: 'Le dessin et l’art font partie de mon parcours bien avant le design, le web ou l’intelligence artificielle.',
      meta: [
        { k: 'Pratique', v: 'Depuis l’enfance' },
        { k: 'Médiums', v: 'Peinture / Dessin' },
        { k: 'Nature', v: 'Œuvres uniques' }
      ],
      manifesto: [
        'L’Atelier de Tony est né comme un espace permettant de donner une place autonome à cette pratique : peinture, portraits, dessin, illustration et œuvres originales ou réalisées sur commande.',
        'Ce n’est pas une branche secondaire du studio. C’est l’endroit d’où vient le reste.'
      ],
      careerNote: 'Lecture orientée pratique artistique : un intérêt ancien pour le dessin, puis la création de L’Atelier de Tony en 2024 comme espace dédié.',
      emphasis: ['atelier'],
      families: ['art', 'creative', 'digital', 'business', 'ai', 'training'],
      cta: {
        title: 'Une œuvre, un portrait, une pièce unique ?',
        lead: 'Chaque commande commence par une conversation sur ce que vous voulez garder.',
        primary: { label: 'Demander une œuvre', href: '#contact' },
        ghost: { label: 'Visiter l’Atelier', href: 'https://www.latelierdetony.fr/', external: true }
      },
      blocks: [
        {
          type: 'branches',
          kicker: 'DEUX BRANCHES',
          title: 'L’œuvre personnelle et la commande',
          items: [
            {
              n: '01', t: 'Œuvre personnelle',
              lead: 'Le travail que je mène pour moi : c’est là que se fait la recherche.',
              list: ['Peinture', 'Dessin', 'Recherche visuelle', 'Matière', 'Couleur', 'Expression personnelle']
            },
            {
              n: '02', t: 'Commandes',
              lead: 'Le travail que je mène pour quelqu’un : une intention précise, une pièce unique.',
              list: ['Portraits', 'Dessins', 'Illustrations', 'Pièces sur commande', 'Œuvres personnalisées']
            }
          ]
        },
        {
          type: 'gallery',
          kicker: 'ŒUVRES',
          title: 'Un aperçu de l’atelier',
          lead: 'Peinture, dessin, portraits et commandes — sélection issue de L’Atelier de Tony.',
          items: [
            { cat: 'Portraits', t: 'Portraits noir et blanc', src: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsNoirEtBlanc-1024x683.png', full: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsNoirEtBlanc.png', w: 1024, h: 683, alt: 'Portraits dessinés en noir et blanc réalisés par Anthony Pereira — L’Atelier de Tony' },
            { cat: 'Dessin', t: 'Portraits sur mesure', src: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsSurMesure-1024x683.png', full: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsSurMesure.png', w: 1024, h: 683, alt: 'Portraits dessinés sur mesure — L’Atelier de Tony' },
            { cat: 'Illustration', t: 'Portraits digitaux', src: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsDigital-1024x683.png', full: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/PortraitsDigital.png', w: 1024, h: 683, alt: 'Portraits illustrés en digital — L’Atelier de Tony' },
            { cat: 'Commandes', t: 'Pièce encadrée sur commande', src: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/CadreCouple-1024x576.png', full: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/CadreCouple.png', w: 1024, h: 576, alt: 'Œuvre encadrée réalisée sur commande — L’Atelier de Tony' },
            { cat: 'Commandes', t: 'Souvenir personnalisé', src: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/SouvenirVacance-1024x576.png', full: 'https://www.latelierdetony.fr/wp-content/uploads/2025/04/SouvenirVacance.png', w: 1024, h: 576, alt: 'Œuvre souvenir personnalisée réalisée sur commande — L’Atelier de Tony' }
          ]
        }
      ]
    },

    {
      slug: 'collaborations',
      role: 'Créatif multidisciplinaire · Co-concepteur de projets · Explorateur numérique',
      roleSub: 'Ouvert aux projets qui traversent les disciplines',
      num: '05',
      nav: 'Collaborations',
      navSub: 'Design × IA × Art × Business',
      docTitle: 'Collaborations',
      themeColor: '#08090E',
      idea: 'Les projets les plus intéressants ne rentrent pas toujours dans une case.',
      title: 'Collaborations',
      signature: 'Ouvert aux projets qui traversent les disciplines',
      heroMessage: 'Si une idée mérite d’être structurée, conçue, mise en image ou transformée en expérience, je suis ouvert à la discussion.',
      meta: [
        { k: 'Croisements', v: 'Design × IA × Art × Business' },
        { k: 'Disponibilité', v: 'Ouvert aux projets' },
        { k: 'Format', v: 'Bordeaux · à distance' }
      ],
      manifesto: [
        'Les quatre territoires précédents décrivent des pratiques établies. Celui-ci décrit ce qui se passe quand elles se rencontrent.',
        'Un projet culturel qui a besoin d’un système visuel. Un produit qui a besoin d’une direction. Une idée qui a besoin d’être structurée avant d’exister. C’est souvent là que le travail devient intéressant.'
      ],
      careerNote: 'Lecture orientée transversalité : un parcours qui traverse le terrain, la production, le design, le numérique, l’IA et la pratique artistique.',
      emphasis: ['terrain', 'omega', 'freelance', 'atelier', 'tcd'],
      families: ['creative', 'ai', 'art', 'business', 'digital', 'training'],
      cta: {
        title: 'Proposer une collaboration',
        lead: 'Un projet, une idée, un format inhabituel — écrivez-moi.',
        primary: { label: 'Proposer une collaboration', href: '#contact' },
        ghost: { label: 'Voir le studio', href: 'https://www.tonycreativedesign.fr/', external: true }
      },
      blocks: [
        {
          type: 'convergence',
          kicker: 'CONVERGENCE',
          title: 'Connecter les disciplines',
          lead: 'Chaque territoire apporte quelque chose que les autres n’ont pas. Une collaboration réussie en mobilise plusieurs à la fois.',
          items: [
            { n: '01', t: 'Direction créative', d: 'La grille, la précision, le système visuel.' },
            { n: '02', t: 'IA & Formation', d: 'Les flux, les connexions, la mise en système.' },
            { n: '03', t: 'Business', d: 'La structure, le cadre, la production tenable.' },
            { n: '04', t: 'Atelier', d: 'La matière, le geste, la charge émotionnelle.' }
          ]
        },
        {
          type: 'openfield',
          kicker: 'CHAMP OUVERT',
          title: 'Ce qui m’intéresse',
          cols: [
            { t: 'Territoires', items: ['Direction créative', 'Design', 'Produits numériques', 'IA & innovation', 'Art', 'Musique', 'Culture', 'Éditorial', 'Entrepreneuriat', 'Concepts expérimentaux', 'Projets pluridisciplinaires'] },
            { t: 'Interlocuteurs', items: ['Artistes', 'Studios', 'Agences', 'Entreprises', 'Organismes de formation', 'Entrepreneurs', 'Collectifs', 'Créateurs', 'Porteurs de projet'] }
          ]
        },
        {
          type: 'note',
          kicker: 'EXEMPLE',
          title: '341STUDIO · NightFury · 341Records',
          text: 'Un territoire créatif et culturel mené discrètement en parallèle, autour de la musique et de l’image. Il illustre le type de collaboration qui ne rentre dans aucune des quatre cases précédentes — et qui m’intéresse précisément pour cette raison.',
          link: { label: 'Voir le contexte', href: 'https://www.tonycreativedesign.fr/creation-site-web-bordeaux/', external: true }
        }
      ]
    }
  ];

  const BY_SLUG = {};
  TERRITORIES.forEach(t => { BY_SLUG[t.slug] = t; });
  const DEFAULT_SLUG = 'direction-creative';

  /* ============================================================
     1. HTML HELPERS
     ============================================================ */
  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  function extAttrs(url) {
    return url ? ' target="_blank" rel="noopener noreferrer"' : '';
  }

  function markSvg(key) {
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${MARKS[key] || MARKS.orbit}</svg>`;
  }

  function projectCard(id, variant, index) {
    const p = PROJECTS[id];
    if (!p) return '';
    const isLink = Boolean(p.url);
    const tag = isLink ? 'a' : 'article';
    const href = isLink ? ` href="${esc(p.url)}"${extAttrs(p.url)}` : '';
    const label = isLink ? ` aria-label="${esc(p.name)} — ${esc(p.kicker.toLowerCase())} (nouvelle fenêtre)"` : '';
    const action = isLink
      ? '<span class="pcard-arrow" aria-hidden="true">↗</span>'
      : '<span class="pcard-nolink">Cas privé</span>';

    return `
      <${tag} class="pcard pcard--${variant}${isLink ? '' : ' pcard--static'}"${href}${label} style="--i:${index}">
        <div class="pcard-head">
          <span class="pcard-num">${String(index + 1).padStart(2, '0')}</span>
          <span class="pcard-context">${esc(p.context)}</span>
        </div>
        <div class="pcard-visual" aria-hidden="true">
          ${markSvg(p.mark)}
          <span class="pcard-glyph">${esc(p.glyph)}</span>
        </div>
        <div class="pcard-body">
          <span class="pcard-kicker">${esc(p.kicker)}</span>
          <h4 class="pcard-name">${esc(p.name)}</h4>
          <p class="pcard-desc">${esc(p.desc)}</p>
        </div>
        <div class="pcard-foot">
          <div class="pcard-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          ${action}
        </div>
      </${tag}>`;
  }

  /* A featured client case: bigger, with its facets exposed like a mini case study. */
  function clientFeatureCard(id, index) {
    const p = PROJECTS[id];
    if (!p) return '';
    const isLink = Boolean(p.url);
    const tag = isLink ? 'a' : 'article';
    const href = isLink ? ` href="${esc(p.url)}"${extAttrs(p.url)}` : '';
    const label = isLink ? ` aria-label="${esc(p.name)} — ${esc(p.kicker.toLowerCase())} (nouvelle fenêtre)"` : '';
    const facets = (p.facets || []).map(f => `
      <div class="cfeat-facet"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('');

    return `
      <${tag} class="cfeat${isLink ? '' : ' cfeat--static'}"${href}${label} style="--i:${index}">
        <div class="cfeat-head">
          <span class="cfeat-num">${String(index + 1).padStart(2, '0')}</span>
          <span class="cfeat-context">${esc(p.context)}</span>
        </div>
        <div class="cfeat-visual" aria-hidden="true">
          ${markSvg(p.mark)}
          <span class="cfeat-glyph">${esc(p.glyph)}</span>
        </div>
        <div class="cfeat-body">
          <span class="cfeat-kicker">${esc(p.kicker)}</span>
          <h4 class="cfeat-name">${esc(p.name)}</h4>
          <p class="cfeat-desc">${esc(p.desc)}</p>
          ${facets ? `<dl class="cfeat-facets">${facets}</dl>` : ''}
        </div>
        <div class="cfeat-foot">
          <div class="cfeat-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          ${isLink
            ? '<span class="cfeat-cta">Voir le site <span aria-hidden="true">↗</span></span>'
            : '<span class="pcard-nolink">Étude de cas privée</span>'}
        </div>
      </${tag}>`;
  }

  function blockHead(b) {
    if (!b.kicker && !b.title) return '';
    return `
      <header class="block-head">
        ${b.kicker ? `<span class="block-kicker"><span class="block-kicker-mark" aria-hidden="true"></span>${esc(b.kicker)}</span>` : ''}
        ${b.title ? `<h3 class="block-title">${esc(b.title)}</h3>` : ''}
        ${b.lead ? `<p class="block-lead">${esc(b.lead)}</p>` : ''}
      </header>`;
  }

  /* ============================================================
     2. BLOCK RENDERERS
     ============================================================ */
  const RENDER = {
    feature(b) {
      const p = PROJECTS[b.project] || {};
      const link = p.url
        ? `<a class="btn btn-primary" href="${esc(p.url)}"${extAttrs(p.url)}>
             <span class="btn-label">Voir ${esc(p.name)}</span><span class="btn-arrow" aria-hidden="true">↗</span>
           </a>`
        : '';
      return `
        <section class="block block--feature reveal">
          <div class="feature">
            <div class="feature-main">
              <span class="block-kicker"><span class="block-kicker-mark" aria-hidden="true"></span>${esc(b.kicker)}</span>
              <h3 class="feature-name">${esc(p.name || '')}</h3>
              <p class="feature-subtitle">${esc(b.subtitle)}</p>
              <p class="feature-lead">${esc(b.lead)}</p>
              <ol class="feature-points">
                ${b.points.map(pt => `
                  <li class="feature-point">
                    <span class="feature-point-num">${esc(pt.n)}</span>
                    <div>
                      <h4 class="feature-point-title">${esc(pt.t)}</h4>
                      <p class="feature-point-desc">${esc(pt.d)}</p>
                    </div>
                  </li>`).join('')}
              </ol>
              ${link ? `<div class="feature-actions">${link}</div>` : ''}
            </div>
            <aside class="feature-side">
              <div class="feature-visual" aria-hidden="true">
                ${markSvg(p.mark)}
                <span class="feature-visual-glyph">${esc(p.glyph || '')}</span>
              </div>
              <dl class="feature-facets">
                ${b.facets.map(f => `<div class="feature-facet"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}
              </dl>
              <div class="feature-tags">${(p.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
            </aside>
          </div>
        </section>`;
    },

    projects(b) {
      return `
        <section class="block block--projects reveal">
          ${blockHead(b)}
          <div class="pgrid pgrid--${b.variant} reveal-stagger">
            ${b.items.map((id, i) => projectCard(id, b.variant, i)).join('')}
          </div>
        </section>`;
    },

    /* Two tiers in one block: the two flagship client cases, then the rest. */
    clients(b) {
      return `
        <section class="block block--clients reveal">
          ${blockHead(b)}
          <div class="cgrid reveal-stagger">
            ${b.featured.map((id, i) => clientFeatureCard(id, i)).join('')}
          </div>
          <div class="pgrid pgrid--clients reveal-stagger">
            ${b.secondary.map((id, i) => projectCard(id, 'clients', i)).join('')}
          </div>
        </section>`;
    },

    pillars(b) {
      return `
        <section class="block block--pillars reveal">
          ${blockHead(b)}
          <div class="pillars reveal-stagger">
            ${b.items.map(it => `
              <article class="pillar">
                <span class="pillar-num">${esc(it.n)}</span>
                <h4 class="pillar-title">${esc(it.t)}</h4>
                <p class="pillar-lead">${esc(it.lead)}</p>
                <ul class="pillar-list">
                  ${it.list.map(l => `<li>${esc(l)}</li>`).join('')}
                </ul>
              </article>`).join('')}
          </div>
        </section>`;
    },

    field(b) {
      return `
        <section class="block block--field reveal">
          <div class="field">
            <div class="field-text">
              <span class="block-kicker"><span class="block-kicker-mark" aria-hidden="true"></span>${esc(b.kicker)}</span>
              <h3 class="field-title">${esc(b.title)}</h3>
              ${b.paras.map(p => `<p class="field-para">${esc(p)}</p>`).join('')}
              <p class="field-closing">${esc(b.closing)}</p>
            </div>
            <ol class="field-chain" aria-label="Progression du parcours, du terrain vers l’IA">
              ${b.chain.map((c, i) => `
                <li class="field-step" style="--i:${i}">
                  <span class="field-step-dot" aria-hidden="true"></span>
                  <span class="field-step-num">${String(i + 1).padStart(2, '0')}</span>
                  <span class="field-step-label">${esc(c)}</span>
                </li>`).join('')}
            </ol>
          </div>
        </section>`;
    },

    process(b) {
      return `
        <section class="block block--process reveal">
          ${blockHead(b)}
          <ol class="process process--${b.layout} reveal-stagger">
            ${b.steps.map((s, i) => `
              <li class="process-step" style="--i:${i}">
                <span class="process-step-num">${esc(s.n)}</span>
                <h4 class="process-step-title">${esc(s.t)}</h4>
                <p class="process-step-desc">${esc(s.d)}</p>
                <span class="process-step-link" aria-hidden="true"></span>
              </li>`).join('')}
          </ol>
        </section>`;
    },

    levels(b) {
      return `
        <section class="block block--levels reveal">
          ${blockHead(b)}
          <div class="levels reveal-stagger">
            ${b.items.map(it => `
              <article class="level">
                <span class="level-num">${esc(it.n)}</span>
                <h4 class="level-title">${esc(it.t)}</h4>
                <p class="level-desc">${esc(it.d)}</p>
              </article>`).join('')}
          </div>
          ${b.note ? `<p class="levels-note">${esc(b.note)}</p>` : ''}
        </section>`;
    },

    branches(b) {
      return `
        <section class="block block--branches reveal">
          ${blockHead(b)}
          <div class="branches reveal-stagger">
            ${b.items.map(it => `
              <article class="branch">
                <span class="branch-num">${esc(it.n)}</span>
                <h4 class="branch-title">${esc(it.t)}</h4>
                <p class="branch-lead">${esc(it.lead)}</p>
                <ul class="branch-list">${it.list.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
              </article>`).join('')}
          </div>
        </section>`;
    },

    gallery(b) {
      return `
        <section class="block block--gallery reveal">
          ${blockHead(b)}
          <div class="gallery">
            ${b.items.map((it, i) => `
              <figure class="art" style="--i:${i}">
                <div class="art-frame">
                  <img src="${esc(it.src)}" srcset="${esc(it.src)} ${it.w}w, ${esc(it.full)} 1536w"
                       sizes="(max-width: 760px) 92vw, 46vw"
                       width="${it.w}" height="${it.h}"
                       alt="${esc(it.alt)}" loading="lazy" decoding="async">
                </div>
                <figcaption class="art-caption">
                  <span class="art-cat">${esc(it.cat)}</span>
                  <span class="art-title">${esc(it.t)}</span>
                </figcaption>
              </figure>`).join('')}
          </div>
        </section>`;
    },

    convergence(b) {
      return `
        <section class="block block--convergence reveal">
          ${blockHead(b)}
          <div class="converge reveal-stagger">
            ${b.items.map(it => `
              <article class="converge-cell converge-cell--${it.n}">
                <span class="converge-num">${esc(it.n)}</span>
                <h4 class="converge-title">${esc(it.t)}</h4>
                <p class="converge-desc">${esc(it.d)}</p>
              </article>`).join('')}
            <span class="converge-core" aria-hidden="true"></span>
          </div>
        </section>`;
    },

    openfield(b) {
      return `
        <section class="block block--openfield reveal">
          ${blockHead(b)}
          <div class="openfield">
            ${b.cols.map(c => `
              <div class="openfield-col">
                <h4 class="openfield-title">${esc(c.t)}</h4>
                <ul class="openfield-list">${c.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
              </div>`).join('')}
          </div>
        </section>`;
    },

    note(b) {
      const link = b.link
        ? `<a class="note-link" href="${esc(b.link.href)}"${b.link.external ? extAttrs(b.link.href) : ''}>
             <span>${esc(b.link.label)}</span><span aria-hidden="true">↗</span></a>`
        : '';
      const aside = b.aside
        ? `<p class="note-aside"><span>${esc(b.aside.label)}</span>
             <a href="${esc(b.aside.href)}" target="_blank" rel="noopener noreferrer">${esc(b.aside.text)} <span aria-hidden="true">↗</span></a></p>`
        : '';
      return `
        <section class="block block--note reveal">
          <div class="note">
            <div class="note-body">
              <span class="block-kicker"><span class="block-kicker-mark" aria-hidden="true"></span>${esc(b.kicker)}</span>
              <h3 class="note-title">${esc(b.title)}</h3>
              <p class="note-text">${esc(b.text)}</p>
              ${link}
              ${aside}
            </div>
          </div>
        </section>`;
    }
  };

  function renderCta(t) {
    const g = t.cta.ghost;
    return `
      <section class="block block--cta reveal">
        <div class="stage-cta">
          <div>
            <h3 class="stage-cta-title">${esc(t.cta.title)}</h3>
            <p class="stage-cta-lead">${esc(t.cta.lead)}</p>
          </div>
          <div class="stage-cta-actions">
            <a class="btn btn-primary" href="${esc(t.cta.primary.href)}" data-magnetic>
              <span class="btn-label">${esc(t.cta.primary.label)}</span><span class="btn-arrow" aria-hidden="true">↗</span>
            </a>
            <a class="btn btn-ghost" href="${esc(g.href)}"${g.external ? extAttrs(g.href) : ''} data-magnetic>
              <span class="btn-label">${esc(g.label)}</span>
            </a>
          </div>
        </div>
      </section>`;
  }

  function renderStage(t) {
    return `
      <div class="stage-intro">
        <div class="stage-intro-head">
          <span class="stage-num">${esc(t.num)}</span>
          <span class="stage-rule" aria-hidden="true"></span>
          <span class="stage-signature">${esc(t.signature)}</span>
        </div>
        <h2 class="stage-title">${esc(t.title)}</h2>
        <p class="stage-idea">${esc(t.idea)}</p>
        <div class="stage-manifesto">
          ${t.manifesto.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
      </div>
      ${t.blocks.map(b => (RENDER[b.type] ? RENDER[b.type](b) : '')).join('')}
      ${renderCta(t)}`;
  }

  function renderFamilies(t) {
    return t.families.map((key, i) => {
      const f = FAMILIES[key];
      if (!f) return '';
      return `
        <article class="family" style="--i:${i}" data-family="${esc(key)}">
          <header class="family-head">
            <span class="family-num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="family-name">${esc(f.name)}</h3>
          </header>
          <p class="family-lead">${esc(f.lead)}</p>
          <ul class="family-list">${f.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </article>`;
    }).join('');
  }

  /* ============================================================
     3. TERRITORY CONTROLLER
     ============================================================ */
  const state = { slug: null, transitioning: false };

  function initTerritories() {
    const root = document.documentElement;
    const body = document.body;
    const stage = document.getElementById('territory-stage');
    const familiesWrap = document.getElementById('families');
    const nav = document.querySelector('.tnav');
    const buttons = Array.from(document.querySelectorAll('.tnav-btn'));
    const marker = document.querySelector('.tnav-marker');
    const heroMsg = document.getElementById('hero-territory-message');
    const heroMeta = document.getElementById('hero-territory-meta');
    const heroRole = document.getElementById('hero-role');
    const heroRoleSub = document.getElementById('hero-role-sub');
    const careerNote = document.getElementById('career-note');
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    function positionMarker(btn) {
      if (!marker || !btn || !nav) return;
      const stacked = window.matchMedia('(max-width: 860px)').matches;
      const navRect = nav.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      if (stacked) {
        marker.style.transform = `translateY(${r.top - navRect.top}px)`;
        marker.style.width = '100%';
        marker.style.height = r.height + 'px';
      } else {
        marker.style.transform = `translateX(${r.left - navRect.left}px)`;
        marker.style.width = r.width + 'px';
        marker.style.height = '100%';
      }
    }

    function setActiveButton(slug) {
      buttons.forEach(b => {
        const active = b.dataset.territory === slug;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
        b.setAttribute('tabindex', active ? '0' : '-1');
      });
      const active = buttons.find(b => b.dataset.territory === slug);
      requestAnimationFrame(() => positionMarker(active));
    }

    function paintHero(t) {
      if (heroRole) heroRole.textContent = t.role;
      if (heroRoleSub) heroRoleSub.textContent = t.roleSub;
      if (heroMsg) heroMsg.textContent = t.heroMessage;
      if (heroMeta) {
        heroMeta.innerHTML = t.meta.map(m => `
          <div class="hero-metric">
            <span class="hero-metric-k">${esc(m.k)}</span>
            <span class="hero-metric-v">${esc(m.v)}</span>
          </div>`).join('');
      }
      if (careerNote) careerNote.textContent = t.careerNote;
      if (themeMeta) themeMeta.setAttribute('content', t.themeColor);
      document.title = `${t.docTitle} — Anthony Pereira | Directeur créatif, IA & formation`;
      document.querySelectorAll('[data-career-key]').forEach(el => {
        el.classList.toggle('is-emphasis', t.emphasis.includes(el.dataset.careerKey));
      });
    }

    function paint(t) {
      if (stage) stage.innerHTML = renderStage(t);
      if (familiesWrap) familiesWrap.innerHTML = renderFamilies(t);
      paintHero(t);
      observeNew();
      bindMagneticButtons(document.querySelectorAll('[data-magnetic]'));
      bindInternalScroll(document.querySelectorAll('#territory-stage a[href^="#"]'));
    }

    function apply(slug, opts) {
      const t = BY_SLUG[slug] || BY_SLUG[DEFAULT_SLUG];
      const options = opts || {};
      if (state.slug === t.slug && !options.force) {
        setActiveButton(t.slug);
        return;
      }
      state.slug = t.slug;
      root.dataset.territory = t.slug;
      body.dataset.territory = t.slug;
      setActiveButton(t.slug);

      if (options.instant || reduced) {
        paint(t);
        return;
      }

      state.transitioning = true;
      body.classList.add('is-switching');
      window.setTimeout(() => {
        paint(t);
        body.classList.remove('is-switching');
        body.classList.add('is-switched');
        window.setTimeout(() => {
          body.classList.remove('is-switched');
          state.transitioning = false;
        }, 520);
      }, 260);
    }

    function go(slug, push) {
      apply(slug);
      if (push !== false && window.history && window.history.pushState) {
        window.history.pushState({ territory: slug }, '', '#' + slug);
      }
    }

    buttons.forEach((b, idx) => {
      b.addEventListener('click', () => go(b.dataset.territory));
      b.addEventListener('keydown', e => {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const last = buttons.length - 1;
        let next = idx;
        if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = idx <= 0 ? last : idx - 1;
        else next = idx >= last ? 0 : idx + 1;
        buttons[next].focus();
        go(buttons[next].dataset.territory);
      });
    });

    window.addEventListener('popstate', () => {
      const slug = (location.hash || '').replace('#', '');
      apply(BY_SLUG[slug] ? slug : DEFAULT_SLUG);
    });

    window.addEventListener('resize', () => {
      const active = buttons.find(b => b.classList.contains('is-active'));
      requestAnimationFrame(() => positionMarker(active));
    });

    // Initial paint — honour a shared territory URL, default otherwise.
    const initialSlug = (location.hash || '').replace('#', '');
    const startSlug = BY_SLUG[initialSlug] ? initialSlug : DEFAULT_SLUG;
    if (marker) marker.style.transition = 'none';
    apply(startSlug, { instant: true, force: true });
    requestAnimationFrame(() => {
      const active = buttons.find(b => b.classList.contains('is-active'));
      positionMarker(active);
      requestAnimationFrame(() => { if (marker) marker.style.transition = ''; });
    });
  }

  /* ============================================================
     4. SCROLL REVEAL
     ============================================================ */
  let revealObserver = null;
  let staggerObserver = null;

  function initRevealSystem() {
    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const staticTargets = [
      '.section-head', '.career-item', '.career-toggle-wrap',
      '.edu-card', '.education', '.tools-section-head', '.tools-cluster',
      '.contact-block > *', '.section-lead'
    ];
    staticTargets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -70px 0px' });

    staggerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.edu-grid, .family-grid, .tools-grid').forEach(g => g.classList.add('reveal-stagger'));
    observeNew();
  }

  /* Observe freshly rendered nodes; anything already on screen reveals at once. */
  function observeNew() {
    if (reduced || !revealObserver) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const vh = window.innerHeight || 0;
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
      if (el.dataset.observed === '1') return;
      el.dataset.observed = '1';
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('is-visible');
      else revealObserver.observe(el);
    });
    document.querySelectorAll('.reveal-stagger:not(.is-visible)').forEach(el => {
      if (el.dataset.observedStagger === '1') return;
      el.dataset.observedStagger = '1';
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('is-visible');
      else staggerObserver.observe(el);
    });
  }

  /* ============================================================
     5. CAREER — essentiel / complet
     ============================================================ */
  function initCareer() {
    const btn = document.querySelector('.career-toggle');
    const extra = document.getElementById('career-full');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      const open = extra.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      extra.hidden = !open;
      btn.querySelector('.career-toggle-label').textContent =
        open ? 'Masquer le parcours complet' : 'Voir le parcours complet';
      if (open) observeNew();
    });
  }

  /* ============================================================
     6. MOBILE NAV
     ============================================================ */
  function initNavToggle() {
    const burger = document.querySelector('.nav-burger');
    const nav = document.querySelector('.topnav');
    if (!burger || !nav) return;
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ============================================================
     7. SMOOTH SCROLL — internal anchors keep the territory hash intact
     ============================================================ */
  function bindInternalScroll(nodes) {
    nodes.forEach(a => {
      if (a.dataset.scrollBound === '1') return;
      a.dataset.scrollBound = '1';
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        if (BY_SLUG[id.slice(1)]) return; // territory links are handled elsewhere
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  function initSmoothScroll() {
    bindInternalScroll(document.querySelectorAll('a[href^="#"]'));
  }

  /* ============================================================
     8. TOPBAR SCROLL
     ============================================================ */
  function initTopbarScroll() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    let lastY = window.pageYOffset;
    let ticking = false;
    function update() {
      const y = window.pageYOffset;
      const delta = y - lastY;
      if (y < 80) topbar.classList.remove('is-hidden');
      else if (delta > 6) topbar.classList.add('is-hidden');
      else if (delta < -6) topbar.classList.remove('is-hidden');
      topbar.classList.toggle('is-scrolled', y > 40);
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ============================================================
     9. SCROLL SPY
     ============================================================ */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.topnav a');
    if (!sections.length || !links.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }

  /* ============================================================
     10. CURSOR LIGHT
     ============================================================ */
  function initCursorLight() {
    const light = document.getElementById('cursorLight');
    if (!light) return;
    let mx = 0, my = 0, lx = 0, ly = 0, raf = null;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      light.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(loop);
    });
    document.addEventListener('mouseleave', () => { light.style.opacity = '0'; });
    function loop() {
      lx += (mx - lx) * 0.12;
      ly += (my - ly) * 0.12;
      light.style.left = lx + 'px';
      light.style.top = ly + 'px';
      if (Math.abs(mx - lx) > 0.1 || Math.abs(my - ly) > 0.1) raf = requestAnimationFrame(loop);
      else raf = null;
    }
  }

  /* ============================================================
     11. MAGNETIC BUTTONS
     ============================================================ */
  function initMagneticButtons() {
    bindMagneticButtons(document.querySelectorAll('[data-magnetic]'));
  }

  function bindMagneticButtons(nodes) {
    if (reduced || isCoarse) return;
    nodes.forEach(el => {
      if (el.dataset.magneticBound === '1') return;
      el.dataset.magneticBound = '1';
      const strength = 0.16;
      const max = 12;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        const tx = Math.max(Math.min(x * strength, max), -max);
        const ty = Math.max(Math.min(y * strength, max), -max);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        const label = el.querySelector('.btn-label, .contact-primary-email');
        if (label) label.style.transform = `translate(${tx * 0.35}px, ${ty * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        const label = el.querySelector('.btn-label, .contact-primary-email');
        if (label) label.style.transform = '';
      });
    });
  }

  /* ============================================================
     12. PARALLAX
     ============================================================ */
  function initParallax() {
    const photo = document.querySelector('.hero-photo');
    const glowA = document.querySelector('.ambient-glow--a');
    const glowB = document.querySelector('.ambient-glow--b');
    if (photo) {
      const hero = photo.closest('.hero');
      if (hero) {
        hero.addEventListener('mousemove', e => {
          const r = hero.getBoundingClientRect();
          const cx = (e.clientX - r.left) / r.width - 0.5;
          const cy = (e.clientY - r.top) / r.height - 0.5;
          photo.style.transform = `translate3d(${cx * 10}px, ${cy * 7}px, 0)`;
        });
        hero.addEventListener('mouseleave', () => { photo.style.transform = ''; });
      }
    }
    let ticking = false;
    function onScroll() {
      const y = window.pageYOffset;
      if (glowA) glowA.style.transform = `translate3d(0, ${y * 0.07}px, 0)`;
      if (glowB) glowB.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initRevealSystem();
    initTerritories();
    initCareer();
    initNavToggle();
    initSmoothScroll();
    initTopbarScroll();
    initScrollSpy();
    if (!isCoarse && !reduced) {
      initCursorLight();
      initMagneticButtons();
      initParallax();
    }
  });

  /* If the preference flips to "reduce" mid-visit, nothing may stay stranded at opacity 0. */
  motionQuery.addEventListener('change', e => {
    reduced = e.matches;
    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
    } else {
      observeNew();
    }
  });

  window.__cv = {
    get reduced() { return reduced; },
    isCoarse,
    territories: TERRITORIES.map(t => t.slug)
  };
})();
