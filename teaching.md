---
layout: page
title: Teaching
permalink: /teaching.html
---

## Current — Universidad Torcuato Di Tella, Department of Economics

<div class="paper-list">
{% for course in site.data.teaching_current %}
  <details class="paper-card">
    <summary>
      <span class="summary-row">
        <span class="paper-title">{{ course.title }}</span>
        <span class="paper-meta">{{ course.level }}</span>
      </span>
    </summary>
    <div class="paper-body">
      <div class="paper-details">
        {% if course.description and course.description != "" %}
          <p class="paper-abstract">{{ course.description }}</p>
        {% endif %}
        {% if course.syllabus %}
          <a class="paper-pdf-link" href="{{ '/syllabi/' | append: course.syllabus | relative_url }}">Download syllabus</a>
        {% else %}
          <p class="paper-broken">Syllabus not yet added</p>
        {% endif %}
      </div>
    </div>
  </details>
{% endfor %}
</div>

## Previous positions

**Colorado State University (2013–2017)**
- Quantitative Methods in Finance (graduate)
- International Business Finance (undergraduate)
- Financial Markets and Institutions (undergraduate)

**University of Minnesota (2012)**
- Money and Banking (undergraduate)

**Universidad del Pacífico, Peru (2011)**
- Macroeconomic Theory (graduate)
