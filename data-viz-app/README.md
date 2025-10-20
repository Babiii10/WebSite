# Application de Visualisation de Données

Une application web moderne et interactive pour visualiser des données à partir de fichiers CSV et Excel. Créez facilement des graphiques personnalisés avec une interface intuitive.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Fonctionnalités

### 📊 Types de Graphiques Supportés
- **Scatter** - Points de données avec options de taille et couleur
- **Line** - Graphiques linéaires pour évolutions temporelles
- **Bar** - Barres verticales pour comparaisons
- **Area** - Graphiques d'aires cumulées
- **Pie** - Diagrammes circulaires pour proportions
- **Histogram** - Distribution de fréquences
- **Box Plot** - Boîtes à moustaches pour statistiques
- **Violin Plot** - Distribution dense des données
- **Heatmap** - Cartes de chaleur matricielles
- **Bubble** - Scatter avec dimension de taille

### 🛠️ Fonctionnalités Principales

#### 1. Upload et Parsing
- Support CSV et Excel (.xlsx, .xls)
- Détection automatique des types de colonnes
- Validation et gestion d'erreurs
- Upload jusqu'à 50 Mo
- Données exemple intégrées

#### 2. Aperçu et Nettoyage
- Prévisualisation des 100 premières lignes
- Suppression des doublons
- Suppression des valeurs manquantes
- Filtres avancés (égal, contient, plus grand que, etc.)
- Conversion de types de colonnes
- Statistiques en temps réel

#### 3. Mapping et Configuration
- Mapping automatique intelligent des colonnes
- Configuration manuelle des axes (X, Y)
- Options de couleur et taille
- Support des facettes (sous-graphiques)
- Agrégation de données (somme, moyenne, médiane, etc.)
- Validation des configurations

#### 4. Personnalisation Visuelle
- Titre et labels d'axes personnalisables
- 12 palettes de couleurs prédéfinies
- Affichage/masquage de légende et grille
- Hauteur de graphique ajustable
- Annotations et tooltips interactifs

#### 5. Interactions
- Zoom et pan natifs (Plotly)
- Tooltips détaillés au survol
- Sélection et filtrage dynamique
- Hover compare et closest
- Mode responsive

#### 6. Export et Sauvegarde
- **Export PNG** - Haute résolution (1920x1080)
- **Export SVG** - Format vectoriel
- **Export CSV** - Données nettoyées
- **Sauvegarde de configuration** - JSON téléchargeable
- **Chargement de configuration** - Restauration rapide

## 🏗️ Stack Technique

### Frontend
- **React 18** - Framework UI moderne
- **Vite** - Build tool ultra-rapide
- **Plotly.js** - Bibliothèque de visualisation interactive
- **React-Plotly.js** - Wrapper React pour Plotly
- **Zustand** - State management léger
- **Tailwind CSS** - Framework CSS utilitaire
- **PapaParse** - Parser CSV performant
- **SheetJS (xlsx)** - Parser Excel
- **React Icons** - Icônes SVG

### Backend (Optionnel)
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimaliste
- **Multer** - Gestion d'upload de fichiers
- **CORS** - Cross-origin resource sharing

### Outils de Développement
- **PostCSS** - Transformations CSS
- **Autoprefixer** - Préfixes CSS automatiques
- **Vitest** - Framework de tests unitaires

## 📦 Installation

### Prérequis
- Node.js 18+ et npm 9+
- Git

### 1. Cloner le Repository
```bash
git clone <repository-url>
cd data-viz-app
```

### 2. Installation Frontend
```bash
cd frontend
npm install
```

### 3. Installation Backend (Optionnel)
```bash
cd ../backend
npm install
```

## 🚀 Démarrage

### Mode Développement

#### Frontend uniquement (recommandé)
```bash
cd frontend
npm run dev
```
L'application sera accessible sur `http://localhost:3000`

#### Avec Backend
Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Mode Production

#### Build Frontend
```bash
cd frontend
npm run build
```

Les fichiers de production seront dans `frontend/dist/`

#### Déploiement
```bash
# Preview du build
npm run preview

# Servir avec un serveur statique
npx serve -s dist
```

## 📖 Guide d'Utilisation

### 1. Upload de Données

**Option A : Fichier Personnel**
1. Cliquez sur "Sélectionner un fichier" ou glissez-déposez
2. Choisissez un fichier CSV ou Excel
3. Attendez le parsing automatique

**Option B : Données Exemple**
1. Cliquez sur "Charger des données exemple"
2. Les données de ventes seront chargées automatiquement

### 2. Aperçu et Nettoyage

1. **Examinez les statistiques** en haut de la page
2. **Activez les options de nettoyage** :
   - Supprimer les doublons
   - Supprimer les valeurs manquantes
3. **Ajoutez des filtres** pour affiner les données
4. **Modifiez les types de colonnes** si nécessaire
5. Cliquez sur "Continuer vers le Mapping"

### 3. Configuration du Graphique

1. **Sélectionnez un type de graphique**
2. **Mappez les colonnes** aux axes :
   - Axe X (requis pour la plupart)
   - Axe Y (requis pour la plupart)
   - Couleur par (optionnel)
   - Taille par (optionnel pour bubble)
   - Facettes (optionnel)
3. **Configurez l'agrégation** si nécessaire
4. Cliquez sur "Générer le Graphique"

### 4. Personnalisation et Export

1. **Personnalisez l'apparence** :
   - Titre du graphique
   - Labels des axes
   - Palette de couleurs
   - Hauteur
   - Légende et grille
2. **Interagissez avec le graphique** :
   - Zoom avec la molette
   - Pan en cliquant-glissant
   - Hover pour tooltips
