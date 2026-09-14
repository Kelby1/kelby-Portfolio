import { useState } from "react";

const services = [
  {
    number: "01",
    title: "On-site IT Support",
    description:
      "Troubleshooting for computers, software, workstations, and day-to-day technical issues for small teams.",
  },
  {
    number: "02",
    title: "Networking",
    description:
      "Basic LAN, Wi-Fi, router, switch, and connectivity troubleshooting with a practical support-first approach.",
  },
  {
    number: "03",
    title: "Printers & Devices",
    description:
      "Printer, copier, scanner, connectivity, preventive maintenance, and device support.",
  },
  {
    number: "04",
    title: "Web & Automation",
    description:
      "Simple business websites, React interfaces, PHP/Laravel work, SQL, and lightweight automation.",
  },
];

const projects = [
  {
    title: "SCP Site-19 Command System",
    type: "React · Supabase · Operations UI",
    description:
      "An enterprise-style SCP Foundation command system with authentication, role-based access, secured CRUD workflows, personnel management, and a terminal-inspired interface.",
    href: "https://github.com/Kelby1/scp-site19-command-system",
    status: "ACTIVE BUILD",
  },
  {
    title: "Tetris in Python",
    type: "Python · Game Logic",
    description:
      "A Python Tetris project built to strengthen reasoning, object-oriented programming, board logic, collision handling, scoring, and game-state management.",
    href: "https://github.com/Kelby1/Tetris-Python",
    status: "LEARNING PROJECT",
  },
  {
    title: "WebFinal",
    type: "HTML · CSS · Front-end",
    description:
      "An earlier web development project that shows the foundation of my front-end work and how my approach to interface building has evolved over time.",
    href: "https://github.com/Kelby1/WebFinal",
    status: "ARCHIVE",
  },
];

const experience = [
  {
    period: "Sep 2026 — Present",
    role: "Key Operator Technician",
    company: "Testech Inc. · Canon Client",
    bullets: [
      "Provide first-level technical support for copy-machine environments.",
      "Perform preventive maintenance and monitor service-ticket records.",
      "Track meter readings, assets, reports, and consumable availability.",
      "Support printer systems and assist with networking-related technical work.",
    ],
  },
  {
    period: "Oct 2025 — Feb 2026",
    role: "Technical Operations & Junior Developer",
    company: "Inspire Solutions",
    bullets: [
      "Supported production operations and resolved client-reported system issues.",
      "Built automation scripts to reduce manual work during high-volume operations.",
      "Worked with PHP Laravel, React.js, SQL, Railway deployments, and system logs.",
    ],
  },
  {
    period: "Jun 2025 — Oct 2025",
    role: "IT Staff",
    company: "LTO Baguio Registration",
    bullets: [
      "Maintained inventory-management records and database updates.",
      "Created and maintained Excel-based data records.",
      "Supported clients as a frontliner and evaluator.",
    ],
  },
  {
    period: "Aug 2024 — Feb 2025",
    role: "IT Site Support",
    company: "Stradcom IT Solutions",
    bullets: [
      "Installed and configured Fortinet equipment, Cisco routers, and servers.",
      "Supported network security and system integrity for LTO operations.",
      "Updated systems to improve stability, reliability, and performance.",
    ],
  },
];

const skills = [
  "IT Support",
  "Networking",
  "Cisco",
  "Fortinet",
  "Hardware & Software",
  "Printer Systems",
  "PHP Laravel",
  "React.js",
  "SQL",
  "Python",
  "Microsoft 365",
  "Technical Operations",
];

const networkNodes = [
  { id: "support", label: "Support", short: "SUP", x: 17, y: 24 },
  { id: "network", label: "Network", short: "NET", x: 72, y: 20 },
  { id: "systems", label: "Systems", short: "SYS", x: 48, y: 51 },
  { id: "print", label: "Printer", short: "PRN", x: 20, y: 76 },
  { id: "web", label: "Web", short: "WEB", x: 78, y: 76 },
];

const nodeDetails = {
  support: {
    title: "Frontline support",
    detail: "User issues, workstation troubleshooting, incident response, and practical fixes.",
    command: "diagnose --user-impact first",
  },
  network: {
    title: "Network layer",
    detail: "LAN, Wi-Fi, Cisco, Fortinet, connectivity checks, and device communication.",
    command: "trace --path lan_to_service",
  },
  systems: {
    title: "Systems core",
    detail: "Operations, stability, database work, deployments, logs, and system reliability.",
    command: "status --systems all",
  },
  print: {
    title: "Printer systems",
    detail: "Copier, printer, scanner, preventive maintenance, and network-print troubleshooting.",
    command: "inspect --device printer_stack",
  },
  web: {
    title: "Web solutions",
    detail: "React, Laravel, SQL, and simple business websites that solve practical needs.",
    command: "deploy --solution business_web",
  },
};

const networkLinks = [
  ["support", "systems"],
  ["network", "systems"],
  ["print", "systems"],
  ["web", "systems"],
  ["support", "network"],
  ["print", "web"],
];

