// Full UN WPP 2024 dataset (all Country/Area, Income group, Development group,
// and World rows, Medium variant, 1950-2100) is served as static JSON rather
// than inlined here -- one shared meta.json (age grids, year list, location
// index) plus one small per-location file fetched on demand when pinned.
const DATA_BASE = '/assets/data/demographics';
let META = null;
// Cache the in-flight promise itself (not just the resolved data) so that
// pinning the same location twice in quick succession -- before the first
// fetch has resolved -- reuses one request instead of firing a duplicate.
const locationCache = {};
function loadLocation(locid) {
  if (!locationCache[locid]) {
    locationCache[locid] = fetch(`${DATA_BASE}/loc-${locid}.json`).then(r => r.json());
  }
  return locationCache[locid];
}

const PIN_COLORS = ['#7a1f2b', '#c9973a', '#2c5f7c', '#3b6d11', '#6b3fa0', '#b6452c', '#1a7a6e'];
const MAX_PINS = 7;
const PROJECTION_END_YEAR = 2100;

function lerp(xs, ys, x) {
  if (x <= xs[0]) return ys[0];
  if (x >= xs[xs.length - 1]) return ys[ys.length - 1];
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) { const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[i - 1] + t * (ys[i] - ys[i - 1]); }
  }
  return ys[ys.length - 1];
}

function survivorship(pxAges, pxVals) {
  const l = [1];
  for (let i = 0; i < pxAges.length - 1; i++) l.push(l[i] * Math.pow(pxVals[i], pxAges[i + 1] - pxAges[i]));
  return l;
}

function solveLotka(asfrAges, asfrVals, pxAges, lVals) {
  const R = r => {
    let s = 0;
    for (let i = 0; i < asfrAges.length; i++) {
      const x = asfrAges[i];
      s += Math.exp(-r * x) * (asfrVals[i] / 1000 * 0.4886) * lerp(pxAges, lVals, x);
    }
    return s;
  };
  let lo = -0.1, hi = 0.1;
  for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2; if (R(mid) > 1) lo = mid; else hi = mid; }
  return (lo + hi) / 2;
}

function stableDist(asfrAges, asfrVals, pxAges, pxVals) {
  const lVals = survivorship(pxAges, pxVals);
  const r = solveLotka(asfrAges, asfrVals, pxAges, lVals);
  const raw = pxAges.map((x, i) => Math.exp(-r * x) * lVals[i]);
  return { r, ages: pxAges, values: raw };
}

function resample(ages, values) { const out = []; for (let a = 0; a <= 100; a++) out.push(lerp(ages, values, a)); return out; }

// Expand a coarse px grid to single-year resolution the SAME way survivorship()
// interprets it: each grid value is an annual rate held constant across its
// whole block (survivorship computes l via pxVals[i]^step) — not linearly
// interpolated, which would imply a different, inconsistent survival curve.
function expandPxStepwise(pxAges, pxVals) {
  const out = new Array(101);
  for (let age = 0; age <= 100; age++) {
    let idx = 0;
    for (let i = 0; i < pxAges.length - 1; i++) { if (age >= pxAges[i]) idx = i; }
    out[age] = pxVals[idx];
  }
  out[100] = 0;
  return out;
}

// Cohort-component projection: starting from the actual age distribution in the
// pinned year, hold ASFR and survival fixed and step forward one year at a time
// through PROJECTION_END_YEAR. Returns the period-by-period growth rate — this
// is the "population momentum" trajectory, converging toward (but not starting
// at) the asymptotic stable growth rate r from stableDist/solveLotka.
function projectGrowthRate(asfrAges, asfrVals, pxFull, initialDistFull, years) {
  let N = initialDistFull.slice();
  const rates = [];
  for (let t = 0; t < years; t++) {
    const total = N.reduce((s, v) => s + v, 0);
    let births = 0;
    for (let i = 0; i < asfrAges.length; i++) {
      const age = asfrAges[i];
      births += N[age] * 0.4886 * (asfrVals[i] / 1000);
    }
    const next = new Array(101).fill(0);
    for (let age = 0; age < 100; age++) next[age + 1] = N[age] * pxFull[age];
    next[0] = births;
    const newTotal = next.reduce((s, v) => s + v, 0);
    rates.push(total > 0 ? (newTotal - total) / total : 0);
    N = next;
  }
  return rates;
}

