'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Printer, 
  Cpu, 
  Shield, 
  Database, 
  Globe, 
  Terminal, 
  Layers, 
  Award, 
  Clock, 
  BookOpen, 
  Flame, 
  Sparkles
} from 'lucide-react'

// Curriculum Data
const curriculumData = {
  highlights: [
    { text: "140 Training Hours across two semesters", icon: Clock },
    { text: "72 Instructor-Led Sessions with hands-on labs", icon: BookOpen },
    { text: "6 Industry-Oriented Capstone Projects", icon: Cpu },
    { text: "Real-world case studies & practical assessments", icon: Award },
    { text: "Skills in Linux, Web Dev, Networking, Cyber Security, Agentic AI & SQL", icon: Terminal }
  ],
  summaryTable: [
    { semester: "3rd Semester", subject: "Linux", hours: "30 Hrs", sessions: 15 },
    { semester: "3rd Semester", subject: "HTML, CSS, React JS", hours: "25 Hrs", sessions: 13 },
    { semester: "3rd Semester", subject: "Networking", hours: "15 Hrs", sessions: 8 },
    { semester: "4th Semester", subject: "Cyber Security", hours: "25 Hrs", sessions: 13 },
    { semester: "4th Semester", subject: "Agentic AI", hours: "25 Hrs", sessions: 13 },
    { semester: "4th Semester", subject: "SQL", hours: "20 Hrs", sessions: 10 },
  ],
  sem3: {
    title: "3rd Semester — Detailed Curriculum",
    meta: "70 Training Hours  |  36 Instructor-Led Sessions",
    subjects: [
      {
        name: "LINUX",
        hours: "30 HRS",
        sessions: "15 SESSIONS",
        icon: Terminal,
        topics: [
          { nr: 1, topic: "Linux Introduction", focus: "History, distributions, architecture & kernel basics" },
          { nr: 2, topic: "Filesystem & Navigation", focus: "Directory structure, file types, navigation commands" },
          { nr: 3, topic: "File Operations", focus: "Create, copy, move, delete, file permissions basics" },
          { nr: 4, topic: "Permissions & Ownership", focus: "chmod, chown, umask, users & groups" },
          { nr: 5, topic: "User & Group Management", focus: "useradd, usermod, passwd, /etc/passwd & /etc/shadow" },
          { nr: 6, topic: "Package Management", focus: "apt/yum/dnf, installing & managing software" },
          { nr: 7, topic: "Text Processing", focus: "grep, sed, awk, cut, sort, pipes & redirection" },
          { nr: 8, topic: "Process Management", focus: "ps, top, kill, jobs, foreground/background processes" },
          { nr: 9, topic: "Service Management", focus: "systemctl, systemd units, enabling/disabling services" },
          { nr: 10, topic: "Networking Commands", focus: "ifconfig/ip, netstat, ping, curl, wget, ssh" },
          { nr: 11, topic: "Bash Scripting Basics", focus: "Variables, conditionals, loops, functions" },
          { nr: 12, topic: "Advanced Bash Scripting", focus: "Script arguments, exit codes, error handling" },
          { nr: 13, topic: "Cron Jobs & Automation", focus: "crontab, scheduling tasks, log rotation" },
          { nr: 14, topic: "Shell Utilities & Monitoring", focus: "df, du, free, uptime, system health checks" },
          { nr: 15, topic: "Capstone Lab", focus: "Build & test the Server Health Monitoring Script" },
        ]
      },
      {
        name: "HTML, CSS & REACT JS",
        hours: "25 HRS",
        sessions: "13 SESSIONS",
        icon: Layers,
        topics: [
          { nr: 1, topic: "HTML Fundamentals", focus: "Semantic tags, forms, tables, accessibility basics" },
          { nr: 2, topic: "CSS Fundamentals", focus: "Selectors, box model, positioning, units" },
          { nr: 3, topic: "Responsive Layouts", focus: "Flexbox, CSS Grid, media queries" },
          { nr: 4, topic: "Bootstrap Framework", focus: "Grid system, components, utility classes" },
          { nr: 5, topic: "JavaScript ES6 Basics", focus: "let/const, arrow functions, template literals" },
          { nr: 6, topic: "JavaScript ES6 Advanced", focus: "Destructuring, spread/rest, modules, promises" },
          { nr: 7, topic: "DOM & Events", focus: "DOM manipulation, event handling, fetch API" },
          { nr: 8, topic: "React Introduction", focus: "JSX, project setup, component structure" },
          { nr: 9, topic: "Components & Props", focus: "Functional components, props, composition" },
          { nr: 10, topic: "State & Hooks", focus: "useState, useEffect, controlled forms" },
          { nr: 11, topic: "React Router", focus: "Client-side routing, nested routes, navigation" },
          { nr: 12, topic: "API Integration", focus: "Axios/fetch, async data, loading & error states" },
          { nr: 13, topic: "Capstone Lab", focus: "Build & deploy Portfolio / Product Landing Page" },
        ]
      },
      {
        name: "NETWORKING",
        hours: "15 HRS",
        sessions: "8 SESSIONS",
        icon: Globe,
        topics: [
          { nr: 1, topic: "Networking Fundamentals", focus: "OSI model, TCP/IP model, network types" },
          { nr: 2, topic: "IP Addressing", focus: "IPv4/IPv6, classes, public vs private IPs" },
          { nr: 3, topic: "Subnetting", focus: "Subnet masks, CIDR, VLSM calculations" },
          { nr: 4, topic: "Routing & Switching", focus: "Routers, switches, routing tables, VLANs" },
          { nr: 5, topic: "DNS & DHCP", focus: "Domain resolution, DHCP lease process" },
          { nr: 6, topic: "HTTP/HTTPS & Protocols", focus: "Web protocols, ports, SSL/TLS basics" },
          { nr: 7, topic: "Network Security Basics", focus: "Firewalls, NAT, common threats" },
          { nr: 8, topic: "Capstone Lab", focus: "Cisco Packet Tracer — Small Office Network Simulation" },
        ]
      }
    ],
    projects: [
      { subject: "Linux", title: "Automated Server Health Monitoring Script (Bash)" },
      { subject: "React", title: "Personal Portfolio / Product Landing Page" },
      { subject: "Networking", title: "Small Office Network Simulation (Cisco Packet Tracer)" }
    ],
    assessment: "MCQ + Practical / Lab-Based Evaluation"
  },
  sem4: {
    title: "4th Semester — Detailed Curriculum",
    meta: "70 Training Hours  |  36 Instructor-Led Sessions",
    subjects: [
      {
        name: "CYBER SECURITY",
        hours: "25 HRS",
        sessions: "13 SESSIONS",
        icon: Shield,
        topics: [
          { nr: 1, topic: "Cyber Security Fundamentals", focus: "CIA triad, threat landscape, security domains" },
          { nr: 2, topic: "Cryptography Basics", focus: "Symmetric/asymmetric encryption, hashing" },
          { nr: 3, topic: "Cryptography Applications", focus: "Digital signatures, certificates, PKI" },
          { nr: 4, topic: "Firewalls & Network Defense", focus: "Firewall types, rules, packet filtering" },
          { nr: 5, topic: "IDS/IPS Systems", focus: "Detection vs prevention, signature/anomaly based" },
          { nr: 6, topic: "Malware Analysis Basics", focus: "Types of malware, static vs dynamic analysis" },
          { nr: 7, topic: "OWASP Top 10 — Part 1", focus: "Injection, broken authentication, sensitive data" },
          { nr: 8, topic: "OWASP Top 10 — Part 2", focus: "XXE, broken access control, misconfiguration" },
          { nr: 9, topic: "SQL Injection", focus: "Attack techniques, detection, prevention" },
          { nr: 10, topic: "Cross-Site Scripting (XSS)", focus: "Reflected/stored/DOM XSS, mitigation" },
          { nr: 11, topic: "Ethical Hacking Basics", focus: "Reconnaissance, scanning, exploitation phases" },
          { nr: 12, topic: "System Hardening & IR", focus: "Hardening checklists, IR lifecycle" },
          { nr: 13, topic: "Capstone Lab", focus: "Vulnerability Assessment & Security Report" },
        ]
      },
      {
        name: "AGENTIC AI",
        hours: "25 HRS",
        sessions: "13 SESSIONS",
        icon: Sparkles,
        topics: [
          { nr: 1, topic: "Intro to Agentic AI", focus: "What are AI agents, use cases, ecosystem overview" },
          { nr: 2, topic: "Prompt Engineering Basics", focus: "Zero/few-shot prompting, prompt structuring" },
          { nr: 3, topic: "Advanced Prompting", focus: "Chain-of-thought, system prompts, prompt chaining" },
          { nr: 4, topic: "Tool / Function Calling", focus: "Defining tools, structured outputs, tool schemas" },
          { nr: 5, topic: "LangChain Fundamentals", focus: "Chains, prompts, LLM wrappers" },
          { nr: 6, topic: "LangChain Memory", focus: "Conversation memory, context management" },
          { nr: 7, topic: "ReAct Framework", focus: "Reasoning + acting loop, agent decision-making" },
          { nr: 8, topic: "RAG Fundamentals", focus: "Embeddings, vector stores, retrieval pipelines" },
          { nr: 9, topic: "RAG in Practice", focus: "Chunking strategies, building a RAG pipeline" },
          { nr: 10, topic: "Multi-Agent Systems", focus: "Agent collaboration, orchestration patterns" },
          { nr: 11, topic: "CrewAI / AutoGen", focus: "Building multi-agent workflows with frameworks" },
          { nr: 12, topic: "Guardrails & Safety", focus: "Output validation, guardrails, responsible AI use" },
          { nr: 13, topic: "Capstone Lab", focus: "Build a Custom AI Agent using Tool Calling & RAG" },
        ]
      },
      {
        name: "SQL",
        hours: "20 HRS",
        sessions: "10 SESSIONS",
        icon: Database,
        topics: [
          { nr: 1, topic: "SQL Fundamentals", focus: "RDBMS concepts, SELECT statements, data types" },
          { nr: 2, topic: "Filtering & Sorting", focus: "WHERE, ORDER BY, LIMIT, logical operators" },
          { nr: 3, topic: "Aggregate Functions", focus: "COUNT, SUM, AVG, GROUP BY, HAVING" },
          { nr: 4, topic: "Joins — Part 1", focus: "INNER JOIN, LEFT/RIGHT JOIN" },
          { nr: 5, topic: "Joins — Part 2", focus: "FULL JOIN, self joins, multi-table joins" },
          { nr: 6, topic: "Subqueries", focus: "Nested queries, correlated subqueries" },
          { nr: 7, topic: "DDL Commands", focus: "CREATE, ALTER, DROP, TRUNCATE" },
          { nr: 8, topic: "DML Commands", focus: "INSERT, UPDATE, DELETE, transactions" },
          { nr: 9, topic: "Normalization & Keys", focus: "1NF-3NF, primary/foreign keys, constraints" },
          { nr: 10, topic: "Capstone Lab", focus: "Indexes, views, query optimization & Mini DBMS project" },
        ]
      }
    ],
    projects: [
      { subject: "Cyber Security", title: "Vulnerability Assessment & Security Report" },
      { subject: "Agentic AI", title: "Custom AI Agent using Tool Calling & RAG" },
      { subject: "SQL", title: "Mini Database Management System" }
    ],
    assessment: "MCQ + Practical + Project Presentation"
  }
}

