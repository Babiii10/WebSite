# Prérequis pour SkyReels-V2 Text-to-Video

## Guide Complet d'Installation et Configuration

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis Matériels (CRITIQUE)](#1-prérequis-matériels-critique)
2. [Prérequis Logiciels](#2-prérequis-logiciels)
3. [Installation Étape par Étape](#3-installation-étape-par-étape)
4. [Configuration Système](#4-configuration-système)
5. [Résolution de Problèmes](#5-résolution-de-problèmes)
6. [Optimisations et Recommandations](#6-optimisations-et-recommandations)

---

## 1. PRÉREQUIS MATÉRIELS (CRITIQUE)

### 1.1 GPU NVIDIA avec Support CUDA

**OBLIGATOIRE:** GPU NVIDIA avec architecture récente

| Spécification | Minimum | Recommandé | Optimal |
|---------------|---------|------------|---------|
| **VRAM GPU** | 24 GB | 40 GB | 80 GB |
| **Architecture** | Ampere (RTX 30xx) | Ada Lovelace (RTX 40xx) | H100/A100 |
| **Compute Capability** | 8.0+ | 8.6+ | 9.0+ |
| **Support bfloat16** | ✅ Obligatoire | ✅ Obligatoire | ✅ Obligatoire |

#### Pourquoi ces exigences ?

Le modèle **SkyReels-V2-DF-14B** contient **14 milliards de paramètres** :
- En `bfloat16` (2 bytes/param) : ~28 GB
- En `float32` (VAE, 4 bytes/param) : + 4-8 GB
- Activations et buffers intermédiaires : + 8-15 GB
- **Total estimé : 40-50 GB VRAM**

#### GPUs Compatibles

✅ **Recommandé:**
- NVIDIA A100 (40GB ou 80GB)
- NVIDIA H100 (80GB)
- NVIDIA A6000 (48GB)
- NVIDIA RTX 6000 Ada (48GB)

🟡 **Possible avec optimisations:**
- NVIDIA RTX 4090 (24GB) - Nécessite CPU offloading
- NVIDIA RTX 3090 (24GB) - Très lent, offloading massif
- NVIDIA A40 (48GB)

🔴 **NON Compatible:**
- RTX 3080/3070/3060 (VRAM insuffisante)
- GTX série 10xx/20xx (pas de bfloat16)
- AMD GPUs (pas de support CUDA)
- Intel GPUs (pas de support CUDA)

### 1.2 RAM Système

| Configuration | RAM Requise | Raison |
|---------------|-------------|--------|
| **Minimum** | 64 GB | Chargement modèle + offloading partiel |
| **Recommandé** | 128 GB | Offloading GPU ↔ CPU confortable |
| **Optimal** | 256 GB | Génération de vidéos longues |

### 1.3 Stockage

| Type | Capacité | Usage |
|------|----------|-------|
| **Modèle téléchargé** | ~50-60 GB | Poids du modèle 14B |
| **Cache Hugging Face** | + 10 GB | Cache temporaire |
| **Vidéos générées** | Variable | Dépend de vos générations |
| **TOTAL RECOMMANDÉ** | 100+ GB SSD | NVMe pour meilleures performances |

### 1.4 CPU

| Spécification | Minimum | Recommandé |
|---------------|---------|------------|
| **Cœurs** | 8 cores | 16+ cores |
| **Architecture** | x86_64 | x86_64 avec AVX2 |
| **Fréquence** | 2.5 GHz | 3.5+ GHz |

**Note:** Le CPU est utilisé pour l'offloading mémoire si VRAM insuffisante.

---

## 2. PRÉREQUIS LOGICIELS

### 2.1 Système d'Exploitation

✅ **Supporté:**
- **Linux** (Ubuntu 20.04+, Debian 11+, CentOS 8+, Arch Linux)
- **Windows 10/11** avec WSL2 (recommandé) ou natif
- **Windows Server 2019/2022**

🟡 **Partiellement supporté:**
- macOS (pas de CUDA, nécessite alternatives - non recommandé)

### 2.2 CUDA Toolkit

**CRITIQUE:** Version CUDA compatible

| Composant | Version Minimum | Version Recommandée |
|-----------|-----------------|---------------------|
| **CUDA Toolkit** | 11.8 | 12.1+ |
| **cuDNN** | 8.6 | 8.9+ |
| **Driver NVIDIA** | 520.xx | 535.xx+ |

#### Installation CUDA (Linux)

```bash
# Ubuntu/Debian
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.1.0/local_installers/cuda-repo-ubuntu2204-12-1-local_12.1.0-530.30.02-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-1-local_12.1.0-530.30.02-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-1-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

#### Vérification CUDA

```bash
nvidia-smi
nvcc --version
```

### 2.3 Python

| Spécification | Version |
|---------------|---------|
| **Python** | 3.9, 3.10, ou 3.11 |
| **pip** | 23.0+ |
| **virtualenv/conda** | Recommandé |

⚠️ **ATTENTION:** Python 3.12+ peut avoir des incompatibilités avec certaines dépendances.

---

## 3. INSTALLATION ÉTAPE PAR ÉTAPE

### Étape 1: Créer un Environnement Virtuel

#### Option A: Conda (Recommandé)

```bash
# Installer Miniconda si nécessaire
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Créer environnement
conda create -n skyreels python=3.10 -y
conda activate skyreels
```

#### Option B: venv

```bash
python3.10 -m venv skyreels_env
source skyreels_env/bin/activate  # Linux/macOS
# ou
skyreels_env\Scripts\activate  # Windows
```

### Étape 2: Installer PyTorch avec Support CUDA

**CRUCIAL:** Installer PyTorch AVANT les autres dépendances

```bash
# PyTorch 2.1+ avec CUDA 12.1
pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/cu121

# Vérifier l'installation
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA available: {torch.cuda.is_available()}'); print(f'CUDA version: {torch.version.cuda}'); print(f'GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else None}')"
```

**Sortie attendue:**
```
PyTorch: 2.1.2+cu121
CUDA available: True
CUDA version: 12.1
GPU: NVIDIA A100-SXM4-80GB  # (votre GPU)
```

### Étape 3: Installer Diffusers et Dépendances

```bash
# Installer diffusers depuis source (dernière version pour SkyReels-V2)
pip install git+https://github.com/huggingface/diffusers.git

# Ou version stable (vérifier compatibilité)
pip install diffusers>=0.30.0

# Dépendances essentielles
pip install transformers>=4.36.0
pip install accelerate>=0.25.0
pip install safetensors>=0.4.0
pip install huggingface-hub>=0.20.0

# Dépendances optionnelles mais recommandées
pip install xformers>=0.0.23  # Optimisation mémoire CRUCIAL
pip install peft>=0.7.0  # Pour fine-tuning si nécessaire
pip install einops>=0.7.0  # Opérations tenseurs
```

### Étape 4: Installer Dépendances pour Export Vidéo

```bash
# OpenCV pour traitement vidéo
pip install opencv-python>=4.8.0
pip install opencv-contrib-python>=4.8.0

# Pillow pour images
pip install Pillow>=10.0.0

# NumPy (vérifier compatibilité)
pip install numpy>=1.24.0,<2.0.0

# Imageio pour export vidéo
pip install imageio>=2.31.0
pip install imageio-ffmpeg>=0.4.9
```

### Étape 5: Installer FFmpeg (Système)

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install ffmpeg -y
ffmpeg -version
```

#### Windows
```bash
# Télécharger depuis https://ffmpeg.org/download.html
# Ou via Chocolatey
choco install ffmpeg
```

#### macOS
```bash
brew install ffmpeg
```

### Étape 6: Configurer Hugging Face Hub

```bash
# Installer CLI Hugging Face
pip install huggingface_hub[cli]

# Authentification (optionnel mais recommandé)
huggingface-cli login
# Coller votre token depuis https://huggingface.co/settings/tokens
```

### Étape 7: Vérifier Installation Complète

Créer `test_installation.py` :

```python
import torch
import diffusers
from diffusers.utils import is_xformers_available

print("=" * 60)
print("VÉRIFICATION INSTALLATION SKYREELS-V2")
print("=" * 60)

# PyTorch
print(f"\n✅ PyTorch: {torch.__version__}")
print(f"✅ CUDA disponible: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"✅ Version CUDA: {torch.version.cuda}")
    print(f"✅ GPU: {torch.cuda.get_device_name(0)}")
    print(f"✅ VRAM totale: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.2f} GB")

    # Test bfloat16
    try:
        test_tensor = torch.zeros(1, dtype=torch.bfloat16, device="cuda")
        print(f"✅ Support bfloat16: OUI")
    except:
        print(f"❌ Support bfloat16: NON (GPU incompatible)")
else:
    print("❌ CUDA NON disponible - Vérifiez votre installation")

# Diffusers
print(f"\n✅ Diffusers: {diffusers.__version__}")

# XFormers
if is_xformers_available():
    print(f"✅ XFormers: Disponible (optimisation mémoire activée)")
else:
    print(f"⚠️ XFormers: Non disponible (performances réduites)")

# RAM
import psutil
ram_total = psutil.virtual_memory().total / 1024**3
print(f"\n✅ RAM système: {ram_total:.2f} GB")

# Espace disque
import shutil
disk = shutil.disk_usage("/")
disk_free = disk.free / 1024**3
print(f"✅ Espace disque libre: {disk_free:.2f} GB")

print("\n" + "=" * 60)
if torch.cuda.is_available() and torch.cuda.get_device_properties(0).total_memory / 1024**3 >= 24:
    print("✅ SYSTÈME COMPATIBLE AVEC SKYREELS-V2")
else:
    print("⚠️ VRAM INSUFFISANTE - 24 GB minimum requis")
print("=" * 60)
```

Exécuter :
```bash
python test_installation.py
```

---

## 4. CONFIGURATION SYSTÈME

### 4.1 Variables d'Environnement

Ajouter dans `~/.bashrc` ou `~/.zshrc` :

```bash
# CUDA
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH

# Hugging Face Cache (optionnel, pour changer répertoire cache)
export HF_HOME=/path/to/large/disk/huggingface_cache
export TRANSFORMERS_CACHE=$HF_HOME/transformers
export HF_DATASETS_CACHE=$HF_HOME/datasets

# PyTorch optimisations
export PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:512

# Pour debugging
# export CUDA_LAUNCH_BLOCKING=1
```

Recharger :
```bash
source ~/.bashrc
```

### 4.2 Optimisations Mémoire

Créer fichier `skyreels_config.py` :

```python
import torch
import gc

def setup_memory_optimization():
    """Configure optimisations mémoire pour SkyReels-V2"""

    # Vider cache CUDA
    torch.cuda.empty_cache()
    gc.collect()

    # Configuration PyTorch
    torch.backends.cuda.matmul.allow_tf32 = True  # Accélération matmul
    torch.backends.cudnn.allow_tf32 = True
    torch.backends.cudnn.benchmark = True  # Auto-optimisation cuDNN

    # Allocation mémoire graduelle
    torch.cuda.set_per_process_memory_fraction(0.95)  # Utiliser 95% VRAM max

    print("✅ Optimisations mémoire activées")

def print_memory_stats():
    """Affiche statistiques mémoire GPU"""
    if torch.cuda.is_available():
        allocated = torch.cuda.memory_allocated(0) / 1024**3
        reserved = torch.cuda.memory_reserved(0) / 1024**3
        total = torch.cuda.get_device_properties(0).total_memory / 1024**3

        print(f"\n📊 Mémoire GPU:")
        print(f"  Allouée: {allocated:.2f} GB")
        print(f"  Réservée: {reserved:.2f} GB")
        print(f"  Totale: {total:.2f} GB")
        print(f"  Libre: {total - reserved:.2f} GB")
```

### 4.3 Script de Génération Complet

Créer `generate_video.py` :

```python
import torch
from diffusers import AutoModel, SkyReelsV2DiffusionForcingPipeline, UniPCMultistepScheduler
from diffusers.utils import export_to_video
import gc
from skyreels_config import setup_memory_optimization, print_memory_stats

# Configuration mémoire
setup_memory_optimization()

print("📥 Chargement du modèle SkyReels-V2...")
print("⏳ Ceci peut prendre 5-10 minutes selon votre connexion internet...")

# Charger VAE en float32 (meilleure qualité)
vae = AutoModel.from_pretrained(
    "Skywork/SkyReels-V2-DF-14B-540P-Diffusers",
    subfolder="vae",
    torch_dtype=torch.float32
)

# Charger pipeline principal en bfloat16 (économie mémoire)
pipeline = SkyReelsV2DiffusionForcingPipeline.from_pretrained(
    "Skywork/SkyReels-V2-DF-14B-540P-Diffusers",
    vae=vae,
    torch_dtype=torch.bfloat16
)

# Configuration scheduler
flow_shift = 8.0  # 8.0 pour Text-to-Video, 5.0 pour Image-to-Video
pipeline.scheduler = UniPCMultistepScheduler.from_config(
    pipeline.scheduler.config,
    flow_shift=flow_shift
)

# Optimisation XFormers (si disponible)
try:
    pipeline.enable_xformers_memory_efficient_attention()
    print("✅ XFormers activé")
except:
    print("⚠️ XFormers non disponible")

# Déplacer vers GPU
pipeline = pipeline.to("cuda")

print_memory_stats()
print("\n✅ Modèle chargé avec succès!")

# Prompt
prompt = """A cat and a dog baking a cake together in a kitchen.
The cat is carefully measuring flour, while the dog is stirring the batter
with a wooden spoon. The kitchen is cozy, with sunlight streaming through
the window."""

print(f"\n🎬 Génération vidéo...")
print(f"Prompt: {prompt}")

# Génération
output = pipeline(
    prompt=prompt,
    num_inference_steps=30,      # Plus = meilleure qualité mais plus lent
    height=544,                  # 720 pour 720P
    width=960,                   # 1280 pour 720P
    num_frames=97,               # Nombre de frames (97 = ~4 secondes à 24fps)
    base_num_frames=97,          # 121 pour 720P
    ar_step=5,                   # Contrôle inférence asynchrone (0 pour mode synchrone)
    causal_block_size=5,         # Frames par block pour traitement asynchrone
    overlap_history=None,        # 17 pour vidéos longues
    addnoise_condition=20,       # Améliore cohérence pour vidéos longues
    generator=torch.Generator(device="cuda").manual_seed(42)  # Pour reproductibilité
).frames[0]

# Export
output_path = "output_T2V.mp4"
export_to_video(output, output_path, fps=24, quality=8)

print(f"\n✅ Vidéo générée: {output_path}")
print_memory_stats()

# Nettoyage mémoire
del pipeline
del vae
torch.cuda.empty_cache()
gc.collect()
```

---

## 5. RÉSOLUTION DE PROBLÈMES

### Problème 1: CUDA Out of Memory (OOM)

**Erreur:**
```
RuntimeError: CUDA out of memory. Tried to allocate X.XX GiB
```

**Solutions:**

#### A. Réduire la résolution
```python
height=416,  # Au lieu de 544
width=736,   # Au lieu de 960
```

#### B. Réduire le nombre de frames
```python
num_frames=49,  # Au lieu de 97
base_num_frames=49,
```

#### C. Activer CPU Offloading
```python
# AVANT pipeline.to("cuda")
pipeline.enable_model_cpu_offload()  # Offload automatique
# OU
pipeline.enable_sequential_cpu_offload()  # Plus agressif
```

#### D. Réduire précision VAE
```python
# Charger VAE en bfloat16 au lieu de float32
vae = AutoModel.from_pretrained(
    "Skywork/SkyReels-V2-DF-14B-540P-Diffusers",
    subfolder="vae",
    torch_dtype=torch.bfloat16  # Attention: qualité légèrement réduite
)
```

#### E. Activer attention slicing
```python
pipeline.enable_attention_slicing(slice_size=1)
```

### Problème 2: Import Error - Module Not Found

**Erreur:**
```
ModuleNotFoundError: No module named 'diffusers.pipelines.skyreels'
```

**Solution:**
```bash
# Installer version développement
pip uninstall diffusers -y
pip install git+https://github.com/huggingface/diffusers.git
```

### Problème 3: Téléchargement Échoue

**Erreur:**
```
HTTPError: 403 Forbidden
```

**Solution:**
```bash
# Authentifier avec Hugging Face
huggingface-cli login

# Ou dans le code
from huggingface_hub import login
login(token="YOUR_HF_TOKEN")
```

### Problème 4: bfloat16 Non Supporté

**Erreur:**
```
RuntimeError: "addmm_impl_cpu_" not implemented for 'BFloat16'
```

**Solution:**
```python
# Votre GPU ne supporte pas bfloat16, utiliser float16
pipeline = SkyReelsV2DiffusionForcingPipeline.from_pretrained(
    "Skywork/SkyReels-V2-DF-14B-540P-Diffusers",
    vae=vae,
    torch_dtype=torch.float16  # Au lieu de bfloat16
)
```

### Problème 5: Génération Trop Lente

**Solutions:**

1. **Réduire num_inference_steps:**
```python
num_inference_steps=20,  # Au lieu de 30 (qualité légèrement réduite)
```

2. **Activer compilation PyTorch 2.0:**
```python
pipeline.unet = torch.compile(pipeline.unet, mode="reduce-overhead", fullgraph=True)
```

3. **Utiliser GPU plus puissant ou cloud:**
- AWS EC2 P4d (A100)
- Google Colab Pro+ (A100)
- RunPod / Vast.ai

---

## 6. OPTIMISATIONS ET RECOMMANDATIONS

### 6.1 Paramètres de Génération

| Paramètre | Valeur Rapide | Valeur Équilibrée | Valeur Qualité |
|-----------|---------------|-------------------|----------------|
| `num_inference_steps` | 15 | 30 | 50 |
| `height x width` | 416x736 | 544x960 | 720x1280 |
| `num_frames` | 49 | 97 | 121 |
| `quality` (export) | 6 | 8 | 10 |

### 6.2 Temps de Génération Estimés

| GPU | Résolution | Frames | Steps | Temps Estimé |
|-----|------------|--------|-------|--------------|
| RTX 4090 (24GB) + offload | 544x960 | 97 | 30 | ~15-20 min |
| A100 40GB | 544x960 | 97 | 30 | ~8-12 min |
| A100 80GB | 720x1280 | 121 | 30 | ~12-18 min |
| H100 80GB | 720x1280 | 121 | 50 | ~15-20 min |

### 6.3 Meilleures Pratiques pour Prompts

```python
# ✅ BON: Descriptif, détaillé, cohérent
prompt = """A fluffy orange cat wearing a tiny chef's hat, standing on its
hind legs at a kitchen counter. The cat is carefully pouring flour from a bag
into a large mixing bowl. Next to it, a golden retriever with a red bandana
is stirring cake batter with a wooden spoon, its tail wagging. The kitchen
has warm wooden cabinets, white marble countertops, and bright morning sunlight
streaming through a window with white curtains. On the counter: eggs, butter,
and a recipe book."""

# ❌ MAUVAIS: Vague, court
prompt = "Cat and dog cooking"
```

### 6.4 Utilisation en Production

#### A. Système de Queue

```python
from queue import Queue
import threading

video_queue = Queue()

def process_video_requests():
    while True:
        prompt = video_queue.get()
        if prompt is None:
            break

        # Générer vidéo
        output = pipeline(prompt=prompt, ...)
        export_to_video(output, f"video_{hash(prompt)}.mp4")

        video_queue.task_done()

# Démarrer worker
worker = threading.Thread(target=process_video_requests)
worker.start()

# Ajouter requêtes
video_queue.put("A cat playing piano")
video_queue.put("A dog surfing")
```

#### B. API REST avec FastAPI

```python
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI()

class VideoRequest(BaseModel):
    prompt: str
    num_frames: int = 97
    num_inference_steps: int = 30

@app.post("/generate")
async def generate_video(request: VideoRequest, background_tasks: BackgroundTasks):
    # Générer en arrière-plan
    background_tasks.add_task(generate_and_save, request.prompt, request.num_frames)
    return {"status": "processing", "prompt": request.prompt}

def generate_and_save(prompt: str, num_frames: int):
    output = pipeline(prompt=prompt, num_frames=num_frames, ...)
    export_to_video(output, f"videos/{hash(prompt)}.mp4")
```

---

## 7. CHECKLIST FINALE

### Avant de Démarrer

- [ ] GPU NVIDIA avec 24+ GB VRAM
- [ ] Driver NVIDIA 520+
- [ ] CUDA Toolkit 11.8+
- [ ] Python 3.9/3.10/3.11
- [ ] 64+ GB RAM système
- [ ] 100+ GB espace disque libre (SSD)
- [ ] PyTorch 2.0+ avec CUDA installé
- [ ] Diffusers 0.30+ installé
- [ ] XFormers installé (optionnel mais recommandé)
- [ ] FFmpeg installé
- [ ] Compte Hugging Face (optionnel)

### Test Rapide

```bash
# Activer environnement
conda activate skyreels

# Test installation
python test_installation.py

# Génération test (petite résolution)
python -c "
import torch
from diffusers import AutoModel, SkyReelsV2DiffusionForcingPipeline
vae = AutoModel.from_pretrained('Skywork/SkyReels-V2-DF-14B-540P-Diffusers', subfolder='vae', torch_dtype=torch.float32)
pipeline = SkyReelsV2DiffusionForcingPipeline.from_pretrained('Skywork/SkyReels-V2-DF-14B-540P-Diffusers', vae=vae, torch_dtype=torch.bfloat16)
pipeline = pipeline.to('cuda')
print('✅ Modèle chargé avec succès!')
"
```

---

## 8. RESSOURCES ET SUPPORT

### Documentation Officielle
- GitHub: https://github.com/SkyworkAI/SkyReels-V2
- Hugging Face: https://huggingface.co/Skywork/SkyReels-V2-DF-14B-540P-Diffusers
- Diffusers Docs: https://huggingface.co/docs/diffusers

### Communauté
- Hugging Face Forums: https://discuss.huggingface.co/
- Discord Diffusers: https://discord.gg/hugging-face

### Cloud GPU Providers (Si pas de GPU local)
- Google Colab Pro+ (A100): $50/mois
- RunPod.io: ~$1.50-2.50/heure (A100)
- Vast.ai: ~$0.70-1.50/heure (A100)
- Lambda Labs: ~$1.10/heure (A100)
- AWS EC2 P4d: ~$32/heure (A100)

---

## RÉSUMÉ EXÉCUTIF

**Prérequis MINIMUMS pour SkyReels-V2:**

1. ✅ GPU NVIDIA avec 24+ GB VRAM (40+ GB recommandé)
2. ✅ Support bfloat16 (architecture Ampere ou plus récente)
3. ✅ CUDA 11.8+ avec drivers 520+
4. ✅ Python 3.9-3.11
5. ✅ PyTorch 2.0+ avec CUDA
6. ✅ Diffusers 0.30+
7. ✅ 64+ GB RAM système
8. ✅ 100+ GB stockage SSD
9. ✅ FFmpeg installé
10. ✅ ~10-20 minutes de temps de génération par vidéo

**Coût estimé si pas de matériel:**
- Cloud GPU: $1-3/heure
- Génération vidéo: ~15 minutes = $0.25-0.75 par vidéo

---

*Document créé le 2025-10-22*
*Pour support: Consulter documentation officielle SkyworkAI*
