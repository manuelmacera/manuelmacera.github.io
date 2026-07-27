// Sample data only: Argentina + Niger, every 10th year, coarsened age grid.
// This is a working prototype of the interaction design, not the production dataset —
// the full build will cover all UN WPP locations at annual/single-year-of-age resolution.
const DEMO_DATA = {"Argentina":{"asfr_ages":[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"px_ages":[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],"pop_ages":[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],"asfr_by_year":{"1950":[17.112,34.389,57.141,83.787,108.593,130.208,149.619,166.505,179.525,188.0,190.517,186.771,179.394,169.154,157.031,143.199,130.756,119.851,111.573,105.419,99.096,89.979,80.112,69.576,57.76,43.527,32.567,23.449,16.227,10.883,8.248,5.877,4.283,3.143,1.98],"1970":[20.019,38.541,62.287,89.499,113.938,134.063,150.136,162.247,171.234,177.076,178.941,176.638,171.279,163.261,153.306,141.735,130.155,118.869,108.569,99.2,90.023,80.485,71.079,61.814,52.431,42.765,33.839,25.609,18.572,12.877,8.693,5.878,3.953,2.692,1.611],"1990":[23.055,44.585,70.616,98.747,121.654,137.969,150.137,158.834,165.652,170.697,172.964,172.081,168.553,162.51,154.12,143.561,132.186,120.358,109.08,98.41,87.774,76.745,66.13,55.982,45.933,35.778,26.934,19.259,13.008,8.244,4.923,3.022,1.761,0.95,0.437],"2000":[21.676,41.966,65.757,90.535,108.986,119.856,125.816,127.943,129.127,130.051,130.832,131.411,131.598,131.113,128.924,124.821,118.737,110.91,102.283,93.043,83.122,72.572,62.303,52.456,42.791,33.195,24.756,17.43,11.54,7.142,3.929,2.27,1.149,0.419,0.057],"2010":[22.049,42.974,66.962,91.207,107.833,115.584,117.678,115.507,112.801,110.597,109.717,110.3,111.977,114.262,115.365,114.799,111.82,106.547,99.864,91.965,82.904,72.729,62.596,52.701,42.842,32.837,24.196,16.764,10.895,6.62,3.474,1.879,0.874,0.309,0.042],"2020":[9.406,18.66,30.468,43.8,55.075,63.485,69.261,72.634,74.581,75.467,75.927,76.256,77.078,78.298,78.882,78.479,76.928,74.267,71.157,67.553,62.859,56.51,49.748,42.744,35.29,27.069,20.116,14.079,9.223,5.58,2.941,1.413,0.535,0.171,0.023]},"px_by_year":{"1950":[0.928,0.998,0.999,0.999,0.998,0.998,0.998,0.997,0.997,0.996,0.995,0.993,0.991,0.988,0.984,0.98,0.974,0.959,0.933,0.895,0.824,0.75,0.669,0.569,0.485,0.0],"1970":[0.948,0.999,0.999,0.999,0.999,0.999,0.998,0.998,0.998,0.997,0.996,0.995,0.993,0.99,0.987,0.983,0.978,0.965,0.945,0.919,0.871,0.816,0.751,0.672,0.59,0.0],"1990":[0.974,0.999,1.0,1.0,0.999,0.999,0.999,0.999,0.999,0.998,0.997,0.996,0.995,0.993,0.989,0.985,0.98,0.973,0.963,0.942,0.908,0.866,0.816,0.753,0.683,0.0],"2000":[0.981,1.0,1.0,1.0,0.999,0.999,0.999,0.999,0.999,0.998,0.998,0.997,0.996,0.993,0.991,0.987,0.983,0.976,0.966,0.952,0.928,0.895,0.852,0.8,0.739,0.0],"2010":[0.987,1.0,1.0,1.0,0.999,0.999,0.999,0.999,0.999,0.999,0.998,0.997,0.996,0.995,0.992,0.989,0.985,0.979,0.97,0.956,0.934,0.905,0.867,0.815,0.754,0.0],"2020":[0.99,1.0,1.0,1.0,1.0,0.999,0.999,0.999,0.999,0.999,0.998,0.997,0.996,0.995,0.992,0.988,0.983,0.976,0.967,0.955,0.935,0.906,0.869,0.82,0.759,0.0]},"pop_by_year":{"1950":[2.453,2.2,1.989,1.85,1.816,1.835,1.793,1.669,1.518,1.463,1.356,1.23,1.09,0.92,0.766,0.631,0.49,0.346,0.23,0.14,0.081,0.041,0.016,0.005,0.001,0.001],"1970":[2.211,1.969,1.949,1.882,1.836,1.741,1.615,1.457,1.349,1.31,1.303,1.247,1.134,1.003,0.922,0.802,0.677,0.543,0.393,0.259,0.146,0.059,0.015,0.003,0.0,0.0],"1990":[2.14,2.036,2.03,1.992,1.78,1.581,1.46,1.448,1.387,1.338,1.252,1.143,1.014,0.913,0.854,0.809,0.728,0.61,0.483,0.369,0.235,0.124,0.049,0.014,0.002,0.001],"2000":[1.905,1.911,1.902,1.821,1.772,1.767,1.641,1.447,1.299,1.269,1.226,1.171,1.102,1.011,0.88,0.764,0.679,0.607,0.535,0.419,0.297,0.182,0.088,0.031,0.008,0.003],"2010":[1.796,1.709,1.685,1.69,1.732,1.665,1.581,1.566,1.529,1.361,1.204,1.108,1.091,1.028,0.966,0.871,0.759,0.63,0.52,0.425,0.328,0.222,0.124,0.054,0.017,0.008],"2020":[1.271,1.645,1.63,1.592,1.532,1.549,1.557,1.544,1.468,1.418,1.408,1.303,1.14,1.011,0.968,0.907,0.826,0.728,0.614,0.478,0.35,0.238,0.141,0.07,0.025,0.015]}},"Niger":{"asfr_ages":[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"px_ages":[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],"pop_ages":[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],"asfr_by_year":{"1950":[102.807,167.079,225.0,270.382,298.146,309.515,313.493,313.147,311.546,309.716,309.053,309.495,308.889,306.882,304.021,300.387,294.678,286.681,275.64,261.909,247.335,233.111,217.39,200.137,182.542,164.893,143.521,119.458,96.909,76.993,60.215,47.003,36.028,26.635,16.993],"1970":[100.095,160.041,212.629,252.481,277.367,288.841,293.745,294.739,294.509,294.144,295.612,299.062,301.675,302.967,303.494,303.388,300.309,294.045,283.629,269.627,254.602,240.76,225.483,208.737,192.055,176.183,154.952,129.966,106.041,84.489,65.52,50.835,38.734,28.572,18.266],"1990":[98.542,165.088,227.423,278.671,310.115,322.548,328.465,331.25,333.592,335.95,337.789,338.163,334.876,327.833,318.946,308.723,297.828,286.177,273.098,258.81,244.741,231.288,216.423,199.99,183.105,165.668,145.062,121.882,100.226,81.124,65.87,52.492,41.175,31.207,20.326],"2000":[100.366,163.015,220.4,266.685,297.029,312.567,321.855,327.287,329.597,329.268,327.822,325.417,322.596,319.454,315.991,311.493,306.09,299.253,291.822,283.409,272.801,256.82,237.509,215.177,190.539,161.557,135.405,110.149,88.787,71.823,61.386,50.513,40.818,31.439,20.564],"2010":[85.072,148.298,210.772,265.42,299.617,313.317,320.69,324.972,327.934,329.824,330.269,328.468,324.549,318.624,311.351,302.442,294.003,285.656,277.731,269.728,260.387,246.543,229.607,209.7,187.264,160.436,135.587,111.087,89.935,72.689,61.918,50.378,40.432,31.23,20.5],"2020":[57.18,106.097,159.392,211.232,247.587,266.499,275.51,277.281,278.011,279.182,281.225,283.509,283.905,281.953,277.858,271.514,262.544,250.976,237.619,222.872,207.797,192.28,175.907,158.788,141.924,124.529,107.334,89.84,74.765,62.513,54.688,45.415,37.199,29.4,19.762]},"px_by_year":{"1950":[0.875,0.973,0.993,0.995,0.993,0.99,0.989,0.989,0.989,0.988,0.987,0.986,0.984,0.98,0.975,0.964,0.948,0.929,0.895,0.851,0.792,0.711,0.622,0.545,0.476,0.0],"1970":[0.873,0.974,0.994,0.995,0.993,0.991,0.989,0.989,0.989,0.988,0.987,0.986,0.984,0.98,0.975,0.965,0.95,0.931,0.899,0.856,0.799,0.719,0.632,0.559,0.489,0.0],"1990":[0.874,0.984,0.997,0.997,0.996,0.995,0.994,0.994,0.994,0.993,0.992,0.991,0.99,0.987,0.983,0.976,0.966,0.952,0.927,0.892,0.844,0.777,0.696,0.606,0.53,0.0],"2000":[0.897,0.988,0.997,0.998,0.997,0.996,0.995,0.995,0.995,0.994,0.993,0.992,0.991,0.988,0.984,0.978,0.968,0.955,0.931,0.898,0.849,0.788,0.709,0.61,0.534,0.0],"2010":[0.926,0.993,0.998,0.998,0.998,0.997,0.996,0.996,0.996,0.995,0.995,0.994,0.992,0.99,0.986,0.981,0.972,0.96,0.939,0.908,0.861,0.801,0.723,0.623,0.548,0.0],"2020":[0.933,0.995,0.999,0.999,0.998,0.998,0.997,0.997,0.997,0.997,0.996,0.994,0.993,0.99,0.987,0.981,0.973,0.96,0.94,0.911,0.868,0.807,0.715,0.604,0.503,0.0]},"pop_by_year":{"1950":[5.252,3.615,3.047,2.583,2.208,1.87,1.604,1.399,1.212,1.037,0.872,0.714,0.57,0.449,0.343,0.194,0.104,0.077,0.043,0.041,0.022,0.007,0.001,0.0,0.0,0.0],"1970":[5.025,3.365,2.919,2.565,2.242,1.901,1.677,1.418,1.165,0.971,0.811,0.691,0.596,0.503,0.413,0.324,0.236,0.157,0.094,0.046,0.014,0.003,0.0,0.0,0.0,0.0],"1990":[4.975,3.267,2.851,2.475,2.131,1.859,1.637,1.433,1.227,1.046,0.873,0.764,0.64,0.514,0.414,0.329,0.256,0.191,0.13,0.075,0.035,0.012,0.002,0.0,0.0,0.0],"2000":[4.901,3.456,2.822,2.407,2.118,1.854,1.568,1.345,1.178,1.035,0.892,0.756,0.636,0.516,0.452,0.352,0.266,0.195,0.132,0.081,0.041,0.015,0.004,0.001,0.0,0.0],"2010":[4.598,3.668,3.078,2.564,2.099,1.746,1.496,1.305,1.112,0.944,0.816,0.714,0.619,0.52,0.43,0.342,0.28,0.208,0.14,0.084,0.043,0.017,0.005,0.001,0.0,0.0],"2020":[4.013,3.476,3.09,2.702,2.303,1.928,1.579,1.296,1.089,0.942,0.814,0.681,0.578,0.497,0.425,0.351,0.278,0.211,0.145,0.098,0.051,0.02,0.006,0.001,0.0,0.0]}}};

const YEARS = ["1950","1970","1990","2000","2010","2020"];
const COLORS = { primary: '#7a1f2b', alt: '#c9973a', current: '#3b6d11', stableActual: '#5c1620' };

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

// Hadwiger (1940) fertility curve. H is fixed to the actual TFR computed from data,
// leaving A (shape) and B (mean childbearing age) as the two adjustable parameters.
function hadwigerASFR(ages, H, A, B) {
  return ages.map(x => {
    const v = 1000 * H * (A / B) * Math.pow(B / x, 1.5) * Math.exp(-A * A * (B / x + x / B - 2));
    return +v.toFixed(2);
  });
}
function computeTFR(asfrVals) { return asfrVals.reduce((s, v) => s + v, 0) / 1000; }

// Force px = 0 at the terminal age (100), matching the data's own open-ended convention.
function clampTerminal(pxVals) { const out = pxVals.slice(); out[out.length - 1] = 0; return out; }

function gompertzPx(ages, a, b) { return clampTerminal(ages.map(x => +(1 - Math.min(a * Math.exp(b * x), 0.999)).toFixed(4))); }
function exponentialPx(ages, mu) { const q = 1 - Math.exp(-mu); return clampTerminal(ages.map(() => +(1 - q).toFixed(4))); }

function resample(ages, values) { const out = []; for (let a = 0; a <= 100; a++) out.push(lerp(ages, values, a)); return out; }

function distStats(resampled, r) {
  const total = resampled.reduce((s, v) => s + v, 0);
  const youth = resampled.slice(0, 15).reduce((s, v) => s + v, 0);
  const working = resampled.slice(15, 65).reduce((s, v) => s + v, 0);
  const old = resampled.slice(65, 101).reduce((s, v) => s + v, 0);
  let cum = 0, median = 0;
  for (let a = 0; a <= 100; a++) { cum += resampled[a]; if (cum >= total / 2) { median = a; break; } }
  return { median, youthDep: youth / working * 100, oldDep: old / working * 100, aging: old / youth * 100, r };
}

function legendHTML(items) {
  return items.map(l => `<span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:10px; border-radius:2px; background:${l.color};"></span>${l.text}</span>`).join('');
}
function statRow(name, color, s) {
  const rTxt = s.r === null ? '–' : (s.r * 100).toFixed(2) + '%';
  return `<tr><td style="padding:4px 6px 4px 0; white-space:nowrap;"><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${color}; margin-right:4px;"></span>${name}</td>
    <td style="padding:4px 6px; text-align:right;">${s.median}</td>
    <td style="padding:4px 6px; text-align:right;">${s.youthDep.toFixed(0)}</td>
    <td style="padding:4px 6px; text-align:right;">${s.oldDep.toFixed(0)}</td>
    <td style="padding:4px 0 4px 6px; text-align:right;">${s.aging.toFixed(0)}</td>
    <td style="padding:4px 0 4px 6px; text-align:right;">${rTxt}</td></tr>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const $ = id => document.getElementById(id);
  const countrySel = $('demo-country'), yearSlider = $('demo-year'), yearOut = $('demo-year-out');
  const asfrMode = $('demo-asfr-mode'), compareCountry = $('demo-compare-country'), hadwigerControls = $('demo-hadwiger-controls');
  const hadA = $('demo-hadA'), hadB = $('demo-hadB'), hadA_out = $('demo-hadA-out'), hadB_out = $('demo-hadB-out');
  const survMode = $('demo-surv-mode'), gompertzControls = $('demo-gompertz-controls'), expControls = $('demo-exp-controls');
  const gA = $('demo-gA'), gB = $('demo-gB'), gA_out = $('demo-gA-out'), gB_out = $('demo-gB-out');
  const expMu = $('demo-expMu'), expMu_out = $('demo-expMu-out');

  Object.keys(DEMO_DATA).forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; compareCountry.appendChild(o); });
  compareCountry.value = 'Niger';

  let charts = {};
  function upsertChart(key, canvasId, datasets, yMax, xMin, xMax) {
    if (!charts[key]) {
      charts[key] = new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: { datasets },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { type: 'linear', min: xMin, max: xMax, title: { display: true, text: 'Age', font: { size: 11 } }, ticks: { font: { size: 10 } } },
            y: { beginAtZero: true, max: yMax, ticks: { font: { size: 10 } } }
          }
        }
      });
    } else {
      charts[key].data.datasets = datasets;
      charts[key].update();
    }
  }

  function toPoints(ages, values) { return ages.map((a, i) => ({ x: a, y: values[i] })); }

  function render() {
    const c = countrySel.value, y = YEARS[+yearSlider.value];
    yearOut.textContent = y;
    const d = DEMO_DATA[c];
    const aMode = asfrMode.value, sMode = survMode.value;
    compareCountry.style.display = aMode === 'country' ? 'inline-block' : 'none';
    hadwigerControls.style.display = aMode === 'hadwiger' ? 'flex' : 'none';
    gompertzControls.style.display = sMode === 'gompertz' ? 'flex' : 'none';
    expControls.style.display = sMode === 'exponential' ? 'flex' : 'none';

    // ASFR
    const asfrVals = d.asfr_by_year[y];
    const asfrDatasets = [{ label: c, data: asfrVals.map((v, i) => ({ x: d.asfr_ages[i], y: v })), borderColor: COLORS.primary, backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }];
    const asfrLegendItems = [{ color: COLORS.primary, text: c }];
    let altAsfrVals = null;
    if (aMode === 'country') {
      const c2 = compareCountry.value;
      altAsfrVals = DEMO_DATA[c2].asfr_by_year[y];
      asfrDatasets.push({ data: altAsfrVals.map((v, i) => ({ x: d.asfr_ages[i], y: v })), borderColor: COLORS.alt, borderDash: [6, 3], fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 });
      asfrLegendItems.push({ color: COLORS.alt, text: c2 + ' (dashed)' });
    } else if (aMode === 'hadwiger') {
      hadA_out.textContent = hadA.value; hadB_out.textContent = hadB.value;
      const H = computeTFR(asfrVals);
      altAsfrVals = hadwigerASFR(d.asfr_ages, H, +hadA.value, +hadB.value);
      asfrDatasets.push({ data: altAsfrVals.map((v, i) => ({ x: d.asfr_ages[i], y: v })), borderColor: COLORS.alt, borderDash: [6, 3], fill: false, tension: 0.4, pointRadius: 0, borderWidth: 2 });
      asfrLegendItems.push({ color: COLORS.alt, text: 'Hadwiger fit, H = ' + H.toFixed(2) + ' (dashed)' });
    }
    $('demo-asfr-legend').innerHTML = legendHTML(asfrLegendItems);
    upsertChart('asfr', 'demo-asfrChart', asfrDatasets, 350, 15, 49);

    // Survival probability
    const pxVals = d.px_by_year[y];
    const pxDatasets = [{ data: toPoints(d.px_ages, pxVals), borderColor: COLORS.primary, backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }];
    const pxLegendItems = [{ color: COLORS.primary, text: c + ' (actual)' }];
    let altPxVals = null;
    if (sMode === 'gompertz') {
      const aVal = +gA.value / 1e6, bVal = +gB.value / 1000;
      gA_out.textContent = aVal.toFixed(5); gB_out.textContent = bVal.toFixed(3);
      altPxVals = gompertzPx(d.px_ages, aVal, bVal);
      pxDatasets.push({ data: toPoints(d.px_ages, altPxVals), borderColor: COLORS.alt, borderDash: [6, 3], fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 });
      pxLegendItems.push({ color: COLORS.alt, text: 'Gompertz fit (dashed)' });
    } else if (sMode === 'exponential') {
      const mu = +expMu.value / 1000;
      expMu_out.textContent = mu.toFixed(3);
      altPxVals = exponentialPx(d.px_ages, mu);
      pxDatasets.push({ data: toPoints(d.px_ages, altPxVals), borderColor: COLORS.alt, borderDash: [2, 2], fill: false, tension: 0, pointRadius: 0, borderWidth: 2 });
      pxLegendItems.push({ color: COLORS.alt, text: 'Constant-hazard exponential fit (dotted)' });
    }
    $('demo-px-legend').innerHTML = legendHTML(pxLegendItems);
    upsertChart('px', 'demo-pxChart', pxDatasets, 1, 0, 100);

    // Age distribution + stats
    const actualStable = stableDist(d.asfr_ages, asfrVals, d.px_ages, pxVals);
    const actualStableTotal = actualStable.values.reduce((s, x) => s + x, 0);
    const popTotal = d.pop_by_year[y].reduce((s, x) => s + x, 0);
    const distDatasets = [
      { data: toPoints(d.pop_ages, d.pop_by_year[y]), borderColor: COLORS.current, backgroundColor: 'transparent', fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 },
      { data: toPoints(actualStable.ages, actualStable.values.map(v => +(v / actualStableTotal * popTotal).toFixed(3))), borderColor: COLORS.stableActual, borderDash: [6, 3], fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 }
    ];
    const distLegendItems = [{ color: COLORS.current, text: 'Current (UN WPP)' }, { color: COLORS.stableActual, text: 'Stable, actual rates (dashed)' }];
    let statsHTML = '<table style="width:100%; border-collapse:collapse;"><thead><tr style="color:#5f5e5a; font-size:10px;"><td></td><td style="text-align:right;">Med.age</td><td style="text-align:right;">Youth dep.</td><td style="text-align:right;">Old dep.</td><td style="text-align:right;">Aging idx</td><td style="text-align:right;">r</td></tr></thead><tbody>';
    statsHTML += statRow('Current', COLORS.current, distStats(resample(d.pop_ages, d.pop_by_year[y]), null));
    statsHTML += statRow('Stable (actual)', COLORS.stableActual, distStats(resample(actualStable.ages, actualStable.values), actualStable.r));

    const effAsfr = altAsfrVals || asfrVals;
    const effPx = altPxVals || pxVals;
    if (altAsfrVals || altPxVals) {
      const altStable = stableDist(d.asfr_ages, effAsfr, d.px_ages, effPx);
      const altTotal = altStable.values.reduce((s, x) => s + x, 0);
      distDatasets.push({ data: toPoints(altStable.ages, altStable.values.map(v => +(v / altTotal * popTotal).toFixed(3))), borderColor: COLORS.alt, borderDash: [2, 2], fill: false, tension: 0.3, pointRadius: 0, borderWidth: 2 });
      distLegendItems.push({ color: COLORS.alt, text: 'Stable, alternate rates (dotted)' });
      statsHTML += statRow('Stable (alt)', COLORS.alt, distStats(resample(altStable.ages, altStable.values), altStable.r));
    }
    statsHTML += '</tbody></table>';
    $('demo-stats').innerHTML = statsHTML;
    $('demo-dist-legend').innerHTML = legendHTML(distLegendItems);
    upsertChart('dist', 'demo-distChart', distDatasets, 6, 0, 100);
  }

  [countrySel, yearSlider, asfrMode, compareCountry, hadA, hadB, survMode, gA, gB, expMu].forEach(el => el.addEventListener('input', render));
  render();
});
