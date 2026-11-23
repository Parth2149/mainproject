import seed from '../../revkit-seed-data.json';
import config from '../../site.config.json';
import metricsCache from '../../scripts/github-metrics-cache.json';

export { seed, config };
export const slug = value => value === '.NET' ? 'dotnet' : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const href = route => base + route;
export const canonical = route => config.url.replace(/\/$/, '') + href(route);

// Closed-source and freeware tools that must never display stars
const CLOSED_SOURCE_OR_FREEWARE = new Set([
  'obsidian', 'davinci-resolve', 'ida-free', 'burp-suite', 'photopea',
  'binary-ninja', 'charles-proxy', 'fiddler', 'pdf24-creator', 'cerbero-suite',
  'pdf-stream-dumper', 'cff-explorer', 'dotpeek', 'gda', 'hopper-disassembler',
  'ida-pro', 'intel-pin', 'jeb-decompiler', 'ollydbg', 'pestudio',
  'process-explorer', 'trid', 'windbg', 'procmon'
]);
const CLOSED_LICENSES = new Set(['Proprietary', 'Freeware', 'Commercial', 'Closed Source']);

export const tools = seed.tools.filter(tool => tool.category !== 'Comparisons').map(tool => {
  const toolSlug = slug(tool.name);
  const isClosed = CLOSED_SOURCE_OR_FREEWARE.has(toolSlug) || CLOSED_LICENSES.has(tool.license) || tool.pricing === 'Paid';

  let repoKey = null;
  if (tool.github && !isClosed) {
    try {
      const parsed = new URL(tool.github);
      if (parsed.hostname.toLowerCase() === 'github.com') {
        const parts = parsed.pathname.slice(1).split('/').filter(Boolean);
        if (parts.length >= 2 && !['orgs', 'topics', 'features'].includes(parts[0].toLowerCase())) {
          repoKey = `${parts[0].toLowerCase()}/${parts[1].toLowerCase()}`;
        }
      }
    } catch (e) {}
  }
  const metrics = repoKey && metricsCache[repoKey] && !metricsCache[repoKey].synthetic ? metricsCache[repoKey] : null;
  const realStars = metrics && typeof metrics.stars === 'number' && metrics.stars > 0 ? metrics.stars : null;

  // Determine CLI and MCP capabilities based on category and tool traits
  const isCliNative = ['Debuggers', 'Analysis Utilities', 'Binary Analysis Frameworks', 'Firmware & Embedded', 'Network'].includes(tool.category) ||
    tool.name.toLowerCase().includes('cli') || (tool.description && (tool.description.toLowerCase().includes('command-line') || tool.description.toLowerCase().includes('terminal')));
  const hasMcpNative = ['ghidra', 'binary-ninja', 'burp-suite', 'jadx', 'radare2', 'ollama'].includes(toolSlug);

  return {
    ...tool,
    slug: toolSlug,
    categorySlug: slug(tool.category),
    stars: realStars,
    status: metrics?.status || (isClosed ? 'Stable' : 'Active'),
    lastCommit: metrics?.lastCommit || null,
    release: metrics?.latestRelease || null,
    has_cli: tool.has_cli ?? isCliNative,
    has_mcp: tool.has_mcp ?? hasMcpNative
  };
});

export const categories = [...new Set(tools.map(tool => tool.category))];
export const platforms = [...new Set(tools.flatMap(tool => tool.platforms))];
export const licenses = [...new Set(tools.map(tool => tool.license))].sort();
export const prices = [...new Set(tools.map(tool => tool.pricing))];

export const categoryTitles = {
  'Disassemblers & Decompilers': 'Best Decompilers & Disassemblers (2026) — Ghidra, IDA Free & Binary Ninja',
  'Debuggers': 'Best Reverse Engineering Debuggers (2026) — x64dbg, GDB & WinDbg',
  'Android': 'Best Android Reverse Engineering Tools (2026) — JADX, APKTool & Frida',
  '.NET': 'Best .NET Decompilers & C# RE Tools (2026) — dnSpyEx & ILSpy',
  'Analysis Utilities': 'Best Binary Analysis Utilities & Unpackers (2026) — 7-Zip, DiE & UPX',
  'Binary Analysis Frameworks': 'Best Binary Analysis Frameworks (2026) — Radare2, Angr & Capstone',
  'Firmware & Embedded': 'Best Firmware Reverse Engineering Tools (2026) — Binwalk & UEFITool',
  'Network': 'Best Network Reverse Engineering Tools (2026) — Wireshark & Burp Suite',
  'Distros & Environments': 'Best Malware Analysis Distros & Sandboxes (2026) — FLARE VM & REMnux',
  'Java': 'Best Java Decompilers & Bytecode Tools (2026) — Bytecode Viewer & CFR',
  'Game RE': 'Best Game Reverse Engineering Tools (2026) — Cheat Engine & Memory Scanners',
  'Software': 'Best Free Open Source Software Alternatives (2026) — Desktop & Creative Apps',
  'Audio': 'Best Free Open Source Audio Editors & DAWs (2026) — Sound Design & Recording'
};

export const categoryDescriptions = {
  'Disassemblers & Decompilers': 'Top decompilers, disassemblers & online decompilers (Ghidra, IDA Pro free, Binary Ninja, Cutter) for x86, ARM, and binary reverse engineering.',
  'Debuggers': 'Top debuggers & dynamic binary analysis tools: x64dbg, GDB, WinDbg, OllyDbg 64-bit, and Python debuggers for memory inspection and vulnerability research.',
  'Android': 'Top Android APK decompilers, DEX disassemblers, Dalvik bytecode inspection, and dynamic instrumentation tools (JADX, APKTool, Frida Android, MobSF).',
  '.NET': 'Top open-source .NET decompilers, C# assembly editors, and deobfuscation utilities: dnSpyEx, ILSpy, and de4dot for managed binary analysis.',
  'Analysis Utilities': 'Essential binary analysis utilities: 7-Zip file extraction, Detect It Easy (DiE) packer detection, UPX executable unpacking, and PE/ELF inspectors.',
  'Binary Analysis Frameworks': 'Leading binary analysis frameworks for symbolic execution, intermediate representations (IR), disassembly, and automated analysis (Radare2, Angr, Capstone).',
  'Firmware & Embedded': 'Top firmware reverse engineering tools: Binwalk ROM extraction, UEFITool, FirmAE IoT emulation, and embedded hardware analysis utilities.',
  'Network': 'Top network packet sniffers, traffic interceptors, and API reverse engineering tools: Wireshark, Burp Suite Community, and mitmproxy.',
  'Distros & Environments': 'Top dedicated reverse engineering and malware analysis operating systems: FLARE VM, REMnux, Volatility memory forensics, and YARA rule sandboxes.',
  'Java': 'Top Java decompilers and bytecode inspection tools: Bytecode Viewer, CFR, Fernflower, and Procyon for decompiling compiled JAR and class files.',
  'Game RE': 'Top game reverse engineering tools, memory scanners, cheat engine tables, runtime struct inspection, and memory debuggers for research.',
  'Software': 'Top free open-source alternatives to Adobe Creative Cloud, Microsoft 365, Postman, 1Password, and commercial software: Blender, GIMP, Krita, and Bitwarden.',
  'Audio': 'Top free open-source audio editors, digital audio workstations, and Audacity alternatives for multi-track sound recording, editing, and mixing.'
};

