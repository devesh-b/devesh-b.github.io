---
layout: project
title: "Layered Testbench for 4-bit Shift Register"
description: "Structured SystemVerilog verification environment for a 4-bit shift register using a layered testbench architecture."
category: "Digital Design"
tags: [SystemVerilog, UVM-style, Verification, Testbench]
link: "https://github.com/devesh-b/Layered_Testbench_4_Bit_Shift_Register"
---

## Overview

A layered SystemVerilog testbench for a 4-bit shift register, structured around the separation-of-concerns principle that underpins modern UVM-based verification. The testbench decomposes stimulus generation and response checking into five discrete, independently reusable layers.

Source: [github.com/devesh-b/Layered_Testbench_4_Bit_Shift_Register](https://github.com/devesh-b/Layered_Testbench_4_Bit_Shift_Register)

---

## Testbench architecture

<figure>
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="5-layer verification architecture">
  <!-- Layer 5: Generator (top) -->
  <rect x="160" y="20" width="380" height="46" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  <text x="350" y="40" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="11" font-weight="bold">Generator</text>
  <text x="350" y="56" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="9">Randomised / directed transaction objects — no interface knowledge</text>

  <!-- arrow down -->
  <line x1="350" y1="66" x2="350" y2="86" stroke="currentColor" stroke-width="1.2" opacity="0.30"/>
  <polygon points="346,83 350,91 354,83" fill="currentColor" opacity="0.30"/>
  <text x="420" y="80" fill="currentColor" opacity="0.24" font-size="8">Transaction objects</text>

  <!-- Layer 4: Driver -->
  <rect x="160" y="91" width="380" height="46" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.4" opacity="0.42"/>
  <text x="350" y="111" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="11" font-weight="bold">Driver</text>
  <text x="350" y="127" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="9">Translates transactions → pin-level signal toggles · handles clock-edge timing</text>

  <!-- arrow down -->
  <line x1="350" y1="137" x2="350" y2="157" stroke="currentColor" stroke-width="1.2" opacity="0.28"/>
  <polygon points="346,154 350,162 354,154" fill="currentColor" opacity="0.28"/>
  <text x="420" y="151" fill="currentColor" opacity="0.22" font-size="8">Pin-level signals</text>

  <!-- Layer 3: Interface + DUT (centre, highlighted) -->
  <rect x="120" y="162" width="460" height="56" rx="4" fill="currentColor" fill-opacity="0.09" stroke="currentColor" stroke-width="1.8" opacity="0.60"/>
  <text x="280" y="185" text-anchor="middle" fill="currentColor" opacity="0.65" font-size="11" font-weight="bold">Interface + DUT</text>
  <text x="280" y="200" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">SV interface bundles signals · DUT is the 4-bit shift register under test</text>
  <!-- DUT box inside -->
  <rect x="450" y="170" width="110" height="40" rx="3" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.2" opacity="0.50"/>
  <text x="505" y="188" text-anchor="middle" fill="currentColor" opacity="0.55" font-size="9">4-bit Shift Reg</text>
  <text x="505" y="201" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="8">DUT (RTL)</text>

  <!-- arrow down -->
  <line x1="350" y1="218" x2="350" y2="238" stroke="currentColor" stroke-width="1.2" opacity="0.25"/>
  <polygon points="346,235 350,243 354,235" fill="currentColor" opacity="0.25"/>
  <text x="420" y="232" fill="currentColor" opacity="0.20" font-size="8">Observed transactions</text>

  <!-- Layer 2: Monitor -->
  <rect x="160" y="243" width="380" height="46" rx="4" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.4" opacity="0.36"/>
  <text x="350" y="263" text-anchor="middle" fill="currentColor" opacity="0.42" font-size="11" font-weight="bold">Monitor</text>
  <text x="350" y="279" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="9">Passively observes DUT outputs · packages into transaction objects (mirrors driver abstraction)</text>

  <!-- arrow down -->
  <line x1="350" y1="289" x2="350" y2="309" stroke="currentColor" stroke-width="1.2" opacity="0.22"/>
  <polygon points="346,306 350,314 354,306" fill="currentColor" opacity="0.22"/>

  <!-- Layer 1: Scoreboard (bottom) -->
  <rect x="160" y="314" width="380" height="20" rx="3" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.3" opacity="0.32"/>
  <text x="350" y="327" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="10" font-weight="bold">Scoreboard — compares observed vs reference model · PASS / FAIL</text>

  <!-- Reference model side annotation -->
  <text x="58" y="80" text-anchor="end" fill="currentColor" opacity="0.28" font-size="9">No interface</text>
  <text x="58" y="92" text-anchor="end" fill="currentColor" opacity="0.24" font-size="9">knowledge</text>
  <text x="58" y="254" text-anchor="end" fill="currentColor" opacity="0.28" font-size="9">Passive —</text>
  <text x="58" y="266" text-anchor="end" fill="currentColor" opacity="0.24" font-size="9">no driving</text>
</svg>
</figure>

---

## Layer responsibilities

**Generator:** Produces randomised or directed `transaction` objects — simple data structures carrying the fields that describe one DUT operation (serial input bit, load data word, shift enable, reset). Has no knowledge of the DUT interface or timing — it produces abstract intent.

**Driver:** Receives transaction objects from the generator via a mailbox. Translates each transaction into precise pin-level signal assignments relative to the active clock edge. Responsible for setup and hold time compliance.

**Interface:** A SystemVerilog `interface` block bundling all DUT signals — `clk`, `rst_n`, `serial_in`, `load`, `data_in[3:0]`, `serial_out`, `q[3:0]`. Provides a single clean boundary between the testbench hierarchy and the RTL. The driver writes through the interface; the monitor reads through it.

**Monitor:** Passively samples the interface on each clock edge. Packages each observed output state into a transaction object that mirrors the driver's abstraction level. Never drives any signal — strictly observational.

**Scoreboard:** Maintains a software reference model of the shift register (a simple 4-bit shift register in pure SystemVerilog). For each transaction received from the monitor, the scoreboard computes the expected output and compares against the observed output. Logs mismatches and maintains a running pass/fail count.

---

## What this demonstrates

```systemverilog
// Generator produces abstract transactions
class ShiftTransaction;
  rand bit  serial_in;
  rand bit  load_en;
  rand logic [3:0] load_data;
endclass

// Scoreboard holds the reference model
class Scoreboard;
  logic [3:0] expected_q;

  task check(ShiftTransaction obs_t);
    // update reference model
    if (obs_t.load_en) expected_q = obs_t.load_data;
    else               expected_q = {expected_q[2:0], obs_t.serial_in};
    // compare
    if (dut_out !== expected_q) $error("MISMATCH ...");
  endtask
endclass
```

The layered structure enables **coverage-driven verification**: a new constraint class can be dropped in at the generator layer (e.g., force long runs of consecutive 1s to check shift boundary behaviour) without touching the driver, interface, monitor, or scoreboard. Each layer has a single, well-defined invariant.
