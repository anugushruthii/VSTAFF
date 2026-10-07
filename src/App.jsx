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
            <p>
              VStaff respects your privacy and is committed to protecting
              your personal information. This Privacy Policy explains how
              VStaff collects, uses and protects information when you use
              our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect information such as your name, phone number,
              email address, location, account details and other information
              required to provide our services.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use collected information to provide and improve our
              services, communicate with users, process requests and
              maintain platform security.
            </p>

            <h2>4. Information Sharing</h2>
            <p>
              VStaff may share information when necessary to provide
              services, comply with applicable laws or protect the rights
              and safety of users and the platform.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We take reasonable measures to protect personal information
              from unauthorized access, misuse, alteration or disclosure.
            </p>

            <h2>6. Contact for Policy Questions</h2>

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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing the VStaff website or using VStaff services,
              you agree to these Terms & Conditions and our Privacy Policy.
            </p>

            <h2>2. About VStaff</h2>
            <p>
              VStaff is a technology platform that connects customers with
              delivery partners and delivery opportunities. VStaff provides
              the platform, while delivery partners operate independently
              unless otherwise agreed in writing.
            </p>

            <h2>3. Eligibility and Accounts</h2>
            <p>
              Users must be at least 18 years old and legally capable of
              entering into an agreement under applicable Indian law.
              Users must provide accurate information and keep their
              account information secure.
            </p>

            <h2>4. Using Our Services</h2>
            <p>
              Customers must provide correct pickup, delivery and contact
              information. Delivery partners must follow applicable traffic,
              safety and legal requirements.
            </p>

            <h2>5. Prohibited Items and Activities</h2>
            <p>
              Users must not use VStaff services for illegal goods,
              hazardous materials, restricted items or any unlawful
              activity.
            </p>

            <h2>6. Fees and Payments</h2>
            <p>
              Applicable charges, commissions and payouts will be displayed
              in the application or agreed upon in writing. Taxes may apply
              where required by law.
            </p>

            <h2>7. Cancellations and Refunds</h2>
            <p>
              Cancellation charges may apply depending on the circumstances.
              Where a refund is due, it may be processed to the original
              payment method within a reasonable period.
            </p>

            <h2>8. Prohibited Conduct</h2>
            <p>
              Users must not engage in fraud, impersonation, harassment,
              false information, interference with the platform or any
              unlawful activity.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              The VStaff name, logo, software, content and other materials
              belong to VStaff or its licensors and may not be copied,
              modified or reused without written permission.
            </p>

            <h2>10. Disclaimer and Limitation of Liability</h2>
            <p>
              Services are provided on an "as is" and "as available" basis.
              To the extent permitted by law, VStaff is not responsible for
              indirect or consequential losses arising from the use of its
              services.
            </p>

            <h2>11. Suspension and Termination</h2>
            <p>
              VStaff may suspend or terminate access where a user violates
              these Terms or misuses the platform.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Courts in
              Hyderabad, Telangana shall have jurisdiction.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              VStaff may update these Terms from time to time. Continued
              use of the platform after changes are posted means acceptance
              of the updated Terms.
            </p>

            <h2>14. Contact Us</h2>
            <p>
              VStaff Support
              <br />
              Email: hr@vstaffcore.com
              <br />
              Email: srp.vstaff@gmail.com
              <br />
              Phone: +91 9652910585
              <br />
              Address: Punjagutta, Hyderabad 500082
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