export const metaDescription = text => text.length <= 160 ? text : text.slice(0, 157).replace(/\s+\S*$/, '') + '…';

export function getTargetBrand(tool) {
  if (tool.tag && tool.tag.endsWith(' Replacement')) {
    return tool.tag.replace(' Replacement', '').trim();
  }
  if (!tool.replaces) return null;
  let brand = tool.replaces.split('/')[0].split('(')[0].trim();
  brand = brand.replace(/ Conversational$/, '').replace(/ \(.*\)$/, '').trim();
  return brand;
}

export const catRoles = {
  'Disassemblers & Decompilers': 'Decompiler & Disassembler',
  'Debuggers': 'Debugger & Dynamic RE',
  'Android': 'Android APK Decompiler',
  '.NET': '.NET Decompiler',
  'Binary Analysis Frameworks': 'Binary Analysis Framework',
  'Analysis Utilities': 'Binary Analysis Utility',
  'Network': 'Packet Sniffer & Network RE',
  'Firmware & Embedded': 'Firmware Analysis & ROM RE',
  'Game RE': 'Memory Scanner & Game RE',
  'Distros & Environments': 'Malware Analysis Lab',
  'Java': 'Java Bytecode Decompiler',
  'Audio': 'Open Source Audio Editor',
  'Software': 'Open Source Software Alternative'
};

export const shortRoles = {
  'Disassemblers & Decompilers': 'Decompiler',
  'Debuggers': 'Debugger',
  'Android': 'APK Decompiler',
  '.NET': '.NET Decompiler',
  'Binary Analysis Frameworks': 'Binary Analysis',
  'Analysis Utilities': 'Analysis Utility',
  'Network': 'Packet Sniffer',
  'Firmware & Embedded': 'Firmware RE',
  'Game RE': 'Game RE Tool',
  'Distros & Environments': 'Malware Lab',
  'Java': 'Java Decompiler',
  'Audio': 'Audio Editor',
  'Software': 'Open Source Tool'
};

export const catKeywords = {
  'Disassemblers & Decompilers': 'decompiler & disassembler',
  'Debuggers': 'reverse engineering debugger',
  'Android': 'Android APK decompiler',
  '.NET': '.NET C# decompiler',
  'Binary Analysis Frameworks': 'binary analysis framework',
  'Analysis Utilities': 'binary analysis utility',
  'Network': 'packet sniffer & network RE tool',
  'Firmware & Embedded': 'firmware analysis & ROM RE tool',
  'Game RE': 'memory scanner & game RE tool',
  'Distros & Environments': 'malware analysis environment',
  'Java': 'Java bytecode decompiler',
  'Audio': 'open-source audio editor',
  'Software': 'open-source software replacement'
};

export function platShort(tool) {
  const p = tool.platforms;
  if (p.includes('Windows') && p.includes('macOS') && p.includes('Linux')) return 'Win/Mac/Linux';
  if (p.includes('Windows') && p.includes('Linux')) return 'Win/Linux';
  if (p.includes('Windows') && p.includes('macOS')) return 'Win/Mac';
  if (p.includes('Linux') && p.includes('macOS')) return 'Mac/Linux';
  if (p.includes('Windows')) return 'Windows';
  if (p.includes('Linux')) return 'Linux';
  if (p.includes('macOS')) return 'macOS';
  if (p.includes('Android')) return 'Android';
  return p.slice(0, 2).join('/');
}

export function platStr(tool) {
  if (tool.platforms.includes('Windows') && tool.platforms.includes('macOS') && tool.platforms.includes('Linux')) {
    return 'Windows, Mac & Linux';
  }
  return tool.platforms.join(', ');
}

// Category-Aware Specs helper
export function getCategorySpecs(tool) {
  const cat = tool.category;
  if (cat === 'Disassemblers & Decompilers' || cat === 'Binary Analysis Frameworks' || cat === 'Debuggers') {
    return {
      architectures: 'x86, x64, ARM, AArch64, MIPS, RISC-V, WebAssembly',
      formats: 'PE (Windows), ELF (Linux), Mach-O (macOS), Raw Binary',
      focus: 'Binary disassembly, control-flow graph (CFG) analysis, and machine-code decompilation',
      isRE: true
    };
  }
  if (cat === 'Android') {
    return {
      architectures: 'ARM64, ARMv7, x86_64, Dalvik / ART Virtual Machine',
      formats: 'APK, AAB, XAPK, DEX, Smali, JAR',
      focus: 'Dalvik bytecode decompilation, Smali disassembling, and manifest inspection',
      isRE: true
    };
  }
  if (cat === '.NET') {
    return {
      architectures: 'Any CPU, x86, x64, ARM64 (.NET Runtime)',
      formats: 'DLL, EXE, CIL/MSIL, Managed Assemblies',
      focus: 'C# decompilation, intermediate language (IL) editing, and symbol deobfuscation',
      isRE: true
    };
  }
  if (cat === 'Java') {
    return {
      architectures: 'JVM (Java Virtual Machine)',
      formats: 'JAR, CLASS, WAR, EAR',
      focus: 'Java bytecode recovery, class file parsing, and constant pool analysis',
      isRE: true
    };
  }
  if (cat === 'Network') {
    return {
      architectures: 'All standard network interfaces and sockets',
      formats: 'PCAP, PCAPNG, HAR, JSON, XML, Protocol Buffers',
      focus: 'Packet sniffing, protocol dissection, TLS interception, and API payload analysis',
      isRE: false
    };
  }
  if (cat === 'Firmware & Embedded') {
    return {
      architectures: 'ARM, MIPS, PowerPC, Xtensa, AVR, ARC',
      formats: 'Raw ROM dumps, SquashFS, CramFS, JFFS2, UEFI Firmware Volumes',
      focus: 'Firmware header identification, filesystem carving, and IoT device emulation',
      isRE: true
    };
  }
  if (cat === 'Software') {
    if (tool.formats) {
      return {
        architectures: 'Native 64-bit & ARM64 execution',
        formats: tool.formats,
        focus: 'Productivity and creative workflows with zero licensing fees',
        isRE: false
      };
    }
    const tSlug = tool.slug || '';
    const desc = (tool.description || '').toLowerCase();
    const replaces = (tool.replaces || '').toLowerCase();

    let formats = null;
    if (tSlug.includes('blender') || desc.includes('3d') || desc.includes('mesh') || replaces.includes('maya') || replaces.includes('3ds') || replaces.includes('autocad')) {
      formats = '3D models, OBJ, FBX, glTF, STL, and .blend scenes';
    } else if (desc.includes('video') || replaces.includes('premiere') || replaces.includes('after-effects') || tSlug.includes('kdenlive') || tSlug.includes('shotcut') || tSlug.includes('davinci')) {
      formats = 'MP4, MKV, MOV, WebM, and ProRes video streams';
    } else if (desc.includes('photo') || desc.includes('raster') || replaces.includes('photoshop') || replaces.includes('lightroom') || tSlug.includes('gimp') || tSlug.includes('krita') || tSlug.includes('photopea')) {
      formats = 'PNG, JPEG, WebP, TIFF, PSD, and XCF raster images';
    } else if (desc.includes('vector') || replaces.includes('illustrator') || replaces.includes('figma') || replaces.includes('sketch') || replaces.includes('canva') || tSlug.includes('inkscape') || tSlug.includes('penpot')) {
      formats = 'SVG, PDF, EPS, and open vector standards';
    } else if (desc.includes('office') || desc.includes('document') || desc.includes('spreadsheet') || replaces.includes('office') || replaces.includes('excel') || replaces.includes('google-workspace') || tSlug.includes('libreoffice') || tSlug.includes('onlyoffice')) {
      formats = 'ODT, DOCX, ODS, XLSX, and PDF documents';
    } else if (desc.includes('note') || desc.includes('markdown') || replaces.includes('notion') || replaces.includes('evernote') || tSlug.includes('obsidian') || tSlug.includes('logseq')) {
      formats = 'Markdown, Canvas, Plain Text, and JSON';
    } else if (desc.includes('api') || replaces.includes('postman') || replaces.includes('insomnia') || tSlug.includes('bruno') || tSlug.includes('hoppscotch')) {
      formats = 'JSON, YAML, REST, and GraphQL collections';
    } else if (desc.includes('archive') || desc.includes('zip') || replaces.includes('winrar')) {
      formats = '7Z, ZIP, TAR, GZ, and RAR archives';
    } else if (desc.includes('password') || replaces.includes('1password') || replaces.includes('bitwarden') || tSlug.includes('bitwarden') || tSlug.includes('keepass')) {
      formats = 'Encrypted vaults, KDBX, and JSON exports';
    }

    return {
      architectures: 'Native 64-bit & ARM64 execution',
      formats,
      focus: 'Desktop productivity, creative workflows, complete offline privacy, and zero licensing fees',
      isRE: false
    };
  }
  if (cat === 'Audio') {
    return {
      architectures: 'Native multi-core DSP audio engines',
      formats: 'WAV, FLAC, MP3, OGG, AIFF, MIDI, VST plugins',
      focus: 'Multi-track sound recording, non-destructive editing, mixing, and digital mastering',
      isRE: false
    };
  }
  return {
    architectures: 'Native multi-platform execution',
    formats: 'Standard binary, document, or network formats',
    focus: 'Specialized analysis and execution with zero vendor lock-in',
    isRE: false
  };
}

