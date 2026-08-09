---
layout: project
title: "Flexible CLA Adder"
description: "Modular 4-bit Carry-Look Ahead Adder blocks with scalable architecture for timing and area optimisation."
category: "Digital Design"
tags: [SystemVerilog, Adder, CLA, RTL, Arithmetic]
link: "https://github.com/devesh-b/Flex-CLA"
---

## Overview

A flexible **Carry-Look Ahead (CLA) adder** built from composable 4-bit blocks in SystemVerilog. The CLA topology pre-computes carry signals in parallel rather than rippling through the addition chain, reducing worst-case addition latency from O(N) to O(log N) for multi-bit widths.

Source: [github.com/devesh-b/Flex-CLA](https://github.com/devesh-b/Flex-CLA)

---

## Why CLA over ripple-carry

In a ripple-carry adder (RCA), carry propagates serially from bit 0 to bit N−1. The worst-case path through an N-bit RCA scales as 2N gate delays (carry chain). A carry-look-ahead adder breaks this dependency by computing all carries simultaneously from the original inputs.

For bit position i, define:
- **Generate:** `G_i = A_i AND B_i` — this bit position always produces a carry out regardless of carry in
- **Propagate:** `P_i = A_i XOR B_i` — this bit position passes carry in to carry out

With G and P, all carry signals can be computed in parallel:

```
C_1 = G_0 + P_0·C_0
C_2 = G_1 + P_1·G_0 + P_1·P_0·C_0
C_3 = G_2 + P_2·G_1 + P_2·P_1·G_0 + P_2·P_1·P_0·C_0
C_4 = G_3 + P_3·G_2 + P_3·P_2·G_1 + P_3·P_2·P_1·G_0 + P_3·P_2·P_1·P_0·C_0
```

Every carry is now a 2-level AND-OR expression — constant delay regardless of position.

---

## Architecture

<figure>
<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Two-level CLA adder structure: four 4-bit CLA blocks + group CLA">
  <!-- Input labels -->
  <text x="70"  y="18" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">A[3:0] B[3:0]</text>
  <text x="210" y="18" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">A[7:4] B[7:4]</text>
  <text x="350" y="18" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">A[11:8] B[11:8]</text>
  <text x="490" y="18" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">A[15:12] B[15:12]</text>

  <!-- 4-bit CLA blocks (level 1) -->
  <rect x="30" y="25" width="80" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.4" opacity="0.55"/>
  <text x="70" y="55" text-anchor="middle" fill="currentColor" opacity="0.58" font-size="9" font-weight="bold">CLA</text>
  <text x="70" y="68" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="8">4-bit</text>
  <text x="70" y="80" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">bits 3:0</text>
  <text x="70" y="90" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">G₀, P₀</text>

  <rect x="170" y="25" width="80" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.4" opacity="0.50"/>
  <text x="210" y="55" text-anchor="middle" fill="currentColor" opacity="0.52" font-size="9" font-weight="bold">CLA</text>
  <text x="210" y="68" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="8">4-bit</text>
  <text x="210" y="80" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">bits 7:4</text>
  <text x="210" y="90" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">G₁, P₁</text>

  <rect x="310" y="25" width="80" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  <text x="350" y="55" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="9" font-weight="bold">CLA</text>
  <text x="350" y="68" text-anchor="middle" fill="currentColor" opacity="0.34" font-size="8">4-bit</text>
  <text x="350" y="80" text-anchor="middle" fill="currentColor" opacity="0.25" font-size="7">bits 11:8</text>
  <text x="350" y="90" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="7">G₂, P₂</text>

  <rect x="450" y="25" width="80" height="70" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.4" opacity="0.40"/>
  <text x="490" y="55" text-anchor="middle" fill="currentColor" opacity="0.44" font-size="9" font-weight="bold">CLA</text>
  <text x="490" y="68" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">4-bit</text>
  <text x="490" y="80" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="7">bits 15:12</text>
  <text x="490" y="90" text-anchor="middle" fill="currentColor" opacity="0.18" font-size="7">G₃, P₃</text>

  <!-- Sum outputs (down from each block) -->
  <line x1="70"  y1="95" x2="70"  y2="115" stroke="currentColor" stroke-width="0.9" opacity="0.28"/>
  <text x="70"  y="128" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">S[3:0]</text>
  <line x1="210" y1="95" x2="210" y2="115" stroke="currentColor" stroke-width="0.9" opacity="0.25"/>
  <text x="210" y="128" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">S[7:4]</text>
  <line x1="350" y1="95" x2="350" y2="115" stroke="currentColor" stroke-width="0.9" opacity="0.22"/>
  <text x="350" y="128" text-anchor="middle" fill="currentColor" opacity="0.25" font-size="8">S[11:8]</text>
  <line x1="490" y1="95" x2="490" y2="115" stroke="currentColor" stroke-width="0.9" opacity="0.18"/>
  <text x="490" y="128" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="8">S[15:12]</text>

  <!-- G/P lines going down to group CLA -->
  <line x1="70"  y1="95" x2="70"  y2="150" stroke="currentColor" stroke-width="0.9" opacity="0.22" stroke-dasharray="3,2"/>
  <line x1="210" y1="95" x2="210" y2="150" stroke="currentColor" stroke-width="0.9" opacity="0.20" stroke-dasharray="3,2"/>
  <line x1="350" y1="95" x2="350" y2="150" stroke="currentColor" stroke-width="0.9" opacity="0.18" stroke-dasharray="3,2"/>
  <line x1="490" y1="95" x2="490" y2="150" stroke="currentColor" stroke-width="0.9" opacity="0.16" stroke-dasharray="3,2"/>

  <!-- Group CLA (level 2) -->
  <rect x="30" y="150" width="500" height="46" rx="4" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.5" opacity="0.50"/>
  <text x="280" y="170" text-anchor="middle" fill="currentColor" opacity="0.55" font-size="10" font-weight="bold">Group CLA</text>
  <text x="280" y="185" text-anchor="middle" fill="currentColor" opacity="0.34" font-size="9">Computes inter-group carries C₁, C₂, C₃ from G₀–G₃, P₀–P₃, C_in</text>

  <!-- Carry feeds back to CLA blocks -->
  <line x1="140" y1="173" x2="110" y2="173" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <line x1="110" y1="173" x2="110" y2="60" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <line x1="110" y1="60" x2="110" y2="60" stroke="currentColor" stroke-width="0.8" opacity="0.18"/>
  <text x="118" y="68" fill="currentColor" opacity="0.18" font-size="7">C₁→</text>
  <text x="258" y="68" fill="currentColor" opacity="0.16" font-size="7">C₂→</text>
  <text x="398" y="68" fill="currentColor" opacity="0.14" font-size="7">C₃→</text>

  <!-- C_out -->
  <line x1="280" y1="196" x2="280" y2="216" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <text x="280" y="228" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="9">C_out (overflow)</text>

  <text x="350" y="216" fill="currentColor" opacity="0.20" font-size="9" text-anchor="middle">Two-level CLA: 4-bit blocks compute local G/P · Group CLA resolves inter-group carries in O(1)</text>
</svg>
</figure>

---

## Multi-width variants

The same 4-bit block is assembled into wider adders:

| Width | 4-bit blocks | Group CLA level | Max carry depth |
|-------|-------------|-----------------|-----------------|
| 8-bit | 2 | 1 | 4 gate delays |
| 16-bit | 4 | 1 | 4 gate delays |
| 32-bit | 8 | 2 | ~6 gate delays |

A 32-bit RCA has up to 64 gate delays in the worst case. The two-level 32-bit CLA achieves ~6 — a 10× reduction in critical path.

---

## SystemVerilog implementation

```systemverilog
module cla_4bit (
  input  logic [3:0] a, b,
  input  logic       c_in,
  output logic [3:0] sum,
  output logic       c_out,
  output logic       G, P   // group generate/propagate
);
  logic [3:0] g, p;     // bit-level generate/propagate
  logic [4:0] c;

  assign g = a & b;
  assign p = a ^ b;
  assign c[0] = c_in;

  // CLA carry equations (all computed in parallel)
  assign c[1] = g[0] | (p[0] & c[0]);
  assign c[2] = g[1] | (p[1] & g[0]) | (p[1] & p[0] & c[0]);
  assign c[3] = g[2] | (p[2] & g[1]) | (p[2] & p[1] & g[0]) | (p[2] & p[1] & p[0] & c[0]);
  assign c[4] = g[3] | (p[3] & g[2]) | (p[3] & p[2] & g[1]) | (p[3] & p[2] & p[1] & g[0])
              | (p[3] & p[2] & p[1] & p[0] & c[0]);

  assign sum   = p ^ c[3:0];
  assign c_out = c[4];

  // Group G/P for hierarchical CLA
  assign G = g[3] | (p[3] & g[2]) | (p[3] & p[2] & g[1]) | (p[3] & p[2] & p[1] & g[0]);
  assign P = p[3] & p[2] & p[1] & p[0];
endmodule
```

---

## Evaluation

Designs were synthesised and benchmarked against ripple-carry and carry-select alternatives at 8, 16, and 32 bits. The CLA shows the expected timing advantage at wider widths, with the area-vs-speed crossover (where the carry logic overhead is justified by the timing gain) occurring around 8 bits for the target library. Circuit-level simulations confirmed timing closure across process corners.
