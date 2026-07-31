#!/usr/bin/env python3
"""
One-off build script: extract ASFR, survival probability (px), and
population age-share (%) for every Country/Area, Income group,
Development group, and World row (Medium variant) from the raw UN WPP
2024 CSVs, and write compact per-location JSON files for the
Global Demographics tool to fetch on demand.

Not part of the site build (not run by Jekyll) -- run manually whenever
the source data changes.
"""
import csv
import json
import os
import sys
import time

BASE = "/Users/manuelmacera/Dropbox/MyMatlab/Climate_Demographics/Data"
OUT = "/Users/manuelmacera/Dropbox/manuelmacera.github.io/assets/data/demographics"

GROUPS = {"Country/Area", "Income group", "Development group", "World"}
EXCLUDE_LOCATIONS = {"No income group available"}

# WPP2024's source files split historical estimates from the Medium-variant
# projection at this year (see the two life-table/population filenames below:
# "...1950-2023.csv" vs "...2024-2100.csv"). Surfaced in meta.json so the
# front end can flag it as "latest estimate" in the year dropdown -- update
# this if a future WPP revision moves the split.
LAST_ESTIMATE_YEAR = 2023

FERTILITY_FILE = f"{BASE}/Fertility/WPP2024_Fertility_by_Age1.csv"
LIFE_TABLE_FILES = [
    f"{BASE}/Survival Probabilities/WPP2024_Life_Table_Complete_Medium_Both_1950-2023.csv",
    f"{BASE}/Survival Probabilities/WPP2024_Life_Table_Complete_Medium_Both_2024-2100.csv",
]
POP_FILES = [
    f"{BASE}/Age Distribution/WPP2024_PopulationBySingleAgeSex_Medium_Percentage_1950-2023.csv",
    f"{BASE}/Age Distribution/WPP2024_PopulationBySingleAgeSex_Medium_Percentage_2024-2100.csv",
]

locations = {}  # locid -> (name, group)


def round3(x):
    return round(float(x), 3)


def process(path, value_col, age_lo, age_hi, store, require_variant_filter):
    t0 = time.time()
    n_rows = 0
    n_kept = 0
    with open(path, encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        header = next(reader)
        idx = {name: i for i, name in enumerate(header)}
        i_loctype = idx["LocTypeName"]
        i_variant = idx["Variant"]
        i_locid = idx["LocID"]
        i_location = idx["Location"]
        i_time = idx["Time"]
        i_age = idx["AgeGrpStart"]
        i_val = idx[value_col]
        for row in reader:
            n_rows += 1
            if require_variant_filter and row[i_variant] != "Medium":
                continue
            loctype = row[i_loctype]
            if loctype not in GROUPS:
                continue
            locname = row[i_location]
            if locname in EXCLUDE_LOCATIONS:
                continue
            try:
                age = int(row[i_age])
            except ValueError:
                continue
            if age < age_lo or age > age_hi:
                continue
            locid = row[i_locid]
            year = row[i_time]
            locations[locid] = (locname, loctype)
            year_map = store.setdefault(locid, {})
            age_map = year_map.setdefault(year, {})
            age_map[age] = row[i_val]
            n_kept += 1
    print(f"  {os.path.basename(path)}: {n_rows:,} rows read, {n_kept:,} kept in {time.time()-t0:.1f}s", file=sys.stderr)


def finalize(store, ages):
    """Convert {locid: {year: {age: val}}} -> {locid: {year: [vals in age order]}}"""
    out = {}
    for locid, year_map in store.items():
        by_year = {}
        for year, age_map in year_map.items():
            by_year[year] = [round3(age_map[a]) if a in age_map else None for a in ages]
        out[locid] = by_year
    return out


def main():
    os.makedirs(OUT, exist_ok=True)

    asfr_ages = list(range(15, 50))
    px_ages = list(range(0, 101))

    asfr_store = {}
    px_store = {}
    pop_store = {}

    print("Processing fertility (ASFR)...", file=sys.stderr)
    process(FERTILITY_FILE, "ASFR", 15, 49, asfr_store, require_variant_filter=True)

    print("Processing life tables (px)...", file=sys.stderr)
    for path in LIFE_TABLE_FILES:
        process(path, "px", 0, 100, px_store, require_variant_filter=False)

    print("Processing population age shares (%)...", file=sys.stderr)
    for path in POP_FILES:
        process(path, "PopTotal", 0, 100, pop_store, require_variant_filter=False)

    print("Finalizing arrays...", file=sys.stderr)
    asfr_final = finalize(asfr_store, asfr_ages)
    px_final = finalize(px_store, px_ages)
    pop_final = finalize(pop_store, px_ages)

    all_years = set()
    for store in (asfr_final, px_final, pop_final):
        for year_map in store.values():
            all_years.update(year_map.keys())
    years_sorted = sorted(all_years, key=lambda y: int(y))

    print(f"Writing {len(locations)} per-location files...", file=sys.stderr)
    manifest = []
    for locid, (name, group) in locations.items():
        data = {
            "asfr_by_year": asfr_final.get(locid, {}),
            "px_by_year": px_final.get(locid, {}),
            "pop_by_year": pop_final.get(locid, {}),
        }
        with open(f"{OUT}/loc-{locid}.json", "w") as f:
            json.dump(data, f, separators=(",", ":"))
        manifest.append({"id": locid, "name": name, "group": group})

    group_order = {"World": 0, "Development group": 1, "Income group": 2, "Country/Area": 3}
    manifest.sort(key=lambda m: (group_order.get(m["group"], 9), m["name"]))

    meta = {
        "asfr_ages": asfr_ages,
        "px_ages": px_ages,
        "pop_ages": px_ages,
        "years": [int(y) for y in years_sorted],
        "locations": manifest,
        "last_estimate_year": LAST_ESTIMATE_YEAR,
    }
    with open(f"{OUT}/meta.json", "w") as f:
        json.dump(meta, f, separators=(",", ":"))

    print(f"Done. {len(locations)} locations, {len(years_sorted)} years.", file=sys.stderr)


if __name__ == "__main__":
    main()
