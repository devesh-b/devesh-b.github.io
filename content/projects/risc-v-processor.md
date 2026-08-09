---
layout: project
title: "Single-Cycle RISC-V Processor"
description: "Single-cycle RV32I processor in Verilog, built and validated for the Computer Organization TA role."
category: "Digital Design"
tags: [Verilog, RISC-V, RV32I, RIPES, Vivado]
---

## Overview

A single-cycle implementation of the **RISC-V RV32I** base integer instruction set in Verilog. Built as course reference material for the Computer Organization and Architecture course at PESU, where I served as Teaching Assistant. The design was used directly in lab assignments where students extended it into a pipelined version with hazard detection.

---

## Datapath

All five canonical stages execute in a single clock cycle as combinational logic — there are no pipeline registers. The control unit decodes the 7-bit opcode and generates control signals within the same cycle as instruction fetch.

<figure>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:10px;" aria-label="Single-cycle RV32I datapath">
  <!-- IF stage -->
  <rect x="20" y="60" width="80" height="80" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.4" opacity="0.50"/>
  <text x="60" y="96" text-anchor="middle" fill="currentColor" opacity="0.58" font-size="9">IF</text>
  <text x="60" y="110" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="8">PC</text>
  <text x="60" y="122" text-anchor="middle" fill="currentColor" opacity="0.32" font-size="7">IMEM</text>

  <!-- ID stage -->
  <rect x="130" y="60" width="80" height="80" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  <text x="170" y="96" text-anchor="middle" fill="currentColor" opacity="0.52" font-size="9">ID</text>
  <text x="170" y="110" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="8">Decode</text>
  <text x="170" y="122" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">Reg Read</text>

  <!-- EX stage -->
  <rect x="240" y="50" width="80" height="100" rx="3" fill="currentColor" fill-opacity="0.09" stroke="currentColor" stroke-width="1.6" opacity="0.58"/>
  <text x="280" y="96" text-anchor="middle" fill="currentColor" opacity="0.65" font-size="9" font-weight="bold">EX</text>
  <text x="280" y="110" text-anchor="middle" fill="currentColor" opacity="0.45" font-size="8">ALU</text>
  <text x="280" y="122" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="7">Branch</text>
  <text x="280" y="134" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="7">addr calc</text>

  <!-- MEM stage -->
  <rect x="350" y="60" width="80" height="80" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.4" opacity="0.42"/>
  <text x="390" y="96" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="9">MEM</text>
  <text x="390" y="110" text-anchor="middle" fill="currentColor" opacity="0.33" font-size="8">DMEM</text>
  <text x="390" y="122" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="7">LW/SW</text>

  <!-- WB stage -->
  <rect x="460" y="60" width="80" height="80" rx="3" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.4" opacity="0.38"/>
  <text x="500" y="96" text-anchor="middle" fill="currentColor" opacity="0.44" font-size="9">WB</text>
  <text x="500" y="110" text-anchor="middle" fill="currentColor" opacity="0.30" font-size="8">Reg Write</text>
  <text x="500" y="122" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="7">MUX select</text>

  <!-- Forward arrows -->
  <line x1="100" y1="100" x2="130" y2="100" stroke="currentColor" stroke-width="1.3" opacity="0.40"/>
  <polygon points="127,96 135,100 127,104" fill="currentColor" opacity="0.40"/>
  <line x1="210" y1="100" x2="240" y2="100" stroke="currentColor" stroke-width="1.3" opacity="0.36"/>
  <polygon points="237,96 245,100 237,104" fill="currentColor" opacity="0.36"/>
  <line x1="320" y1="100" x2="350" y2="100" stroke="currentColor" stroke-width="1.3" opacity="0.32"/>
  <polygon points="347,96 355,100 347,104" fill="currentColor" opacity="0.32"/>
  <line x1="430" y1="100" x2="460" y2="100" stroke="currentColor" stroke-width="1.3" opacity="0.28"/>
  <polygon points="457,96 465,100 457,104" fill="currentColor" opacity="0.28"/>

  <!-- PC feedback from EX (branch) -->
  <polyline points="60,60 60,28 280,28 280,50"
            fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.20" stroke-dasharray="4,3"/>
  <polygon points="276,48 280,40 284,48" fill="currentColor" opacity="0.20"/>
  <text x="168" y="22" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="8">branch/jump PC</text>

  <!-- WB to regfile feedback -->
  <polyline points="500,140 500,170 170,170 170,140"
            fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.20" stroke-dasharray="4,3"/>
  <polygon points="166,142 170,150 174,142" fill="currentColor" opacity="0.20"/>
  <text x="335" y="184" text-anchor="middle" fill="currentColor" opacity="0.20" font-size="8">write-back to register file</text>

  <!-- Control unit annotation -->
  <rect x="570" y="70" width="110" height="60" rx="3" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.30" stroke-dasharray="4,3"/>
  <text x="625" y="97" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="9">Control Unit</text>
  <text x="625" y="111" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="8">opcode → signals</text>
  <line x1="570" y1="100" x2="540" y2="100" stroke="currentColor" stroke-width="0.9" opacity="0.22" stroke-dasharray="3,2"/>
</svg>
</figure>

The control unit decodes 7 opcode groups: R-type, I-type arithmetic, load, store, branch, JAL, JALR, LUI, AUIPC. Control signals generated:

| Signal | Purpose |
|--------|---------|
| `RegWrite` | Enable register file write |
| `ALUSrc` | Select immediate vs register for ALU B input |
| `MemWrite` | Enable data memory write |
| `MemRead` | Enable data memory read |
| `MemToReg` | Select ALU result vs memory data for write-back |
| `Branch` | Gate PC+offset if branch condition true |
| `Jump` | Unconditional jump (JAL/JALR) |
| `ALUOp[1:0]` | Select ALU function (ADD, SUB, logic, compare) |

---

## Instruction coverage

All 40 RV32I base instructions implemented and tested:

```
R-type:  ADD  SUB  AND  OR  XOR  SLL  SRL  SRA  SLT  SLTU
I-type:  ADDI ANDI ORI  XORI SLLI SRLI SRAI SLTI SLTIU
Load:    LW   LH   LB   LHU  LBU
Store:   SW   SH   SB
Branch:  BEQ  BNE  BLT  BGE  BLTU BGEU
Jump:    JAL  JALR
Upper:   LUI  AUIPC
```

---

## Validation

- **RIPES** — visual RISC-V simulator used for step-by-step instruction tracing against the Verilog implementation
- **Vivado** — synthesis and FPGA deployment on Xilinx Artix-7 (DE10-Lite target), confirmed all 40 instructions in hardware
- **Test suite** — hand-written assembly programs covering all 40 base instructions, branch edge cases (taken/not-taken boundary), load-store hazards (tested to fail in single-cycle, fixing in pipelined extension), and aligned/unaligned address scenarios

---

## Teaching context

This processor is used as the **reference implementation** in the Computer Organization and Architecture lab. Students receive the single-cycle version and the assignment is to extend it to a 5-stage pipelined implementation with:

1. **IF/ID, ID/EX, EX/MEM, MEM/WB pipeline registers**
2. **Data hazard detection** — stall insertion for load-use hazards
3. **Forwarding unit** — EX-EX and MEM-EX forwarding paths
4. **Control hazard handling** — flush on taken branch

The single-cycle design is intentionally complete and correct so that students can focus on the pipeline architecture rather than debugging instruction decoding.
