// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "ABOUT",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "PUBLICATIONS",
          description: "Research papers and conference publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "PROJECTS",
          description: "Selected hardware, analog, and software projects — from RISC-V SoCs to mixed-signal IC design.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-teaching",
          title: "TEACHING",
          description: "Course materials, schedules, and resources for classes taught.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-blog",
          title: "BLOG",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-collaborate",
          title: "COLLABORATE",
          description: "What I&#39;m interested in working on, and how to reach me.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/collaborate/";
          },
        },{id: "post-satcom-transceivers-how-they-work-and-where-the-hard-problems-are",
        
          title: "SATCOM transceivers — how they work and where the hard problems are",
        
        description: "A technical overview of satellite communication transceiver architecture, with a focus on Ka-band systems and the open IC design problems that still don&#39;t have clean answers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/satcom-transceivers/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-started-full-time-at-analog-devices-as-a-digital-design-engineer-working-on-next-generation-battery-management-ics",
          title: 'Started full-time at Analog Devices as a Digital Design Engineer, working on next-generation...',
          description: "",
          section: "News",},{id: "news-graduated-from-pes-university-with-a-silver-medal-9th-rank-and-best-outgoing-student-ece",
          title: 'Graduated from PES University with a Silver Medal (9th rank) and Best Outgoing...',
          description: "",
          section: "News",},{id: "news-two-papers-published-in-2025-apccas-on-a-low-phase-noise-quadrature-dco-and-nkcon-on-vco-based-adc-architectures",
          title: 'Two papers published in 2025: APCCAS on a low phase-noise quadrature DCO, and...',
          description: "",
          section: "News",},{id: "projects-embedded-soc-design-rv32im",
          title: 'Embedded SoC Design (RV32IM)',
          description: "RISC-V SoC with UART, SPI, and QSPI interfaces, validated on FPGA using SkyWater SKY130A PDK.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_soc_riscv/";
            },},{id: "projects-8-bit-risc-v-cpu-for-iot",
          title: '8-bit RISC-V CPU for IoT',
          description: "Energy-efficient 8-bit RISC-V CPU designed for low-power IoT applications, submitted to Tiny Tapeout 9.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_riscv_cpu/";
            },},{id: "projects-6t-sram-array-implementation",
          title: '6T SRAM Array Implementation',
          description: "Fabrication-ready 6T SRAM cell and array designed in SkyWater SKY130A PDK with improved read/write stability margins.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_sram/";
            },},{id: "projects-layered-systemverilog-testbench",
          title: 'Layered SystemVerilog Testbench',
          description: "Structured verification environment for a 4-bit shift register, implementing a full layered testbench architecture.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_testbench/";
            },},{id: "projects-4-bit-flash-adc-architecture",
          title: '4-bit Flash ADC Architecture',
          description: "High-speed 4-bit Flash ADC using a 2-stage Op-Amp comparator, Bandgap Reference, and Wallace Tree encoder.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_flash_adc/";
            },},{id: "projects-flexible-cla-adder-design",
          title: 'Flexible CLA Adder Design',
          description: "Modular carry-lookahead adder design optimized for timing, area, and scalability.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_cla_adder/";
            },},{id: "projects-atm-management-system",
          title: 'ATM Management System',
          description: "Python ATM simulator with GUI, MySQL integration, and facial recognition for secure transactions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_atm/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/Devesh_Academic_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%64%65%76%65%73%68%62%68%61%73%6B%61%72%61%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/devesh-b", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/devesh-bhaskaran", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=gabaBU8AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0005-4443-8244", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
