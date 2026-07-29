---
layout: page
title: Demographics
permalink: /demographics.html
---

<div class="coming-soon" style="margin-bottom:1.5rem;">
  <h2>Global Demographics</h2>
  <p>Working prototype below — sample data for two countries (Argentina, Niger) while the full country/region dataset is built out. ASFR (age-specific fertility rate) and survival probability are the two primitives; the age-distribution panel shows what they imply for a population's long-run age structure, compared against the actual current distribution.</p>
</div>

<div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center; margin:0 0 1rem;">
  <div>
    <label style="font-size:13px; color:#5f5e5a; display:block; margin-bottom:4px;">Country</label>
    <select id="demo-country" style="min-width:160px;">
      <option value="Argentina">Argentina</option>
      <option value="Niger">Niger</option>
    </select>
  </div>
  <div style="flex:1; min-width:220px;">
    <label style="font-size:13px; color:#5f5e5a; display:block; margin-bottom:4px;">Year: <span id="demo-year-out" style="font-weight:600;">1950</span></label>
    <input type="range" id="demo-year" min="0" max="5" step="1" value="0" style="width:100%;">
  </div>
</div>

<div style="background:#fffdf9; border:1px solid #e6ddce; border-radius:8px; padding:12px 16px; margin:0 0 1.5rem; display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
  <div>
    <label style="font-size:13px; color:#5f5e5a; display:block; margin-bottom:4px;">Overlay (applies to both panels below)</label>
    <select id="demo-overlay-mode" style="min-width:160px;">
      <option value="none">No overlay</option>
      <option value="country">Compare country</option>
      <option value="fit">Parametric fit</option>
    </select>
  </div>
  <select id="demo-compare-country" style="display:none; min-width:140px;"></select>
</div>

<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:16px;">
  <div class="paper-card" style="padding:1em 1.3em;">
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-bottom:8px;">
      <select id="demo-asfr-fit-form" style="display:none; min-width:130px;">
        <option value="hadwiger">Hadwiger fit</option>
        <option value="normal">Normal fit</option>
      </select>
      <div id="demo-hadwiger-controls" style="display:none; flex:1; min-width:220px; gap:12px;">
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Shape A: <b id="demo-hadA-out">2</b></label><input type="range" id="demo-hadA" min="0.8" max="3.5" step="0.1" value="2" style="width:100%;"></div>
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Mean age B: <b id="demo-hadB-out">27</b></label><input type="range" id="demo-hadB" min="20" max="35" step="0.5" value="27" style="width:100%;"></div>
      </div>
      <div id="demo-normal-controls" style="display:none; flex:1; min-width:220px; gap:12px;">
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Mean age: <b id="demo-normMean-out">28</b></label><input type="range" id="demo-normMean" min="18" max="42" step="1" value="28" style="width:100%;"></div>
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Spread: <b id="demo-normSpread-out">7</b></label><input type="range" id="demo-normSpread" min="3" max="15" step="0.5" value="7" style="width:100%;"></div>
      </div>
    </div>
    <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">ASFR (births per 1,000 women)</p>
    <div style="max-width:460px; margin:0 auto;">
      <div style="position:relative; height:200px;"><canvas id="demo-asfrChart" role="img" aria-label="Age-specific fertility rate by age">ASFR by age</canvas></div>
    </div>
    <div id="demo-asfr-legend" style="display:flex; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
  </div>

  <div class="paper-card" style="padding:1em 1.3em;">
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-bottom:8px;">
      <select id="demo-surv-fit-form" style="display:none; min-width:150px;">
        <option value="gompertz">Gompertz fit</option>
        <option value="exponential">Exponential (constant hazard)</option>
      </select>
      <div id="demo-gompertz-controls" style="display:none; flex:1; min-width:200px; gap:12px;">
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Level a: <b id="demo-gA-out">0.00010</b></label><input type="range" id="demo-gA" min="1" max="900" step="1" value="10" style="width:100%;"></div>
        <div style="flex:1;"><label style="font-size:11px; color:#5f5e5a;">Growth b: <b id="demo-gB-out">0.085</b></label><input type="range" id="demo-gB" min="30" max="160" step="1" value="85" style="width:100%;"></div>
      </div>
      <div id="demo-exp-controls" style="display:none; flex:1; min-width:150px;">
        <label style="font-size:11px; color:#5f5e5a;">Hazard μ: <b id="demo-expMu-out">0.010</b></label><input type="range" id="demo-expMu" min="1" max="150" step="1" value="10" style="width:100%;">
      </div>
    </div>
    <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Survival probability (unconditional, from birth)</p>
    <div style="max-width:460px; margin:0 auto;">
      <div style="position:relative; height:200px;"><canvas id="demo-pxChart" role="img" aria-label="Survival probability by age with parametric fit">Survival probability by age</canvas></div>
    </div>
    <div id="demo-px-legend" style="display:flex; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
  </div>
</div>

<hr style="border:none; border-top:1px solid #e6ddce; margin:2em 0;">

<div style="display:flex; flex-wrap:wrap; gap:16px;">
  <div class="paper-card" style="padding:1em 1.3em; flex:2 1 420px;">
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button id="demo-tab-dist" type="button" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #7a1f2b; background:#7a1f2b; color:#fffdf9; cursor:pointer;">Age distribution</button>
      <button id="demo-tab-growth" type="button" style="font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; border:1px solid #e6ddce; background:transparent; color:#5f5e5a; cursor:pointer;">Growth rate over time</button>
    </div>

    <div id="demo-panel-dist">
      <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Age distribution: current vs. implied long-run (stable)</p>
      <div style="max-width:640px; margin:0 auto;">
        <div style="position:relative; height:260px;"><canvas id="demo-distChart" role="img" aria-label="Current age distribution compared to stable age distributions implied by actual and alternate vital rates">Age distribution comparison</canvas></div>
      </div>
      <div id="demo-dist-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
    </div>

    <div id="demo-panel-growth" style="display:none;">
      <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 6px;">Population growth rate: projected forward under fixed vital rates</p>
      <div style="max-width:640px; margin:0 auto;">
        <div style="position:relative; height:260px;"><canvas id="demo-growthChart" role="img" aria-label="Projected population growth rate over the next century, converging toward the implied stable growth rate">Growth rate over time</canvas></div>
      </div>
      <div id="demo-growth-legend" style="display:flex; flex-wrap:wrap; gap:14px; font-size:11px; color:#5f5e5a; margin-top:8px;"></div>
    </div>
  </div>
  <div class="paper-card" style="padding:1em 1.3em; flex:1 1 260px;">
    <p style="font-size:13px; font-weight:700; color:#3d3c39; margin:0 0 10px;">Summary statistics</p>
    <div id="demo-stats" style="font-size:12px;"></div>
  </div>
</div>

<p style="font-size:12px; color:#898781; margin:1.5rem 0 0;">Source: United Nations, Department of Economic and Social Affairs, Population Division. World Population Prospects 2024.</p>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script src="{{ '/assets/js/demographics.js' | relative_url }}"></script>