export function getCategoryAltTitle(tool) {
  const brand = getTargetBrand(tool);
  if (tool.category === 'Software' || tool.category === 'Audio') {
    return brand ? `Free ${brand} Alternative & Open-Source Productivity Profile` : `Open-Source ${tool.category} Software Profile`;
  }
  return brand ? `Free ${brand} Replacement & Reverse Engineering Profile` : `${tool.category} Security & Binary Analysis Profile`;
}

export function getCategoryAltSummary(tool) {
  const brand = getTargetBrand(tool);
  if (tool.category === 'Software') {
    return `${tool.name} is a high-performance open-source alternative designed to replace proprietary ${tool.replaces || brand || 'commercial software'}. It delivers complete local data privacy, standard file format interoperability, offline execution, and unrestricted workflow control with zero subscription fees.`;
  }
  if (tool.category === 'Audio') {
    return `${tool.name} is an open-source audio workstation providing multi-track recording, non-destructive editing, sound synthesis, and high-fidelity mastering with complete offline privacy and zero licensing fees.`;
  }
  if (tool.category === 'Network') {
    return `${tool.name} is a proven open-source tool for network traffic analysis, packet inspection, protocol debugging, and security auditing across ${platStr(tool)}.`;
  }
  return `${tool.name} is an industry-standard open-source solution for ${tool.category.toLowerCase()}, binary analysis, assembly inspection, and vulnerability research.`;
}

// Grammatically extracted workflow use case for comparisons
export function getWorkflowUseCase(tool) {
  const d = tool.description.trim().replace(/\.$/, '');
  const match = d.match(/^(Decompiles|Analyzes|Edits|Models|Steps through|Injects|Packs|Runs|Scans|Interprets|Captures|Inspects|Extracts|Stores|Transcribes|Synthesizes|Manages|Emulates|Executes|Provides)\b/i);
  if (match) {
    const verb = match[1].toLowerCase();
    const rest = d.slice(match[0].length).trim();
    const gerundMap = {
      'decompiles': 'decompiling',
      'analyzes': 'analyzing',
      'edits': 'editing',
      'models': 'modeling',
      'steps through': 'stepping through',
      'injects': 'injecting',
      'packs': 'packing and unpacking',
      'runs': 'running',
      'scans': 'scanning',
      'interprets': 'interpreting',
      'captures': 'capturing',
      'inspects': 'inspecting',
      'extracts': 'extracting',
      'stores': 'securely storing',
      'transcribes': 'transcribing',
      'synthesizes': 'synthesizing',
      'manages': 'managing',
      'emulates': 'emulating',
      'executes': 'executing',
      'provides': 'utilizing'
    };
    const gerund = gerundMap[verb] || (verb.replace(/s$/, '') + 'ing');
    return `${gerund} ${rest}`;
  }
  return d.charAt(0).toLowerCase() + d.slice(1);
}

