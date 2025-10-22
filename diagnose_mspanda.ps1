# Script de Diagnostic - MSPANDA Crash Windows 11
# Enregistrez ce fichier : diagnose_mspanda.ps1
# Exécutez avec PowerShell

Write-Host "=== DIAGNOSTIC MSPANDA - Windows 11 Crash ===" -ForegroundColor Cyan
Write-Host ""

# 1. Version Windows
Write-Host "[1] Version Windows:" -ForegroundColor Yellow
$osVersion = [System.Environment]::OSVersion.Version
Write-Host "   Version: $osVersion"
$win11 = $osVersion.Build -ge 22000
Write-Host "   Windows 11: $win11" -ForegroundColor $(if($win11){"Red"}else{"Green"})
Write-Host ""

# 2. Processeur
Write-Host "[2] Informations Processeur:" -ForegroundColor Yellow
$cpu = Get-WmiObject Win32_Processor
Write-Host "   Nom: $($cpu.Name)"
Write-Host "   Cœurs physiques: $($cpu.NumberOfCores)"
Write-Host "   Cœurs logiques: $($cpu.NumberOfLogicalProcessors)"
$hybride = $cpu.Name -match "12th|13th|14th Gen" -or $cpu.Name -match "Alder|Raptor"
Write-Host "   Processeur Hybride (P+E cores): $hybride" -ForegroundColor $(if($hybride){"Red"}else{"Green"})
Write-Host ""

# 3. .NET Framework
Write-Host "[3] Versions .NET Framework:" -ForegroundColor Yellow
$dotnetVersions = Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full\' -ErrorAction SilentlyContinue
if ($dotnetVersions) {
    $release = $dotnetVersions.GetValue("Release")
    Write-Host "   Release: $release"
    if ($release -ge 528040) { Write-Host "   Version: 4.8" -ForegroundColor Green }
    elseif ($release -ge 461808) { Write-Host "   Version: 4.7.2" -ForegroundColor Yellow }
    else { Write-Host "   Version: < 4.7.2" -ForegroundColor Red }
}
Write-Host ""

# 4. .NET SDK installé
Write-Host "[4] .NET SDK/Runtime:" -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version 2>&1
    Write-Host "   SDK installé: $dotnetVersion"
} catch {
    Write-Host "   SDK non installé" -ForegroundColor Red
}
Write-Host ""

# 5. Chemin MSPANDA
Write-Host "[5] Recherche MSPANDA:" -ForegroundColor Yellow
$mspandaPaths = @(
    "C:\Users\$env:USERNAME\Downloads\MSPANDA-1.1.0",
    "C:\Program Files\MSPANDA",
    "C:\MSPANDA"
)
foreach ($path in $mspandaPaths) {
    if (Test-Path $path) {
        Write-Host "   Trouvé: $path" -ForegroundColor Green

        # Chercher ParallelExtensionsExtras.dll
        $dllPath = Join-Path $path "lib\MSconverter\pwiz_bin_windows\ParallelExtensionsExtras.dll"
        if (Test-Path $dllPath) {
            Write-Host "   ParallelExtensionsExtras.dll: TROUVÉ" -ForegroundColor Yellow
            $dll = Get-Item $dllPath
            Write-Host "   Taille: $($dll.Length) bytes"
            Write-Host "   Date: $($dll.LastWriteTime)"

            # Version de la DLL
            try {
                $dllVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($dllPath)
                Write-Host "   Version: $($dllVersion.FileVersion)" -ForegroundColor $(if($dllVersion.FileVersion -lt "2.0"){"Red"}else{"Green"})
            } catch {
                Write-Host "   Version: Non disponible" -ForegroundColor Red
            }
        } else {
            Write-Host "   ParallelExtensionsExtras.dll: NON TROUVÉ" -ForegroundColor Red
        }
    }
}
Write-Host ""

# 6. Événements système (crashes récents)
Write-Host "[6] Crashes récents (dernières 24h):" -ForegroundColor Yellow
$crashes = Get-EventLog -LogName Application -After (Get-Date).AddDays(-1) -ErrorAction SilentlyContinue |
    Where-Object {$_.EntryType -eq "Error" -and $_.Source -like "*MSPANDA*" -or $_.Message -like "*MSPANDA*"}
if ($crashes) {
    Write-Host "   Crashes trouvés: $($crashes.Count)" -ForegroundColor Red
    $crashes | Select-Object -First 3 TimeGenerated, Message | Format-Table
} else {
    Write-Host "   Aucun crash MSPANDA récent trouvé" -ForegroundColor Green
}
Write-Host ""

# 7. Recommandations
Write-Host "=== RECOMMANDATIONS ===" -ForegroundColor Cyan
if ($win11 -and $hybride) {
    Write-Host "[!] PROBLÈME CRITIQUE DÉTECTÉ:" -ForegroundColor Red
    Write-Host "    Windows 11 + Processeur Hybride + DLL obsolète"
    Write-Host ""
    Write-Host "    SOLUTIONS:" -ForegroundColor Yellow
    Write-Host "    1. Désactiver E-cores dans le BIOS (temporaire)"
    Write-Host "    2. Limiter affinité CPU de MSPANDA"
    Write-Host "    3. Mettre à jour vers .NET 8.0"
    Write-Host "    4. Remplacer ParallelExtensionsExtras.dll"
}
elseif ($win11) {
    Write-Host "[!] Windows 11 détecté - Risque de compatibilité" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== FIN DU DIAGNOSTIC ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Enregistrez ce résultat et partagez-le si nécessaire."
Pause
