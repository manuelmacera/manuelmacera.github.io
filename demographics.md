---
layout: page
title: Demographics
permalink: /demographics.html
---

<div class="coming-soon" style="margin-bottom:1.5rem;">
  <h2>Global Demographics</h2>
  <p>Working prototype below — sample data for two countries (Argentina, Niger) while the full country/region dataset is built out. ASFR (age-specific fertility rate) and survival probability are the two primitives; pick up to seven country/year combinations to compare across all panels below.</p>
</div>

<div style="background:#fffdf9; border:1px solid #e6ddce; border-radius:8px; padding:12px 16px; margin:0 0 1rem; display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end;">
  <div>
    <label style="font-size:13px; color:#5f5e5a; display:block; margin-bottom:4px;">Country</label>
    <select id="pin-country" style="min-width:150px;">
      <option value="Argentina">Argentina</option>
      <option value="Niger">Niger</option>
    </select>
  </div>
  <div>
    <label style="font-size:13px; color:#5f5e5a; display:block; margin-bottom:4px;">Year</label>
    <select id="pin-year" style="min-width:100px;">
      <option value="1950">1950</option>
      <option value="1970">1970</option>
      <option value="1990">1990</option>
      <option value="2000">2000</option>
      <option value="2010">2010</option>
      <option value="2020">2020</option>
    </select>
  </div>
  <button id="pin-add" type="button" style="font-size:13px; font-weight:600; padding:7px 16px; border-radius:6px; border:1px solid #7a1f2b; background:#7a1f2b; color:#fffdf9; cursor:pointer;">Add</button>
  <span id="pin-limit-note" style="display:none; font-size:12px; color:#898781;">Remove one to add another (max 7)</span>
</div>

<div id="pin-chips" style="display:flex; flex-wrap:wrap; gap:10px; margin:0 0 1.5rem;"></div>

<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:16px;">
  <div class="paper-card" style="padding:1em 1.3em;">
    <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">ASFR (births per 1,000 women)</p>
    <div style="max-width:460px; margin:0 auto;">
      <div style="position:relative; height:200px;"><canvas id="demo-asfrChart" role="img" aria-label="Age-specific fertility rate by age for each pinned country and year">ASFR by age</canvas></div>
    </div>
    <div id="demo-asfr-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
    <p id="demo-asfr-empty" style="font-size:13px; color:#898781; text-align:center; margin:2em 0;">Add a country and year above to see data.</p>
  </div>

  <div class="paper-card" style="padding:1em 1.3em;">
    <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Survival probability (unconditional, from birth)</p>
    <div style="max-width:460px; margin:0 auto;">
      <div style="position:relative; height:200px;"><canvas id="demo-pxChart" role="img" aria-label="Survival probability by age for each pinned country and year">Survival probability by age</canvas></div>
    </div>
    <div id="demo-px-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
    <p id="demo-px-empty" style="font-size:13px; color:#898781; text-align:center; margin:2em 0;">Add a country and year above to see data.</p>
  </div>
</div>

<hr style="border:none; border-top:1px solid #e6ddce; margin:2em 0;">

<div style="display:flex; flex-wrap:wrap; gap:16px;">
  <div class="paper-card" style="padding:1em 1.3em; flex:2 1 420px;">
    <div style="display:flex; gap:8px; margin-bottom:10px; flex-wrap:wrap;">
      <button id="demo-tab-current" type="button" class="demo-tab" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #7a1f2b; background:#7a1f2b; color:#fffdf9; cursor:pointer;">Current age distribution</button>
      <button id="demo-tab-stable" type="button" class="demo-tab" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #e6ddce; background:transparent; color:#5f5e5a; cursor:pointer;">Stable age distribution</button>
      <button id="demo-tab-growth" type="button" class="demo-tab" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #e6ddce; background:transparent; color:#5f5e5a; cursor:pointer;">Growth rate over time</button>
    </div>

    <div id="demo-panel-current">
      <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Current age distribution (UN WPP)</p>
      <div style="max-width:640px; margin:0 auto;">
        <div style="position:relative; height:260px;"><canvas id="demo-currentChart" role="img" aria-label="Current age distribution for each pinned country and year">Current age distribution</canvas></div>
      </div>
      <div id="demo-current-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
      <p id="demo-current-empty" style="font-size:13px; color:#898781; text-align:center; margin:2em 0;">Add a country and year above to see data.</p>
    </div>

    <div id="demo-panel-stable" style="display:none;">
      <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Implied long-run stable age distribution</p>
      <div style="max-width:640px; margin:0 auto;">
        <div style="position:relative; height:260px;"><canvas id="demo-stableChart" role="img" aria-label="Implied stable age distribution for each pinned country and year">Stable age distribution</canvas></div>
      </div>
      <div id="demo-stable-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
      <p id="demo-stable-empty" style="font-size:13px; color:#898781; text-align:center; margin:2em 0;">Add a country and year above to see data.</p>
    </div>

    <div id="demo-panel-growth" style="display:none;">
      <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Population growth rate: projected forward under fixed vital rates, through 2100</p>
      <div style="max-width:640px; margin:0 auto;">
        <div style="position:relative; height:260px;"><canvas id="demo-growthChart" role="img" aria-label="Projected population growth rate from each pinned year through 2100, converging toward the implied stable growth rate">Growth rate over time</canvas></div>
      </div>
      <div id="demo-growth-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
      <p id="demo-growth-empty" style="font-size:13px; color:#898781; text-align:center; margin:2em 0;">Add a country and year above to see data.</p>
    </div>
  </div>
  <div class="paper-card" style="padding:1em 1.3em; flex:1 1 260px;">
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button id="demo-stats-tab-current" type="button" class="demo-tab" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #7a1f2b; background:#7a1f2b; color:#fffdf9; cursor:pointer;">Current</button>
      <button id="demo-stats-tab-stable" type="button" class="demo-tab" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #e6ddce; background:transparent; color:#5f5e5a; cursor:pointer;">Stable</button>
    </div>
    <div id="demo-stats-current" style="font-size:12px;"></div>
    <div id="demo-stats-stable" style="font-size:12px; display:none;"></div>
  </div>
</div>

<p style="font-size:12px; color:#898781; margin:1.5rem 0 0;">Source: United Nations, Department of Economic and Social Affairs, Population Division. World Population Prospects 2024.</p>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script src="{{ '/assets/js/demographics.js' | relative_url }}"></script>
