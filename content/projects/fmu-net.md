---
layout: project
title: "FMU-NET: Semantic Segmentation for Person ID"
description: "Novel semantic segmentation architecture for person identification. Published at EASCT 2023."
category: "Software & ML"
tags: [PyTorch, Computer Vision, Segmentation, Deep Learning]
doi: "10.1109/EASCT59475.2023.10392590"
---

## Overview

FMU-NET is a semantic segmentation architecture designed for **person identification** in challenging scenes — partial occlusion, crowded backgrounds, and variable lighting. The model produces dense per-pixel labels separating person instances from background, which a downstream re-identification module uses for feature matching.

Published at **IEEE EASCT 2023** (Emerging Applications of Signal, Communication, and Technology). DOI: [10.1109/EASCT59475.2023.10392590](https://doi.org/10.1109/EASCT59475.2023.10392590)

---

## Motivation

Person re-identification (Re-ID) systems that work directly on bounding boxes include background clutter in the feature embedding — a bench behind a person, a wall texture, a shopping bag — which all contribute noise to the similarity metric. Segmentation pre-processing removes this background signal, forcing the embedding to encode only the person's appearance.

The challenge is doing this robustly under real-world conditions: partial occlusions, overlapping instances, low-contrast clothing against similar backgrounds.

---

## Architecture

FMU-NET uses an **encoder-decoder** backbone with multi-scale feature fusion, following the U-Net principle but with targeted modifications for person silhouette precision.

<figure>
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="FMU-NET encoder-decoder architecture">
  <!-- Input image -->
  <rect x="20" y="110" width="50" height="50" rx="2" fill="currentColor" fill-opacity="0.10" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="45" y="133" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="9">Input</text>
  <text x="45" y="147" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="8">H×W×3</text>
  <line x1="70" y1="135" x2="90" y2="135" stroke="currentColor" stroke-width="1.1" opacity="0.35"/>
  <polygon points="87,131 95,135 87,139" fill="currentColor" opacity="0.35"/>

  <!-- Encoder blocks (progressively smaller) -->
  <rect x="95" y="100" width="50" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.50"/>
  <text x="120" y="130" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="9">Enc</text>
  <text x="120" y="143" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="7">H/2</text>
  <text x="120" y="155" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">C×64</text>

  <rect x="175" y="85" width="50" height="100" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.46"/>
  <text x="200" y="128" text-anchor="middle" fill="currentColor" opacity="0.46" font-size="9">Enc</text>
  <text x="200" y="141" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">H/4</text>
  <text x="200" y="153" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">C×128</text>

  <rect x="255" y="68" width="50" height="130" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.42"/>
  <text x="280" y="126" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">Enc</text>
  <text x="280" y="139" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">H/8</text>
  <text x="280" y="151" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="7">C×256</text>

  <!-- Bottleneck / FPN neck -->
  <rect x="315" y="100" width="70" height="70" rx="4" fill="currentColor" fill-opacity="0.11" stroke="currentColor" stroke-width="1.7" opacity="0.60"/>
  <text x="350" y="130" text-anchor="middle" fill="currentColor" opacity="0.62" font-size="9" font-weight="bold">FPN</text>
  <text x="350" y="143" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="8">Neck</text>
  <text x="350" y="156" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">multi-scale</text>

  <!-- Decoder blocks (progressively larger) -->
  <rect x="405" y="68" width="50" height="130" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.40"/>
  <text x="430" y="126" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">Dec</text>
  <text x="430" y="139" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="7">H/8</text>

  <rect x="485" y="85" width="50" height="100" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.36"/>
  <text x="510" y="128" text-anchor="middle" fill="currentColor" opacity="0.36" font-size="9">Dec</text>
  <text x="510" y="141" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">H/4</text>

  <rect x="565" y="100" width="50" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.3" opacity="0.32"/>
  <text x="590" y="130" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="9">Dec</text>
  <text x="590" y="143" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">H/2</text>

  <!-- Output -->
  <rect x="630" y="110" width="50" height="50" rx="2" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <text x="655" y="132" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">Mask</text>
  <text x="655" y="146" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="8">H×W×1</text>

  <!-- Arrows forward through encoder -->
  <line x1="145" y1="135" x2="175" y2="135" stroke="currentColor" stroke-width="1" opacity="0.30"/>
  <line x1="225" y1="135" x2="255" y2="135" stroke="currentColor" stroke-width="1" opacity="0.26"/>
  <line x1="305" y1="135" x2="315" y2="135" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <line x1="385" y1="135" x2="405" y2="135" stroke="currentColor" stroke-width="1" opacity="0.26"/>
  <line x1="455" y1="135" x2="485" y2="135" stroke="currentColor" stroke-width="1" opacity="0.24"/>
  <line x1="535" y1="135" x2="565" y2="135" stroke="currentColor" stroke-width="1" opacity="0.22"/>
  <line x1="615" y1="135" x2="630" y2="135" stroke="currentColor" stroke-width="1" opacity="0.25"/>

  <!-- Skip connections with attention gates -->
  <line x1="120" y1="100" x2="120" y2="60" stroke="currentColor" stroke-width="0.8" opacity="0.18" stroke-dasharray="3,2"/>
  <line x1="120" y1="60" x2="590" y2="60" stroke="currentColor" stroke-width="0.8" opacity="0.18" stroke-dasharray="3,2"/>
  <line x1="590" y1="60" x2="590" y2="100" stroke="currentColor" stroke-width="0.8" opacity="0.18" stroke-dasharray="3,2"/>

  <line x1="200" y1="85" x2="200" y2="44" stroke="currentColor" stroke-width="0.8" opacity="0.14" stroke-dasharray="3,2"/>
  <line x1="200" y1="44" x2="510" y2="44" stroke="currentColor" stroke-width="0.8" opacity="0.14" stroke-dasharray="3,2"/>
  <line x1="510" y1="44" x2="510" y2="85" stroke="currentColor" stroke-width="0.8" opacity="0.14" stroke-dasharray="3,2"/>

  <!-- Attention gate markers -->
  <circle cx="590" cy="80" r="6" fill="none" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="590" y="84" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">AG</text>
  <circle cx="510" cy="68" r="6" fill="none" stroke="currentColor" stroke-width="1" opacity="0.22"/>
  <text x="510" y="72" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">AG</text>

  <text x="350" y="230" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="9">Skip connections with attention gates suppress irrelevant background activations before merge</text>
  <text x="350" y="244" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="9">FPN neck captures multi-scale context: fine silhouette detail + semantic depth</text>
</svg>
</figure>

---

## Key design decisions

**Feature pyramid neck:** The FPN aggregates features from multiple encoder scales. Shallow features carry fine spatial detail (person boundary, limb edges); deep features carry semantic context (recognising a person as a person rather than background object). Fusing both in the neck before decoding improves boundary precision at person silhouette edges.

**Attention gates on skip connections:** Standard U-Net skip connections pass all encoder features to the decoder, including irrelevant background texture. The attention gate learns to weight each spatial position in the skip feature map by its relevance to the current decoder context — suppressing background regions before they contribute to the decoder's reconstruction. This improves precision at person boundaries without requiring additional post-processing.

**Lightweight decoder:** Three upsampling stages with relatively narrow channel width. The design prioritises inference speed relative to heavier decoders, trading some mask quality for practical deployment throughput.

---

## Results

Evaluated on person re-identification benchmarks. The segmentation pre-processing step improves downstream re-ID accuracy by removing background noise from the embedding feature space — forcing the feature extractor to concentrate on person appearance rather than scene context.
