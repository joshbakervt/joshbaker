import { useState } from "react";

const T = {
  bg:        "#F5F0E8",
  bgCard:    "#EDE6D8",
  bgDeep:    "#E4DBCA",
  textPrim:  "#2C2318",
  textSec:   "#5C4A35",
  textMuted: "#8C7A62",
  accent:    "#8B5E3C",
  accentHov: "#6B4428",
  gold:      "#A8854A",
  moss:      "#5A6B4A",
  rust:      "#9B5B3A",
  border:    "rgba(92, 74, 53, 0.15)",
  borderAcc: "rgba(139, 94, 60, 0.3)",
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "3rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: "2rem", height: "1px", background: T.gold }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}>{title}</span>
    </div>
    {children}
  </div>
);

const Swatch = ({ hex, name, role }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <div style={{ width: "100%", height: "4rem", background: hex, borderRadius: "2px", border: `1px solid ${T.border}` }} />
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.gold }}>{hex}</div>
    <div style={{ fontFamily: "'Lora', serif", fontSize: "0.85rem", color: T.textPrim }}>{name}</div>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.textMuted, lineHeight: 1.4 }}>{role}</div>
  </div>
);

const TypeSample = ({ font, weight, size, label, sample, note }) => (
  <div style={{ padding: "1.5rem", border: `1px solid ${T.border}`, borderRadius: "2px", marginBottom: "1rem", background: T.bgCard }}>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.textMuted, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>{label} — {font} {weight}</div>
    <div style={{ fontFamily: font, fontWeight: weight, fontSize: size, color: T.textPrim, lineHeight: 1.3 }}>{sample}</div>
    {note && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.textMuted, marginTop: "0.75rem" }}>{note}</div>}
  </div>
);

const Tag = ({ children }) => (
  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", padding: "0.25rem 0.75rem", border: `1px solid ${T.borderAcc}`, borderRadius: "1px", color: T.accent, letterSpacing: "0.08em", background: "rgba(139,94,60,0.06)" }}>{children}</span>
);

