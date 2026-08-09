---
layout: project
title: "Low Phase Noise Quadrature DCO"
description: "Dual superharmonic injection-locked quadrature DCO in 55nm CMOS for Ka-band LO synthesis."
category: "IC Design"
tags: [Cadence Virtuoso, SpectreRF, 55nm CMOS, RF, Oscillator]
doi: "10.1109/APCCAS67402.2025.11376789"
---

## Overview

A quadrature digitally controlled oscillator (DCO) in TSMC 55nm CMOS targeting Ka-band (26–40 GHz) local oscillator synthesis for SATCOM and mmWave applications. The core technique is **dual superharmonic injection locking** — generating accurate I/Q outputs from a single tank without the power cost of two separate LC oscillators.

Published at **IEEE APCCAS 2025**. DOI: [10.1109/APCCAS67402.2025.11376789](https://doi.org/10.1109/APCCAS67402.2025.11376789)

---

## The quadrature generation problem

Coherent receivers and phased-array elements need I and Q LO phases exactly 90° apart. The conventional solution — oscillate at 2f₀ and divide by two — is expensive in power and sensitive to layout parasitics at Ka-band. Two separate LC tanks coupled together consume twice the area and introduce AM-to-PM coupling that degrades quadrature accuracy.

Superharmonic injection locking offers a third path: force the **second harmonic** of a half-frequency auxiliary oscillator to lock onto the main tank. The 90° relationship falls out of the injection physics.

<figure>
<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Dual superharmonic injection locking principle">
  <rect x="20" y="80" width="130" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  <text x="85" y="105" text-anchor="middle" fill="currentColor" opacity="0.55" font-size="10">Auxiliary OSC</text>
  <text x="85" y="120" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">f₀/2 (~15 GHz)</text>
  <line x1="150" y1="108" x2="208" y2="108" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="205,104 213,108 205,112" fill="currentColor" opacity="0.35"/>
  <rect x="213" y="88" width="100" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <text x="263" y="106" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="9">2nd harmonic</text>
  <text x="263" y="119" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">extraction → f₀</text>
  <line x1="313" y1="108" x2="371" y2="108" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="368,104 376,108 368,112" fill="currentColor" opacity="0.35"/>
  <rect x="376" y="58" width="150" height="100" rx="4" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.55"/>
  <text x="451" y="96" text-anchor="middle" fill="currentColor" opacity="0.60" font-size="10">Main LC Tank</text>
  <text x="451" y="111" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="9">Class-C · 55nm CMOS</text>
  <text x="451" y="126" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">f₀ ≈ 30 GHz</text>
  <text x="451" y="141" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">symmetric diff inductor</text>
  <line x1="526" y1="82" x2="610" y2="58" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <polygon points="606,54 614,58 608,64" fill="currentColor" opacity="0.45"/>
  <text x="618" y="62" fill="currentColor" opacity="0.58" font-size="12" font-weight="bold">I</text>
  <line x1="526" y1="134" x2="610" y2="158" stroke="currentColor" stroke-width="1.3" opacity="0.36" stroke-dasharray="5,2"/>
  <polygon points="606,154 614,158 608,164" fill="currentColor" opacity="0.36"/>
  <text x="618" y="162" fill="currentColor" opacity="0.48" font-size="12">Q</text>
  <line x1="648" y1="66" x2="648" y2="156" stroke="currentColor" stroke-width="0.8" opacity="0.22" stroke-dasharray="3,2"/>
  <text x="654" y="114" fill="currentColor" opacity="0.42" font-size="11" font-style="italic">90°</text>
  <text x="350" y="195" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="10">Auxiliary at f₀/2 locks main tank at f₀ — quadrature emerges from injection geometry, not a divide chain</text>
</svg>
</figure>

---

## Circuit design

**Class-C core:** The transistor conducts for less than half a cycle, reducing average current and improving the oscillation voltage-to-power ratio compared to class-B. Startup margin is managed through a separate bias network that backs off to class-C once steady-state amplitude is reached.

**Tank inductor:** Symmetric differential layout, centre-tap at VDD, octagonal geometry for Q maximisation in the 55nm BEOL stack. The differential configuration suppresses substrate-coupled common-mode noise.

**Tuning banks:** Two-tier switched-capacitor array for monotonic frequency coverage across the Ka-band without discontinuities at code transitions.

<figure>
<svg viewBox="0 0 700 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Two-tier switched capacitor tuning bank">
  <text x="175" y="16" text-anchor="middle" fill="currentColor" opacity="0.52" font-size="10">Coarse bank — binary-weighted (5-bit)</text>
  <g opacity="0.58">
    <line x1="90" y1="26" x2="90" y2="48" stroke="currentColor" stroke-width="1.1"/>
    <line x1="80" y1="48" x2="100" y2="48" stroke="currentColor" stroke-width="1.6"/>
    <line x1="80" y1="54" x2="100" y2="54" stroke="currentColor" stroke-width="1.6"/>
    <line x1="90" y1="54" x2="90" y2="66" stroke="currentColor" stroke-width="1.1"/>
    <text x="105" y="54" fill="currentColor" opacity="0.55" font-size="9">C</text>
    <line x1="86" y1="68" x2="94" y2="76" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="86" cy="68" r="1.4" fill="currentColor" opacity="0.55"/>
    <text x="80" y="92" fill="currentColor" opacity="0.38" font-size="8">b₀</text>
  </g>
  <g opacity="0.46">
    <line x1="140" y1="26" x2="140" y2="48" stroke="currentColor" stroke-width="1.1"/>
    <line x1="128" y1="48" x2="152" y2="48" stroke="currentColor" stroke-width="1.8"/>
    <line x1="128" y1="55" x2="152" y2="55" stroke="currentColor" stroke-width="1.8"/>
    <line x1="140" y1="55" x2="140" y2="66" stroke="currentColor" stroke-width="1.1"/>
    <text x="156" y="54" fill="currentColor" opacity="0.45" font-size="9">2C</text>
    <line x1="136" y1="68" x2="144" y2="76" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="136" cy="68" r="1.4" fill="currentColor" opacity="0.45"/>
    <text x="130" y="92" fill="currentColor" opacity="0.30" font-size="8">b₁</text>
  </g>
  <g opacity="0.36">
    <line x1="196" y1="26" x2="196" y2="48" stroke="currentColor" stroke-width="1.1"/>
    <line x1="182" y1="48" x2="210" y2="48" stroke="currentColor" stroke-width="2.0"/>
    <line x1="182" y1="56" x2="210" y2="56" stroke="currentColor" stroke-width="2.0"/>
    <line x1="196" y1="56" x2="196" y2="66" stroke="currentColor" stroke-width="1.1"/>
    <text x="214" y="55" fill="currentColor" opacity="0.36" font-size="9">4C</text>
    <line x1="192" y1="68" x2="200" y2="76" stroke="currentColor" stroke-width="1.2"/>
    <circle cx="192" cy="68" r="1.4" fill="currentColor" opacity="0.36"/>
    <text x="186" y="92" fill="currentColor" opacity="0.24" font-size="8">b₂</text>
  </g>
  <text x="245" y="58" fill="currentColor" opacity="0.22" font-size="13">···</text>

  <text x="510" y="16" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="10">Fine bank — thermometer-coded (6-bit, 64 cells)</text>
  <g>
    <line x1="360" y1="26" x2="640" y2="26" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
    <line x1="380" y1="26" x2="380" y2="115" stroke="currentColor" stroke-width="0.7" opacity="0.15" stroke-dasharray="2,3"/>
    <line x1="640" y1="26" x2="640" y2="115" stroke="currentColor" stroke-width="0.7" opacity="0.15" stroke-dasharray="2,3"/>
  </g>
  <g opacity="0.42">
    <line x1="395" y1="36" x2="395" y2="56" stroke="currentColor" stroke-width="1"/>
    <line x1="387" y1="56" x2="403" y2="56" stroke="currentColor" stroke-width="1.4"/>
    <line x1="387" y1="62" x2="403" y2="62" stroke="currentColor" stroke-width="1.4"/>
    <line x1="395" y1="62" x2="395" y2="75" stroke="currentColor" stroke-width="1"/>
    <line x1="391" y1="77" x2="399" y2="84" stroke="currentColor" stroke-width="1.1"/>
  </g>
  <g opacity="0.34">
    <line x1="425" y1="36" x2="425" y2="56" stroke="currentColor" stroke-width="1"/>
    <line x1="417" y1="56" x2="433" y2="56" stroke="currentColor" stroke-width="1.4"/>
    <line x1="417" y1="62" x2="433" y2="62" stroke="currentColor" stroke-width="1.4"/>
    <line x1="425" y1="62" x2="425" y2="75" stroke="currentColor" stroke-width="1"/>
    <line x1="421" y1="77" x2="429" y2="84" stroke="currentColor" stroke-width="1.1"/>
  </g>
  <g opacity="0.26">
    <line x1="455" y1="36" x2="455" y2="56" stroke="currentColor" stroke-width="1"/>
    <line x1="447" y1="56" x2="463" y2="56" stroke="currentColor" stroke-width="1.4"/>
    <line x1="447" y1="62" x2="463" y2="62" stroke="currentColor" stroke-width="1.4"/>
    <line x1="455" y1="62" x2="455" y2="75" stroke="currentColor" stroke-width="1"/>
    <line x1="451" y1="77" x2="459" y2="84" stroke="currentColor" stroke-width="1.1"/>
  </g>
  <text x="480" y="62" fill="currentColor" opacity="0.18" font-size="13">···</text>
  <text x="390" y="108" fill="currentColor" opacity="0.24" font-size="9">t₀   t₁   t₂ ··· t₆₃  — no glitches at code boundaries</text>
  <text x="350" y="138" fill="currentColor" opacity="0.26" font-size="10">Binary-weighted coarse + thermometer fine → monotonic tuning, 15% relative bandwidth</text>
</svg>
</figure>

---

## Simulation results

Post-layout SpectreRF PSS + PNoise across PVT corners:

<figure>
<svg viewBox="0 0 700 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Phase noise vs offset frequency">
  <line x1="72" y1="18" x2="72" y2="155" stroke="currentColor" stroke-width="1.3" opacity="0.42"/>
  <line x1="72" y1="155" x2="660" y2="155" stroke="currentColor" stroke-width="1.3" opacity="0.42"/>
  <text x="12" y="95" fill="currentColor" opacity="0.38" font-size="10" transform="rotate(-90,12,95)">Phase Noise (dBc/Hz)</text>
  <text x="366" y="177" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="10">Offset Frequency</text>
  <text x="64" y="36" text-anchor="end" fill="currentColor" opacity="0.32" font-size="9">−80</text>
  <line x1="70" y1="32" x2="74" y2="32" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="64" y="76" text-anchor="end" fill="currentColor" opacity="0.32" font-size="9">−90</text>
  <line x1="70" y1="72" x2="74" y2="72" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="64" y="116" text-anchor="end" fill="currentColor" opacity="0.32" font-size="9">−100</text>
  <line x1="70" y1="112" x2="74" y2="112" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="64" y="156" text-anchor="end" fill="currentColor" opacity="0.32" font-size="9">−112</text>
  <text x="155" y="170" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">10 kHz</text>
  <line x1="155" y1="153" x2="155" y2="157" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="305" y="170" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">100 kHz</text>
  <line x1="305" y1="153" x2="305" y2="157" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="455" y="170" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">1 MHz</text>
  <line x1="455" y1="153" x2="455" y2="157" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <text x="600" y="170" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">10 MHz</text>
  <line x1="600" y1="153" x2="600" y2="157" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <polyline points="105,22 155,36 230,62 305,88 380,118 455,155 520,155 600,155 640,155"
            fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.62" stroke-linejoin="round"/>
  <line x1="105" y1="24" x2="230" y2="64" stroke="currentColor" stroke-width="0.7" opacity="0.16" stroke-dasharray="4,3"/>
  <text x="112" y="20" fill="currentColor" opacity="0.28" font-size="9" font-style="italic">1/f³</text>
  <line x1="230" y1="64" x2="455" y2="155" stroke="currentColor" stroke-width="0.7" opacity="0.16" stroke-dasharray="4,3"/>
  <text x="310" y="80" fill="currentColor" opacity="0.28" font-size="9" font-style="italic">1/f²</text>
  <line x1="455" y1="24" x2="455" y2="155" stroke="currentColor" stroke-width="0.8" opacity="0.20" stroke-dasharray="3,2"/>
  <circle cx="455" cy="155" r="5" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.70"/>
  <text x="464" y="148" fill="currentColor" opacity="0.72" font-size="10" font-weight="bold">−112 dBc/Hz</text>
  <text x="464" y="161" fill="currentColor" opacity="0.44" font-size="9">@ 1 MHz offset</text>
</svg>
</figure>

| Metric | Value |
|--------|-------|
| Phase noise @ 1 MHz offset | −112 dBc/Hz |
| Tuning range | ~15% relative BW across Ka-band |
| Supply | 1.2 V (55nm nominal) |
| Quadrature accuracy | Inherent via injection geometry |

---

## Why this matters for SATCOM

Ka-band terminals running DVB-S2X at 256APSK require EVM below ~1.5%. A degraded LO phase noise budget directly limits the maximum sustainable modulation order. Generating quadrature at f₀ via superharmonic injection — rather than dividing from 2f₀ — removes a noisy divide stage from the reference path and reduces LO power. The −112 dBc/Hz result places this design within the specification window for high-throughput LEO terminal ICs.