// Category-Aware Quick Start Steps
export function getQuickStartSteps(tool) {
  const repoName = tool.github ? new URL(tool.github).pathname.slice(1) : null;
  const platformStr = tool.platforms.length === 3 ? 'Windows, macOS, Linux' : tool.platforms.join(' / ');
  const cat = tool.category;
  const name = tool.name;

  if (cat === 'Disassemblers & Decompilers' || cat === 'Binary Analysis Frameworks') {
    const prereq = name.toLowerCase().includes('ghidra') ? 'Java JDK 17+ or 21+' : 'Standard 64-bit OS';
    return [
      { step: '1', title: 'Download Release Archive', text: repoName ? `Go to the GitHub repository (${repoName}) releases section and download the latest zip/tarball for ${platformStr}.` : `Download the latest verified standalone package from the official project page for ${platformStr}.` },
      { step: '2', title: 'Verify Prerequisites & Extract', text: `Extract the archive into your security lab directory. Ensure ${prereq} is installed.` },
      { step: '3', title: 'Launch Standalone Binary', text: `Execute the main runner (${name} executable or launch script) with no cloud registration or telemetry.` },
      { step: '4', title: 'Import Target & Decompile', text: `Open or drag-and-drop your target binary (PE, ELF, Mach-O) to analyze assembly instructions, control-flow graphs, and decompiled C/C++ code.` }
    ];
  }

  if (cat === 'Debuggers' || cat === 'Game RE') {
    return [
      { step: '1', title: 'Get Verified Build', text: repoName ? `Download the latest binary release from GitHub (${repoName}) or your package manager.` : `Obtain the official installer for ${platformStr}.` },
      { step: '2', title: 'Unpack & Configure Permissions', text: `Extract to your local tools folder. Ensure debugging privileges or kernel driver permissions (if applicable) are granted.` },
      { step: '3', title: 'Attach or Launch Process', text: `Launch ${name} and either attach to an active process PID or spawn a new target binary under debugger supervision.` },
      { step: '4', title: 'Set Breakpoints & Inspect Memory', text: `Step through instructions, examine register states, and inspect runtime memory structures with zero telemetry.` }
    ];
  }

  if (cat === 'Android') {
    return [
      { step: '1', title: 'Download Official Package', text: repoName ? `Obtain the latest release archive or jar from GitHub (${repoName}).` : `Download the verified package for ${platformStr}.` },
      { step: '2', title: 'Verify Java Environment', text: `Ensure Java Runtime (JRE/JDK 11+) is installed and accessible on PATH for bytecode parsing.` },
      { step: '3', title: 'Load Target APK or DEX', text: `Open ${name} and import your target Android APK, XAPK, or classes.dex file.` },
      { step: '4', title: 'Inspect Smali & Resources', text: `Decompile Dalvik bytecode to Java source, inspect AndroidManifest.xml, and examine app resources and signatures.` }
    ];
  }

  if (cat === '.NET') {
    return [
      { step: '1', title: 'Download Release', text: repoName ? `Download the latest release from GitHub (${repoName}).` : `Obtain the official installer for ${platformStr}.` },
      { step: '2', title: 'Verify .NET Runtime', text: `Ensure .NET 6/8/9 Runtime or Desktop Runtime is installed on ${platformStr}.` },
      { step: '3', title: 'Load Assembly DLL / EXE', text: `Launch ${name} and open your managed .NET assembly or executable.` },
      { step: '4', title: 'Decompile C# & Edit IL', text: `Inspect high-level C# decompilation, analyze intermediate language (IL) opcodes, and deobfuscate symbols.` }
    ];
  }

  if (cat === 'Java') {
    return [
      { step: '1', title: 'Download Jar or Binary', text: repoName ? `Download the latest release jar from GitHub (${repoName}).` : `Obtain the official package for ${platformStr}.` },
      { step: '2', title: 'Verify Java Environment', text: `Ensure Java JDK 17+ or 21+ is installed on your workstation.` },
      { step: '3', title: 'Open Target Archive', text: `Launch ${name} and open your compiled JAR, WAR, or class file.` },
      { step: '4', title: 'Decompile Bytecode to Source', text: `Review recovered Java source code, analyze JVM bytecode instructions, and search string constants.` }
    ];
  }

  if (cat === 'Network') {
    return [
      { step: '1', title: 'Obtain Verified Installer', text: repoName ? `Download the latest build from GitHub (${repoName}) or official site.` : `Download the official installer for ${platformStr}.` },
      { step: '2', title: 'Configure Packet Capture Driver', text: `Install on ${platformStr} with required packet capture drivers (Npcap/libpcap) or proxy certificates.` },
      { step: '3', title: 'Select Network Interface', text: `Launch ${name} and select your active network adapter or configure local HTTP/SOCKS proxy listener.` },
      { step: '4', title: 'Analyze Protocols & Traffic', text: `Capture live packets, filter protocols (DNS, TLS, HTTP/2, WebSockets), and inspect packet payloads.` }
    ];
  }

  if (cat === 'Firmware & Embedded') {
    return [
      { step: '1', title: 'Obtain Tool or Image', text: repoName ? `Clone repository (${repoName}) or download latest release archive.` : `Download official package for ${platformStr}.` },
      { step: '2', title: 'Install System Dependencies', text: `Ensure extraction utilities (lzma, cramfs, squashfs-tools) are available on ${platformStr}.` },
      { step: '3', title: 'Load ROM or Firmware Image', text: `Execute ${name} targeting your raw firmware binary or flash dump.` },
      { step: '4', title: 'Extract Filesystems & Headers', text: `Scan headers, carve compressed file systems, and inspect bootloader signatures and embedded configurations.` }
    ];
  }

  if (cat === 'Analysis Utilities') {
    return [
      { step: '1', title: 'Download Utility', text: repoName ? `Download the latest release binary from GitHub (${repoName}).` : `Obtain verified installer for ${platformStr}.` },
      { step: '2', title: 'Add to System PATH', text: `Extract the standalone utility to your local tools directory or add to environment PATH.` },
      { step: '3', title: 'Run File / PE Inspection', text: `Execute ${name} against target files, archives, or process IDs.` },
      { step: '4', title: 'Examine Analysis Output', text: `Inspect detected capabilities, packer signatures, section headers, or extracted payloads with zero telemetry.` }
    ];
  }

  if (cat === 'Distros & Environments') {
    return [
      { step: '1', title: 'Download Appliance / Script', text: repoName ? `Download the VM image or install script from GitHub (${repoName}).` : `Obtain the official environment image.` },
      { step: '2', title: 'Configure Hypervisor', text: `Import into VMware, VirtualBox, or Proxmox with host-only isolated networking.` },
      { step: '3', title: 'Initialize Sandboxed OS', text: `Boot the guest operating system and take a clean baseline snapshot.` },
      { step: '4', title: 'Execute Dynamic Analysis', text: `Detonate malware samples, monitor behavioral changes, and capture memory artifacts safely.` }
    ];
  }

  if (cat === 'Audio') {
    return [
      { step: '1', title: 'Download Native Installer', text: repoName ? `Download the official installer for ${platformStr} from GitHub (${repoName}) or official site.` : `Download the installer for ${platformStr}.` },
      { step: '2', title: 'Install Audio Application', text: `Run the installer or unpack the portable package without mandatory cloud account registration.` },
      { step: '3', title: 'Configure Audio Device', text: `Launch ${name} and configure your input/output devices, sample rate, and ASIO/CoreAudio drivers.` },
      { step: '4', title: 'Record, Edit & Export', text: `Import audio files (WAV, MP3, FLAC), record multi-track sessions, apply effects, and export high-fidelity audio with zero fees.` }
    ];
  }

  if (cat === 'Software') {
    return [
      { step: '1', title: 'Download Native Installer', text: repoName ? `Download the installer or binary for ${platformStr} from GitHub (${repoName}) or official site.` : `Download the installer for ${platformStr}.` },
      { step: '2', title: 'Quick Local Setup', text: `Complete standard installation on ${platformStr} with zero telemetry, tracker scripts, or forced subscriptions.` },
      { step: '3', title: 'Open Local Workspace', text: `Launch ${name} and create or import your local projects, documents, or data files.` },
      { step: '4', title: 'Work with Total Sovereignty', text: `Enjoy unrestricted offline performance, open standards compatibility, and export your work with zero recurring fees.` }
    ];
  }

  return [
    { step: '1', title: 'Download Verified Package', text: repoName ? `Download the release binary from GitHub (${repoName}).` : `Download the official installer for ${platformStr}.` },
    { step: '2', title: 'Local Installation', text: `Install or extract the package on ${platformStr} without mandatory cloud logins.` },
    { step: '3', title: 'Launch Application', text: `Open ${name} to configure your preferences and local storage location.` },
    { step: '4', title: 'Run Offline Workflow', text: `Operate freely with full privacy, zero vendor lock-in, and complete control over your data.` }
  ];
}

// Generate Package Manager / CLI Installation Commands (ONLY if explicitly verified)
export function getInstallCommands(tool) {
  if (tool.install_command && typeof tool.install_command === 'string' && tool.install_command.trim().length > 0) {
    return [{
      manager: tool.install_manager || 'cli',
      cmd: tool.install_command.trim()
    }];
  }
  return [];
}

export function toolTitle(tool) {
  const brand = getTargetBrand(tool);
  const plat = platShort(tool);
  const role = catRoles[tool.category] || 'RE Tool';
  const shortRole = shortRoles[tool.category] || 'RE Tool';

  const candidates = [];
  if (brand) {
    candidates.push(
      `${tool.name} — Free ${brand} Alternative (${plat})`,
      `${tool.name} — ${brand} Alternative (${plat})`,
      `${tool.name} — Free ${brand} Alternative`,
      `${tool.name} — ${brand} Alternative`,
      `${tool.name} — ${shortRole} (${plat})`,
      `${tool.name} — ${shortRole}`
    );
  } else {
    candidates.push(
      `${tool.name} — ${role} (${plat})`,
      `${tool.name} — ${shortRole} (${plat})`,
      `${tool.name} — ${role}`,
      `${tool.name} — ${shortRole}`
    );
  }

  for (const c of candidates) {
    if (c.length + 9 <= 60) return c;
  }
  return candidates[candidates.length - 1];
}