export default function BrandSpec() {
  const [activeTab, setActiveTab] = useState("identity");
  const tabs = ["identity", "palette", "typography", "voice", "layout"];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.textPrim, fontFamily: "'Lora', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <div style={{ borderBottom: `1px solid ${T.bgDeep}`, padding: "3rem 3rem 2rem", position: "sticky", top: 0, background: T.bg, zIndex: 10, boxShadow: "0 1px 16px rgba(44,35,24,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: T.textMuted, marginBottom: "0.4rem" }}>BRAND IDENTITY SPEC — V1.0</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, letterSpacing: "0.04em", color: T.textPrim }}>Josh · Personal Website</div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.4rem 1rem", border: `1px solid ${activeTab === t ? T.accent : T.border}`, background: activeTab === t ? "rgba(139,94,60,0.08)" : "transparent", color: activeTab === t ? T.accent : T.textMuted, cursor: "pointer", borderRadius: "1px", transition: "all 0.2s" }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "3rem", maxWidth: "900px" }}>

        {activeTab === "identity" && (
          <div>
            <Section title="Brand Concept">
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic", lineHeight: 1.5, color: T.textPrim, marginBottom: "2rem", borderLeft: `2px solid ${T.gold}`, paddingLeft: "1.5rem" }}>
                "The engineer who builds tools with the sensibility of an artist."
              </div>
              <p style={{ color: T.textSec, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1rem" }}>
                Josh occupies a rare intersection: technically rigorous backend engineer with a creative interior — producer, guitarist, runner, philosopher. His website shouldn't feel like a portfolio. It should feel like a <em>place</em> — somewhere between a craftsman's studio and a musician's notebook.
              </p>
              <p style={{ color: T.textSec, lineHeight: 1.8, fontSize: "0.95rem" }}>
                The design language draws from the warmth of analog media (vinyl, darkroom photography, handwritten notation) combined with the precision of a well-engineered system. <strong style={{ color: T.accent }}>Warm minimalism</strong> — nothing wasted, nothing cold.
              </p>
            </Section>

            <Section title="Core Identity Pillars">
              {[
                { label: "Craft", body: "Code written like music composed — with intention, structure, and an ear for elegance. Launchpad wasn't just shipped; it was built with care for real humans at UVM Medical." },
                { label: "Depth", body: "Three years in, but reads as someone who's been thinking about this longer. Backend focus means comfort in the unsexy infrastructure that makes everything work." },
                { label: "Duality", body: "Technologist + musician isn't a contradiction — it's the source of the most interesting work. Audio-visual experiments live at that seam. Lean into it." },
                { label: "Presence", body: "Burlington, Vermont. Not a tech hub. That's a feature. There's intention behind being here — someone who chose the mountains and the music scene." },
              ].map(({ label, body }) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", padding: "1.25rem 0", borderBottom: `1px solid ${T.bgDeep}` }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: T.accent, paddingTop: "0.1rem" }}>{label}</div>
                  <div style={{ color: T.textSec, lineHeight: 1.7, fontSize: "0.9rem" }}>{body}</div>
                </div>
              ))}
            </Section>

            <Section title="Positioning Statement">
              <div style={{ background: "rgba(168,133,74,0.08)", border: `1px solid rgba(168,133,74,0.3)`, padding: "2rem", borderRadius: "2px" }}>
                <p style={{ color: T.accent, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                  "I build backend systems and creative tools — sometimes the same project is both. I'm a software engineer at Cox Automotive by day, and the rest of the time I'm writing music, shipping side projects, and running through Vermont."
                </p>
              </div>
            </Section>

            <Section title="Keywords">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["craftsman", "backend-focused", "audio-visual", "Vermont", "deliberate", "curious", "analog warmth", "systems thinker", "musician", "marathoner"].map(k => <Tag key={k}>{k}</Tag>)}
              </div>
            </Section>
          </div>
        )}

        {activeTab === "palette" && (
          <div>
            <Section title="Color Philosophy">
              <p style={{ color: T.textSec, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2rem" }}>
                A light, warm palette rooted in natural materials — aged paper, raw linen, fired clay, weathered wood. The background reads like a page that's been lived with. Accents draw from earth: burnt sienna, antique gold, muted sage, deep mahogany. Nothing synthetic, nothing cool.
              </p>
            </Section>
            <Section title="Primary Palette">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                <Swatch hex="#F5F0E8" name="Parchment" role="Primary background." />
                <Swatch hex="#EDE6D8" name="Linen" role="Cards and surfaces." />
                <Swatch hex="#E4DBCA" name="Raw Canvas" role="Borders, dividers." />
                <Swatch hex="#2C2318" name="Espresso" role="Primary text." />
                <Swatch hex="#5C4A35" name="Umber" role="Secondary text." />
                <Swatch hex="#8C7A62" name="Warm Taupe" role="Muted captions." />
              </div>
            </Section>
            <Section title="Accent Palette">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "1.5rem" }}>
                <Swatch hex="#8B5E3C" name="Burnt Sienna" role="Primary accent." />
                <Swatch hex="#A8854A" name="Antique Gold" role="Labels, ornamental." />
                <Swatch hex="#6B4428" name="Mahogany" role="Hover, deep emphasis." />
                <Swatch hex="#5A6B4A" name="Sage Moss" role="Code, success states." />
                <Swatch hex="#9B5B3A" name="Rust" role="Tags, metadata." />
              </div>
            </Section>
            <Section title="Usage Rules">
              {[
                ["Background layers", "Parchment → Linen → Raw Canvas"],
                ["Text hierarchy", "Espresso → Umber → Warm Taupe"],
                ["Interactive", "Burnt Sienna for links. Mahogany on hover."],
                ["Decorative", "Antique Gold for section labels and ornamental dividers only."],
                ["Never use", "Cool grays, blue tones, pure white or black."],
              ].map(([rule, detail]) => (
                <div key={rule} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1rem", padding: "0.9rem 0", borderBottom: `1px solid ${T.bgDeep}` }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.gold }}>{rule}</div>
                  <div style={{ color: T.textSec, lineHeight: 1.6, fontSize: "0.85rem" }}>{detail}</div>
                </div>
              ))}
            </Section>
          </div>
        )}

        {activeTab === "typography" && (
          <div>
            <Section title="Type System">
              <p style={{ color: T.textSec, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2rem" }}>Three fonts. Each with a distinct role. Classical serif paired with technical monospace — the typographic expression of musician + engineer.</p>
            </Section>
            <Section title="Display — Cormorant Garamond">
              <TypeSample font="'Cormorant Garamond', serif" weight="300" size="2.4rem" label="Display / Hero" sample="Software engineer. Music producer. Builder." note="Hero text, section titles, pull quotes. Light weight only." />
              <TypeSample font="'Cormorant Garamond', serif" weight="300" size="1.4rem" label="Display Italic" sample={`"The engineer who builds with the sensibility of an artist."`} note="Italics for quotes and poetic subheadings." />
            </Section>
            <Section title="Body — Lora">
              <TypeSample font="'Lora', serif" weight="400" size="1rem" label="Body / Prose" sample="I built Launchpad with a neurosurgeon at the University of Vermont — a curriculum system for residency training, now scaling across the program." note="All prose, project descriptions, about text." />
              <TypeSample font="'Lora', serif" weight="500" size="0.9rem" label="Body Emphasis" sample="Java · TypeScript · React · Terraform · AWS · Claude Code" note="Medium weight for emphasis." />
            </Section>
            <Section title="Mono — DM Mono">
              <TypeSample font="'DM Mono', monospace" weight="400" size="0.75rem" label="Labels / Metadata" sample="LAUNCHPAD — UVM MEDICAL CENTER — 2024" note="All caps, wide tracking for structural metadata." />
              <TypeSample font="'DM Mono', monospace" weight="300" size="0.85rem" label="Code / Technical" sample="$ java -jar launchpad.jar --env production" note="Light weight for inline code." />
            </Section>
            <Section title="Scale">
              {[
                ["Hero","'Cormorant Garamond' 300","clamp(2.5rem, 6vw, 4.5rem)","ls: 0.02em"],
                ["H1","'Cormorant Garamond' 300","2rem","Page headings"],
                ["H2","'Cormorant Garamond' italic","1.4rem","Section titles"],
                ["H3","'DM Mono' uppercase","0.65rem / ls: 0.2em","Category labels"],
                ["Body","'Lora' 400","1rem / lh: 1.75","All prose"],
                ["Small","'Lora' 400","0.85rem","Captions"],
                ["Micro","'DM Mono' 300","0.65rem","Tags, timestamps"],
              ].map(([name, font, size, note]) => (
                <div key={name} style={{ display: "grid", gridTemplateColumns: "80px 220px 160px 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: `1px solid ${T.bgDeep}`, alignItems: "center" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.accent }}>{name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.textMuted }}>{font}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.textMuted }}>{size}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#B0A090" }}>{note}</div>
                </div>
              ))}
            </Section>
          </div>
        )}

        {activeTab === "voice" && (
          <div>
            <Section title="Tone of Voice">
              <p style={{ color: T.textSec, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2rem" }}>Write like someone who's thought carefully about the things they care about — not like a resume, not like a pitch deck. Confident without performing confidence. Precise without being cold.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                {[
                  { label: "IS", items: ["Direct and specific","Warm but not casual","Technical when it serves clarity","Curious, not trying to impress","First-person, present tense"] },
                  { label: "IS NOT", items: ["Startup-speak or buzzwords",`Humblebrag ("passionate about...")`,"Generic engineer copy","Cold or clinical","Listicles of skills"] }
                ].map(({ label, items }) => (
                  <div key={label} style={{ padding: "1.5rem", border: `1px solid ${label === "IS" ? T.borderAcc : T.border}`, borderRadius: "2px", background: T.bgCard }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: label === "IS" ? T.accent : T.textMuted, marginBottom: "1rem" }}>{label}</div>
                    {items.map(i => <div key={i} style={{ color: T.textSec, fontSize: "0.85rem", marginBottom: "0.4rem", lineHeight: 1.5 }}>— {i}</div>)}
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Copy Examples">
              {[
                { context: "Hero / About", avoid: "Passionate full-stack software engineer with 3 years of experience in building scalable solutions...", use: "I write backend systems at Cox Automotive and build things on the side that I can't stop thinking about. Some are useful. Some are just interesting. A few are both." },
                { context: "Project — Launchpad", avoid: "A comprehensive curriculum management system leveraging modern web technologies...", use: "Built with a neurosurgeon at UVM Medical. A tool for residents to learn — now scaling out across the program." },
                { context: "Hobbies / Personal", avoid: "When not coding, I enjoy music production and outdoor activities.", use: "I've been producing music for seven years — mostly disco and house with a lot of side trips. I ran my first marathon last October. I'm slowly learning what Vermont actually looks like on foot." }
              ].map(({ context, avoid, use }) => (
                <div key={context} style={{ marginBottom: "1.5rem", padding: "1.5rem", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "2px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: T.gold, marginBottom: "1rem" }}>{context.toUpperCase()}</div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#B08878", marginBottom: "0.4rem" }}>✗ AVOID</div>
                    <div style={{ color: T.textMuted, fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>{avoid}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.moss, marginBottom: "0.4rem" }}>✓ USE</div>
                    <div style={{ color: T.accent, fontSize: "0.9rem", lineHeight: 1.6 }}>{use}</div>
                  </div>
                </div>
              ))}
            </Section>
          </div>
        )}

        {activeTab === "layout" && (
          <div>
            <Section title="Layout Principles">
              {[
                ["Negative space as content","Breathing room is intentional. Long horizontal margins. Lines that don't fill the container."],
                ["Asymmetric rhythm","Content doesn't need to be centered or symmetrical. Left-anchored timelines, offset project cards."],
                ["Horizontal rules as architecture","Use thin 1px lines and mono labels to structure sections — not bold headers."],
                ["One thing per view","Don't cram. Each scroll position should have a clear visual subject."],
                ["Mobile: drop to warmth","Single-column, generous line-height, warmth of type system over layout complexity."],
              ].map(([label, detail]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "1.5rem", padding: "1.1rem 0", borderBottom: `1px solid ${T.bgDeep}` }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.accent, lineHeight: 1.5 }}>{label}</div>
                  <div style={{ color: T.textSec, lineHeight: 1.7, fontSize: "0.9rem" }}>{detail}</div>
                </div>
              ))}
            </Section>
            <Section title="Page Structure">
              {[
                { page: "Home / Hero", desc: "Name in Cormorant display. One-line role. Short honest bio. Navigation as monospace metadata.", note: "No hero image. Typography is the visual." },
                { page: "Projects", desc: "Launchpad leads — give it real estate and story. AV experiments as a secondary grid. Card layout with mono labels.", note: "Lead with impact: 'used by X residents at UVM Medical.'" },
                { page: "About", desc: "Essay-format Lora prose. The guitar, the production, the marathon. This isn't a resume.", note: "Optionally include a timeline of interesting moments." },
                { page: "Writing / Notes", desc: "Optional. If philosophy and thinking are real interests, a notes section elevates the brand.", note: "Even 3–4 posts establishes depth." },
                { page: "Contact", desc: "Minimal. Email link. GitHub. One-line about being open to conversations.", note: "No contact form. It's impersonal." },
              ].map(({ page, desc, note }) => (
                <div key={page} style={{ padding: "1.5rem", border: `1px solid ${T.border}`, borderRadius: "2px", marginBottom: "1rem", background: T.bgCard }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: T.gold, marginBottom: "0.75rem" }}>{page.toUpperCase()}</div>
                  <div style={{ color: T.textSec, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>{desc}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.textMuted }}>↳ {note}</div>
                </div>
              ))}
            </Section>
            <Section title="Motion Principles">
              {[
                ["Page load","Staggered fade-up on hero text. Slow (600–900ms). Nothing bounces."],
                ["Navigation","Underlines draw in. No slide-in menus."],
                ["Project cards","Subtle scale (1.01) and border deepening on hover."],
                ["Transitions","Opacity only. 200ms ease."],
                ["Avoid","Parallax. Auto-playing video. Anything that announces itself."],
              ].map(([label, detail]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: `1px solid ${T.bgDeep}` }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: T.accent }}>{label}</div>
                  <div style={{ color: T.textSec, lineHeight: 1.6, fontSize: "0.85rem" }}>{detail}</div>
                </div>
              ))}
            </Section>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${T.bgDeep}`, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.textMuted, letterSpacing: "0.1em" }}>JOSH · BRAND IDENTITY SPEC · {new Date().getFullYear()}</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: T.textMuted }}>Cormorant Garamond · Lora · DM Mono</div>
      </div>
    </div>
  );
}