function NetworkConsole() {
  const [activeNode, setActiveNode] = useState("systems");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const active = nodeDetails[activeNode];

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: y * -8 });
  };

  return (
    <aside
      className="network-console"
      aria-label="Interactive technical map"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        "--tilt-x": `${tilt.y}deg`,
        "--tilt-y": `${tilt.x}deg`,
      }}
    >
      <div className="console-frame">
        <div className="console-topbar">
          <div className="console-title">
            <span className="live-indicator" />
            TECH MAP / LIVE
          </div>
          <div className="console-code">KD-NODE-01</div>
        </div>

        <div className="network-stage">
          <div className="grid-overlay" />
          <div className="radar-ring ring-one" />
          <div className="radar-ring ring-two" />
          <div className="radar-ring ring-three" />

          <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {networkLinks.map(([from, to]) => {
              const a = networkNodes.find((node) => node.id === from);
              const b = networkNodes.find((node) => node.id === to);
              const isHot = activeNode === from || activeNode === to;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={isHot ? "link-line active" : "link-line"}
                />
              );
            })}
          </svg>

          {networkNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={activeNode === node.id ? "network-node active" : "network-node"}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActiveNode(node.id)}
              aria-label={`Show ${node.label} details`}
            >
              <span className="node-pulse" />
              <span className="node-core">{node.short}</span>
              <span className="node-label">{node.label}</span>
            </button>
          ))}

          <div className="packet packet-a" />
          <div className="packet packet-b" />
        </div>

        <div className="console-readout" aria-live="polite">
          <div className="readout-head">
            <span>{active.title}</span>
            <span className="readout-status">ONLINE</span>
          </div>
          <p>{active.detail}</p>
          <div className="command-line">
            <span className="prompt">kelby@field:~$</span>
            <span>{active.command}</span>
            <span className="cursor" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="Kelby Dati home">
            <span className="brand-mark">KD</span>
            <span>Kelby Dati</span>
          </a>

          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="kicker-code">IT / NET / SYS / WEB</span>
              <span className="kicker-location">Baguio City</span>
            </div>

            <p className="eyebrow">Independent IT Support</p>
            <h1>
              I keep small-business
              <span> technology working.</span>
            </h1>
            <p className="hero-text">
              IT support technician with hands-on experience across networking,
              systems, technical operations, printer support, and web development.
              I focus on practical fixes, clear communication, and reliable systems.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#experience">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a className="button secondary" href="#contact">
                Start a conversation
              </a>
            </div>

            <div className="availability">
              <span className="status-dot" />
              Available for freelance IT support and small-business projects
            </div>
          </div>

          <NetworkConsole />
        </section>

        <div className="signal-strip" aria-hidden="true">
          <div className="signal-track">
            <span>DIAGNOSE</span><i />
            <span>SUPPORT</span><i />
            <span>NETWORK</span><i />
            <span>MAINTAIN</span><i />
            <span>BUILD</span><i />
            <span>DOCUMENT</span><i />
            <span>DIAGNOSE</span><i />
            <span>SUPPORT</span><i />
            <span>NETWORK</span><i />
            <span>MAINTAIN</span><i />
          </div>
        </div>

        <section className="section container" id="services">
          <div className="section-heading">
            <p className="eyebrow">What I can help with</p>
            <h2>Practical technical support for real business problems.</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="card-number">{service.number}</span>
                  <span className="card-arrow">↗</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted-section" id="experience">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Experience</p>
              <h2>Support, operations, networking, and development.</h2>
            </div>

            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.period}`}>
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-content">
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="skills">
          <div className="skills-layout">
            <div className="section-heading compact">
              <p className="eyebrow">Technical toolkit</p>
              <h2>Built across support and software.</h2>
              <p className="section-copy">
                My background crosses frontline IT support, infrastructure,
                troubleshooting, systems work, and development.
              </p>
            </div>

            <div className="skill-cloud">
              {skills.map((skill) => (
                <span className="skill-pill" key={skill}>
                  <span className="skill-dot" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="container trust-grid">
            <div>
              <p className="eyebrow">How I work</p>
              <h2>Transparent support, especially on a first visit.</h2>
            </div>
            <div className="trust-list">
              <div>
                <strong>Permission first.</strong>
                <p>No configuration changes without client approval.</p>
              </div>
              <div>
                <strong>No password retention.</strong>
                <p>Clients can enter credentials themselves whenever possible.</p>
              </div>
              <div>
                <strong>Clear scope and pricing.</strong>
                <p>Paid work is explained and approved before it begins.</p>
              </div>
              <div>
                <strong>Documented findings.</strong>
                <p>Issues, actions, and recommendations are summarized clearly.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section container education-section">
          <div>
            <p className="eyebrow">Education</p>
            <h2>University of Baguio</h2>
            <p>Bachelor of Science in Information Technology · 2024</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-card">
            <div>
              <p className="eyebrow">Let’s work together</p>
              <h2>Need someone to take a practical look at your tech?</h2>
              <p>
                Available for freelance IT support, networking help, printer
                support, and simple web projects in Baguio City.
              </p>
            </div>

            <div className="contact-actions">
              <a className="button primary" href="mailto:kelbydatim@gmail.com">
                kelbydatim@gmail.com
              </a>
              <a
                className="button secondary"
                href="https://www.linkedin.com/in/kelby-dati-dati-8079ba349"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 Kelby Dati</span>
          <span>IT Support · Networking · Systems · Web</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