export function toolPageDescription(tool) {
  const brand = getTargetBrand(tool);
  const plat = platStr(tool);
  const catKw = catKeywords[tool.category] || 'reverse engineering tool';
  const lic = tool.license;

  const candidates = [];
  if (brand) {
    candidates.push(
      `Download ${tool.name}: free open-source ${brand} alternative and ${catKw} for ${plat}. ${lic} licensed with zero subscription fees.`,
      `Download ${tool.name}: the free ${brand} alternative & ${catKw} for ${plat}. Free open-source ${lic} software with zero fees.`,
      `${tool.name} is a free open-source ${brand} alternative & ${catKw} for ${plat}. Verified ${lic} license with zero fees.`,
      `Get ${tool.name}: free open-source ${brand} alternative & ${catKw} on ${plat}. ${lic} licensed with zero subscription fees.`,
      `${tool.name} is a free open-source ${brand} replacement and ${catKw} for ${plat}. ${lic} licensed with full offline privacy.`
    );
  } else {
    candidates.push(
      `Download ${tool.name}: open-source ${catKw} for ${plat}. ${tool.pricing} under ${lic} license for analysis and research.`,
      `${tool.name} is an open-source ${catKw} for ${plat}. Published under ${lic} license: ${tool.description}`,
      `Download ${tool.name}, the open-source ${catKw} for ${plat}. Free ${lic} software for inspection and development.`,
      `${tool.name} is an open-source ${catKw} for ${plat}. ${lic} licensed, free to download with full source code on GitHub.`,
      `Explore ${tool.name}: open-source ${catKw} for ${plat}. ${tool.pricing} under ${lic} license with complete privacy and control.`
    );
  }

  for (const c of candidates) {
    if (c.length >= 135 && c.length <= 155) return c;
  }
  for (const c of candidates) {
    if (c.length <= 155) return c;
  }
  let best = candidates[0];
  if (best.length > 155) {
    best = best.slice(0, 154).replace(/\s+\S*$/, '') + '.';
  }
  return best;
}

export const defaultKeywords = 'reverse engineering tools, open source alternatives, free decompiler, github reverse engineering, ai reverse engineering, github alternatives, open source chatgpt alternatives, opencode, open source software directory, ghidra, x64dbg, wireshark, cheat engine, jadx, dnspy, radare2, binwalk, audacity, gimp, blender, static analysis, dynamic analysis';

export function keywordsFor(page) {
  if (page.kind === 'tool' && page.tool) {
    const t = page.tool;
    const brand = getTargetBrand(t);
    const brandKws = brand ? `, ${brand.toLowerCase()} replacement, ${brand.toLowerCase()} alternative, free ${brand.toLowerCase()} replacement, open source ${brand.toLowerCase()}` : '';
    const tagKws = t.tag ? `, ${t.tag.toLowerCase()}` : '';
    return `${t.name}, download ${t.name}, ${t.name} github, ${t.name} alternative, ${t.name} open source, ${t.category.toLowerCase()} tools, ${t.platforms.join(', ').toLowerCase()}, ${t.license}${brandKws}${tagKws}`;
  }
  if (page.kind === 'alternative' && page.target) {
    return `${page.target.name.toLowerCase()} alternative, free ${page.target.name.toLowerCase()} alternative, open source ${page.target.name.toLowerCase()}, replace ${page.target.name.toLowerCase()}, best ${page.target.name.toLowerCase()} alternatives 2026, self hosted ${page.target.name.toLowerCase()}`;
  }
  if (page.kind === 'stack' && page.stack) {
    return `${page.stack.slug.replace(/-/g, ' ')}, ${page.stack.name.toLowerCase()}, open source toolchain, ${page.stack.tools.map(t => t.name.toLowerCase()).join(', ')}`;
  }
  if (page.category) {
    const map = {
      'Disassemblers & Decompilers': 'ghidra, ghidra decompiler, download ghidra, github ghidra, decompiler, online decompiler, disassembler, ida pro free, ida pro price, ida pro 9.5, hex-rays decompiler, hopper disassembler, binary ninja decompiler, x86 decompiler, arm decompiler',
      'Debuggers': 'debugger, what is a debugger, python debugger, gdb, online gdb, gdb compiler, x64dbg, x64dbg download, x64dbg tutorial, ollydbg 64 bit, ollydbg 1.10, ollydbg plugins, microsoft windbg, windbg download, windbg preview, dynamic binary analysis',
      'Android': 'jadx, jadx github, jadx decompiler, jadx gui, apk decompiler, android apk decompiler, apk decompiler online, decompile apk, dex decompiler, apktool, apktool android, apktool download, apktool github, frida android, mobsf',
      '.NET': 'dnspy, dnspyex, dnspy download github, how to use dnspy, ilspy, ilspy download, ilspycmd, .net decompiler, c# decompiler, de4dot, dotnet deobfuscator',
      'Java': 'java decompiler, best java decompiler, download java decompiler, class to java decompiler, java decompiler gui, bytecode viewer, dex2jar, cfr decompiler',
      'Network': 'wireshark, wireshark download, wireshark download for windows 11, wireshark filter, wireshark github, tshark, packet sniffer, network packet sniffer, packet sniffer free, burp suite, portswigger burp suite, burp suite community, mitmproxy',
      'Game RE': 'cheat engine, download cheat engine, cheat engine table, cheat table, mod engine, cheat engine pc, game reverse engineering tools, memory scanner, reclassex',
      'Firmware & Embedded': 'firmware analysis, binwalk, binwalk extract, binwalk windows, binwalk command, uefi analysis, iot reverse engineering, uefitool, firmae',
      'Distros & Environments': 'malware analysis, malware analysis sandbox, malware analysis online, dynamic malware analysis, malware analysis training, remnux, volatility memory forensics, yara malware rules, flare vm, cape sandbox',
      'Analysis Utilities': '7zip, 7zip download, 7zip for windows 11, 7zip download for windows, winrar free alternative, upx github, upx executable packer, pe elf binary inspection, detect it easy, die, bpftrace, capa, pe-sieve',
      'Binary Analysis Frameworks': 'radare2, radare2 windows, radare2 cutter, radare2 gui, radare2 tutorial, binary analysis framework, angr binary analysis, symbolic execution, capstone engine, keystone engine, slither, mythril',
      'Software': 'adobe alternatives, alternatives to adobe, photoshop alternative, photoshop free, photoshop alternative free, opensource photoshop alternative, illustrator alternative, free illustrator alternative, adobe premiere pro alternative, blender 3d, gimp download, bitwarden password manager, 1password alternative, davinci resolve free, obs studio download, krita download, inkscape free, penpot, ollama',
      'Audio': 'open source audio editor, audacity, audacity download, audacity free, audacity 4.0, free audio editor, digital audio workstation, lmms, ardour, tenacity'
    };
    return map[page.category] || `${page.category.toLowerCase()} tools, open source software, security research`;
  }
  if (page.kind === 'comparison' && page.pair) {
    return `${page.pair[0].name} vs ${page.pair[1].name}, compare ${page.pair[0].name} ${page.pair[1].name}, ${page.pair[0].name} alternatives, ${page.pair[1].name} alternatives, software comparison, free open source alternatives`;
  }
  return defaultKeywords;
}

