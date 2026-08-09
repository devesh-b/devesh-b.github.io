---
layout: project
title: "VCO-Based ADC Architectures"
description: "Comparative design and analysis of LC-tank vs current-starved VCO-based ADCs."
category: "IC Design"
tags: [Cadence, Mixed-Signal, ADC, SpectreRF, VCO]
doi: "10.1109/NKCon66957.2025.11345792"
---

## Overview

VCO-based ADCs exploit a voltage-controlled oscillator as an inherent first-order noise-shaping element: oscillator phase integrates the input voltage, and a digital counter reads out the phase at each sample clock edge. This work designs and compares two VCO topologies — an **LC-tank oscillator** and a **current-starved ring oscillator** — across linearity, phase noise, power, and area.

Published at **IEEE NKCon 2025**. DOI: [10.1109/NKCon66957.2025.11345792](https://doi.org/10.1109/NKCon66957.2025.11345792)

---

## Operating principle

When V_in is applied to the VCO control node, the oscillator runs at a frequency proportional to V_in. A digital counter accumulates phase over one sample period T_s; the difference between successive counter readings is the quantised output. Because phase is the time-integral of frequency, the overall system performs **first-order noise shaping** on quantisation error.

<figure>
<svg viewBox="0 0 700 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="VCO-ADC operating principle">
  <text x="24" y="80" fill="currentColor" opacity="0.50" font-size="11">V_in</text>
  <line x1="58" y1="76" x2="96" y2="76" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <polygon points="93,72 101,76 93,80" fill="currentColor" opacity="0.40"/>
  <rect x="101" y="52" width="90" height="48" rx="3" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.50"/>
  <text x="146" y="74" text-anchor="middle" fill="currentColor" opacity="0.55" font-size="10">VCO</text>
  <text x="146" y="88" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="8">f = K·V_in</text>
  <line x1="191" y1="76" x2="229" y2="76" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <polygon points="226,72 234,76 226,80" fill="currentColor" opacity="0.38"/>
  <rect x="234" y="52" width="90" height="48" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="279" y="74" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="10">Phase</text>
  <text x="279" y="88" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="8">∫f · dt</text>
  <line x1="324" y1="76" x2="362" y2="76" stroke="currentColor" stroke-width="1.2" opacity="0.36"/>
  <polygon points="359,72 367,76 359,80" fill="currentColor" opacity="0.36"/>
  <rect x="367" y="52" width="90" height="48" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.42"/>
  <text x="412" y="74" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="10">Counter</text>
  <text x="412" y="88" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="8">Δ per T_s</text>
  <line x1="457" y1="76" x2="495" y2="76" stroke="currentColor" stroke-width="1.2" opacity="0.34"/>
  <polygon points="492,72 500,76 492,80" fill="currentColor" opacity="0.34"/>
  <rect x="500" y="52" width="90" height="48" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.40"/>
  <text x="545" y="74" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="10">D_out[n]</text>
  <line x1="412" y1="100" x2="412" y2="122" stroke="currentColor" stroke-width="0.8" opacity="0.20" stroke-dasharray="3,2"/>
  <text x="418" y="120" fill="currentColor" opacity="0.20" font-size="9">CLK (T_s)</text>
  <text x="350" y="142" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="10">Phase integration gives inherent 1st-order noise shaping — quantisation error pushed to high frequency</text>
</svg>
</figure>

---

## LC-tank VCO

The LC-tank VCO uses a cross-coupled NMOS pair as the negative-resistance element and a differential LC resonator as the frequency-selective element. High tank Q means low phase noise floor and a more linear frequency-to-voltage characteristic near resonance.

The following are from the LC-tank VCO prototype designed and simulated in Cadence Virtuoso (GPDK45):

![Cross-coupled LC-tank VCO schematic in Cadence Virtuoso](/assets/images/vco-schematic-cadence.png)

*Cross-coupled LC-tank VCO schematic. NMOS pair M1/M2 provide negative resistance; L1/L2 and tuning capacitors form the differential tank. Current source sets operating point.*

![Oscillator frequency startup transient](/assets/images/vco-transient-sim.png)

*Transient simulation: oscillation frequency vs time showing startup and settling. Frequency stabilises to steady-state ~2 GHz as amplitude builds and the tank's amplitude-limiting nonlinearity engages. Right axis shows differential output voltage swing.*

![Harmonic Balance spectrum of LC-tank VCO](/assets/images/vco-hb-spectrum.png)

*Harmonic balance spectrum. The tank's high Q suppresses harmonic content — fundamental dominates with harmonics 20+ dB below.*

---

## Current-starved ring VCO

The current-starved ring VCO replaces the inductor-capacitor tank with an odd-number chain of CMOS inverters, each with a controlled tail current that sets the propagation delay and thus oscillation frequency. Area-efficient and portable across process nodes, but phase noise is limited by thermal and flicker noise from each inverter stage.

<figure>
<svg viewBox="0 0 700 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Current-starved 5-stage ring oscillator">
  <text x="20" y="64" fill="currentColor" opacity="0.45" font-size="10">V_ctrl</text>
  <line x1="62" y1="60" x2="90" y2="60" stroke="currentColor" stroke-width="1.1" opacity="0.35"/>
  <g opacity="0.55">
    <polygon points="92,44 92,76 112,60" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <circle cx="115" cy="60" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="102" y1="44" x2="102" y2="34" stroke="currentColor" stroke-width="1"/>
    <line x1="96" y1="34" x2="108" y2="34" stroke="currentColor" stroke-width="1.2"/>
    <line x1="102" y1="76" x2="102" y2="86" stroke="currentColor" stroke-width="1"/>
    <line x1="96" y1="86" x2="108" y2="86" stroke="currentColor" stroke-width="1.2"/>
  </g>
  <line x1="118" y1="60" x2="140" y2="60" stroke="currentColor" stroke-width="1.1" opacity="0.42"/>
  <g opacity="0.45">
    <polygon points="142,44 142,76 162,60" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <circle cx="165" cy="60" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="152" y1="44" x2="152" y2="34" stroke="currentColor" stroke-width="1"/>
    <line x1="146" y1="34" x2="158" y2="34" stroke="currentColor" stroke-width="1.2"/>
    <line x1="152" y1="76" x2="152" y2="86" stroke="currentColor" stroke-width="1"/>
    <line x1="146" y1="86" x2="158" y2="86" stroke="currentColor" stroke-width="1.2"/>
  </g>
  <line x1="168" y1="60" x2="190" y2="60" stroke="currentColor" stroke-width="1.1" opacity="0.36"/>
  <g opacity="0.36">
    <polygon points="192,44 192,76 212,60" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <circle cx="215" cy="60" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="202" y1="44" x2="202" y2="34" stroke="currentColor" stroke-width="1"/>
    <line x1="196" y1="34" x2="208" y2="34" stroke="currentColor" stroke-width="1.2"/>
    <line x1="202" y1="76" x2="202" y2="86" stroke="currentColor" stroke-width="1"/>
    <line x1="196" y1="86" x2="208" y2="86" stroke="currentColor" stroke-width="1.2"/>
  </g>
  <text x="236" y="64" fill="currentColor" opacity="0.22" font-size="14">···</text>
  <g opacity="0.28">
    <polygon points="265,44 265,76 285,60" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <circle cx="288" cy="60" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <line x1="275" y1="44" x2="275" y2="34" stroke="currentColor" stroke-width="1"/>
    <line x1="269" y1="34" x2="281" y2="34" stroke="currentColor" stroke-width="1.2"/>
    <line x1="275" y1="76" x2="275" y2="86" stroke="currentColor" stroke-width="1"/>
    <line x1="269" y1="86" x2="281" y2="86" stroke="currentColor" stroke-width="1.2"/>
  </g>
  <line x1="291" y1="60" x2="320" y2="60" stroke="currentColor" stroke-width="1.1" opacity="0.22"/>
  <line x1="320" y1="60" x2="320" y2="16" stroke="currentColor" stroke-width="1" opacity="0.18"/>
  <line x1="90" y1="16" x2="320" y2="16" stroke="currentColor" stroke-width="1" opacity="0.18"/>
  <line x1="90" y1="16" x2="90" y2="60" stroke="currentColor" stroke-width="1" opacity="0.18"/>
  <text x="345" y="64" fill="currentColor" opacity="0.32" font-size="10">f_out</text>
  <text x="350" y="110" fill="currentColor" opacity="0.22" font-size="10">I_tail per stage set by V_ctrl via PMOS/NMOS bias mirrors — delay per stage ∝ 1/I_tail</text>
</svg>
</figure>

---

## Key findings

| Metric | LC-tank VCO | Current-starved Ring |
|--------|-------------|----------------------|
| SNDR advantage | +8 dB (same power) | baseline |
| Area | Large (integrated inductor) | Compact |
| Process portability | Limited | High |
| Noise shaping order | 1st (both) | 1st (both) |
| Best use case | High-SNDR, area-tolerant | Area-constrained, moderate SNDR |

The inherent first-order noise shaping is the same for both topologies — the performance gap is purely in the in-band phase noise floor. For high-throughput links where SNDR directly bounds modulation order, the LC-tank architecture is the correct choice. For IoT or area-constrained applications at moderate resolution, the ring VCO is the practical option.
