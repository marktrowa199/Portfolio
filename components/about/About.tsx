const credentials = [
  "Python Data Associate · DataCamp · July 2026",
  "Introduction to SQL · DataCamp · July 2026",
  "Working with the OpenAI API · DataCamp · July 2026",
  "IT Specialist: Python · CertNexus · Certified",
  "Security Compliance & Identity Fundamentals · Microsoft · July 2026",
  "Python for AI: Accelerating Innovation · AI & Algorithms · Completed",
  "Introduction to GitHub Version Control · GitHub · Certified",
];

export default function About() {
  return (
    <section id="about" className="section-space scroll-mt-20 border-y border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="section-wrap grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="section-title">An engineer who likes to build across disciplines.</h2>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-[var(--text-muted)]">
            I am a motivated Bachelor of Science in Information Technology graduate from Our Lady of Fatima University – Quezon City (2022–2026). My technical foundation brings together software development fundamentals, real-world infrastructure, and systems experience.
          </p>
        </div>

        <div>
          <div className="about-build-list">
            <article className="about-build about-build--blue">
              <p className="about-build__label">SOFTWARE + DATA</p>
              <p>Python, SQL, and API workflows</p>
            </article>
            <article className="about-build about-build--green">
              <p className="about-build__label">HARDWARE + SYSTEMS</p>
              <p>Robotics capstone and enterprise IT support</p>
            </article>
          </div>
          <div className="about-detail-list mt-5">
            <article><h3>AGROSENTINEL capstone</h3><p>Contributed to an AI-based agricultural robot with automated spraying: integrated Raspberry Pi 5, ESP32, motor drivers, and sensors; tested movement and spraying; and supported plant-disease model training with image datasets.</p></article>
            <article><h3>Concentrix internship</h3><p>Reimaged and deployed Windows workstations, configured user accounts and VPN access, managed IT assets, troubleshot hardware, and monitored support tickets.</p></article>
            <article><h3>Technical direction</h3><p>Seeking Associate Software Engineer or Junior Software Engineer opportunities to apply Python, SQL, Git, and software development while continuing to grow as an engineer.</p></article>
          </div>
          <div className="mt-7 border-t border-[var(--border)] pt-5">
            <h3 className="text-sm font-semibold text-[var(--text-heading)]">Credentials</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {credentials.map((credential) => <li key={credential} className="credential-block">{credential}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
