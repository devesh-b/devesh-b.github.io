---
layout: project
title: "8-bit RISC-V CPU for IoT"
description: "Energy-efficient 8-bit RISC-V CPU designed for low-power IoT applications and prepared for Tiny Tapeout 9."
category: "Digital Design"
tags: [SystemVerilog, C, Assembly, RISC-V, IoT, Tiny Tapeout, Tapeout]
---

## Overview

An 8-bit RISC-V CPU designed from scratch for low-power IoT applications, targeting minimal area and energy per instruction. The design was hardened with the OpenLane flow and submitted to the **Tiny Tapeout 9** shuttle for fabrication.

---

## Design rationale

Conventional 32-bit RISC-V cores carry more datapath width than most IoT sensing and control tasks require. An 8-bit datapath reduces:

- **Register file area** — eight 8-bit registers vs thirty-two 32-bit registers
- **ALU gate count** — 8-bit arithmetic/logic units are a fraction of the 32-bit equivalent
- **Memory bus** — 8-bit data bus halves the routing overhead for small memory footprints

The instruction set retains RISC-V structural regularity — fixed-width encoding, separate integer/load/store/branch opcode spaces — so that the core remains programmable from C (via a custom toolchain configuration) and RISC-V assembly without a completely custom assembler.

<figure>
<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="8-bit RISC-V CPU architecture">
  <!-- Program Counter -->
  <rect x="20" y="90" width="80" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.48"/>
  <text x="60" y="107" text-anchor="middle" fill="currentColor" opacity="0.52" font-size="9">PC</text>
  <text x="60" y="120" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">8-bit addr</text>
  <line x1="100" y1="110" x2="128" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>
  <polygon points="125,106 133,110 125,114" fill="currentColor" opacity="0.38"/>

  <!-- Instruction memory -->
  <rect x="133" y="80" width="80" height="60" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="173" y="107" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="9">IMEM</text>
  <text x="173" y="120" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">ROM / flash</text>
  <text x="173" y="133" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">8-bit words</text>
  <line x1="213" y1="110" x2="248" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="245,106 253,110 245,114" fill="currentColor" opacity="0.35"/>

  <!-- Decode / Control -->
  <rect x="253" y="70" width="90" height="80" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
  <text x="298" y="105" text-anchor="middle" fill="currentColor" opacity="0.60" font-size="10" font-weight="bold">Decode</text>
  <text x="298" y="120" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="8">opcode → ctrl</text>
  <text x="298" y="133" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">imm extract</text>
  <text x="298" y="145" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">reg select</text>
  <line x1="343" y1="110" x2="378" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="375,106 383,110 375,114" fill="currentColor" opacity="0.35"/>

  <!-- Register file -->
  <rect x="383" y="70" width="80" height="80" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.46"/>
  <text x="423" y="105" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="9">Reg File</text>
  <text x="423" y="118" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="7">8 × 8-bit</text>
  <text x="423" y="130" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">x0–x7</text>
  <line x1="463" y1="110" x2="498" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.33"/>
  <polygon points="495,106 503,110 495,114" fill="currentColor" opacity="0.33"/>

  <!-- ALU -->
  <rect x="503" y="70" width="80" height="80" rx="3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.4" opacity="0.52"/>
  <text x="543" y="105" text-anchor="middle" fill="currentColor" opacity="0.56" font-size="9" font-weight="bold">ALU</text>
  <text x="543" y="118" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="7">8-bit</text>
  <text x="543" y="130" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">ADD/SUB</text>
  <text x="543" y="142" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">AND/OR/XOR</text>
  <text x="543" y="154" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="7">SLT/shifts</text>
  <line x1="583" y1="110" x2="618" y2="110" stroke="currentColor" stroke-width="1.2" opacity="0.30"/>
  <polygon points="615,106 623,110 615,114" fill="currentColor" opacity="0.30"/>
  <text x="628" y="114" fill="currentColor" opacity="0.38" font-size="9">result</text>

  <!-- WB path back to regfile -->
  <polyline points="623,110 650,110 650,175 423,175 423,150"
            fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.20" stroke-dasharray="4,3"/>
  <polygon points="419,152 423,144 427,152" fill="currentColor" opacity="0.20"/>
  <text x="535" y="192" text-anchor="middle" fill="currentColor" opacity="0.18" font-size="8">write-back</text>

  <!-- Data memory connection -->
  <rect x="503" y="195" width="80" height="36" rx="3" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.35"/>
  <text x="543" y="214" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">DMEM</text>
  <line x1="543" y1="150" x2="543" y2="195" stroke="currentColor" stroke-width="1" opacity="0.25"/>

  <!-- TT pin annotation -->
  <text x="350" y="208" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="9">Tiny Tapeout I/O: 8 in, 8 out + 8 bidir pins</text>
  <text x="350" y="220" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="9">Hardened via OpenLane · SKY130 PDK</text>
</svg>
</figure>

---

## Implementation

The core is implemented in **SystemVerilog**. Key design decisions:

**8-register file (x0–x7):** x0 is hardwired to zero per RISC-V convention. The reduced register count cuts the register file to 56 flip-flops vs 992 in a standard RV32I core — a ~17× reduction in register state.

**8-bit ALU:** All arithmetic and logic operations operate on 8-bit operands with carry/borrow out for multi-precision software support. Shift amounts are 3-bit (log₂8).

**Tiny Tapeout I/O mapping:** The TT9 shuttle provides 8 dedicated input pins, 8 dedicated output pins, and 8 bidirectional pins. The CPU instruction and data buses are multiplexed across these 24 pins using half-clock-cycle time division, allowing the full 8-bit data and address paths to be connected without exceeding the pin budget.

**Firmware:** Developed in C (compiled with RISC-V GNU toolchain, `-march=rv32e`) and hand-written assembly for low-level tests. Performance analysis covered IPC under branchy vs. linear code and pipeline stall rates.

---

## OpenLane hardening

The design was hardened using the **OpenLane** digital implementation flow targeting SKY130A:

```
synthesis (Yosys) → floorplan → placement (OpenDP)
  → CTS → routing (TritonRoute) → signoff (OpenSTA/Magic)
```

The tapeout-ready GDS was submitted to the Tiny Tapeout 9 multi-project wafer shuttle via Efabless. Area fits within the TT9 tile budget (160 µm × 100 µm standard tile).