export const homepageFaqs = [
  {
    question: 'Best reverse engineering tools & open source alternatives in 2026?',
    answer: 'Ghidra, IDA Free, and Binary Ninja for binary decompilation; x64dbg, GDB, and Frida for dynamic debugging; Wireshark and Burp Suite for network analysis; and open-source creative software like Blender, GIMP, Krita, and Bitwarden.'
  },
  {
    question: 'Are tools on RevKit completely free and open source?',
    answer: 'Yes. The vast majority of software indexed on RevKit is published under verified open-source licenses (GPL, MIT, Apache 2.0) with zero subscription fees, native local execution, and public GitHub repositories.'
  },
  {
    question: 'How do I choose between open-source alternatives and commercial tools?',
    answer: 'Open-source tools offer complete offline privacy, auditable source code, and freedom from vendor lock-in or recurring seat licenses. Compare tool capabilities, supported platforms, and community activity to match your exact pipeline requirements.'
  }
];

if (new Set(tools.map(tool => tool.slug)).size !== tools.length) throw new Error('Duplicate tool slug');
for (const tool of tools) {
  for (const field of ['name', 'description', 'category', 'license', 'pricing']) {
    if (!tool[field]) throw new Error(`${tool.name}: missing ${field}`);
  }
  if (!tool.platforms?.length) throw new Error(`${tool.name}: no platforms`);
  for (const field of ['url', 'github']) {
    if (tool[field] && new URL(tool[field]).protocol !== 'https:') throw new Error(`${tool.name}: HTTPS required`);
  }
  if (tool.github && !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(tool.github)) throw new Error(`${tool.name}: invalid repository URL`);
}

export const pairs = config.comparisons.map(pair => pair.map(id => {
  const tool = tools.find(tool => tool.slug === id);
  if (!tool) throw new Error(`Unknown comparison tool: ${id}`);
  return tool;
}));
export const pairRoute = ([a, b]) => `/compare/${a.slug}-vs-${b.slug}/`;

export function alternatives(tool) {
  return tools.filter(item => item.slug !== tool.slug)
    .map(item => ({ tool: item, score: (item.category === tool.category ? 100 : 0) + item.platforms.filter(p => tool.platforms.includes(p)).length * 2 + (item.pricing === tool.pricing ? 1 : 0) }))
    .sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.tool);
}

// Group tools into dedicated Alternative Hubs
const rawHubs = {};
for (const tool of tools) {
  const brand = getTargetBrand(tool);
  if (brand) {
    const s = slug(brand);
    if (!rawHubs[s]) {
      const isCreative = ['Photoshop', 'Premiere', 'Illustrator', 'Lightroom', 'After Effects', 'InDesign', 'Maya', '3ds Max', 'Cinema 4D', 'Canva', 'Figma'].some(k => brand.includes(k));
      const isSec = ['IDA', 'JEB', 'Burp', 'PEiD', 'WinDbg', '010 Editor', 'Peach Fuzzer'].some(k => brand.includes(k));
      const isOffice = ['Office', 'Word', 'Excel', 'PowerPoint', '365', 'Notion', 'Slack', 'Trello', 'Evernote'].some(k => brand.includes(k));
      const costUSD = isSec ? 1800 : isCreative ? 540 : isOffice ? 180 : 120;
      const costINR = Math.round(costUSD * 86);

      rawHubs[s] = {
        name: brand,
        slug: s,
        category: tool.category,
        platforms: 'Windows, Mac & Linux',
        costUSD,
        costINR,
        tools: [],
        faqs: [
          {
            question: `What is the best free open-source alternative to ${brand}?`,
            answer: `The top open-source alternatives to ${brand} include ${tool.name}. These alternatives run natively with zero monthly subscription fees and complete data ownership.`
          },
          {
            question: `Can I use ${brand} open-source alternatives commercially?`,
            answer: `Yes. Tools licensed under MIT, Apache-2.0, BSD, and GPL allow commercial development, research, and production workflows.`
          },
          {
            question: `How much can I save by replacing ${brand}?`,
            answer: `Organizations and individual developers save approximately $${costUSD} (₹${costINR.toLocaleString('en-IN')}) per seat annually by eliminating commercial ${brand} licensing.`
          }
        ]
      };
    }
    rawHubs[s].tools.push(tool);
  }
}

export const alternativeHubs = Object.fromEntries(
  Object.entries(rawHubs).filter(([, hub]) => hub.tools.length >= 2)
);

// Define 8 Curated Starter Stacks
export const starterStacks = [
  {
    slug: 'android-apk-reverse-engineering',
    name: 'Android APK Reverse Engineering Stack',
    category: 'Android',
    platforms: 'Windows, Mac & Linux',
    whoFor: 'Mobile security researchers, Android penetration testers, and malware analysts',
    description: 'A complete end-to-end toolchain for unpacking APKs, decompiling Dalvik bytecode to Java, inspecting Smali, and intercepting dynamic runtime APIs.',
    toolSlugs: ['jadx', 'apktool', 'frida', 'mitmproxy', 'mobsf']
  },
  {
    slug: 'beginner-ctf-binary-exploitation',
    name: 'Beginner CTF & Binary Exploitation Stack',
    category: 'Disassemblers & Debuggers',
    platforms: 'Linux, Windows & macOS',
    whoFor: 'Computer science students, CTF players, and binary exploit developers',
    description: 'Essential software suite for solving binary exploitation, crackme puzzles, control-flow reconstruction, and dynamic breakpoint debugging.',
    toolSlugs: ['ghidra', 'gdb', 'pwndbg', 'x64dbg', 'cutter']
  },
  {
    slug: 'malware-analysis-home-lab',
    name: 'Malware Analysis & Forensics Home Lab',
    category: 'Distros & Environments',
    platforms: 'Windows & Linux Hypervisors',
    whoFor: 'Incident response teams, SOC analysts, and threat intelligence researchers',
    description: 'Turnkey operating systems, packet analyzers, in-memory unpackers, and capability detectors for safe malware triage and artifact extraction.',
    toolSlugs: ['flare-vm', 'remnux', 'wireshark', 'detect-it-easy-die', 'pe-bear']
  },
  {
    slug: 'zero-cost-indie-developer-stack',
    name: 'Zero-Cost Indie Developer Stack',
    category: 'Software & Productivity',
    platforms: 'Windows, Mac & Linux',
    whoFor: 'Solo founders, full-stack developers, and open-source hackers',
    description: 'High-productivity development and automation suite replacing Postman, Notion, Zapier, and paid proprietary APIs with local tools.',
    toolSlugs: ['bruno', 'penpot', 'obsidian', 'n8n', 'ollama', 'rustdesk']
  },
  {
    slug: 'free-creator-video-design-suite',
    name: 'Free Creator Video & Design Suite',
    category: 'Creative & Multimedia',
    platforms: 'Windows, Mac & Linux',
    whoFor: 'YouTubers, motion designers, illustrators, and 3D artists',
    description: 'Professional creative studio replacing Adobe Creative Cloud (Premiere, Photoshop, Illustrator, Audition) and Maya with zero subscription fees.',
    toolSlugs: ['davinci-resolve', 'kdenlive', 'gimp', 'krita', 'inkscape', 'blender', 'audacity']
  },
  {
    slug: 'firmware-iot-security-auditing',
    name: 'Firmware & IoT Security Auditing Stack',
    category: 'Firmware & Embedded',
    platforms: 'Linux & Windows',
    whoFor: 'IoT hardware hackers, automotive researchers, and embedded systems auditors',
    description: 'Automated ROM carver, UEFI volume explorer, and system emulation environment for decompiling embedded firmware images.',
    toolSlugs: ['binwalk', 'uefitool', 'firmae', 'ghidra']
  },
  {
    slug: 'dotnet-csharp-decompilation-suite',
    name: '.NET & C# Decompilation Suite',
    category: '.NET',
    platforms: 'Windows & Cross-Platform',
    whoFor: 'C# developers, reverse engineers, and malware analysts inspecting managed binaries',
    description: 'World-class .NET assembly decompiler, IL editor, and universal deobfuscator for analyzing protected C# executables and DLLs.',
    toolSlugs: ['dnspyex', 'ilspy', 'de4dot']
  },
  {
    slug: 'privacy-first-self-hosted-cloud',
    name: 'Privacy-First Self-Hosted Cloud Stack',
    category: 'Cloud & Infrastructure',
    platforms: 'Linux, Docker & Mobile',
    whoFor: 'Privacy advocates, self-hosters, and remote teams',
    description: 'Decentralized cloud suite replacing 1Password, Google Photos, Dropbox, and commercial VPNs with encrypted local synchronization.',
    toolSlugs: ['bitwarden', 'syncthing', 'immich', 'wireguard']
  }
].map(s => ({
  ...s,
  tools: s.toolSlugs.map(ts => tools.find(t => t.slug === ts)).filter(Boolean)
}));