function distStats(resampled) {
  const total = resampled.reduce((s, v) => s + v, 0);
  const youth = resampled.slice(0, 15).reduce((s, v) => s + v, 0);
  const working = resampled.slice(15, 65).reduce((s, v) => s + v, 0);
  const old = resampled.slice(65, 101).reduce((s, v) => s + v, 0);
  let cum = 0, median = 0;
  for (let a = 0; a <= 100; a++) { cum += resampled[a]; if (cum >= total / 2) { median = a; break; } }
  return { median, youthDep: youth / working, oldDep: old / working };
}

function legendHTML(items) {
  return items.map(l => `<span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:10px; border-radius:2px; background:${l.color};"></span>${l.text}</span>`).join('');
}
function statRow(name, color, s) {
  return `<tr style="border-bottom:1px solid #e6ddce;"><td style="padding:6px 8px 6px 0; white-space:nowrap;"><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${color}; margin-right:5px;"></span>${name}</td>
    <td style="padding:6px 8px; text-align:right;">${s.median}</td>
    <td style="padding:6px 0 6px 8px; text-align:right;">${s.youthDep.toFixed(2)}</td>
    <td style="padding:6px 0 6px 8px; text-align:right;">${s.oldDep.toFixed(2)}</td></tr>`;
}
function toPoints(ages, values) { return ages.map((a, i) => ({ x: a, y: values[i] })); }

