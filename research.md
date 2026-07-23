---
layout: page
title: Research
permalink: /research.html
---

## Publications

<div class="paper-list">
{% for paper in site.data.publications %}
  <details class="paper-card">
    <summary>
      <span class="summary-row">
        <span class="paper-title">{{ paper.title }}</span>
        <span class="paper-meta">{{ paper.venue }}{% if paper.venue.size > 0 and paper.coauthors.size > 0 %} &middot; {% endif %}{{ paper.coauthors }}</span>
      </span>
    </summary>
    <div class="paper-body">
      <img class="paper-snapshot" src="{{ '/papers/snapshots/' | append: paper.snapshot | relative_url }}" alt="First page of {{ paper.title }}">
      <div class="paper-details">
        <p class="paper-abstract">{{ paper.abstract }}</p>
        <a class="paper-pdf-link" href="{{ '/papers/' | append: paper.pdf | relative_url }}">Download PDF</a>
      </div>
    </div>
  </details>
{% endfor %}
</div>

## Working Papers

<div class="paper-list">
{% for paper in site.data.working_papers %}
  <details class="paper-card">
    <summary>
      <span class="summary-row">
        <span class="paper-title">{{ paper.title }}</span>
        <span class="paper-meta">{{ paper.venue }}{% if paper.venue.size > 0 and paper.coauthors.size > 0 %} &middot; {% endif %}{{ paper.coauthors }}</span>
      </span>
    </summary>
    <div class="paper-body">
      {% if paper.broken %}
        <p class="paper-broken">PDF temporarily unavailable — source file needs to be re-uploaded.</p>
      {% else %}
        <img class="paper-snapshot" src="{{ '/papers/snapshots/' | append: paper.snapshot | relative_url }}" alt="First page of {{ paper.title }}">
        <div class="paper-details">
          <p class="paper-abstract">{{ paper.abstract }}</p>
          <a class="paper-pdf-link" href="{{ '/papers/' | append: paper.pdf | relative_url }}">Download PDF</a>
        </div>
      {% endif %}
    </div>
  </details>
{% endfor %}
</div>

## Work in Progress

- **Irreversible Investment and Market Sentiment** — with Christian Krestel
- **Precautionary Behavior and Aggregate Savings**
