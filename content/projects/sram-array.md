---
layout: project
title: "6T SRAM Array"
description: "6T SRAM cell and array designed and laid out in the SkyWater SKY130A PDK, achieving a 5% improvement in read/write stability margins."
category: "IC Design"
tags: [Cadence Virtuoso, SkyWater SKY130A, SRAM, Analog, Layout]
link: "https://github.com/devesh-b/SRAM-Array"
---

## Overview

A 6-transistor SRAM cell and memory array implemented in the open-source **SkyWater SKY130A PDK**, targeting fabrication-ready layout. The 6T topology is the standard for high-density SRAM: two cross-coupled inverters hold the stored bit, and two access transistors connect to the bitline pair during read and write operations.

Source: [github.com/devesh-b/SRAM-Array](https://github.com/devesh-b/SRAM-Array)

---

## The 6T cell

The six transistors divide into three pairs:

- **Pull-up network (PU):** two PMOS (MP1, MP2) forming the load devices of each inverter
- **Pull-down network (PD):** two NMOS (MN1, MN2) forming the drive devices — must be stronger than the access transistors to preserve stored data during a read
- **Access transistors (AC):** two NMOS (MA1, MA2) gated by the wordline, connecting the cell to BL and BLB

<figure>
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="6T SRAM cell schematic">
  <!-- VDD rail -->
  <line x1="200" y1="30" x2="500" y2="30" stroke="currentColor" stroke-width="1.6" opacity="0.40"/>
  <text x="350" y="22" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="10">VDD</text>

  <!-- Left inverter: MP1 (PMOS) + MN1 (NMOS) -->
  <!-- MP1 PMOS -->
  <line x1="250" y1="30" x2="250" y2="60" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="236" y1="60" x2="264" y2="60" stroke="currentColor" stroke-width="1.6" opacity="0.45"/>
  <line x1="250" y1="60" x2="250" y2="80" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="224" y1="56" x2="224" y2="84" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="224" y1="70" x2="236" y2="70" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <circle cx="218" cy="70" r="3" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.40"/>
  <text x="196" y="74" text-anchor="end" fill="currentColor" opacity="0.38" font-size="9">Q̄</text>
  <text x="262" y="54" fill="currentColor" opacity="0.30" font-size="8">MP1</text>

  <!-- MN1 NMOS -->
  <line x1="250" y1="80" x2="250" y2="120" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="236" y1="100" x2="264" y2="100" stroke="currentColor" stroke-width="1.6" opacity="0.45"/>
  <line x1="224" y1="96" x2="224" y2="124" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="224" y1="110" x2="236" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <text x="196" y="114" text-anchor="end" fill="currentColor" opacity="0.38" font-size="9">Q̄</text>
  <line x1="250" y1="120" x2="250" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <text x="262" y="114" fill="currentColor" opacity="0.30" font-size="8">MN1</text>

  <!-- VSS -->
  <line x1="200" y1="140" x2="500" y2="140" stroke="currentColor" stroke-width="1.6" opacity="0.30"/>
  <text x="350" y="154" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="10">VSS</text>

  <!-- Right inverter: MP2 (PMOS) + MN2 (NMOS) -->
  <line x1="450" y1="30" x2="450" y2="60" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="436" y1="60" x2="464" y2="60" stroke="currentColor" stroke-width="1.6" opacity="0.45"/>
  <line x1="450" y1="60" x2="450" y2="80" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="476" y1="56" x2="476" y2="84" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="464" y1="70" x2="476" y2="70" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <circle cx="482" cy="70" r="3" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.40"/>
  <text x="490" y="74" fill="currentColor" opacity="0.38" font-size="9">Q</text>
  <text x="420" y="54" text-anchor="end" fill="currentColor" opacity="0.30" font-size="8">MP2</text>
  <line x1="450" y1="80" x2="450" y2="120" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="436" y1="100" x2="464" y2="100" stroke="currentColor" stroke-width="1.6" opacity="0.45"/>
  <line x1="476" y1="96" x2="476" y2="124" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <line x1="464" y1="110" x2="476" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <text x="490" y="114" fill="currentColor" opacity="0.38" font-size="9">Q</text>
  <line x1="450" y1="120" x2="450" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <text x="420" y="114" text-anchor="end" fill="currentColor" opacity="0.30" font-size="8">MN2</text>

  <!-- Cross coupling wires: Q̄ gate → Q output, Q gate → Q̄ output -->
  <line x1="215" y1="70" x2="180" y2="70" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <line x1="180" y1="70" x2="180" y2="90" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <line x1="180" y1="90" x2="450" y2="90" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <circle cx="450" cy="90" r="2.5" fill="currentColor" opacity="0.38"/>
  <line x1="215" y1="110" x2="180" y2="110" stroke="currentColor" stroke-width="0.8" opacity="0.22"/>

  <line x1="485" y1="70" x2="520" y2="70" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <line x1="520" y1="70" x2="520" y2="90" stroke="currentColor" stroke-width="1" opacity="0.28"/>
  <line x1="250" y1="90" x2="520" y2="90" stroke="currentColor" stroke-width="1" opacity="0.22"/>
  <circle cx="250" cy="90" r="2.5" fill="currentColor" opacity="0.38"/>

  <!-- Access transistors MA1 and MA2 -->
  <!-- MA1 on BL side -->
  <line x1="160" y1="90" x2="180" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <line x1="130" y1="86" x2="158" y2="86" stroke="currentColor" stroke-width="1.4" opacity="0.40"/>
  <line x1="130" y1="94" x2="158" y2="94" stroke="currentColor" stroke-width="1.4" opacity="0.40"/>
  <line x1="130" y1="80" x2="130" y2="100" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <line x1="100" y1="80" x2="100" y2="100" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <line x1="100" y1="90" x2="130" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <line x1="130" y1="66" x2="130" y2="80" stroke="currentColor" stroke-width="1.1" opacity="0.35"/>
  <line x1="100" y1="66" x2="158" y2="66" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <text x="100" y="60" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">WL</text>
  <text x="60" y="94" text-anchor="end" fill="currentColor" opacity="0.45" font-size="10" font-weight="bold">BL</text>
  <line x1="62" y1="90" x2="100" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <text x="76" y="74" fill="currentColor" opacity="0.28" font-size="8">MA1</text>

  <!-- MA2 on BLB side -->
  <line x1="542" y1="90" x2="520" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <line x1="542" y1="86" x2="570" y2="86" stroke="currentColor" stroke-width="1.4" opacity="0.40"/>
  <line x1="542" y1="94" x2="570" y2="94" stroke="currentColor" stroke-width="1.4" opacity="0.40"/>
  <line x1="570" y1="80" x2="570" y2="100" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <line x1="600" y1="80" x2="600" y2="100" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <line x1="570" y1="90" x2="600" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <line x1="570" y1="66" x2="570" y2="80" stroke="currentColor" stroke-width="1.1" opacity="0.35"/>
  <line x1="542" y1="66" x2="600" y2="66" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <text x="570" y="60" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">WL</text>
  <text x="630" y="94" fill="currentColor" opacity="0.45" font-size="10" font-weight="bold">BLB</text>
  <line x1="600" y1="90" x2="638" y2="90" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <text x="614" y="74" fill="currentColor" opacity="0.28" font-size="8">MA2</text>

  <!-- Labels -->
  <text x="250" y="175" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">MP1 + MN1</text>
  <text x="250" y="186" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="9">left inverter holds Q̄</text>
  <text x="450" y="175" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">MP2 + MN2</text>
  <text x="450" y="186" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="9">right inverter holds Q</text>

  <text x="350" y="230" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="10">WL high → MA1/MA2 connect cell to BL/BLB for read or write</text>
  <text x="350" y="246" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="10">β-ratio (PD/AC sizing) governs read stability vs write-ability trade-off</text>
</svg>
</figure>

---

## Layout and DRC/LVS

The cell was drawn in **Cadence Virtuoso** against the SKY130A design rules with attention to:

- **Symmetry:** the two inverters are mirror images in layout to match threshold voltages and prevent SNM asymmetry between hold-'0' and hold-'1' states
- **Bitline balance:** BL and BLB routing is length-matched to within the DRC minimum to equalise read parasitic capacitance
- **β-ratio:** access transistor W/L is sized relative to the pull-down NMOS to satisfy the read-stability constraint (cell ratio ≥ 1.5 for SKY130A process targets)

The cell was arrayed into a small macro with row decoder (wordline driver) and column circuitry (sense amplifier + write driver placeholders).

---

## Stability results

PVT simulations across SKY130A corner models:

<figure>
<svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Read SNM butterfly curve concept">
  <!-- butterfly curve axes -->
  <line x1="100" y1="30" x2="100" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <line x1="100" y1="140" x2="310" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <text x="205" y="158" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="10">V_BL</text>
  <text x="84" y="88" text-anchor="end" fill="currentColor" opacity="0.35" font-size="10" transform="rotate(-90,84,88)">V_Q</text>
  <!-- butterfly left lobe -->
  <path d="M100,140 C120,140 150,100 170,80 C185,65 200,60 210,85 C220,110 200,140 180,140 Z"
        fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  <!-- inner square (SNM) -->
  <rect x="148" y="100" width="30" height="30" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="0.8" opacity="0.30" stroke-dasharray="3,2"/>
  <text x="163" y="119" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="8">SNM</text>

  <!-- optimised curve -->
  <path d="M100,140 C120,140 155,96 175,74 C190,58 205,54 215,80 C225,106 205,140 183,140 Z"
        fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.60" stroke-dasharray="5,3"/>
  <rect x="153" y="93" width="35" height="35" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="0.8" opacity="0.40"/>
  <text x="225" y="105" fill="currentColor" opacity="0.50" font-size="9">+5% SNM</text>
  <text x="225" y="118" fill="currentColor" opacity="0.35" font-size="8">(optimised β-ratio)</text>

  <text x="400" y="70" fill="currentColor" opacity="0.45" font-size="10">Read SNM improvement:</text>
  <text x="400" y="88" fill="currentColor" opacity="0.38" font-size="9">• Baseline: standard β-ratio</text>
  <text x="400" y="104" fill="currentColor" opacity="0.38" font-size="9">• Optimised: PD/AC sizing tuned</text>
  <text x="400" y="120" fill="currentColor" opacity="0.55" font-size="10">→ 5% larger SNM square</text>
  <text x="400" y="140" fill="currentColor" opacity="0.28" font-size="9">PVT corners: TT, SS, FF, SF, FS</text>
</svg>
</figure>

The 5% SNM improvement comes from tuning the β-ratio (pull-down strength / access transistor strength) to the optimal point for the SKY130A process — improving read stability without degrading write-ability, which requires the access transistor to overpower the pull-up during a write.