document.addEventListener('DOMContentLoaded', function () {
  const $ = id => document.getElementById(id);
  const pinCountry = $('pin-country'), pinYear = $('pin-year'), pinAdd = $('pin-add'), pinLimitNote = $('pin-limit-note'), pinChips = $('pin-chips');

  let pins = [];
  let charts = {};
  let renderSeq = 0;

  // Generic 3-way (or N-way) tab switcher: pass {tabId: panelId} pairs and
  // the currently active tabId; toggles button styling + panel visibility.
  // Charts built while their panel is display:none get stuck at zero size
  // (no ResizeObserver fires for hidden ancestors), so an optional onShow
  // callback lets callers force a chart.resize() once the panel reappears.
  function makeTabSwitcher(pairs, onShow) {
    const buttons = {}, panels = {};
    Object.keys(pairs).forEach(tabId => { buttons[tabId] = $(tabId); panels[tabId] = $(pairs[tabId]); });
    function set(active) {
      Object.keys(pairs).forEach(tabId => {
        const isActive = tabId === active;
        panels[tabId].style.display = isActive ? 'block' : 'none';
        buttons[tabId].style.background = isActive ? '#7a1f2b' : 'transparent';
        buttons[tabId].style.color = isActive ? '#fffdf9' : '#5f5e5a';
        buttons[tabId].style.borderColor = isActive ? '#7a1f2b' : '#e6ddce';
      });
      if (onShow) onShow(active);
    }
    Object.keys(pairs).forEach(tabId => buttons[tabId].addEventListener('click', () => set(tabId)));
    return set;
  }
  // A chart built while its panel is display:none gets stuck at zero size —
  // Chart.js's ResizeObserver never fires for hidden ancestors, and even an
  // explicit chart.resize() afterward doesn't recover it. So instead of
  // resizing, destroy + rebuild the dist charts on every tab switch: whichever
  // one is now visible gets created fresh, at its correct size.
  const setDistTab = makeTabSwitcher({
    'demo-tab-current': 'demo-panel-current',
    'demo-tab-stable': 'demo-panel-stable',
    'demo-tab-growth': 'demo-panel-growth'
  }, () => { ['current', 'stable', 'growth'].forEach(destroyChart); renderAll(); });
  const setStatsTab = makeTabSwitcher({
    'demo-stats-tab-current': 'demo-stats-current',
    'demo-stats-tab-stable': 'demo-stats-stable'
  });
  setDistTab('demo-tab-current');
  setStatsTab('demo-stats-tab-current');

  function renderChips() {
    pinChips.innerHTML = pins.map((p, i) => `
      <span style="display:inline-flex; align-items:center; gap:8px; background:${PIN_COLORS[i]}; color:#fffdf9; font-size:12px; font-weight:600; padding:6px 8px 6px 12px; border-radius:16px;">
        ${p.name}, ${p.year}
        <button type="button" data-idx="${i}" class="pin-remove" style="background:rgba(255,255,255,0.25); border:none; color:#fffdf9; width:18px; height:18px; border-radius:50%; cursor:pointer; font-size:12px; line-height:1; display:flex; align-items:center; justify-content:center;">&times;</button>
      </span>
    `).join('');
    pinChips.querySelectorAll('.pin-remove').forEach(btn => {
      btn.addEventListener('click', () => { pins.splice(+btn.dataset.idx, 1); renderChips(); renderAll(); });
    });
    pinAdd.disabled = pins.length >= MAX_PINS;
    pinLimitNote.style.display = pins.length >= MAX_PINS ? 'inline' : 'none';
  }

  // Country select is grouped: World first (loose <option>), then Development
  // groups / Income groups / Countries as <optgroup>s, in that order -- matches
  // the sort order the build script already wrote into meta.json.
  function populateSelectors() {
    // Full year-by-year list is 151 entries -- too dense to be useful in a
    // plain <select>. Show decades plus the WPP "last estimate" year (the
    // boundary between historical data and the Medium-variant projection;
    // everything after it is projected, not observed) instead.
    const lastEstimate = META.last_estimate_year;
    const yearSet = new Set(META.years.filter(y => y % 10 === 0));
    if (lastEstimate) yearSet.add(lastEstimate);
    const sortedYears = Array.from(yearSet).sort((a, b) => a - b);
    pinYear.innerHTML = sortedYears.map(y => `<option value="${y}">${y}${y === lastEstimate ? ' (latest estimate)' : ''}</option>`).join('');
    const byGroup = {};
    META.locations.forEach(loc => { (byGroup[loc.group] = byGroup[loc.group] || []).push(loc); });
    const optionHTML = loc => `<option value="${loc.id}">${loc.name}</option>`;
    let html = (byGroup['World'] || []).map(optionHTML).join('');
    [['Development group', 'Development groups'], ['Income group', 'Income groups'], ['Country/Area', 'Countries']].forEach(([key, label]) => {
      const items = byGroup[key] || [];
      if (!items.length) return;
      html += `<optgroup label="${label}">${items.map(optionHTML).join('')}</optgroup>`;
    });
    pinCountry.innerHTML = html;
  }

  pinAdd.addEventListener('click', () => {
    if (pins.length >= MAX_PINS) return;
    const locid = pinCountry.value;
    const name = pinCountry.options[pinCountry.selectedIndex].text;
    const year = pinYear.value;
    if (pins.some(p => p.locid === locid && p.year === year)) return;
    pins.push({ locid, name, year });
    renderChips();
    renderAll();
  });

  function upsertChart(key, canvasId, datasets, yMax, xMin, xMax, xLabel, beginAtZero, yLabel) {
    xLabel = xLabel || 'Age';
    if (beginAtZero === undefined) beginAtZero = true;
    if (!charts[key]) {
      charts[key] = new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: { datasets },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { type: 'linear', min: xMin, max: xMax, title: { display: true, text: xLabel, font: { size: 11 } }, ticks: { font: { size: 10 } } },
            y: { beginAtZero: beginAtZero, max: yMax, title: { display: !!yLabel, text: yLabel, font: { size: 11 } }, ticks: { font: { size: 10 } } }
          }
        }
      });
    } else {
      charts[key].data.datasets = datasets;
      charts[key].options.scales.y.max = yMax;
      charts[key].options.scales.y.beginAtZero = beginAtZero;
      charts[key].options.scales.y.title.display = !!yLabel;
      charts[key].options.scales.y.title.text = yLabel;
      charts[key].options.scales.x.title.text = xLabel;
      charts[key].options.scales.x.min = xMin;
      charts[key].options.scales.x.max = xMax;
      charts[key].update();
    }
  }
  function destroyChart(key) { if (charts[key]) { charts[key].destroy(); delete charts[key]; } }

  function toggleEmpty(prefix, isEmpty) {
    $(`demo-${prefix}-empty`).style.display = isEmpty ? 'block' : 'none';
    document.getElementById(`demo-${prefix}Chart`).style.display = isEmpty ? 'none' : 'block';
    $(`demo-${prefix}-legend`).style.display = isEmpty ? 'none' : 'flex';
    const downloadBtn = $(`demo-${prefix}-download`);
    if (downloadBtn) downloadBtn.style.display = isEmpty ? 'none' : 'inline-block';
  }

  // Chart.js canvases are transparent by default; composite onto an opaque
  // background matching the site's card color so the downloaded PNG doesn't
  // go illegible if opened against a dark background.
  function downloadChartPNG(canvasId, filename) {
    const source = document.getElementById(canvasId);
    const out = document.createElement('canvas');
    out.width = source.width;
    out.height = source.height;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#fffdf9';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(source, 0, 0);
    const link = document.createElement('a');
    link.href = out.toDataURL('image/png');
    link.download = filename;
    link.click();
  }
  document.querySelectorAll('.demo-download').forEach(btn => {
    btn.addEventListener('click', () => downloadChartPNG(btn.dataset.canvas, btn.dataset.filename));
  });

  function statsTableHTML(rows) {
    return '<table style="width:100%; border-collapse:collapse;"><thead><tr style="color:#5f5e5a; font-size:11px; border-bottom:2px solid #e6ddce;"><td style="padding-bottom:6px;"></td><td style="text-align:center; padding-bottom:6px;">Median age</td><td style="text-align:center; padding-bottom:6px;">Youth dependency ratio</td><td style="text-align:center; padding-bottom:6px;">Old-age dependency ratio</td></tr></thead><tbody>'
      + rows.join('')
      + '</tbody></table>'
      + '<p style="font-size:11px; color:#898781; margin:10px 0 0; line-height:1.6;">Median age: age below which half the (modeled) population falls.<br>Youth dependency ratio: population aged 0&ndash;14 divided by population aged 15&ndash;64.<br>Old-age dependency ratio: population aged 65+ divided by population aged 15&ndash;64.</p>';
  }

  async function renderAll() {
    // Bump the token on every call, including the empty-pins early return --
    // otherwise removing the last pin while a previous (non-empty) call is
    // still awaiting its fetch lets that stale call's token still match
    // renderSeq, so it "wins" and repopulates the charts after this call
    // already cleared them.
    const token = ++renderSeq;
    if (pins.length === 0) {
      ['asfr', 'px', 'current', 'stable', 'growth'].forEach(k => { destroyChart(k); toggleEmpty(k, true); });
      $('demo-stats-current').innerHTML = '';
      $('demo-stats-stable').innerHTML = '';
      return;
    }
    // Fetch (or reuse cached) data for every pinned location before drawing.
    // renderAll can be called again -- another pin added, a tab switched --
    // while this fetch is still in flight; the token guards against an
    // older, slower call clobbering a newer one's result.
    const currentPins = pins;
    const locData = await Promise.all(currentPins.map(p => loadLocation(p.locid)));
    if (token !== renderSeq) return;

    ['asfr', 'px', 'current', 'stable', 'growth'].forEach(k => toggleEmpty(k, false));

    const pinData = currentPins.map((p, idx) => {
      const d = locData[idx];
      return { ...p, asfrVals: d.asfr_by_year[p.year] || [], pxVals: d.px_by_year[p.year] || [], popVals: d.pop_by_year[p.year] || [] };
    });

    // ASFR
    const asfrDatasets = pinData.map((p, i) => ({ data: toPoints(META.asfr_ages, p.asfrVals), borderColor: PIN_COLORS[i], backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }));
    const asfrLegend = pinData.map((p, i) => ({ color: PIN_COLORS[i], text: `${p.name}, ${p.year}` }));
    $('demo-asfr-legend').innerHTML = legendHTML(asfrLegend);
    const asfrMax = Math.max(...asfrDatasets.flatMap(ds => ds.data.map(pt => pt.y)));
    upsertChart('asfr', 'demo-asfrChart', asfrDatasets, Math.ceil(asfrMax / 20) * 20, 15, 49);

    // Survival probability (unconditional, from birth)
    const pxDatasets = pinData.map((p, i) => ({ data: toPoints(META.px_ages, survivorship(META.px_ages, p.pxVals)), borderColor: PIN_COLORS[i], backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }));
    const pxLegend = pinData.map((p, i) => ({ color: PIN_COLORS[i], text: `${p.name}, ${p.year}` }));
    $('demo-px-legend').innerHTML = legendHTML(pxLegend);
    upsertChart('px', 'demo-pxChart', pxDatasets, 1, 0, 100);

    // Current age distribution — one line per pin
    const currentDatasets = pinData.map((p, i) => ({ data: toPoints(META.pop_ages, p.popVals), borderColor: PIN_COLORS[i], backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }));
    const currentLegend = pinData.map((p, i) => ({ color: PIN_COLORS[i], text: `${p.name}, ${p.year}` }));
    $('demo-current-legend').innerHTML = legendHTML(currentLegend);
    const currentMax = Math.max(...currentDatasets.flatMap(ds => ds.data.map(pt => pt.y)));
    upsertChart('current', 'demo-currentChart', currentDatasets, Math.ceil(currentMax * 2) / 2, 0, 100, 'Age', true, '% of population');
    $('demo-stats-current').innerHTML = statsTableHTML(pinData.map((p, i) => statRow(`${p.name}, ${p.year}`, PIN_COLORS[i], distStats(resample(META.pop_ages, p.popVals)))));

    // Stable (implied long-run) age distribution — one line per pin
    const stableResults = pinData.map(p => {
      const popTotal = p.popVals.reduce((s, v) => s + v, 0);
      const stable = stableDist(META.asfr_ages, p.asfrVals, META.px_ages, p.pxVals);
      const stableTotal = stable.values.reduce((s, v) => s + v, 0);
      return { ...stable, scaledValues: stable.values.map(v => +(v / stableTotal * popTotal).toFixed(3)) };
    });
    const stableDatasets = pinData.map((p, i) => ({ data: toPoints(stableResults[i].ages, stableResults[i].scaledValues), borderColor: PIN_COLORS[i], backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }));
    const stableLegend = pinData.map((p, i) => ({ color: PIN_COLORS[i], text: `${p.name}, ${p.year}` }));
    $('demo-stable-legend').innerHTML = legendHTML(stableLegend);
    const stableMax = Math.max(...stableDatasets.flatMap(ds => ds.data.map(pt => pt.y)));
    upsertChart('stable', 'demo-stableChart', stableDatasets, Math.ceil(stableMax * 2) / 2, 0, 100, 'Age', true, '% of population');
    $('demo-stats-stable').innerHTML = statsTableHTML(pinData.map((p, i) => statRow(`${p.name}, ${p.year}`, PIN_COLORS[i], distStats(resample(stableResults[i].ages, stableResults[i].values)))));

    // Growth rate: each pin's projection runs from its own year through 2100
    const minYear = Math.min(...pinData.map(p => +p.year));
    const growthDatasets = pinData.map((p, i) => {
      const baseYear = +p.year;
      const years = PROJECTION_END_YEAR - baseYear;
      const initialDistFull = resample(META.pop_ages, p.popVals);
      const pxFull = expandPxStepwise(META.px_ages, p.pxVals);
      const rates = projectGrowthRate(META.asfr_ages, p.asfrVals, pxFull, initialDistFull, years);
      return { data: rates.map((rate, t) => ({ x: baseYear + t, y: +(rate * 100).toFixed(3) })), borderColor: PIN_COLORS[i], backgroundColor: 'transparent', fill: false, tension: 0.2, pointRadius: 0, borderWidth: 2, r: stableDist(META.asfr_ages, p.asfrVals, META.px_ages, p.pxVals).r };
    });
    const growthLegend = pinData.map((p, i) => ({ color: PIN_COLORS[i], text: `${p.name}, ${p.year} — converges to r = ${(growthDatasets[i].r * 100).toFixed(2)}%` }));
    $('demo-growth-legend').innerHTML = legendHTML(growthLegend);
    upsertChart('growth', 'demo-growthChart', growthDatasets, undefined, minYear, PROJECTION_END_YEAR, 'Year', false);
  }

  fetch(`${DATA_BASE}/meta.json`).then(r => r.json()).then(m => {
    META = m;
    populateSelectors();
    // Land on a page that already shows something, instead of an empty
    // "add a country" state: pin World at the latest estimate year.
    const world = META.locations.find(loc => loc.group === 'World');
    if (world) pins.push({ locid: world.id, name: world.name, year: String(META.last_estimate_year || META.years[META.years.length - 1]) });
    renderChips();
    renderAll();
  });
});
