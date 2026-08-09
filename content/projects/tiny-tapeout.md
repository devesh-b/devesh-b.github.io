---
layout: project
title: "Tiny Tapeout — Chipalooza"
description: "Two custom ICs submitted to Efabless open shuttles. Received $300 Tiny Tapeout Award (2024)."
category: "IC Design"
tags: [OpenLane, GDS, Efabless, Verilog, Analog, Tiny Tapeout]
link: "https://github.com/devesh-b/tt09-deveshb-8-bitMAC"
---

## Overview

Two separate IC designs submitted to the **Tiny Tapeout 9** open shuttle via Efabless — one digital, one analog — both targeting the same multi-project wafer. The analog submission received the **$300 Tiny Tapeout Award** at the 2024 Chipalooza competition, selected from across all open shuttle entries.

Source (digital MAC): [github.com/devesh-b/tt09-deveshb-8-bitMAC](https://github.com/devesh-b/tt09-deveshb-8-bitMAC)

---

## TT9 Digital: 8-bit MAC unit

A pipelined 8-bit **multiply-accumulate (MAC)** unit using **Vedic multipliers** and **reversible gates** for energy efficiency, designed to fit within the Tiny Tapeout tile I/O constraints.

### Architecture

<figure>
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="8-bit MAC unit pipeline">
  <!-- Input mux / half-cycle demux -->
  <rect x="20" y="60" width="80" height="70" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="60" y="90" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="9">I/O Mux</text>
  <text x="60" y="104" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="7">8 in + 8 bidir</text>
  <text x="60" y="116" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="7">half-cycle split</text>
  <text x="60" y="128" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">A[7:0] / B[7:0]</text>
  <line x1="100" y1="96" x2="138" y2="96" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <polygon points="135,92 143,96 135,100" fill="currentColor" opacity="0.38"/>

  <!-- Vedic multiplier -->
  <rect x="143" y="50" width="130" height="90" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.56"/>
  <text x="208" y="86" text-anchor="middle" fill="currentColor" opacity="0.60" font-size="10" font-weight="bold">Vedic 8×8</text>
  <text x="208" y="101" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="8">Urdhva-Tiryak</text>
  <text x="208" y="114" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">partial products</text>
  <text x="208" y="127" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">→ 16-bit product</text>
  <line x1="273" y1="96" x2="308" y2="96" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="305,92 313,96 305,100" fill="currentColor" opacity="0.35"/>

  <!-- Pipeline register -->
  <rect x="313" y="80" width="30" height="30" rx="2" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.1" opacity="0.38"/>
  <text x="328" y="99" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="7">REG</text>
  <line x1="343" y1="96" x2="378" y2="96" stroke="currentColor" stroke-width="1.2" opacity="0.33"/>
  <polygon points="375,92 383,96 375,100" fill="currentColor" opacity="0.33"/>

  <!-- Accumulator / reversible adder -->
  <rect x="383" y="50" width="130" height="90" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.52"/>
  <text x="448" y="84" text-anchor="middle" fill="currentColor" opacity="0.56" font-size="10" font-weight="bold">Accumulator</text>
  <text x="448" y="100" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="8">Reversible adder</text>
  <text x="448" y="113" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">Toffoli / Fredkin</text>
  <text x="448" y="126" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">Landauer-optimal</text>
  <line x1="513" y1="96" x2="548" y2="96" stroke="currentColor" stroke-width="1.2" opacity="0.30"/>
  <polygon points="545,92 553,96 545,100" fill="currentColor" opacity="0.30"/>

  <!-- Output serialiser -->
  <rect x="553" y="60" width="80" height="70" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.38"/>
  <text x="593" y="90" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="9">Out Mux</text>
  <text x="593" y="104" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="7">8 out + 8 bidir</text>
  <text x="593" y="116" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="7">16-bit result</text>

  <!-- CLK annotation -->
  <line x1="328" y1="110" x2="328" y2="150" stroke="currentColor" stroke-width="0.8" opacity="0.18" stroke-dasharray="3,2"/>
  <text x="334" y="166" fill="currentColor" opacity="0.20" font-size="8">CLK: half-cycle boundaries</text>

  <text x="350" y="168" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="9">Multiply (half-cycle 1) → Accumulate (half-cycle 2) → Serialise output</text>
</svg>
</figure>

**Vedic multiplier:** Uses the Urdhva-Tiryakbhyam (vertical and cross-wise) algorithm from Vedic mathematics. For an 8×8 multiplier, the Vedic approach recursively decomposes into four 4×4 multiplications, reducing the critical path compared to a Wallace tree or ripple-carry approach at 8-bit widths.

**Reversible gates:** The accumulator adder tree is built from Toffoli and Fredkin gates — reversible logic elements that are bijective (one-to-one input→output mapping). Reversible logic dissipates no energy in theory (Landauer's principle: energy is only dissipated when bits are erased). At CMOS switching speeds the thermal benefit is small, but the design demonstrates the architectural principle.

**I/O pinout:** The TT9 shuttle provides 8 input + 8 output + 8 bidirectional pins per tile. The 8-bit A and B operands are time-multiplexed across the same 8 input pins using half-clock-cycle demultiplexing, and the 16-bit result is serialised out across the output and bidirectional pins.

Hardened using **OpenLane** targeting SKY130A. Source: [GitHub](https://github.com/devesh-b/tt09-deveshb-8-bitMAC)

---

## TT9 Analog: Universal Active Filter

A second TT9 submission on the analog track: a **universal active filter** covering low-pass, high-pass, and band-pass response modes with configurable cut-off frequency.

<figure>
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Universal active filter frequency responses">
  <!-- Axes -->
  <line x1="60" y1="20" x2="60" y2="120" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <line x1="60" y1="120" x2="640" y2="120" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <text x="350" y="138" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="10">Frequency →</text>
  <text x="44" y="72" text-anchor="end" fill="currentColor" opacity="0.35" font-size="10" transform="rotate(-90,44,72)">|H(f)|</text>
  <!-- f_c marker -->
  <line x1="310" y1="118" x2="310" y2="122" stroke="currentColor" stroke-width="1" opacity="0.30"/>
  <text x="310" y="132" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">f_c</text>

  <!-- Low-pass response -->
  <polyline points="70,35 200,35 280,36 310,50 360,80 420,100 500,112 580,116 620,118"
            fill="none" stroke="currentColor" stroke-width="2" opacity="0.55" stroke-linejoin="round"/>
  <text x="110" y="30" fill="currentColor" opacity="0.52" font-size="9">Low-pass</text>

  <!-- High-pass response -->
  <polyline points="70,118 120,116 180,112 240,100 280,80 310,50 360,36 500,35 620,35"
            fill="none" stroke="currentColor" stroke-width="2" opacity="0.40" stroke-linejoin="round" stroke-dasharray="6,3"/>
  <text x="530" y="30" fill="currentColor" opacity="0.40" font-size="9">High-pass</text>

  <!-- Band-pass response -->
  <polyline points="70,118 150,110 240,75 310,35 380,75 470,110 580,118 620,118"
            fill="none" stroke="currentColor" stroke-width="2" opacity="0.30" stroke-linejoin="round" stroke-dasharray="3,3"/>
  <text x="310" y="22" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">Band-pass</text>
</svg>
</figure>

The filter topology uses an OTA (operational transconductance amplifier) or op-amp-RC biquad structure where the cut-off frequency is set by the ratio of passive components. Mode selection — LP/HP/BP — is configured via the TT analog I/O pins. Designed collaboratively through PESU-ECC.

---

## Chipalooza Award

The analog filter submission was one of **ten projects selected** from across the Efabless open shuttle for the **$300 Tiny Tapeout Award** at the 2024 Chipalooza competition — a recognition of the design's quality within the analog tapeout track.