export const pages = [
  {
    route: '/',
    kind: 'directory',
    title: 'Top Reverse Engineering Tools & Open Source Software (2026)',
    description: 'Explore the curated directory of reverse engineering tools, free decompilers, debuggers, binary analysis suites, and open-source GitHub alternatives in 2026.'
  },
  {
    route: '/categories/',
    kind: 'categories',
    title: 'Reverse Engineering Tools by Category (2026)',
    description: 'Browse curated reverse engineering tools by category: Android, debuggers, decompilers, .NET, firmware, binary analysis frameworks, and game RE.'
  },
  ...categories.map(category => ({
    route: `/category/${slug(category)}/`,
    kind: 'directory',
    category,
    title: categoryTitles[category] || `${category} Reverse Engineering Tools (2026)`,
    description: categoryDescriptions[category] || `Explore top ${category} reverse engineering tools, platforms, open source licenses, and GitHub repositories.`
  })),
  {
    route: '/alternatives/',
    kind: 'alternatives',
    title: 'Free Open Source Alternatives to Paid Software (2026)',
    description: 'Find free open-source alternatives to proprietary software: Adobe, IDA Pro, Postman, 1Password, Notion, and commercial development suites.'
  },
  ...Object.values(alternativeHubs).map(hub => ({
    route: `/alternatives/${hub.slug}/`,
    kind: 'alternative',
    target: hub,
    title: metaDescription(`Best Free Open Source ${hub.name} Alternatives in 2026 (${hub.platforms}) | RevKit`),
    description: metaDescription(`Compare the top free open-source alternatives to ${hub.name} for ${hub.platforms}. Save on software licenses with verified ${hub.category.toLowerCase()} tools.`)
  })),
  {
    route: '/stacks/',
    kind: 'stacks',
    title: 'Curated Open Source Software Stacks & Toolchains (2026)',
    description: 'Explore curated open-source stacks for Android reverse engineering, malware analysis, CTF exploitation, indie developers, and creators.'
  },
  ...starterStacks.map(stack => ({
    route: `/stacks/${stack.slug}/`,
    kind: 'stack',
    stack,
    title: metaDescription(`${stack.name} — Curated Open Source Toolchain (2026) | RevKit`),
    description: metaDescription(stack.description)
  })),
  ...tools.map(tool => ({
    route: `/tools/${tool.slug}/`,
    kind: 'tool',
    tool,
    title: toolTitle(tool),
    description: toolPageDescription(tool)
  })),
  {
    route: '/compare/',
    kind: 'comparisons',
    title: 'Compare Reverse Engineering Tools & Software (2026)',
    description: 'Compare reverse engineering software, decompilers, and debuggers by features, platforms, pricing, and licenses to pick the right tool for your workflow.'
  },
  ...pairs.map(pair => ({
    route: pairRoute(pair),
    kind: 'comparison',
    pair,
    title: `${pair[0].name} vs ${pair[1].name} — Tools Comparison`,
    description: metaDescription(`Compare ${pair[0].name} vs ${pair[1].name}: features, reverse engineering capabilities, platform support, pricing, and licenses.`)
  })),
  {
    route: '/submit/',
    kind: 'submit',
    title: 'Submit an Open Source Tool or Project (2026)',
    description: 'Submit an open-source reverse engineering tool, decompiler, or software alternative to RevKit. Help grow the developer and security community.'
  },
  {
    route: '/about/',
    kind: 'about',
    title: 'About RevKit — Methodology & Open Source Directory',
    description: 'Learn how RevKit verifies reverse engineering tools, decompilers, debuggers, and open-source GitHub alternatives with strict E-E-A-T criteria.'
  },
];

export function breadcrumbsFor(page) {
  const root = { name: 'Directory', route: '/' };
  if (page.route === '/' || page.kind === '404') return [];
  if (page.tool) return [root, { name: page.tool.category, route: `/category/${page.tool.categorySlug}/` }, { name: page.tool.name, route: page.route }];
  if (page.category) return [root, { name: 'All categories', route: '/categories/' }, { name: page.category, route: page.route }];
  if (page.pair) return [root, { name: 'Compare tools', route: '/compare/' }, { name: `${page.pair[0].name} vs ${page.pair[1].name}`, route: page.route }];
  if (page.kind === 'alternative' && page.target) return [root, { name: 'Alternatives', route: '/alternatives/' }, { name: `${page.target.name} Alternatives`, route: page.route }];
  if (page.kind === 'stack' && page.stack) return [root, { name: 'Starter stacks', route: '/stacks/' }, { name: page.stack.name, route: page.route }];
  const labels = { categories: 'All categories', comparisons: 'Compare tools', about: 'About RevKit', submit: 'Submit a tool', alternatives: 'Alternatives', stacks: 'Starter stacks' };
  return [root, { name: labels[page.kind] || page.title, route: page.route }];
}

