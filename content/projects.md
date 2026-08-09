---
layout: projects
title: Projects
categories:
  - name: "IC Design"
    entries:
      - title: "Low Phase Noise Quadrature DCO"
        description: "Dual superharmonic injection-locked quadrature DCO in 55nm CMOS for Ka-band LO synthesis. Published at APCCAS 2025."
        tags: [Cadence Virtuoso, SpectreRF, 55nm CMOS, RF]
        slug: "quadrature-dco"

      - title: "VCO-Based ADC Architectures"
        description: "Comparative design and analysis of LC-tank vs current-starved VCO-based ADCs. Published at NKCon 2025."
        tags: [Cadence, Mixed-Signal, ADC, SpectreRF]
        slug: "vco-adc"

      - title: "6T SRAM Array"
        description: "6T SRAM cell and array in SkyWater SKY130A PDK, achieving a 5% improvement in read/write stability margins."
        tags: [Cadence Virtuoso, SkyWater SKY130A, SRAM, Layout]
        slug: "sram-array"

      - title: "4-bit Flash ADC"
        description: "Flash ADC architecture using a Wallace Tree encoder for high-speed thermometer-to-binary conversion."
        tags: [ADC, Wallace Tree, Cadence Virtuoso]
        slug: "flash-adc"

      - title: "Tiny Tapeout — Chipalooza"
        description: "Two custom ICs submitted to Efabless open shuttles: an 8-bit MAC unit using Vedic multipliers and reversible gates, and a universal active filter. Received the $300 Tiny Tapeout Award (2024)."
        tags: [OpenLane, GDS, Efabless, Verilog, Analog, Tiny Tapeout]
        slug: "tiny-tapeout"

  - name: "Digital Design"
    entries:
      - title: "Embedded SoC Design (RV32IM)"
        description: "RISC-V SoC with UART, SPI, and QSPI interfaces validated on FPGA using the SkyWater SKY130A PDK."
        tags: [SystemVerilog, C, Cadence, RISC-V, SKY130A]
        slug: "embedded-soc"

      - title: "8-bit RISC-V CPU for IoT"
        description: "Energy-efficient 8-bit RISC-V CPU for low-power IoT applications, tapeout-ready for Tiny Tapeout 9."
        tags: [SystemVerilog, C, Assembly, RISC-V, Tapeout]
        slug: "risc-v-cpu-iot"

      - title: "Layered Testbench — 4-bit Shift Register"
        description: "Structured SystemVerilog verification environment with generator, driver, monitor, interface, and scoreboard layers."
        tags: [SystemVerilog, Verification, UVM-style]
        slug: "layered-testbench"

      - title: "Flexible CLA Adder"
        description: "Modular 4-bit Carry-Look Ahead Adder blocks with scalable architecture for timing and area optimisation."
        tags: [SystemVerilog, CLA, RTL, Arithmetic]
        slug: "flex-cla"

      - title: "Single-Cycle RISC-V Processor"
        description: "Single-cycle RISC-V RV32I processor in Verilog, built and validated for the Computer Organization TA role."
        tags: [Verilog, RISC-V, RIPES, Vivado]
        slug: "risc-v-processor"

  - name: "Software & ML"
    entries:
      - title: "YOLOv8 Hardware Accelerator"
        description: "Investigating algorithmic compression and posit-based approximate computing for hardware acceleration of YOLOv8 inference."
        tags: [Python, Posit, Approximate Computing, FPGA]

      - title: "FMU-NET: Semantic Segmentation for Person ID"
        description: "Novel semantic segmentation architecture for person identification. Published at EASCT 2023."
        tags: [PyTorch, Computer Vision, Segmentation]
        slug: "fmu-net"

      - title: "ATM Management System"
        description: "Python ATM simulator with facial recognition as the authentication layer, using OpenCV, Tkinter, and MySQL."
        tags: [Python, OpenCV, MySQL, Biometrics]
        slug: "atm-management"
---