export default function BrochurePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans bg-zinc-50 text-zinc-900">
      
      {/* Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            position: relative !important;
          }
          .print-page:last-child {
            page-break-after: avoid !important;
          }
          .print-text-dark {
            color: #111827 !important;
          }
          .print-text-muted {
            color: #4b5563 !important;
          }
          .print-bg-light {
            background-color: #f9fafb !important;
          }
          .print-border-red {
            border-color: #dc2626 !important;
          }
          .print-text-red {
            color: #dc2626 !important;
          }
          .print-accent-bg {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%) !important;
            border: 1px solid #fca5a5 !important;
            color: #991b1b !important;
          }
          .print-grid-border {
            border-color: #e5e7eb !important;
          }
        }
      `}</style>

      {/* Navigation / Toolbar */}
      <header className="no-print sticky top-0 z-50 backdrop-blur-md border-b bg-opacity-80 transition-colors border-zinc-200 bg-white/80 text-zinc-800 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold tracking-wider font-display text-red-600">CODEIGNITE</h1>
            <p className="text-[10px] text-zinc-500">Curriculum Brochure</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Print Button */}
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </header>

      {/* Screen container */}
      <main className="no-print max-w-7xl mx-auto py-8 px-4 flex flex-col items-center gap-8">
        <div className="text-center max-w-xl">
          <span className="px-3 py-1 text-[10px] font-bold text-red-600 border border-red-200 bg-red-50 rounded-full uppercase tracking-widest">
            Print Preview Mode
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 text-zinc-900">
            CodeIgnite Training Brochure
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Below is the print layout. Clicking &ldquo;Print / Save PDF&rdquo; will automatically prompt you to save a clean, 3-page A4 document. Set margins to <strong>None</strong> and enable <strong>Background Graphics</strong> in your browser print settings for best results.
          </p>
        </div>

        {/* Outer Brochure Pages Wrapper */}
        <div className="flex flex-col gap-12 w-full items-center pb-24">
          
          {/* PAGE 1: COVER & OVERVIEW */}
          <div className="print-page w-full max-w-[210mm] min-h-[297mm] aspect-[1/1.414] border border-zinc-200 shadow-2xl relative overflow-hidden flex flex-col justify-between p-12 bg-white text-zinc-900">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-700 via-red-500 to-red-800" />
            
            {/* Page Header branding */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-zinc-500">
                CODEIGNITE
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[9px] font-mono text-red-600 tracking-wider font-bold">OFFICIAL_CURRICULUM</span>
              </div>
            </div>

            {/* Title Section */}
            <div className="my-auto space-y-6">
              <div className="space-y-1">
                <span className="text-red-600 font-mono tracking-widest text-xs font-bold block uppercase">
                  B.Tech Engineering — 3rd & 4th Semester
                </span>
                <div className="relative inline-block">
                  <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 font-display">
                    CODEIGNITE
                  </h1>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide mt-2 text-zinc-800">
                  Multi-Tech Training Program
                </h2>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-red-200 via-red-500/20 to-transparent" />
              
              <p className="text-sm max-w-lg leading-relaxed text-zinc-600">
                An intensive, hands-on, session-wise curriculum equipping students with advanced skills in System Administration, Modern Web Interfaces, Networking Protocols, Cryptographic Defenses, Agentic Workflows, and Database Design.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                // Program Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curriculumData.highlights.map((hl, idx) => {
                  const Icon = hl.icon
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:border-red-200 transition-all">
                      <div className="p-2 rounded bg-red-50 text-red-600 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-medium leading-normal text-zinc-700">
                        {hl.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary Table */}
            <div className="space-y-3 mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                // Curriculum Overview
              </h3>
              <div className="border border-zinc-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="p-2 font-bold uppercase tracking-wider text-[10px]">Semester</th>
                      <th className="p-2 font-bold uppercase tracking-wider text-[10px]">Subject</th>
                      <th className="p-2 text-right font-bold uppercase tracking-wider text-[10px]">Hours</th>
                      <th className="p-2 text-right font-bold uppercase tracking-wider text-[10px]">Sessions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 print-grid-border">
                    {curriculumData.summaryTable.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-red-50/20 transition-colors ${
                          idx < 3 ? 'bg-red-50/10' : 'bg-zinc-50/20'
                        }`}
                      >
                        <td className="p-2 font-medium text-[11px]">{row.semester}</td>
                        <td className="p-2 font-bold text-[11px] text-red-600">{row.subject}</td>
                        <td className="p-2 text-right text-[11px] font-mono">{row.hours}</td>
                        <td className="p-2 text-right text-[11px] font-mono font-bold">{row.sessions}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="font-bold bg-red-50 border-t border-zinc-300">
                      <td className="p-2 text-[11px] uppercase tracking-wider">TOTAL</td>
                      <td className="p-2 text-[11px]">6 Subjects</td>
                      <td className="p-2 text-right text-[11px] font-mono">140 Hrs</td>
                      <td className="p-2 text-right text-[11px] font-mono text-red-600">72</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cover Footer */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-dashed border-zinc-200 print-grid-border text-[9px] text-zinc-500">
              <span>Ignite your tech learning path with expert mentors</span>
              <span>Page 1 of 3</span>
            </div>
          </div>

          {/* PAGE 2: 3rd SEMESTER DETAILED CURRICULUM */}
          <div className="print-page w-full max-w-[210mm] min-h-[297mm] aspect-[1/1.414] border border-zinc-200 shadow-2xl relative overflow-hidden flex flex-col justify-between p-12 bg-white text-zinc-900">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />
            
            {/* Page Header */}
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200 print-grid-border">
              <div>
                <h2 className="text-base font-black tracking-tight text-red-600 uppercase font-display">
                  3rd Semester — Detailed Curriculum
                </h2>
                <p className="text-[10px] text-zinc-500 font-mono">70 Training Hours | 36 Instructor-Led Sessions</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 font-mono">CODEIGNITE</span>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-3 gap-4 my-auto items-stretch">
              
              {/* Linux Subject */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                  <Terminal className="w-3.5 h-3.5 text-red-600" />
                  <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">Linux</h3>
                </div>
                <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                  <span>30 Hours</span>
                  <span className="font-bold">15 Sessions</span>
                </div>
                
                {/* Linux Sessions List */}
                <div className="space-y-1.5 flex-1">
                  {curriculumData.sem3.subjects[0].topics.map((t) => (
                    <div key={t.nr} className="text-[9px] leading-tight">
                      <div className="flex items-start gap-1">
                        <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                        <div>
                          <strong className="text-zinc-800">{t.topic}</strong>
                          <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web Dev Subject */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                  <Layers className="w-3.5 h-3.5 text-red-600" />
                  <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">Web Dev</h3>
                </div>
                <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                  <span>25 Hours</span>
                  <span className="font-bold">13 Sessions</span>
                </div>

                {/* HTML/CSS/React Sessions List */}
                <div className="space-y-1.5 flex-1">
                  {curriculumData.sem3.subjects[1].topics.map((t) => (
                    <div key={t.nr} className="text-[9px] leading-tight">
                      <div className="flex items-start gap-1">
                        <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                        <div>
                          <strong className="text-zinc-800">{t.topic}</strong>
                          <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Networking Subject */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                    <Globe className="w-3.5 h-3.5 text-red-600" />
                    <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">Networking</h3>
                  </div>
                  <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                    <span>15 Hours</span>
                    <span className="font-bold">8 Sessions</span>
                  </div>

                  {/* Networking Sessions List */}
                  <div className="space-y-2">
                    {curriculumData.sem3.subjects[2].topics.map((t) => (
                      <div key={t.nr} className="text-[9px] leading-tight">
                        <div className="flex items-start gap-1">
                          <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                          <div>
                            <strong className="text-zinc-800">{t.topic}</strong>
                            <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Callout Box */}
                <div className="p-2.5 rounded border border-red-200 bg-red-50/50 text-red-900 mt-4">
                  <h4 className="text-[9px] font-bold uppercase tracking-wider text-red-600 font-mono mb-1">
                    ★ Semester 3 Capstone Labs
                  </h4>
                  <ul className="list-disc pl-3 text-[8px] space-y-1 font-medium text-zinc-800">
                    {curriculumData.sem3.projects.map((proj, idx) => (
                      <li key={idx}>
                        <span className="text-red-600 font-bold">{proj.subject}:</span> {proj.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Assessment Box */}
            <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[9px] font-bold">
              <span className="uppercase text-red-600 tracking-wider font-mono">// 3rd Semester Assessment Plan</span>
              <span className="text-zinc-700">{curriculumData.sem3.assessment}</span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-200 print-grid-border text-[9px] text-zinc-500">
              <span>Practical Labs & Cisco simulations included</span>
              <span>Page 2 of 3</span>
            </div>
          </div>

          {/* PAGE 3: 4th SEMESTER DETAILED CURRICULUM */}
          <div className="print-page w-full max-w-[210mm] min-h-[297mm] aspect-[1/1.414] border border-zinc-200 shadow-2xl relative overflow-hidden flex flex-col justify-between p-12 bg-white text-zinc-900">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />
            
            {/* Page Header */}
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200 print-grid-border">
              <div>
                <h2 className="text-base font-black tracking-tight text-red-600 uppercase font-display">
                  4th Semester — Detailed Curriculum
                </h2>
                <p className="text-[10px] text-zinc-500 font-mono">70 Training Hours | 36 Instructor-Led Sessions</p>
              </div>
              <span className="text-[9px] font-bold text-zinc-400 font-mono">CODEIGNITE</span>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-3 gap-4 my-auto items-stretch">
              
              {/* Cyber Security Subject */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                  <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">Cyber Security</h3>
                </div>
                <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                  <span>25 Hours</span>
                  <span className="font-bold">13 Sessions</span>
                </div>
                
                {/* Cyber Security Sessions */}
                <div className="space-y-1.5 flex-1">
                  {curriculumData.sem4.subjects[0].topics.map((t) => (
                    <div key={t.nr} className="text-[9px] leading-tight">
                      <div className="flex items-start gap-1">
                        <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                        <div>
                          <strong className="text-zinc-800">{t.topic}</strong>
                          <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agentic AI Subject */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">Agentic AI</h3>
                </div>
                <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                  <span>25 Hours</span>
                  <span className="font-bold">13 Sessions</span>
                </div>

                {/* Agentic AI Sessions */}
                <div className="space-y-1.5 flex-1">
                  {curriculumData.sem4.subjects[1].topics.map((t) => (
                    <div key={t.nr} className="text-[9px] leading-tight">
                      <div className="flex items-start gap-1">
                        <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                        <div>
                          <strong className="text-zinc-800">{t.topic}</strong>
                          <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SQL Subject */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-zinc-200 print-border-red">
                    <Database className="w-3.5 h-3.5 text-red-600" />
                    <h3 className="text-xs font-black tracking-wider text-red-600 uppercase">SQL Database</h3>
                  </div>
                  <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mb-2">
                    <span>20 Hours</span>
                    <span className="font-bold">10 Sessions</span>
                  </div>

                  {/* SQL Sessions */}
                  <div className="space-y-2">
                    {curriculumData.sem4.subjects[2].topics.map((t) => (
                      <div key={t.nr} className="text-[9px] leading-tight">
                        <div className="flex items-start gap-1">
                          <span className="font-mono text-red-600 font-bold w-3 shrink-0">{t.nr}.</span>
                          <div>
                            <strong className="text-zinc-800">{t.topic}</strong>
                            <span className="text-[8px] text-zinc-500 block font-normal leading-normal">{t.focus}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Callout Box */}
                <div className="p-2.5 rounded border border-red-200 bg-red-50/50 text-red-900 mt-4">
                  <h4 className="text-[9px] font-bold uppercase tracking-wider text-red-600 font-mono mb-1">
                    ★ Semester 4 Capstone Labs
                  </h4>
                  <ul className="list-disc pl-3 text-[8px] space-y-1 font-medium text-zinc-800">
                    {curriculumData.sem4.projects.map((proj, idx) => (
                      <li key={idx}>
                        <span className="text-red-600 font-bold">{proj.subject}:</span> {proj.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Assessment & Footer Logo Box */}
            <div className="space-y-3">
              {/* Assessment */}
              <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-between text-[9px] font-bold">
                <span className="uppercase text-red-600 tracking-wider font-mono">// 4th Semester Assessment Plan</span>
                <span className="text-zinc-700">{curriculumData.sem4.assessment}</span>
              </div>

              {/* Branding Block */}
              <div className="p-3 rounded-lg border border-red-200 bg-red-50/30 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-600 font-mono">
                    CodeIgnite Multi-Tech Training Program
                  </h4>
                  <p className="text-[8px] text-zinc-500 leading-normal">
                    Detailed Session-wise Curriculum with Projects & Assessments.
                  </p>
                </div>
                
                {/* Decorative program badge */}
                <div className="flex items-center gap-1 bg-red-600/10 border border-red-500/20 px-2 py-0.5 rounded text-[8px] font-bold text-red-600 font-mono">
                  <Flame className="w-2.5 h-2.5" />
                  <span>CURRICULUM_2026</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-200 print-grid-border text-[9px] text-zinc-500">
              <span>Agentic workflows & Cyber security reports hands-on labs</span>
              <span>Page 3 of 3</span>
            </div>
          </div>

        </div>
      </main>

      {/* Screen Page Indicator/Bottom Action (Only visible on screen) */}
      <footer className="no-print border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>CODEIGNITE Multi-Tech Training Program Brochure — Red Theme Edition</p>
          <div className="flex justify-center gap-4 text-[11px] text-zinc-400">
            <span className="hover:text-red-600 transition-colors">3 Pages (A4)</span>
            <span>•</span>
            <span className="hover:text-red-600 transition-colors">6 Capstone Projects</span>
            <span>•</span>
            <span className="hover:text-red-600 transition-colors">140 Training Hours</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