3. **Exportez** :
   - PNG pour présentations
   - SVG pour édition vectorielle
   - CSV pour données nettoyées
4. **Sauvegardez la configuration** pour réutilisation

## 🧪 Tests

### Tests Unitaires (Frontend)
```bash
cd frontend
npm run test
```

### Tests Manuels Recommandés

#### Test 1 : Upload CSV
1. Utilisez `sample-data/sales-data.csv`
2. Vérifiez que toutes les colonnes sont détectées
3. Vérifiez les types de données (Month: string, Sales: number)

#### Test 2 : Nettoyage
1. Chargez les données exemple
2. Activez "Supprimer les doublons"
3. Ajoutez un filtre : Sales > 8000
4. Vérifiez que le nombre de lignes diminue

#### Test 3 : Graphiques Multiples
Testez chaque type de graphique :
- Scatter : X=Month, Y=Sales, Color=Region
- Line : X=Month, Y=Sales, Color=Product
- Bar : X=Region, Y=Sales avec agrégation SUM
- Pie : X=Product, Y=Sales
- Histogram : X=Sales
- Box : X=Region, Y=Sales
- Heatmap : X=Month, Y=Region, Color=Sales

#### Test 4 : Export
1. Créez un graphique
2. Testez export PNG (vérifiez qualité)
3. Testez export SVG (ouvrez dans éditeur)
4. Testez export CSV (ouvrez dans Excel)

#### Test 5 : Configuration
1. Créez un graphique personnalisé
2. Sauvegardez la configuration
3. Rechargez la page
4. Uploadez les mêmes données
5. Chargez la configuration sauvegardée
6. Vérifiez que tout est restauré

## 📊 Exemples de Jeux de Données

### Sales Data (`sales-data.csv`)
Données de ventes mensuelles avec :
- Month (string) - Mois
- Region (string) - Région géographique
- Product (string) - Nom du produit
- Sales (number) - Ventes en euros
- Quantity (number) - Quantité vendue
- Profit (number) - Profit réalisé
- Customer_Count (number) - Nombre de clients

**Graphiques recommandés :**
- Line chart : Évolution des ventes par mois et région
- Bar chart : Comparaison des ventes par produit
- Heatmap : Sales par Month x Region
- Scatter : Sales vs Profit coloré par Region

### Iris Dataset (`iris.csv`)
Dataset classique de machine learning :
- sepal_length (number)
- sepal_width (number)
- petal_length (number)
- petal_width (number)
- species (string)

**Graphiques recommandés :**
- Scatter : petal_length vs petal_width, coloré par species
- Box plot : Distribution de petal_length par species
- Violin plot : Distribution de sepal_length par species

## 🔧 Configuration Avancée

### Vite Configuration
Modifiez `frontend/vite.config.js` pour :
- Changer le port de développement
- Configurer le proxy backend
- Optimiser le build

### Tailwind Configuration
Modifiez `frontend/tailwind.config.js` pour :
- Personnaliser les couleurs
- Ajouter des breakpoints
- Étendre le thème

### Zustand Store
Modifiez `frontend/src/store/useStore.js` pour :
- Ajouter des états
- Implémenter des actions personnalisées
- Intégrer des middlewares

## 🚀 Optimisations de Performance

### Implémentées
- **Code splitting** - Plotly, xlsx et papaparse chargés séparément
- **Lazy loading** - Composants chargés à la demande
- **Memoization** - useMemo pour données processées
- **Virtualisation des tableaux** - Aperçu limité à 100 lignes
- **Debouncing** - Sur les inputs de recherche/filtre

### Recommandations pour Datasets > 100k Lignes
1. Implémenter Web Workers pour parsing
2. Ajouter pagination côté client
3. Utiliser react-window pour virtualisation complète
4. Implémenter échantillonnage pour graphiques
5. Ajouter indexedDB pour cache local

## 🐛 Dépannage

### Problème : Le fichier ne se charge pas
- Vérifiez que le fichier est < 50 Mo
- Assurez-vous que c'est un CSV ou Excel valide
- Vérifiez la console pour erreurs détaillées

### Problème : Le graphique ne s'affiche pas
- Vérifiez que toutes les colonnes requises sont mappées
- Assurez-vous que les données existent après filtrage
- Vérifiez les types de colonnes (number pour axes Y)

### Problème : Export ne fonctionne pas
- Donnez les permissions de téléchargement au navigateur
- Vérifiez que plotRef est correctement initialisé
- Testez dans un autre navigateur

### Problème : Performance lente
- Réduisez la taille du dataset avec filtres
- Désactivez les doublons si non nécessaire
- Utilisez l'agrégation pour réduire les points

## 📝 Roadmap

### Version 1.1 (À venir)
- [ ] Support de plus de formats (JSON, Parquet)
- [ ] Graphiques 3D
- [ ] Animations de transition
- [ ] Partage de graphiques via URL
- [ ] Mode collaboratif

### Version 1.2
- [ ] Intégration avec bases de données
- [ ] API REST pour automatisation
- [ ] Dashboard avec plusieurs graphiques
- [ ] Thème sombre
- [ ] Support i18n (multilingue)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails

## 🙏 Remerciements

- [Plotly.js](https://plotly.com/javascript/) - Bibliothèque de visualisation
- [React](https://react.dev/) - Framework UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool
- [PapaParse](https://www.papaparse.com/) - Parser CSV
- [SheetJS](https://sheetjs.com/) - Parser Excel

## 📧 Contact

Pour questions ou support : [votre-email@example.com]

---

**Développé avec ❤️ en utilisant React + Plotly.js + Tailwind CSS**
