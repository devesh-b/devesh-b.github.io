---
layout: project
title: "4-bit Flash ADC"
description: "4-bit Flash ADC architecture using a Wallace Tree encoder for high-speed thermometer-to-binary conversion."
category: "IC Design"
tags: [ADC, Flash ADC, Wallace Tree, Verilog, Mixed-Signal]
link: "https://github.com/devesh-b/4bit-Flash-ADC"
---

## Overview

A 4-bit flash ADC where all 15 comparator outputs are resolved in parallel, making it the fastest ADC topology. The thermometer-code output is converted to binary using a **Wallace Tree encoder** rather than a ROM-based priority encoder, reducing the propagation delay through the encoding stage.

Source: [github.com/devesh-b/4bit-Flash-ADC](https://github.com/devesh-b/4bit-Flash-ADC)

---

## Architecture

A flash ADC for N bits uses 2^N − 1 comparators in parallel. For N = 4, that is 15 comparators, each with a different reference voltage tapped from a resistor ladder. All 15 comparators resolve simultaneously in one clock phase, producing a 15-bit thermometer code.

<figure>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="4-bit Flash ADC architecture">
  <!-- V_in -->
  <text x="20" y="116" fill="currentColor" opacity="0.50" font-size="11">V_in</text>
  <line x1="52" y1="112" x2="80" y2="112" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>

  <!-- Resistor ladder -->
  <line x1="80" y1="20" x2="80" y2="200" stroke="currentColor" stroke-width="1.4" opacity="0.38"/>
  <text x="80" y="14" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="9">V_ref</text>
  <text x="80" y="208" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="9">GND</text>
  <!-- resistor symbols on ladder -->
  <g opacity="0.45">
    <rect x="74" y="24" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="36" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="48" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="62" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="76" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="90" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="104" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="118" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="132" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="146" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="160" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
    <rect x="74" y="174" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>
  </g>

  <!-- Comparator bank (8 shown, labelled) -->
  <g opacity="0.52">
    <polygon points="110,26 110,42 128,34" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="80" y1="28" x2="110" y2="28" stroke="currentColor" stroke-width="0.9" opacity="0.35"/>
    <line x1="54" y1="34" x2="110" y2="34" stroke="currentColor" stroke-width="0.9" opacity="0.35"/>
    <line x1="128" y1="34" x2="155" y2="34" stroke="currentColor" stroke-width="0.9" opacity="0.35"/>
  </g>
  <g opacity="0.46">
    <polygon points="110,54 110,70 128,62" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="80" y1="56" x2="110" y2="56" stroke="currentColor" stroke-width="0.9" opacity="0.32"/>
    <line x1="54" y1="62" x2="110" y2="62" stroke="currentColor" stroke-width="0.9" opacity="0.32"/>
    <line x1="128" y1="62" x2="155" y2="62" stroke="currentColor" stroke-width="0.9" opacity="0.32"/>
  </g>
  <g opacity="0.40">
    <polygon points="110,82 110,98 128,90" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="80" y1="84" x2="110" y2="84" stroke="currentColor" stroke-width="0.9" opacity="0.30"/>
    <line x1="54" y1="90" x2="110" y2="90" stroke="currentColor" stroke-width="0.9" opacity="0.30"/>
    <line x1="128" y1="90" x2="155" y2="90" stroke="currentColor" stroke-width="0.9" opacity="0.30"/>
  </g>
  <g opacity="0.34">
    <polygon points="110,110 110,126 128,118" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="80" y1="112" x2="110" y2="112" stroke="currentColor" stroke-width="0.9" opacity="0.28"/>
    <line x1="128" y1="118" x2="155" y2="118" stroke="currentColor" stroke-width="0.9" opacity="0.28"/>
  </g>
  <text x="118" y="146" fill="currentColor" opacity="0.22" font-size="12" text-anchor="middle">⋮</text>
  <text x="144" y="146" fill="currentColor" opacity="0.22" font-size="12" text-anchor="middle">⋮</text>
  <text x="65" y="118" fill="currentColor" opacity="0.30" font-size="8">V_in →</text>
  <text x="65" y="35" fill="currentColor" opacity="0.26" font-size="7">V_ref[14]</text>

  <!-- Thermometer bus -->
  <rect x="155" y="24" width="16" height="168" rx="2" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1" opacity="0.32"/>
  <text x="163" y="118" fill="currentColor" opacity="0.32" font-size="8" text-anchor="middle" transform="rotate(-90,163,118)">15-bit thermometer</text>

  <!-- Arrow to encoder -->
  <line x1="171" y1="112" x2="208" y2="112" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="205,108 213,112 205,116" fill="currentColor" opacity="0.35"/>

  <!-- Wallace Tree encoder -->
  <rect x="213" y="50" width="160" height="130" rx="4" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.6" opacity="0.56"/>
  <text x="293" y="90" text-anchor="middle" fill="currentColor" opacity="0.60" font-size="11" font-weight="bold">Wallace Tree</text>
  <text x="293" y="106" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">Encoder</text>
  <text x="293" y="122" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">15 → 4 bits</text>
  <!-- tree structure hint -->
  <line x1="235" y1="136" x2="270" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.20"/>
  <line x1="255" y1="136" x2="270" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.20"/>
  <line x1="275" y1="136" x2="270" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.20"/>
  <line x1="295" y1="136" x2="316" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <line x1="315" y1="136" x2="316" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <line x1="335" y1="136" x2="316" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <line x1="270" y1="152" x2="293" y2="167" stroke="currentColor" stroke-width="0.8" opacity="0.16"/>
  <line x1="316" y1="152" x2="293" y2="167" stroke="currentColor" stroke-width="0.8" opacity="0.16"/>

  <!-- Arrow out of encoder -->
  <line x1="373" y1="112" x2="408" y2="112" stroke="currentColor" stroke-width="1.2" opacity="0.32"/>
  <polygon points="405,108 413,112 405,116" fill="currentColor" opacity="0.32"/>

  <!-- Binary output -->
  <rect x="413" y="90" width="80" height="45" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.40"/>
  <text x="453" y="110" text-anchor="middle" fill="currentColor" opacity="0.44" font-size="10">D[3:0]</text>
  <text x="453" y="125" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">4-bit binary</text>

  <text x="350" y="200" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="10">All 15 comparators resolve simultaneously — thermometer → Wallace Tree → binary in O(log N) depth</text>
</svg>
</figure>

---

## Wallace Tree encoder

A Wallace tree is a carry-save adder network that reduces a large number of partial products (or thermometer bits) down to a 2-input sum in O(log N) adder stages. For a standard priority encoder the worst-case path through a chain of OR gates grows linearly with the number of input bits. The Wallace tree breaks this by summing groups of 3 bits into a carry-save pair at each level, halving the number of operands per stage.

<figure>
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Wallace tree structure for 15 thermometer bits">
  <!-- Level 0: 15 inputs -->
  <text x="350" y="16" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="10">Level 0: 15 thermometer bits</text>
  <g opacity="0.40">
    <rect x="30"  y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="58"  y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="86"  y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="114" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="142" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="170" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="198" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="226" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="254" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="282" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="310" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="338" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="366" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="394" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="422" y="22" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
  </g>
  <!-- Level 1: 5 groups of 3 → 10 outputs (5 sum + 5 carry) -->
  <text x="350" y="68" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="10">Level 1: 5 FA groups → 10 bits</text>
  <g opacity="0.45">
    <rect x="44"  y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="72"  y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="128" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="156" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="212" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="240" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="296" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="324" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="380" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
    <rect x="408" y="74" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="0.8"/>
  </g>
  <!-- Level 2: reduce to 4 outputs -->
  <text x="350" y="120" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="10">Level 2: reduce to 4 bits</text>
  <g opacity="0.50">
    <rect x="168" y="126" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.10" stroke="currentColor" stroke-width="1"/>
    <rect x="224" y="126" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.10" stroke="currentColor" stroke-width="1"/>
    <rect x="280" y="126" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.10" stroke="currentColor" stroke-width="1"/>
    <rect x="336" y="126" width="18" height="12" rx="1" fill="currentColor" fill-opacity="0.10" stroke="currentColor" stroke-width="1"/>
  </g>
  <!-- Output labels -->
  <text x="177" y="158" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">D[0]</text>
  <text x="233" y="158" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">D[1]</text>
  <text x="289" y="158" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">D[2]</text>
  <text x="345" y="158" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">D[3]</text>
  <!-- reduction arrows (abstract) -->
  <text x="555" y="50" fill="currentColor" opacity="0.30" font-size="9">3→2 reduction</text>
  <text x="555" y="65" fill="currentColor" opacity="0.26" font-size="9">at each level</text>
  <text x="555" y="80" fill="currentColor" opacity="0.22" font-size="9">(Full Adder)</text>
  <text x="555" y="105" fill="currentColor" opacity="0.36" font-size="10">O(log₃/₂ N) stages</text>
  <text x="555" y="120" fill="currentColor" opacity="0.28" font-size="9">vs O(N) for ripple</text>
</svg>
</figure>

---

## Design trade-offs

| Characteristic | Flash ADC | SAR ADC |
|----------------|-----------|---------|
| Conversions per cycle | 1 (all parallel) | N (N-bit sequential) |
| Comparator count | 2^N − 1 = 15 | 1 |
| Power | High (15 active comparators) | Low |
| Speed | Highest — single clock phase | Limited by N conversion cycles |
| Area | Large | Compact |

At 4 bits, **comparator offset and mismatch** dominate INL/DNL non-linearity more than the encoder delay. Each comparator has a slightly different offset due to process variation; with 15 comparators this produces missing codes and non-monotonicity if uncompensated. Calibration (offset correction DAC per comparator) or careful sizing (larger input transistors to average out mismatch) is required in a production design.
