# Guide de Dépannage Windows

## 🔴 Erreur : `crypto.getRandomValues is not a function`

Cette erreur est spécifique à Windows et peut avoir plusieurs causes.

---

## ✅ SOLUTIONS (à essayer dans l'ordre)

### Solution 1 : Vérifier la Version Node.js ⭐ (PRIORITAIRE)

```powershell
# Vérifiez votre version
node --version
```

**Version requise :** Node.js **v18.0.0** ou supérieur
**Recommandé :** Node.js **v20.x LTS**

#### Si votre version est inférieure à v18 :

1. **Téléchargez Node.js 20.x LTS** : https://nodejs.org/
2. **Installez** (choisissez "Automatically install necessary tools")
3. **Redémarrez PowerShell** (important !)
4. **Vérifiez** : `node --version` → devrait afficher v20.x.x
5. **Relancez** : `npm run dev`

---

### Solution 2 : Nettoyer et Réinstaller

```powershell
# Naviguez vers le dossier frontend
cd C:\Users\[VotreNom]\Downloads\data-viz-app\frontend

# Supprimez les dossiers/fichiers problématiques
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue

# Nettoyez le cache npm
npm cache clean --force

# Réinstallez proprement
npm install

# Lancez l'application
npm run dev
```

---

### Solution 3 : Utiliser une Version Différente de Vite

Si les solutions ci-dessus ne fonctionnent pas, downgrader Vite peut aider :

```powershell
# Dans le dossier frontend
npm uninstall vite
npm install vite@4.5.0 --save-dev

# Relancez
npm run dev
```

---

### Solution 4 : Utiliser WSL2 (Windows Subsystem for Linux)

Si rien ne fonctionne, WSL2 offre une excellente compatibilité :

#### Installation WSL2 :

```powershell
# Dans PowerShell en tant qu'administrateur
wsl --install
```

Redémarrez votre PC, puis :

```bash
# Dans WSL2 Ubuntu
cd /mnt/c/Users/[VotreNom]/Downloads/data-viz-app/frontend
npm install
npm run dev
```

---

## 🔍 Diagnostic Avancé

### Vérifiez votre environnement :

```powershell
# Version Node.js
node --version

# Version npm
npm --version

# Version Windows
winver

# Vérifiez les variables d'environnement
echo $env:NODE_OPTIONS
```

**Résultats attendus :**
- Node.js : v18.0.0+ (idéal : v20.x)
- npm : 9.0.0+
- Windows : 10 ou 11

---

## 🐛 Erreurs Courantes et Solutions

### Erreur : `EACCES: permission denied`

```powershell
# Exécutez PowerShell en tant qu'administrateur
# Puis relancez npm install
```

### Erreur : `ENOENT: no such file or directory`

```powershell
# Assurez-vous d'être dans le bon dossier
cd C:\Users\[VotreNom]\Downloads\data-viz-app\frontend
pwd  # Vérifiez le chemin
```

### Erreur : `Cannot find module 'vite'`

```powershell
# Réinstallez Vite spécifiquement
npm install vite --save-dev
```

---

## 📊 Versions Testées et Compatibles

| Composant | Version Minimale | Version Recommandée | Testé sur Windows |
|-----------|------------------|---------------------|-------------------|
| Node.js | 18.0.0 | 20.11.0 LTS | ✅ |
| npm | 9.0.0 | 10.x | ✅ |
| Windows | 10 | 11 | ✅ |
| PowerShell | 5.1 | 7.x | ✅ |
| Vite | 4.5.0 | 5.4.x | ⚠️ (dépend Node.js) |

---

## 🚀 Démarrage Rapide (si tout est OK)

Une fois Node.js 18+ installé :

```powershell
# 1. Nettoyage complet
Remove-Item -Recurse -Force node_modules, .vite, package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

# 2. Installation propre
npm install

# 3. Lancement
npm run dev

# 4. Ouvrez le navigateur
# http://localhost:3000
```

---

## 📞 Aide Supplémentaire

### Si l'erreur persiste :

1. **Vérifiez les antivirus/firewalls** - Ils peuvent bloquer Node.js
2. **Essayez en mode sans échec** - Démarre Windows sans programmes tiers
3. **Utilisez WSL2** - Solution la plus fiable pour le développement web
4. **Postez l'erreur complète** - Incluez :
   - Version Node.js (`node --version`)
   - Version npm (`npm --version`)
   - Sortie complète de l'erreur
   - Système : Windows 10/11

### Logs utiles :

```powershell
# Créez un fichier de log pour diagnostic
npm run dev > error-log.txt 2>&1
# Partagez le contenu de error-log.txt
```

---

## ✅ Configuration vite.config.js Mise à Jour

Le fichier `vite.config.js` a été mis à jour avec :
- ✅ Compatibilité Windows améliorée
- ✅ Support `host: true` pour exposition réseau
- ✅ Configuration `global` → `globalThis`
- ✅ Optimisation des dépendances

Les modifications sont automatiquement appliquées après `npm install`.

---

## 🎯 Check-list de Dépannage

- [ ] Node.js version ≥ 18.0.0
- [ ] npm cache nettoyé
- [ ] node_modules supprimé et réinstallé
- [ ] PowerShell redémarré après installation Node.js
- [ ] Aucun antivirus bloquant Node.js
- [ ] Vite version compatible (4.5.0 ou 5.4.x)
- [ ] Fichier vite.config.js à jour

Si toutes les cases sont cochées et l'erreur persiste → **Utilisez WSL2**

---

**Dernière mise à jour :** 2025-10-21
**Testé sur :** Windows 10/11, Node.js 20.11.0, npm 10.2.4
