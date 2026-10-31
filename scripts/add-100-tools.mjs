import fs from 'node:fs';

const seed = JSON.parse(fs.readFileSync('revkit-seed-data.json', 'utf8'));

const newTools = [
  // Disassemblers & Decompilers
  {
    name: "IDA Pro",
    category: "Disassemblers & Decompilers",
    url: "https://hex-rays.com/ida-pro/",
    license: "Proprietary",
    pricing: "Paid",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Industry-standard multi-processor disassembler and Hex-Rays decompiler for binary analysis."
  },
  {
    name: "RetDec",
    category: "Disassemblers & Decompilers",
    url: "https://github.com/avast/retdec",
    github: "https://github.com/avast/retdec",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "LLVM-based open-source machine code decompiler for PE, ELF, and raw binaries."
  },
  {
    name: "Hopper Disassembler",
    category: "Disassemblers & Decompilers",
    url: "https://www.hopperapp.com",
    license: "Proprietary",
    pricing: "Paid",
    platforms: ["macOS", "Linux"],
    description: "Fast reverse engineering tool and decompiler for 32/64-bit Mach-O, ELF, and PE binaries."
  },
  {
    name: "Snowman",
    category: "Disassemblers & Decompilers",
    url: "https://github.com/yegord/snowman",
    github: "https://github.com/yegord/snowman",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Native C/C++ decompiler supporting x86, x64, and ARM machine code."
  },
  {
    name: "Medusa",
    category: "Disassemblers & Decompilers",
    url: "https://github.com/wyozi/medusa",
    github: "https://github.com/wyozi/medusa",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Modular interactive disassembler framework designed for speed and multi-architecture analysis."
  },
  {
    name: "Wasm2c",
    category: "Disassemblers & Decompilers",
    url: "https://github.com/WebAssembly/wabt",
    github: "https://github.com/WebAssembly/wabt",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Convert WebAssembly binary modules into readable C source code and headers."
  },
  {
    name: "Relic",
    category: "Disassemblers & Decompilers",
    url: "https://github.com/joxeankoret/paimei",
    github: "https://github.com/joxeankoret/paimei",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Reverse engineering framework for binary disassembly and automated code auditing."
  },

  // Debuggers
  {
    name: "WinDbg",
    category: "Debuggers",
    url: "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Microsoft's multi-purpose user-mode and kernel-mode debugger for Windows internals."
  },
  {
    name: "GDB",
    category: "Debuggers",
    url: "https://www.sourceware.org/gdb/",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux", "macOS", "Windows"],
    description: "The GNU Project Debugger: standard tool for tracing and debugging native machine code."
  },
  {
    name: "LLDB",
    category: "Debuggers",
    url: "https://lldb.llvm.org",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["macOS", "Linux", "Windows"],
    description: "High-performance debugger built as a set of reusable LLVM libraries."
  },
  {
    name: "OllyDbg",
    category: "Debuggers",
    url: "https://www.ollydbg.de",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Classic 32-bit assembler level analyzing debugger for Microsoft Windows."
  },
  {
    name: "EDB Debugger",
    category: "Debuggers",
    url: "https://github.com/eteran/edb-debugger",
    github: "https://github.com/eteran/edb-debugger",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Linux"],
    description: "Cross-platform Qt-based binary debugger designed for x86 and x64 Linux applications."
  },
  {
    name: "PEDA",
    category: "Debuggers",
    url: "https://github.com/longld/peda",
    github: "https://github.com/longld/peda",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux"],
    description: "Python Exploit Development Assistance plugin for GDB with enhanced disassembly displays."
  },
  {
    name: "Voltron",
    category: "Debuggers",
    url: "https://github.com/snare/voltron",
    github: "https://github.com/snare/voltron",
    license: "MIT",
    pricing: "Free",
    platforms: ["Linux", "macOS", "Windows"],
    description: "Hackable UI debugger extension for GDB, LLDB, WinDbg, and VDB."
  },

  // Binary Analysis Frameworks
  {
    name: "Unicorn Engine",
    category: "Binary Analysis Frameworks",
    url: "https://www.unicorn-engine.org",
    github: "https://github.com/unicorn-engine/unicorn",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Lightweight multi-architecture CPU emulator framework based on QEMU."
  },
  {
    name: "Keystone Engine",
    category: "Binary Analysis Frameworks",
    url: "https://www.keystone-engine.org",
    github: "https://github.com/keystone-engine/keystone",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Multi-architecture assembler framework supporting x86, ARM, MIPS, and PowerPC."
  },
  {
    name: "Triton",
    category: "Binary Analysis Frameworks",
    url: "https://triton-library.github.io",
    github: "https://github.com/JonathanSalwan/Triton",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Dynamic binary analysis framework providing symbolic execution and taint analysis engines."
  },
  {
    name: "Qiling",
    category: "Binary Analysis Frameworks",
    url: "https://qiling.io",
    github: "https://github.com/qilingframework/qiling",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Linux", "Windows", "macOS"],
    description: "Advanced cross-platform and cross-architecture binary emulation framework."
  },
  {
    name: "DynamoRIO",
    category: "Binary Analysis Frameworks",
    url: "https://dynamorio.org",
    github: "https://github.com/DynamoRIO/dynamorio",
    license: "BSD-3-Clause",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Runtime code manipulation system for dynamic binary instrumentation and profiling."
  },
  {
    name: "Intel PIN",
    category: "Binary Analysis Frameworks",
    url: "https://www.intel.com/content/www/us/en/developer/articles/tool/pin-a-dynamic-binary-instrumentation-tool.html",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Intel dynamic binary instrumentation tool for creating program analysis utilities."
  },
  {
    name: "Manticore",
    category: "Binary Analysis Frameworks",
    url: "https://github.com/trailofbits/manticore",
    github: "https://github.com/trailofbits/manticore",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Linux", "macOS"],
    description: "Symbolic execution tool for analysis of native binaries and smart contracts."
  },
  {
    name: "BAP",
    category: "Binary Analysis Frameworks",
    url: "https://github.com/BinaryAnalysisPlatform/bap",
    github: "https://github.com/BinaryAnalysisPlatform/bap",
    license: "MIT",
    pricing: "Free",
    platforms: ["Linux", "macOS"],
    description: "Carnegie Mellon binary analysis platform for machine code program analysis."
  },

  // Android
  {
    name: "JEB Decompiler",
    category: "Android",
    url: "https://www.pnfsoftware.com",
    license: "Proprietary",
    pricing: "Paid",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Professional interactive decompiler for Android APKs, Dalvik DEX, and native code."
  },
  {
    name: "GDA",
    category: "Android",
    url: "https://github.com/charles2gan/GDA-android-reversing-Tool",
    github: "https://github.com/charles2gan/GDA-android-reversing-Tool",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Fast C++ based Android decompiler and malware analysis suite without Java dependencies."
  },
  {
    name: "Androguard",
    category: "Android",
    url: "https://github.com/androguard/androguard",
    github: "https://github.com/androguard/androguard",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Python framework for reverse engineering and analyzing Android DEX and APK formats."
  },
  {
    name: "scrcpy",
    category: "Android",
    url: "https://github.com/Genymobile/scrcpy",
    github: "https://github.com/Genymobile/scrcpy",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Display and control Android devices over USB for live dynamic reverse engineering."
  },
  {
    name: "House",
    category: "Android",
    url: "https://github.com/nccgroup/house",
    github: "https://github.com/nccgroup/house",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Runtime mobile application security assessment toolkit powered by Frida."
  },
  {
    name: "DexDump",
    category: "Android",
    url: "https://github.com/curz46/DexDump",
    github: "https://github.com/curz46/DexDump",
    license: "MIT",
    pricing: "Free",
    platforms: ["Android", "Linux"],
    description: "Fast and effective Android DEX dumper for unpacked and packed APK binaries."
  },

  // Firmware & Embedded
  {
    name: "EMBA",
    category: "Firmware & Embedded",
    url: "https://github.com/e-m-b-a/emba",
    github: "https://github.com/e-m-b-a/emba",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux"],
    description: "Automated firmware security analysis and vulnerability testing environment for IoT."
  },
  {
    name: "Firmwalker",
    category: "Firmware & Embedded",
    url: "https://github.com/craigz22/firmwalker",
    github: "https://github.com/craigz22/firmwalker",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux"],
    description: "Script that searches extracted firmware file systems for credentials and sensitive data."
  },
  {
    name: "Sasquatch",
    category: "Firmware & Embedded",
    url: "https://github.com/devttys0/sasquatch",
    github: "https://github.com/devttys0/sasquatch",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Linux"],
    description: "Patched unsquashfs tool designed to extract non-standard vendor SquashFS images."
  },
  {
    name: "Routersploit",
    category: "Firmware & Embedded",
    url: "https://github.com/threat9/routersploit",
    github: "https://github.com/threat9/routersploit",
    license: "BSD-3-Clause",
    pricing: "Free",
    platforms: ["Linux", "macOS", "Windows"],
    description: "Open-source exploitation framework dedicated to embedded devices and router firmware."
  },
  {
    name: "OFRAK",
    category: "Firmware & Embedded",
    url: "https://github.com/redballoonsecurity/ofrak",
    github: "https://github.com/redballoonsecurity/ofrak",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux", "macOS"],
    description: "Open Firmware Reverse Analysis Konsole for unpacking, analyzing, and repacking firmware."
  },
  {
    name: "Ghidra Firmware Toolkit",
    category: "Firmware & Embedded",
    url: "https://github.com/fuzzysecurity/Ghidra-Firmware-Toolkit",
    github: "https://github.com/fuzzysecurity/Ghidra-Firmware-Toolkit",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Firmware analysis scripts and loaders extending Ghidra for embedded binary reverse engineering."
  },

  // Analysis Utilities
  {
    name: "Volatility",
    category: "Analysis Utilities",
    url: "https://www.volatilityfoundation.org",
    github: "https://github.com/volatilityfoundation/volatility3",
    license: "BSD-3-Clause",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "World-leading memory forensics framework for extracting processes, sockets, and injected code."
  },
  {
    name: "Process Hacker",
    category: "Analysis Utilities",
    url: "https://system-informer.com",
    github: "https://github.com/winsiderss/systeminformer",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Powerful multi-purpose process manager, memory viewer, and DLL inspector for Windows."
  },
  {
    name: "Procmon",
    category: "Analysis Utilities",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/procmon",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Microsoft Sysinternals tool monitoring real-time file system, Registry, and process activity."
  },
  {
    name: "Process Explorer",
    category: "Analysis Utilities",
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Advanced task manager showing active DLL handles, memory strings, and process trees."
  },
  {
    name: "MemProcFS",
    category: "Analysis Utilities",
    url: "https://github.com/ufrisk/MemProcFS",
    github: "https://github.com/ufrisk/MemProcFS",
    license: "AGPL-3.0",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Virtual file system that mounts physical memory dumps as searchable files and folders."
  },
  {
    name: "PE-bear",
    category: "Analysis Utilities",
    url: "https://github.com/hasherezade/pe-bear",
    github: "https://github.com/hasherezade/pe-bear",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux"],
    description: "Fast and intuitive PE header visualizer and section viewer for malware triaging."
  },
  {
    name: "PEStudio",
    category: "Analysis Utilities",
    url: "https://www.winitor.com",
    license: "Proprietary",
    pricing: "Freemium",
    platforms: ["Windows"],
    description: "Static executable file investigator that spots suspicious anomalies without execution."
  },
  {
    name: "CFF Explorer",
    category: "Analysis Utilities",
    url: "https://ntcore.com/?page_id=388",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "PE editor designed for editing headers, section tables, and import address tables."
  },
  {
    name: "FLOSS",
    category: "Analysis Utilities",
    url: "https://github.com/mandiant/flare-floss",
    github: "https://github.com/mandiant/flare-floss",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Mandiant tool that automatically extracts and decodes obfuscated strings from malware."
  },
  {
    name: "XPEViewer",
    category: "Analysis Utilities",
    url: "https://github.com/horsicq/XPEViewer",
    github: "https://github.com/horsicq/XPEViewer",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Cross-platform PE file parser and header viewer built with Qt."
  },

  // Network
  {
    name: "Wireshark",
    category: "Network",
    url: "https://www.wireshark.org",
    license: "GPL-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "The world's foremost network protocol analyzer for deep packet inspection."
  },
  {
    name: "Burp Suite",
    category: "Network",
    url: "https://portswigger.net/burp",
    license: "Proprietary",
    pricing: "Freemium",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Industry-standard intercepting proxy and security tool for HTTP/HTTPS reverse engineering."
  },
  {
    name: "Fiddler",
    category: "Network",
    url: "https://www.telerik.com/fiddler",
    license: "Proprietary",
    pricing: "Freemium",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Web debugging proxy for logging and intercepting HTTP and HTTPS application traffic."
  },
  {
    name: "Charles Proxy",
    category: "Network",
    url: "https://www.charlesproxy.com",
    license: "Proprietary",
    pricing: "Paid",
    platforms: ["Windows", "macOS", "Linux"],
    description: "HTTP monitor and reverse proxy for recording all network traffic between app and server."
  },
  {
    name: "tcpdump",
    category: "Network",
    url: "https://www.tcpdump.org",
    license: "BSD-3-Clause",
    pricing: "Free",
    platforms: ["Linux", "macOS"],
    description: "Powerful command-line packet analyzer for capturing and inspecting network protocols."
  },

  // .NET
  {
    name: "dotPeek",
    category: ".NET",
    url: "https://www.jetbrains.com/decompiler/",
    license: "Proprietary",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Free standalone .NET decompiler and assembly browser based on ReSharper."
  },
  {
    name: "JustDecompile",
    category: ".NET",
    url: "https://github.com/telerik/justdecompileengine",
    github: "https://github.com/telerik/justdecompileengine",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Open-source .NET decompilation engine created by Telerik."
  },
  {
    name: "ExtremeDumper",
    category: ".NET",
    url: "https://github.com/wwh1004/ExtremeDumper",
    github: "https://github.com/wwh1004/ExtremeDumper",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Dump protected .NET modules directly from process memory to disk."
  },
  {
    name: "AsmSpy",
    category: ".NET",
    url: "https://github.com/mikehadlow/AsmSpy",
    github: "https://github.com/mikehadlow/AsmSpy",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Command-line tool for viewing assembly references and resolving conflicting versions."
  },

  // Java
  {
    name: "CFR",
    category: "Java",
    url: "https://www.benf.org/other/cfr/",
    github: "https://github.com/leibnitz27/cfr",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Modern Java decompiler supporting modern Java language features and sealed classes."
  },
  {
    name: "JD-GUI",
    category: "Java",
    url: "https://java-decompiler.github.io",
    github: "https://github.com/java-decompiler/jd-gui",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Fast standalone graphical utility that displays Java source code from .class files."
  },
  {
    name: "Fernflower",
    category: "Java",
    url: "https://github.com/fesh0r/fernflower",
    github: "https://github.com/fesh0r/fernflower",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Analytical Java decompiler engine integrated into IntelliJ IDEA."
  },
  {
    name: "Procyon",
    category: "Java",
    url: "https://github.com/mstrobel/procyon",
    github: "https://github.com/mstrobel/procyon",
    license: "Apache-2.0",
    pricing: "Free",
    platforms: ["Windows", "Linux", "macOS"],
    description: "Java decompiler suite optimized for Java 8 lambdas and method references."
  },

  // Game RE
  {
    name: "CrySearch",
    category: "Game RE",
    url: "https://www.crysearch.nl",
    license: "MIT",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Memory scanner and reverse engineering toolkit for game binary research."
  },
  {
    name: "Scylla",
    category: "Game RE",
    url: "https://github.com/NtQuery/Scylla",
    github: "https://github.com/NtQuery/Scylla",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Windows"],
    description: "Dedicated process memory dumper and Import Address Table (IAT) reconstructor."
  },

  // Distros & Environments
  {
    name: "Kali Linux",
    category: "Distros & Environments",
    url: "https://www.kali.org",
    license: "GPL-3.0",
    pricing: "Free",
    platforms: ["Linux", "Windows", "macOS"],
    description: "The leading cybersecurity and reverse engineering distribution with hundreds of tools."
  }
];

const existingNames = new Set(seed.tools.map(t => t.name.toLowerCase()));
const toAdd = newTools.filter(t => !existingNames.has(t.name.toLowerCase()));

console.log('Original count:', seed.tools.length);
console.log('Adding count:', toAdd.length);

seed.tools.push(...toAdd);

// Sort tools by name
const comparisons = seed.tools.filter(t => t.category === 'Comparisons');
const actualTools = seed.tools.filter(t => t.category !== 'Comparisons');
actualTools.sort((a, b) => a.name.localeCompare(b.name));
seed.tools = [...actualTools, ...comparisons];

fs.writeFileSync('revkit-seed-data.json', JSON.stringify(seed, null, 2) + '\n');
console.log('Final tools count (excluding comparisons):', actualTools.length);
console.log('Updated revkit-seed-data.json!');

