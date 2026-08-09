---
layout: project
title: "YOLOv8 Hardware Accelerator"
description: "Investigating algorithmic compression and posit-based approximate computing for energy-efficient hardware acceleration of YOLOv8 object detection inference."
category: "Software & ML"
tags: [Python, Posit, Approximate Computing, FPGA, Neural Networks, Hardware Acceleration]
---

## Overview

An ongoing research investigation into hardware-efficient acceleration of **YOLOv8** object detection, targeting FPGA and ASIC deployment. The work explores two complementary techniques: algorithmic compression (pruning, quantisation) and **posit-based approximate arithmetic** as a replacement for IEEE 754 floating-point in inference datapaths.

---

## Research direction

Standard deep learning accelerators rely on IEEE 754 FP32 or INT8 arithmetic. Posit numbers — a proposed replacement for IEEE floats — offer a different accuracy-vs-hardware trade-off:

<figure>
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Posit vs IEEE float representation trade-off">
  <!-- Axes -->
  <line x1="80" y1="20" x2="80" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <line x1="80" y1="140" x2="620" y2="140" stroke="currentColor" stroke-width="1.2" opacity="0.40"/>
  <text x="350" y="162" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="10">Value magnitude →</text>
  <text x="40" y="82" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="10" transform="rotate(-90,40,82)">Precision</text>

  <!-- IEEE 754 — flat precision across range -->
  <line x1="90" y1="60" x2="610" y2="60"
        stroke="currentColor" stroke-width="2" opacity="0.45" stroke-dasharray="6,3"/>
  <text x="615" y="64" fill="currentColor" opacity="0.42" font-size="9">IEEE 754</text>
  <text x="615" y="76" fill="currentColor" opacity="0.30" font-size="8">(uniform)</text>

  <!-- Posit — tapered precision, high near zero -->
  <polyline points="90,28 200,38 310,60 420,90 530,118 610,136"
            fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.65" stroke-linejoin="round"/>
  <text x="615" y="100" fill="currentColor" opacity="0.60" font-size="9">Posit</text>
  <text x="615" y="112" fill="currentColor" opacity="0.40" font-size="8">(tapered)</text>

  <!-- Annotation -->
  <text x="350" y="170" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="9">Posit allocates more precision near zero — where neural network activations cluster — reducing hardware cost</text>
</svg>
</figure>

Posit arithmetic concentrates precision around values near zero, which is precisely where neural network activations cluster after batch normalisation. This allows the same bit-width to encode more useful resolution for inference while simplifying the hardware (no NaN/Inf special cases, smaller multiplier logic).

---

## Work in progress

| Track | Status |
|---|---|
| YOLOv8 baseline profiling (Python/PyTorch) | Complete |
| Layer-wise sensitivity analysis for quantisation | In progress |
| Posit-8 and Posit-16 inference emulation | In progress |
| FPGA datapath prototype (Verilog) | Planned |
| Accuracy vs hardware cost characterisation | Planned |

The investigation is part of broader research into approximate computing for edge AI, targeting applications where sensor-to-inference latency and energy budget are more constrained than peak accuracy.

---

## Tools

Python · PyTorch · Ultralytics YOLOv8 · SoftPosit (posit emulation library) · Xilinx Vivado · FPGA (Artix-7)
