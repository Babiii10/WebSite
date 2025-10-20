# Guide de Démarrage Rapide

## Installation et Lancement (5 minutes)

### 1. Prérequis
Assurez-vous d'avoir installé :
- Node.js 18+ : [https://nodejs.org/](https://nodejs.org/)
- npm (inclus avec Node.js)

Vérifiez votre installation :
```bash
node --version  # doit afficher v18.x.x ou supérieur
npm --version   # doit afficher 9.x.x ou supérieur
```

### 2. Installation

```bash
# Naviguez vers le dossier frontend
cd data-viz-app/frontend

# Installez les dépendances (peut prendre 1-2 minutes)
npm install
```

### 3. Lancement

```bash
# Démarrez le serveur de développement
npm run dev
```

Ouvrez votre navigateur à : **http://localhost:3000**

✅ C'est tout ! L'application est prête à l'emploi.

## Premier Test (2 minutes)

### Essai avec Données Exemple

1. Sur la page d'accueil, cliquez sur **"Charger des données exemple"**
2. Cliquez sur **"Continuer vers le Mapping"**
3. Le type de graphique "Scatter" est déjà sélectionné
4. Cliquez sur **"Générer le Graphique"**
5. Votre premier graphique interactif s'affiche !

### Interactions Disponibles
- **Zoom** : Molette de la souris
- **Pan** : Cliquer-glisser
- **Tooltip** : Survolez les points
- **Export** : Panneau de droite

## Essai avec Vos Données (3 minutes)

### 1. Préparez votre fichier
Format accepté : CSV ou Excel (.xlsx, .xls)

Exemple de structure CSV :
```csv
Month,Sales,Region
Jan,1000,North
Feb,1500,North
Jan,1200,South
Feb,1800,South
```

### 2. Upload
1. Cliquez sur **"Recommencer"** (bouton rouge en haut à droite)
2. Glissez-déposez votre fichier ou cliquez pour sélectionner
3. Attendez le parsing (quasi instantané pour < 10k lignes)

### 3. Configuration
1. **Aperçu** : Vérifiez vos données, ajoutez des filtres si besoin
2. **Mapping** : Sélectionnez le type de graphique et les colonnes
3. **Visualisation** : Personnalisez et exportez

## Types de Graphiques - Guide Rapide

| Type | Quand l'utiliser | Config Min. |
|------|------------------|-------------|
| **Scatter** | Points de données, corrélations | X + Y |
| **Line** | Évolutions temporelles | X + Y |
| **Bar** | Comparaisons catégorielles | X + Y |
| **Pie** | Proportions, parts | Labels + Values |
| **Histogram** | Distributions | 1 variable |
| **Box/Violin** | Statistiques, distributions | Y (+ groupe opt.) |
| **Heatmap** | Matrices de valeurs | X + Y + Value |
| **Bubble** | 3-4 dimensions | X + Y + Size |

## Exemples d'Utilisation

### Exemple 1 : Ventes par Région
```
Type: Bar
X: Region
Y: Sales
Agrégation: Sum
```

### Exemple 2 : Évolution Temporelle
```
Type: Line
X: Date/Month
Y: Sales
Color: Product
```

### Exemple 3 : Corrélation
```
Type: Scatter
X: Marketing_Spend
Y: Sales
Color: Region
Size: Customer_Count
```

## Raccourcis Clavier

- **Ctrl+R / Cmd+R** : Recommencer avec nouvelles données

## Dépannage Express

### ❌ npm install échoue
```bash
# Nettoyez le cache npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ Port 3000 déjà utilisé
Modifiez dans `vite.config.js` :
```js
server: {
  port: 3001  // Changez le port
}
```

### ❌ Le graphique ne s'affiche pas
- Vérifiez que X et Y sont bien sélectionnés
- Assurez-vous que Y est de type "number"
- Vérifiez qu'il reste des données après filtrage

## Support et Documentation

- **Documentation complète** : Voir [README.md](./README.md)
- **Exemples de données** : Dossier `sample-data/`
- **Code source** : Dossier `frontend/src/`

## Prochaines Étapes

1. ✅ Testez tous les types de graphiques
2. ✅ Essayez les filtres et le nettoyage
3. ✅ Exportez en PNG/SVG
4. ✅ Sauvegardez une configuration
5. ✅ Explorez les options de personnalisation

**Bon usage ! 🚀**
