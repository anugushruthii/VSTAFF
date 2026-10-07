import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  APK_URL, APK_META, LINKEDIN, navLinks, steps, deliverables, whyItems,
  journey, partners, stories, faqs, footerCols,
} from "./data.js";

/* ---------- helpers ---------- */

function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Heading({ title, lead, light = false, center = false }) {
  return (
    <div className={`heading ${light ? "on-dark" : ""} ${center ? "center" : ""}`}>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

const DownloadBtn = ({ className = "btn btn-primary", children = "Download App" }) => (
  <a className={className} href={APK_URL} download>
    <span aria-hidden="true">⬇</span> {children}
  </a>
);

/* ---------- navbar ---------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-row">
        <a href="#home" className="brand" aria-label="VStaff home">
          <img src="/favicon.png" alt="" width="70" height="55" />
          
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          {/* <a className="btn btn-primary nav-cta-mobile" href="#join" onClick={() => setOpen(false)}>Join VStaff</a> */}
        </nav>
        {/* <a className="btn btn-primary nav-cta" href="#join">Join VStaff</a> */}
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function RouteScene() {
  const d = "M70 400 C 230 400, 120 230, 280 230 S 390 90, 490 90";
  const Node = ({ x, y, icon, label }) => (
    <g transform={`translate(${x - 52} ${y - 38})`}>
      <rect width="104" height="76" rx="20" fill="#fff" stroke="#E4E7F2" strokeWidth="2" />
      <text x="52" y="38" textAnchor="middle" fontSize="28">{icon}</text>
      <text x="52" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0E1B4D" letterSpacing=".06em">{label}</text>
    </g>
  );
  return (
    <div className="scene" role="img" aria-label="An order travels from a store, is picked up by a rider and delivered to the customer">
      <span className="streak s1" /><span className="streak s2" /><span className="streak s3" />
      <svg viewBox="0 0 560 480">
        <defs>
          <linearGradient id="road" gradientUnits="userSpaceOnUse" x1="70" y1="400" x2="490" y2="90">
            <stop offset="0" stopColor="#FFB800" />
            <stop offset=".35" stopColor="#FF2E93" />
            <stop offset=".7" stopColor="#6B2BD9" />
            <stop offset="1" stopColor="#1E6BFF" />
          </linearGradient>
        </defs>
        <path id="route" d={d} fill="none" stroke="url(#road)" strokeWidth="26" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" className="road-dash" />
        <Node x={70} y={400} icon="🏪" label="STORE" />
        <Node x={280} y={230} icon="📦" label="ORDER" />
        <Node x={490} y={90} icon="🏠" label="CUSTOMER" />
        <g className="rider">
          <circle r="26" fill="#0E1B4D" />
          <text textAnchor="middle" y="10" fontSize="28">🛵</text>
          <animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear">
            <mpath href="#route" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            <span>Deliver.</span>
            <span>Earn.</span>
            <span>Grow.</span>
          </h1>
          <p className="lead">
            Join the VStaff delivery network and access delivery opportunities through one simple platform.
          </p>
          <p>Pick up orders from stores, supermarkets and other locations and deliver them to customers.</p>
          <div className="btn-row">
            {/* <a className="btn btn-primary" href="#join">Join VStaff</a> */}
            <DownloadBtn className="btn btn-ghost" />
          </div>
          <p className="fine">{APK_META}</p>
        </div>
        <RouteScene />
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="section soft">
      <div className="wrap about-grid">
        <div>
          <Heading title="Your delivery. Your opportunity." />
        </div>
        <div className="prose">
          <p>VStaff is a technology-driven delivery platform created to connect delivery partners with delivery opportunities.</p>
          <p>Through the VStaff app, riders can discover available deliveries, pick up orders from stores and deliver them to customers.</p>
          <p>From groceries and fruits to everyday essentials and retail products, VStaff helps delivery partners become part of a growing delivery network.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */

function Step({ s, i }) {
  const [ref, seen] = useInView(0.5);
  return (
    <li ref={ref} className={`step ${seen ? "in" : ""}`}>
      <div className={`step-icon a-${s.key}`} aria-hidden="true">
        <span>{s.icon}</span>
      </div>
      <div className="step-body">
        <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </li>
  );
}

function HowItWorks() {
  const listRef = useRef(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      setPct(Math.max(0, Math.min(1, p)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <section id="how" className="section dark">
      <div className="wrap how-grid">
        <div className="how-intro">
          <Heading light title="How it works" lead="Seven steps from download to earnings." />
          <DownloadBtn />
        </div>
        <ol className="steps" ref={listRef}>
          <span className="rail" aria-hidden="true"><i style={{ height: `${pct * 100}%` }} /></span>
          {steps.map((s, i) => <Step key={s.key} s={s} i={i} />)}
        </ol>
      </div>
    </section>
  );
}

/* ---------- why ---------- */

function Why() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <Heading title="Why deliver with VStaff?" />
        <div className="why-grid">
          {whyItems.map((w) => (
            <div className="why" key={w.title}>
              <span className="why-icon" aria-hidden="true">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- journey ---------- */

function Journey() {
  const [ref, seen] = useInView(0.4);
  return (
    <section className="section soft" id="journey">
      <div className="wrap">
        <Heading title="Your journey with VStaff" center />
        <ol ref={ref} className={`journey ${seen ? "in" : ""}`}>
          {journey.map((j, i) => (
            <li key={j} style={{ "--i": i }}>
              <span className="dot" />
              <span className="j-label">{j}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- deliver ---------- */

function Deliver() {
  return (
    <section id="deliver" className="section">
      <div className="wrap">
        <Heading
          title="Deliver everyday essentials"
          lead="Deliver products people need, from stores to their doorstep."
        />
        <div className="deliver-grid">
          {deliverables.map((d) => (
            <div className="deliver" key={d.label}>
              <span aria-hidden="true">{d.icon}</span>
              <h3>{d.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- app ---------- */

function AppSection() {
  return (
    <section id="app" className="section soft">
      <div className="wrap app-grid">
        <div className="phone" aria-hidden="true">
          <div className="phone-screen">
            <img src="/logo.png" alt="" />
            {/* <i className="sk" /><i className="sk" /><i className="sk short" /> */}
          </div>
        </div>
        <div>
          <Heading
            title="Everything you need. One app."
            lead="The VStaff app is designed to make finding and managing delivery opportunities simple."
          />
          <DownloadBtn>Download VStaff</DownloadBtn>
          <p className="fine">{APK_META}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- network ---------- */

function Network() {
  const Box = ({ x, y, w = 110, label, dark }) => (
    <g transform={`translate(${x - w / 2} ${y - 22})`}>
      <rect width={w} height="44" rx="14" fill={dark ? "#0E1B4D" : "#fff"} stroke={dark ? "none" : "#D9DDEE"} strokeWidth="2" />
      <text x={w / 2} y="28" textAnchor="middle" fontSize="15" fontWeight="700" fill={dark ? "#fff" : "#0E1B4D"} letterSpacing=".05em">{label}</text>
    </g>
  );
  const xs = [100, 300, 500];
  return (
    <section id="network" className="section">
      <div className="wrap net-grid">
        <Heading
          title="Be part of the VStaff delivery network"
          lead="VStaff brings delivery partners together through technology, creating a connected network for moving everyday orders from stores to customers."
        />
        <svg viewBox="0 0 600 400" className="net" role="img" aria-label="VStaff connects riders, who carry orders to customers">
          <g className="flow" fill="none" stroke="#6B2BD9" strokeWidth="2.5" strokeLinecap="round">
            {xs.map((x) => <path key={"a" + x} d={`M300 72 C 300 110, ${x} 100, ${x} 138`} />)}
            {xs.map((x) => <path key={"b" + x} d={`M${x} 182 L${x} 238`} />)}
            {xs.map((x) => <path key={"c" + x} d={`M${x} 282 C ${x} 330, 300 310, 300 338`} />)}
          </g>
          <Box x={300} y={50} label="VSTAFF" dark />
          {xs.map((x) => <Box key={"r" + x} x={x} y={160} label="RIDER" />)}
          {xs.map((x) => <Box key={"o" + x} x={x} y={260} label="ORDER" />)}
          <Box x={300} y={360} w={150} label="CUSTOMERS" dark />
        </svg>
      </div>
    </section>
  );
}

/* ---------- partners ---------- */

function Partners() {
  return (
    <section id="partners" className="section soft">
      <div className="wrap">
        <Heading
          title="Our Clients"
          lead="VStaff delivery partners may receive opportunities across participating platforms and stores."
        />
        <div className="logos-wrapper">
  <div className="logos-track">

    {/* First set */}
    {partners.map((p) => (
      <div className="logo-item" key={`first-${p.name}`}>
        {p.logo ? (
          <img src={p.logo} alt={p.name} />
        ) : (
          <span>{p.name}</span>
        )}
        <b>•</b>
      </div>
    ))}

    {/* Second set - exact duplicate */}
    {partners.map((p) => (
      <div className="logo-item" key={`second-${p.name}`}>
        {p.logo ? (
          <img src={p.logo} alt={p.name} />
        ) : (
          <span>{p.name}</span>
        )}
        <b>•</b>
      </div>
    ))}

  </div>
</div>
      </div>
    </section>
  );
}

/* ---------- vision & mission ---------- */

function VisionMission() {
  return (
    <section className="section" id="vision">
      <div className="wrap vm-grid">
        <div className="vm">
          <h2>Empowering India's delivery workforce</h2>
          <p>Our vision is to empower India's gig workforce by creating accessible delivery opportunities and building a smarter, more inclusive delivery ecosystem.</p>
        </div>
        <div className="vm alt">
          <h2>Making delivery work more accessible</h2>
          <p>We use technology to make finding, managing and completing delivery opportunities simpler for delivery partners.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- rider stories ---------- */

function Stories() {
  return (
    <section id="stories" className="section soft">
      <div className="wrap">
        <Heading title="Rider stories" />
        {stories.length ? (
          <div className="story-grid">
            {stories.map((s) => (
              <figure className="story" key={s.name}>
                <blockquote>{s.quote}</blockquote>
                <figcaption><b>{s.name}</b>{s.area && <span>{s.area}</span>}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="story-empty">
            <p>Riding with VStaff? Your story could be here. Tell us how VStaff works for you and we will feature it.</p>
            <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noreferrer">Share your story</a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="wrap faq-grid">
        <Heading title="Frequently asked questions" />
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- final cta & footer ---------- */

function FinalCTA() {
  return (
    <section id="join" className="cta">
      <div className="wrap cta-inner">
        <h2>Ready to start delivering?</h2>
        <p>Join VStaff and discover delivery opportunities through one platform.</p>
        <div className="btn-row center">
          <DownloadBtn className="btn btn-light">Join VStaff</DownloadBtn>
          <DownloadBtn className="btn btn-outline-light">Download the App</DownloadBtn>
        </div>
        <p className="fine">{APK_META}</p>
      </div>
    </section>
  );
}

function LegalPage({ type, onBack }) {
  const isPrivacy = type === "privacy";

  return (
    <section className="legal-page">
      <div className="wrap legal-container">

        {/* <button className="legal-back" onClick={onBack}>
          ← Back to VStaff
        </button> */}

        <h1>
          {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
        </h1>

        <p className="legal-updated">
          Last updated: October 6, 2026
        </p>

        {isPrivacy ? (
          <>
            <h2>1. Introduction</h2>
            <p>VStaff (&ldquo;VStaff&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates vstaffcore.com and a technology-driven delivery platform that connects customers with delivery partners. This Privacy Policy explains what personal information we collect, how we use and protect it, and the choices you have. By using our website or services, you agree to this policy.</p>
            <h2>2. Information we collect</h2>
            <ul>
                <li><strong>Contact details:</strong> name, phone number, email address, and delivery or business address.</li>
                <li><strong>Account and verification details:</strong> for delivery partners, identity and onboarding documents needed to verify eligibility.</li>
                <li><strong>Order and delivery details:</strong> pickup and drop-off locations, order notes, delivery status, and service history.</li>
                <li><strong>Location data:</strong> device location while you use our services, to match, route, and track deliveries.</li>
                <li><strong>Payment details:</strong> transaction records and payout information. Card or bank credentials are handled by our payment providers.</li>
                <li><strong>Technical data:</strong> IP address, browser and device type, pages visited, and cookie data.</li><li><strong>Communications:</strong> messages, enquiries, and feedback you send us.</li>
            </ul>
            <h2>3. How we use your information</h2>
            <ul>
                <li>To provide, match, and complete delivery and workspace services.</li>
                <li>To create and manage your account and verify delivery partners.</li>
                <li>To process payments, payouts, and invoices.</li>
                <li>To send service updates, support replies, and, where permitted, offers you can opt out of.</li>
                <li>To improve our website, services, and safety, and to prevent fraud and misuse.</li>
                <li>To comply with legal obligations.</li>
            </ul>
              <h2>4. Sharing your information</h2>
              <p>We do not sell your personal information. We share it only with:</p>
              <ul>
                  <li>Delivery partners and customers, as needed to complete an order.</li>
                  <li>Service providers such as payment gateways, mapping, hosting, analytics, and communication tools, who act on our instructions.</li>
                  <li>Authorities or other parties when required by law, or to protect rights, safety, and property.</li>
                  <li>A successor entity if VStaff is involved in a merger, acquisition, or sale of assets.</li>
              </ul>
              <h2>5. Cookies and tracking</h2>
              <p>We use cookies and similar technologies to keep the site working, remember preferences, and understand usage. You can block or delete cookies in your browser settings, though some features may stop working.</p>
              <h2>6. Data retention</h2>
              <p>We keep personal information only as long as needed for the purposes above, or as required by law, tax, and accounting rules. When it is no longer needed, we delete or anonymise it.</p>
              <h2>7. Data security</h2>
              <p>We use reasonable technical and organisational safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
              <h2>8. Your rights</h2>
              <p>Subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may request to access, correct, update, or delete your personal information, withdraw consent, and opt out of marketing messages. Contact us using the details below and we will respond within a reasonable time.</p>
              <h2>9. Third-party links</h2>
              <p>Our site may link to other websites. We are not responsible for their privacy practices, so please review their policies.</p>
              <h2>10. Children&rsquo;s privacy</h2>
              <p>Our services are not directed to anyone under 18. We do not knowingly collect information from children. If you believe a child has given us data, contact us and we will remove it.</p>
              <h2>11. Changes to this policy</h2>
              <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date shows the latest version. Continued use of our services after changes means you accept them.</p>
          
            <h2> Contact for Policy Questions</h2>

            <h4>LOCATION TRACKING</h4>
            
            <p>
              Delivery partners and users who enable location services expressly
              consent to:
            </p> 
            <ul>
              <li>Continuous location tracking</li>
              <li>Background location access</li>
              <li>Route optimization</li>
              <li>Attendance verification</li>
              <li>Fraud prevention</li>
              <li>Safety monitoring</li>
              <li>Performance measurement</li>
            </ul>
            <p>
              Location data may continue to be retained after completion of
              services for operational, legal, and analytical purposes.
            </p>
            <p>
              For privacy, compliance, billing, or terms-related questions,
              contact <strong>business@peakliftel.com</strong>.
            </p>
          </>
        ) : (
          <>
            <h2>1. Acceptance of terms</h2>
            <p>By accessing vstaffcore.com or using VStaff services, you agree to these Terms &amp; Conditions and our Privacy Policy. If you do not agree, please do not use our services.</p>
            <h2>2. About VStaff</h2>
            <p>VStaff is a technology platform that connects customers with delivery partners and delivery opportunities. VStaff provides the platform; delivery partners are independent and are not employees of VStaff unless agreed in a separate written contract.</p>
            <h2>3. Eligibility and accounts</h2>
            <ul>
              <li>You must be at least 18 and legally able to enter a contract in India.</li>
              <li>You must give accurate, current information and keep your login details secure.</li>
              <li>You are responsible for all activity under your account.</li>
            </ul>
              <h2>4. Using our services</h2>
            <ul>
                <li>Customers must provide correct pickup, drop-off, and contact details, and only send lawful, permitted items.</li>
                <li>Delivery partners must hold valid documents, follow traffic and safety laws, and handle orders with care.</li>
                <li>Prohibited items include illegal goods, hazardous materials, and anything restricted by law.</li>
            </ul>
                <h2>5. Fees and payments</h2>
                <p>Charges, commissions, and payouts are shown in the app or agreed in writing. Taxes apply as per law. Payments are processed by third-party providers, and VStaff is not liable for their delays or failures.</p>
                <h2>6. Cancellations and refunds</h2>
                <p>Orders may be cancelled before a delivery partner starts the job. Cancellation charges may apply afterwards. Refunds, where due, are processed to the original payment method within a reasonable time.</p>
                <h2>7. Prohibited conduct</h2>
            <ul>
                  <li>Fraud, impersonation, or giving false information.</li>
                  <li>Harassing or endangering customers, partners, or our staff.</li>
                  <li>Interfering with, copying, or reverse-engineering the platform.</li>
                  <li>Using the service for any unlawful purpose.</li>
            </ul>
                  <h2>8. Intellectual property</h2>
                  <p>The VStaff name, logo, website content, and software belong to VStaff or its licensors. You may not copy, modify, or reuse them without written permission.</p>
                  <h2>9. Disclaimer and limitation of liability</h2>
                  <p>Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent permitted by law, VStaff is not liable for indirect or consequential losses, delays beyond our control, or loss or damage to items caused by third parties. Our total liability for any claim is limited to the amount you paid for the affected service.</p>
                  <h2>10. Suspension and termination</h2>
                  <p>We may suspend or end access to our services if you breach these terms or misuse the platform. You may stop using the services at any time.</p>
                  <h2>11. Governing law</h2>
                  <p>These terms are governed by the laws of India. Courts in Hyderabad, Telangana have exclusive jurisdiction over any dispute.</p>
                  <h2>12. Changes to these terms</h2>
                  <p>We may revise these terms at any time. The updated version applies once posted on this page, and continued use means you accept it.</p>

                  <h2> Contact for Policy Questions</h2>

            <h4>LOCATION TRACKING</h4>
            
            <p>
              Delivery partners and users who enable location services expressly
              consent to:
            </p> 
            <ul>
              <li>Continuous location tracking</li>
              <li>Background location access</li>
              <li>Route optimization</li>
              <li>Attendance verification</li>
              <li>Fraud prevention</li>
              <li>Safety monitoring</li>
              <li>Performance measurement</li>
            </ul>
            <p>
              Location data may continue to be retained after completion of
              services for operational, legal, and analytical purposes.
            </p>
            <p>
              For privacy, compliance, billing, or terms-related questions,
              contact <strong>business@peakliftel.com</strong>.
            </p>
          </>
        )}

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="wrap">

        <div className="footer-grid">

          {/* VStaff Brand */}
          <div className="foot-brand">
            <a href="#home" className="brand light">
              <img
                src="/favicon.png"
                alt="VStaff"
                width="40"
                height="40"
              />
              <span>VSTAFF</span>
            </a>

            <p>Built to Earn.</p>
          </div>

          {/* Footer Links */}
          <div className="foot-links">
            {footerCols.map((c) => (
              <div key={c.title} className="foot-column">
                <h4>{c.title}</h4>

                <ul>
                  {c.links.map(([label, href]) => (
                    <li key={label}><a
                        href={href}
                        onClick={(e) => {
                          if (href === "#privacy") {
                            e.preventDefault();
                            onLegalClick("privacy");
                          }
                      
                          if (href === "#terms") {
                            e.preventDefault();
                            onLegalClick("terms");
                          }
                        }}
                        {...(
                          href.startsWith("http")
                            ? {
                                target: "_blank",
                                rel: "noreferrer"
                              }
                            : {}
                        )}
                        {...(
                          href === APK_URL
                            ? { download: true }
                            : {}
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <p className="copy">
          © {new Date().getFullYear()} VStaff. All rights reserved.
        </p>

      </div>
    </footer>
  );
}



/* ---------- app ---------- */
export default function App() {
  return (
    <Routes>
      
      {/* Main Website */}
      <Route
        path="/"
        element={
          <>
            <Navbar />

            <main>
              <Hero />
              <About />
              {/* <HowItWorks /> */}
              {/* <Why /> */}
              {/* <Journey /> */}
              <Deliver />
              <AppSection />
              {/* <Network /> */}
              <Partners />
              {/* <VisionMission /> */}
              {/* <Stories /> */}
              {/* <FAQ /> */}
              <FinalCTA />
            </main>

            <Footer />
          </>
        }
      />

      {/* Privacy Policy */}
      <Route
        path="/privacy"
        element={
          <>
            <Navbar />
            <LegalPage type="privacy" />
            <Footer />
          </>
        }
      />

      {/* Terms & Conditions */}
      <Route
        path="/terms"
        element={
          <>
            <Navbar />
            <LegalPage type="terms" />
            <Footer />
          </>
        }
      />

    </Routes>
  );
}

