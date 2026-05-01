import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { SITE } from "@/content/data";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Usman Ghani Bawany" },
      {
        name: "description",
        content:
          "Curriculum vitae of Usman Ghani Bawany — UCL MSc Emerging Digital Technologies, ML & blockchain researcher, founder.",
      },
      { property: "og:title", content: "CV — Usman Ghani Bawany" },
      {
        property: "og:description",
        content: "MSc at UCL · Co-founder, Foresio · Research in ML, blockchain, and quantitative finance.",
      },
    ],
  }),
  component: CVPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground border-b border-border pb-2">
        {title}
      </h2>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  );
}

function Entry({
  title,
  meta,
  right,
  children,
}: {
  title: string;
  meta?: string;
  right?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
        {right && <p className="text-sm text-muted-foreground">{right}</p>}
      </div>
      {meta && <p className="text-sm italic text-muted-foreground mt-0.5">{meta}</p>}
      {children && <div className="mt-2 font-serif text-base leading-relaxed text-foreground/90">{children}</div>}
    </div>
  );
}

function CVPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 pt-16 pb-20">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {SITE.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {SITE.location} ·{" "}
              <a href={SITE.links.email} className="hover:text-foreground underline underline-offset-4">
                {SITE.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <a href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-4">
                LinkedIn
              </a>
              {" · "}
              <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-4">
                GitHub
              </a>
            </p>
          </div>
          <a
            href="/Resume_Usman.pdf"
            download
            className="no-print inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </a>
        </header>

        <Section title="Education">
          <Entry
            title="University College London (UCL)"
            meta="MSc Emerging Digital Technologies · Programme Representative"
            right="Sep 2025 – Aug 2026"
          >
            Focus: Blockchain Technologies · Bioinformatics (audit) · Open-Endedness & General Intelligence (audit).
          </Entry>
          <Entry
            title="Institute of Business Administration (IBA)"
            meta="BSc Computer Science · CGPA 3.57 · Dean's Honor List"
            right="Aug 2020 – Jul 2024"
          />
        </Section>

        <Section title="Research">
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground uppercase tracking-wider">Published</h3>
            <ul className="mt-2 space-y-3 font-serif text-base leading-relaxed text-foreground/90 list-disc pl-5">
              <li>
                K. Zahoor, N. Z. Bawany and <strong>U. Ghani</strong>, "Explainable AI for Healthcare: An Approach Towards Interpretable Healthcare Models," <em>24th Int. Arab Conf. on Information Technology (ACIT)</em>, UAE, 2023. DOI: 10.1109/ACIT58888.2023.10453740.
              </li>
              <li>
                K. Zahoor and <strong>U. Ghani</strong>, "Robust Deep Learning Model for Adversarial Defense in Medical Image Diagnosis," <em>2nd Int. Conf. on Emerging Technologies in Electronics, Computing and Communication (ICETECC)</em>, Pakistan, 2025.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground uppercase tracking-wider">Under Review</h3>
            <ul className="mt-2 space-y-3 font-serif text-base leading-relaxed text-foreground/90 list-disc pl-5">
              <li>
                <strong>U. Ghani</strong> and K. Liu, "Unified Logical Liquidity (ULL): A Deterministic Block-Synchronous Pricing Protocol for Fragmented Decentralized Exchange Reserves," submitted to conference, 2026.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-foreground uppercase tracking-wider">Working Paper</h3>
            <ul className="mt-2 space-y-3 font-serif text-base leading-relaxed text-foreground/90 list-disc pl-5">
              <li>
                <strong>U. Ghani</strong>, "Crowding Dynamics in Large-Cap US Equities: A Residual Multi-Factor Consensus Approach to Measuring Algorithmic Reflexivity, 2000–2024."
              </li>
            </ul>
          </div>
        </Section>

        <Section title="Selected Projects">
          <Entry title="Zero-Knowledge Wallet Verifier">
            Solidity + JavaScript prototype proving token ownership without revealing wallet details using zk-SNARKs (Groth16). Demonstrates privacy-preserving identity and balance verification integrable with existing ECDSA infrastructure.
          </Entry>
          <Entry title="AI Reflexivity in US Equities (RMFC)">
            Built an ex-ante crowding measure on 153 JKP factors across 3,669 US stocks; finds Granger-causal evidence (p = 0.037) of an AI-driven reflexivity loop.
          </Entry>
          <Entry title="UCL Racing Rocket — Flight Computer Avionics (IREC 2026)">
            STM32 avionics with 6-state FSM, OR-gated apogee detection, interrupt-driven IMU pipeline, EMA filters, gyro–accelerometer fusion, and median voting for fault tolerance.
          </Entry>
          <Entry title="G.U.A.R.D. Autonomous Drone — Top 6">
            Engineered a custom Pixhawk-based drone with ROS, QGroundControl, and computer vision for real-time human distress detection in disaster zones.
          </Entry>
          <Entry title="Credit Risk Stratification">
            Investigated the interpretability–accuracy trade-off in credit default (45K loans), benchmarking linear, ensemble, and neural models under asymmetric loss, framed around Basel II/III explainability constraints.
          </Entry>
          <Entry title="Blockchain Voting System">
            Dual-token governance on permissioned Ethereum: Soul Bound Tokens (ERC-721) bind identity to wallet; Campus Participation Tokens (ERC-20) create an on-chain engagement ledger.
          </Entry>
          <Entry title="Yoga Pose Classification">
            Decoupled pose estimation from classification — MoveNet keypoints feeding a custom NN, achieving higher accuracy at significantly lower compute than pixel-based models.
          </Entry>
        </Section>

        <Section title="Work Experience">
          <Entry title="Foresio — Co-Founder" meta="AI automation startup · London, UK" right="Mar 2026 – Present">
            Building voice agents that autonomously handle inbound calls and appointment scheduling for service SMEs (locksmiths, dental practices, law firms); also developing broader business process automations.
          </Entry>
          <Entry title="ZM Converters — Business Development Executive" meta="Flexible packaging manufacturer · Karachi, Pakistan" right="Jun 2023 – Feb 2026">
            <ul className="list-disc pl-5 space-y-1">
              <li>Spearheaded debut exhibition generating 150+ B2B leads and USD 250K+ in contracts.</li>
              <li>Built ERP (.NET / SQL Server) and Power BI dashboards; reduced data-entry errors 40%.</li>
              <li>Built an SEO-optimised website (PHP); 3× traffic and 210% increase in inbound inquiries.</li>
            </ul>
          </Entry>
          <Entry title="Sadiq.ai — Frontend Developer Intern" meta="Game-based onboarding platform (Pureversity) · Karachi, Pakistan" right="May 2023 – Jul 2023">
            Developed a gamified onboarding platform using Next.js, improving load time by 30% and overall UX.
          </Entry>
          <Entry title="DIC Pakistan — Business Analyst Intern" meta="Multinational ink and specialty materials manufacturer · Karachi, Pakistan" right="Jul 2021 – Aug 2021">
            Analysed workflows via Kaizen, identifying inefficiencies and proposing targeted improvements.
          </Entry>
        </Section>

        <Section title="Achievements & Awards">
          <ul className="list-disc pl-5 space-y-2 font-serif text-base leading-relaxed text-foreground/90">
            <li>Bloomberg–FCA Trading League at UCL: Ranked #1 in RL P&L across the league.</li>
            <li>Blockchain Technologies: Top 5; report highlighted by UCL Centre for Blockchain Technologies.</li>
            <li>ICPC Regional Finalist (2022 & 2023): International Collegiate Programming Competition, GIKI.</li>
            <li>UCL BaseKX Explore Programme: 6-week flagship venture-building programme (Fall 2026).</li>
            <li>Programme Representative: MSc Emerging Digital Technologies, UCL (2025–2026).</li>
            <li>NVIDIA Certificate: Fundamentals of Accelerated Computing with CUDA Python (2023).</li>
            <li>Diploma in Taxation: 6-month programme — income, sales, and corporate tax, IBA Karachi (2022).</li>
            <li>CEO, IBA Iqra Society (2023–2024); Thematic Lead, Green Youth Movement (2023–2024).</li>
          </ul>
        </Section>

        <Section title="Leadership & Social Impact">
          <Entry title="Uplift Pakistan — Founder" right="Jun 2020 – Present">
            <ul className="list-disc pl-5 space-y-1">
              <li>Welfare NGO supporting 5,000+ individuals through monthly food drives and plantation campaigns.</li>
              <li>Empowered 50+ women through entrepreneurial skill-building, fostering financial independence.</li>
            </ul>
          </Entry>
          <Entry title="Dar ul Sukoon — Volunteer">
            Community service at a shelter supporting children with mental disabilities.
          </Entry>
        </Section>

        <Section title="Skills">
          <div className="space-y-3 font-serif text-base leading-relaxed text-foreground/90">
            <p><strong>ML & AI:</strong> Neural network architecture (PyTorch, TensorFlow), transfer learning, computer vision, statistical modelling & causality testing, feature engineering, GPU computing (CUDA), Python.</p>
            <p><strong>Blockchain & Cryptography:</strong> Smart contract engineering (Solidity), zero-knowledge proofs (zk-SNARKs / Groth16), DeFi protocol design, token economics (ERC-20 / ERC-721).</p>
            <p><strong>Embedded & Systems:</strong> Real-time firmware (STM32, C/C++), sensor fusion, autonomous navigation (ROS, Pixhawk), cloud infrastructure (AWS, Terraform, Docker), Git.</p>
            <p><strong>Software & Data:</strong> Full-stack development (MERN, Next.js, JavaScript), ERP systems (.NET, SQL Server), business intelligence (Power BI), Java, SEO.</p>
          </div>
        </Section>

        <Section title="Interests">
          <p className="font-serif text-base text-foreground/90">
            Evolutionary biology · Theology · Urdu poetry · Hiking · Travel · Philosophy of mind · Free will
          </p>
        </Section>
      </article>
    </SiteLayout>
  );
}
