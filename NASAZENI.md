# Nasazení – Hráz Křelovina PWA

## Repozitář
https://github.com/blek2CZ/hraz-prehrada

## PWA adresa (GitHub Pages)
https://blek2cz.github.io/hraz-prehrada/

## Instalace na Android
1. Otevři adresu v **Chrome** na Androidu
2. Klikni `⋮` → **Přidat na plochu** (nebo potvrď banner)
3. App se nainstaluje jako nativní PWA

## Aktualizace (jak nasadit změny)
```powershell
cd "c:\Users\blek2\projekty\hraz prehrada"
git add .
git commit -m "popis změny"
git push
```
GitHub Pages se aktualizují automaticky do ~1 minuty.

## Soubory projektu
| Soubor               | Popis                            |
|----------------------|----------------------------------|
| `index.html`         | Hlavní PWA aplikace              |
| `manifest.json`      | PWA manifest (název, ikona…)     |
| `sw.js`              | Service Worker (offline cache)   |
| `icon.svg`           | Ikona aplikace                   |
| `icon-maskable.svg`  | Maskable ikona pro Android       |

## Výpočet
`výška [cm] = (hladina [m n.m.] − 271,33 + 0,50) × 100`

Data se načítají z: https://sap.pmo.cz/portal/Nadrze/cz/pc/Mereni.aspx?id=25&oid=1
