# Hráz Křelovina – PWA

Progresivní webová aplikace pro výpočet výšky vody nad starou hrází přehrady Křelovina na Hloučele.

## Funkce

- **Automatické načítání** aktuální výšky hladiny ze stránek [Povodí Moravy](https://sap.pmo.cz/portal/Nadrze/cz/pc/Mereni.aspx?id=25&oid=1) (přes CORS proxy)
- **Ruční zadání** hodnoty hladiny v m n.m.
- **Výpočet** výšky vody nad starou hrází v cm: `(hladina − 271,33 + 0,50) × 100`
- **Progress bar** relativní polohy hladiny (266,38 – 278,63 m n.m.)
- **Offline podpora** – Service Worker cachuje app shell
- **Odkaz** na stránku měření Povodí Moravy
- **Instalovatelná na Android** jako PWA

## Nasazení na GitHub Pages

1. Vytvoř nový GitHub repozitář (veřejný)
2. Nahraj všechny soubory do větve `main`:
   ```
   index.html
   manifest.json
   sw.js
   icon.svg
   icon-maskable.svg
   ```
3. V nastavení repozitáře → **Pages** → Source: **Deploy from a branch** → větev `main`, složka `/ (root)`
4. App bude dostupná na `https://<tvůj-username>.github.io/<repo-name>/`

## Instalace na Android

1. Otevři URL v Chrome na Androidu
2. Chrome zobrazí banner „Přidat na plochu" nebo klikni ⋮ → **Přidat na plochu**
3. App se nainstaluje jako nativní aplikace

## Struktura

| Soubor             | Popis                         |
|--------------------|-------------------------------|
| `index.html`       | Hlavní PWA aplikace           |
| `manifest.json`    | PWA manifest (název, ikona…)  |
| `sw.js`            | Service Worker (offline cache)|
| `icon.svg`         | Ikona aplikace                |
| `icon-maskable.svg`| Maskable ikona (Android)      |
