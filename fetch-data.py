#!/usr/bin/env python3
"""Stáhne aktuální hladinu přehrady Plumlov z PMO a uloží ji do data.json."""
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone

URL = "https://sap.pmo.cz/portal/Nadrze/cz/smartphone/Mereni.aspx?id=25&oid=1"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "cs-CZ,cs;q=0.9",
}

req = urllib.request.Request(URL, headers=HEADERS)
try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        html = resp.read().decode("utf-8", errors="replace")
except Exception as exc:
    print(f"Chyba při načítání URL: {exc}", file=sys.stderr)
    sys.exit(1)

# Hledáme číslo ve tvaru 27x,xx nebo 27x.xx (hladina přehrady Plumlov ≈ 266–278)
matches = re.findall(r"\b(2[5-9]\d[,\.]\d+)\b", html)
hladina = None
for m in matches:
    val = float(m.replace(",", "."))
    if 255.0 <= val <= 290.0:
        hladina = m
        break

if not hladina:
    print("Hodnota hladiny nenalezena v odpovědi.", file=sys.stderr)
    sys.exit(1)

out = {
    "hladina": hladina,
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(out, f)

print(f"OK: hladina={hladina}, updated={out['updated']}")
