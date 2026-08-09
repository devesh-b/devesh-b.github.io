---
layout: project
title: "Embedded SoC Design (RV32IM)"
description: "RISC-V SoC with UART, SPI, and QSPI interfaces validated on FPGA using the SkyWater SKY130A PDK."
category: "Digital Design"
tags: [SystemVerilog, C, Cadence Design Suite, RISC-V, SkyWater SKY130A, FPGA]
---

## Overview

A complete embedded SoC built around the **RV32IM** core — the RISC-V base integer ISA plus the M-extension (multiply and divide). The design integrates three peripheral interfaces — UART, SPI, and QSPI — and targets both FPGA validation and physical implementation using the open-source **SkyWater SKY130A PDK** through the Cadence Design Suite flow.

---

## System architecture

<figure>
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="RV32IM SoC block diagram">
  <!-- CPU core -->
  <rect x="240" y="80" width="130" height="100" rx="4" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.8" opacity="0.60"/>
  <text x="305" y="122" text-anchor="middle" fill="currentColor" opacity="0.65" font-size="11" font-weight="bold">RV32IM</text>
  <text x="305" y="138" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="9">RV32I base</text>
  <text x="305" y="151" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">+ M-ext (MUL/DIV)</text>
  <text x="305" y="164" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">5-stage pipeline</text>

  <!-- Bus interconnect -->
  <rect x="200" y="198" width="310" height="18" rx="2" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <text x="355" y="211" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">Internal bus (memory-mapped peripherals)</text>
  <line x1="305" y1="180" x2="305" y2="198" stroke="currentColor" stroke-width="1.2" opacity="0.38"/>

  <!-- Instruction memory -->
  <rect x="50" y="80" width="110" height="50" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="105" y="103" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="10">Instr. Mem</text>
  <text x="105" y="117" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="8">RV32I program</text>
  <line x1="160" y1="105" x2="240" y2="115" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="237,111 245,115 238,119" fill="currentColor" opacity="0.35"/>

  <!-- Data memory -->
  <rect x="50" y="148" width="110" height="50" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.42"/>
  <text x="105" y="171" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="10">Data Mem</text>
  <text x="105" y="185" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">Load / Store</text>
  <line x1="160" y1="173" x2="240" y2="155" stroke="currentColor" stroke-width="1.2" opacity="0.32"/>
  <polygon points="237,151 245,155 238,159" fill="currentColor" opacity="0.32"/>

  <!-- UART peripheral -->
  <rect x="510" y="62" width="80" height="44" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.45"/>
  <text x="550" y="82" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="10">UART</text>
  <text x="550" y="96" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">8N1 · FIFOs</text>
  <line x1="510" y1="84" x2="430" y2="130" stroke="currentColor" stroke-width="1.1" opacity="0.32"/>

  <!-- SPI peripheral -->
  <rect x="510" y="120" width="80" height="44" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.40"/>
  <text x="550" y="140" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="10">SPI</text>
  <text x="550" y="154" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="8">CPOL/CPHA</text>
  <line x1="510" y1="142" x2="430" y2="140" stroke="currentColor" stroke-width="1.1" opacity="0.30"/>

  <!-- QSPI peripheral -->
  <rect x="510" y="178" width="80" height="44" rx="3" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.36"/>
  <text x="550" y="198" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="10">QSPI</text>
  <text x="550" y="212" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="8">quad I/O flash</text>
  <line x1="510" y1="200" x2="430" y2="200" stroke="currentColor" stroke-width="1.1" opacity="0.28"/>

  <!-- bus connections to peripherals -->
  <rect x="420" y="62" width="88" height="170" rx="2" fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.14" stroke-dasharray="4,3"/>
  <text x="464" y="246" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="8">peripheral space</text>
  <line x1="370" y1="207" x2="420" y2="207" stroke="currentColor" stroke-width="1" opacity="0.22"/>

  <!-- annotations -->
  <text x="350" y="250" text-anchor="middle" fill="currentColor" opacity="0.25" font-size="10">FPGA validated → Cadence synthesis + P&amp;R on SKY130A</text>
</svg>
</figure>

---

## Core and peripherals

**RV32IM core:** Implements the full RV32I base ISA (40 instructions) plus the M-extension (integer multiply and divide). The multiplier uses a combinational array multiplier; the divider is an iterative non-restoring design. Both complete in a fixed number of cycles, making timing analysis straightforward.

**UART:** Configurable baud rate, 8N1 frame format, transmit and receive FIFOs to decouple the processor from byte timing constraints. The FIFO depth was sized to handle back-to-back bytes at maximum baud without a software busy-wait loop.

**SPI:** Full-duplex, CPOL/CPHA configurable (all four modes), chip-select control, master-only. Targets external flash and sensor interfaces. The bit-rate divisor is software-programmable for slow sensor devices through the same register interface.

**QSPI:** Quad-SPI extension adding four parallel data lines for higher-bandwidth flash reads. Supports single/dual/quad I/O mode selection; the mode is switchable at runtime via the command byte. Read throughput is 4× a conventional SPI link at the same clock frequency.

---

## Verification and implementation

The RTL was verified through a structured digital verification methodology:

```
tb_top
├── risc_v_soc (DUT)
│   ├── rv32im_core
│   ├── uart_ctrl
│   ├── spi_master
│   └── qspi_ctrl
├── uart_model  (BFM)
├── spi_slave   (BFM)
└── test_programs/ (assembled RV32IM binaries)
```

Each peripheral was validated in isolation against a bus functional model, then integrated and tested with real firmware binaries assembled and linked using the RISC-V GNU toolchain.

**FPGA validation** on Xilinx confirmed functional correctness end-to-end: firmware running on the core, generating SPI transactions captured on a logic analyser, UART output verified over a terminal connection.

**SKY130A physical flow** used the Cadence Design Suite (Genus synthesis, Innovus P&amp;R). Key challenges: the SKY130A timing library required manual constraint tuning for the SRAM-like register file, and the open PDK's cell library has a limited drive-strength range that required cell swapping to close timing at the target frequency.