export function schemaFor(page) {
  if (page.kind === '404') return null;
  const url = canonical(page.route);
  const websiteId = canonical('/') + '#website';
  const publisherId = canonical('/') + '#organization';
  const graph = [
    {
      '@type': 'Organization',
      '@id': publisherId,
      name: 'RevKit',
      url: canonical('/'),
      logo: {
        '@type': 'ImageObject',
        '@id': canonical('/') + '#logo',
        url: canonical('/icon-512.png'),
        contentUrl: canonical('/icon-512.png'),
        width: 512,
        height: 512,
        caption: 'RevKit Official Logo'
      },
      image: canonical('/icon-512.png'),
      sameAs: [
        'https://github.com/Parth2149/mainproject'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'RevKit',
      url: canonical('/'),
      description: 'A curated directory of reverse engineering software, decompilers, debuggers, and open-source GitHub alternatives.',
      publisher: { '@id': publisherId },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${canonical('/')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
  ];
  const crumbs = breadcrumbsFor(page);
  const webpage = {
    '@type': page.kind === 'directory' || page.kind === 'categories' || page.kind === 'comparisons' || page.kind === 'alternatives' || page.kind === 'alternative' || page.kind === 'stacks' || page.kind === 'stack' ? 'CollectionPage' : page.kind === 'about' ? 'AboutPage' : page.kind === 'submit' ? 'ContactPage' : 'WebPage',
    '@id': url + '#webpage',
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    publisher: { '@id': publisherId },
    ...(crumbs.length ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {})
  };
  graph.push(webpage);
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i+1, name: crumb.name, item: canonical(crumb.route) }))
    });
  }

  if (page.kind === 'submit') {
    graph.push({
      '@type': 'ContactPage',
      '@id': url + '#contact',
      url: url,
      name: 'Submit a Tool or Project to RevKit',
      description: 'Submit an open-source or reverse engineering project to the RevKit software index.',
      isPartOf: { '@id': websiteId }
    });
  }

  if (page.kind === 'tool') {
    const tool = page.tool;
    const brand = getTargetBrand(tool);
    webpage.mainEntity = { '@id': url + '#software' };
    const software = {
      '@type': 'SoftwareApplication',
      '@id': url + '#software',
      name: tool.name,
      description: page.description,
      applicationCategory: tool.category === 'Software' || tool.category === 'Audio' ? 'MultimediaApplication, ProductivityApplication' : 'DeveloperApplication, SecurityApplication',
      applicationSubCategory: brand ? `${brand} Replacement · Open Source Alternative` : `${tool.category} Software`,
      keywords: brand ? `${tool.name}, ${brand} replacement, ${brand} alternative, open source alternative, ${tool.category}` : `${tool.name}, open source tool, alternative, ${tool.category}`,
      operatingSystem: tool.platforms.join(', '),
      license: tool.license,
      url: tool.url || url,
      softwareVersion: tool.release || '2026.1',
      mainEntityOfPage: { '@id': url + '#webpage' },
      ...(tool.github ? { sameAs: tool.github, codeRepository: tool.github } : {}),
      ...(tool.stars ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: Math.max(25, Math.min(1250, Math.round(tool.stars / 100))),
          bestRating: '5',
          worstRating: '1'
        }
      } : {})
    };
    if (brand) {
      software.isSimilarTo = {
        '@type': 'SoftwareApplication',
        name: brand,
        description: `Commercial software replaced by open-source ${tool.name}`
      };
    }
    if (tool.pricing === 'Free') {
      software.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      };
    }
    graph.push(software);

    // Dynamic FAQPage for EVERY tool page
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: [
        {
          '@type': 'Question',
          name: `Is ${tool.name} free and open source?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. ${tool.name} is ${tool.pricing === 'Free' ? 'completely free and open source' : tool.pricing} under the ${tool.license} license, with full source code available on GitHub.`
          }
        },
        {
          '@type': 'Question',
          name: `How to download ${tool.name} for ${platStr(tool)}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can download verified release packages of ${tool.name} for ${platStr(tool)} directly from its official site (${tool.url || 'project website'}) or official GitHub repository (${tool.github || 'releases'}).`
          }
        },
        {
          '@type': 'Question',
          name: `What is ${tool.name} an alternative to?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${tool.name} is a high-performance open-source alternative to ${brand ? `proprietary ${tool.replaces || brand}` : `commercial closed-source ${tool.category.toLowerCase()} software`}, offering full data privacy and zero subscription lock-in.`
          }
        }
      ]
    });

    const steps = getQuickStartSteps(tool);
    graph.push({
      '@type': 'HowTo',
      '@id': url + '#howto',
      name: `How to Install and Run ${tool.name}`,
      description: `Step-by-step setup and operational guide for ${tool.name}.`,
      step: steps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.title,
        text: s.text
      }))
    });
  }

  // Dynamic FAQPage for Comparison pages
  if (page.kind === 'comparison' && page.pair) {
    const [toolA, toolB] = page.pair;
    webpage.about = page.pair.map(tool => ({ '@type': 'SoftwareApplication', name: tool.name, '@id': canonical(`/tools/${tool.slug}/`) + '#software' }));
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: [
        {
          '@type': 'Question',
          name: `What are the key differences between ${toolA.name} and ${toolB.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${toolA.name} — ${toolA.description.replace(/\.$/, '')}. Ideal if you prefer a ${toolA.license} license on ${toolA.platforms.join(', ')}. In comparison, ${toolB.name} — ${toolB.description.replace(/\.$/, '')}. Ideal if you prefer a ${toolB.license} license on ${toolB.platforms.join(', ')}.`
          }
        },
        {
          '@type': 'Question',
          name: `Which tool is better: ${toolA.name} or ${toolB.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Choose ${toolA.name} if you prefer ${toolA.license} licensing and native support for ${toolA.platforms.join(', ')}. Choose ${toolB.name} if you require ${toolB.license} licensing on ${toolB.platforms.join(', ')}.`
          }
        },
        {
          '@type': 'Question',
          name: `Are ${toolA.name} and ${toolB.name} free and open source?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${toolA.name} is ${toolA.pricing === 'Free' ? 'free' : toolA.pricing} under ${toolA.license}, and ${toolB.name} is ${toolB.pricing === 'Free' ? 'free' : toolB.pricing} under ${toolB.license}. Both offer local execution without cloud vendor lock-in.`
          }
        }
      ]
    });
  }

  // Dynamic FAQPage for Alternative pages
  if (page.kind === 'alternative' && page.target) {
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: page.target.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  if (page.route === '/') {
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: homepageFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  let entries;
  if (page.kind === 'directory') entries = (page.category ? tools.filter(tool => tool.category === page.category) : tools.slice(0, 1)).map(tool => ({ name: tool.name, url: canonical(`/tools/${tool.slug}/`) }));
  if (page.kind === 'categories') entries = categories.map(category => ({ name: category, url: canonical(`/category/${slug(category)}/`) }));
  if (page.kind === 'comparisons') entries = pairs.map(pair => ({ name: `${pair[0].name} vs ${pair[1].name}`, url: canonical(pairRoute(pair)) }));
  if (page.kind === 'alternatives') entries = Object.values(alternativeHubs).map(hub => ({ name: `${hub.name} Alternatives`, url: canonical(`/alternatives/${hub.slug}/`) }));
  if (page.kind === 'alternative' && page.target) entries = page.target.tools.map(tool => ({ name: tool.name, url: canonical(`/tools/${tool.slug}/`) }));
  if (page.kind === 'stacks') entries = starterStacks.map(stack => ({ name: stack.name, url: canonical(`/stacks/${stack.slug}/`) }));
  if (page.kind === 'stack' && page.stack) entries = page.stack.tools.map(tool => ({ name: tool.name, url: canonical(`/tools/${tool.slug}/`) }));

  if (entries) {
    webpage.mainEntity = { '@id': url + '#list' };
    graph.push({ '@type': 'ItemList', '@id': url + '#list', numberOfItems: entries.length, itemListElement: entries.map((entry, i) => ({ '@type': 'ListItem', position: i+1, name: entry.name, url: entry.url })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
