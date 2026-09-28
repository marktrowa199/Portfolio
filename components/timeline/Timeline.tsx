import Image from "next/image";
import olfuLogo from "@/components/image/OLFU LOGO.jpg";
import concentrixLogo from "@/components/image/concentrix-logo-trimmed.png";

const milestones = [
  {
    type: "Work Experience", date: "Feb. 2026 – April 2026", title: "IT Operations / IT Support Intern",
    place: "Concentrix", location: "Quezon City, Philippines", color: "blue",
    detail: "Enterprise IT support practicum managing workstation deployment, secure user access provisioning, hardware troubleshooting, and ticketing efficiency.",
    highlights: [
      "Reimaged and installed Windows OS on workstations, preparing systems for deployment.",
      "Configured user accounts and VPN access for secure user onboarding.",
      "Deployed, upgraded, and troubleshot desktops and hardware.",
      "Managed IT asset inventory and equipment lifecycle records.",
      "Processed workstation setup, retrieval, and replacement requests.",
      "Monitored and documented IT support tickets.",
    ],
    tags: ["Windows OS Imaging", "VPN Configuration", "Hardware Troubleshooting", "IT Asset Tracking", "Ticketing"],
  },
  {
    type: "Capstone Engineering Project", date: "Dec. 2025", title: "Hardware Integration & AI Support Contributor",
    place: "AGROSENTINEL Project Team", location: "Fatima Robotics Lab", color: "green",
    detail: "IoT and NDVI-based crop disease detection and automated spraying robotic platform designed to protect agricultural yields.",
    highlights: [
      "Assisted in the development of an AI-based agricultural robot with automated spraying.",
      "Contributed to hardware assembly and integration, including Raspberry Pi 5, ESP32, motor drivers, sensors, and spraying system.",
      "Helped set up and test robot movement and spraying functionality.",
      "Provided support in training the plant disease detection AI model using image data.",
    ],
    tags: ["Raspberry Pi 5", "ESP32", "AI Model Training", "Motor Drivers", "Sensors", "Automated Spraying"],
  },
  {
    type: "Higher Education", date: "2022 – 2026", title: "Bachelor of Science in Information Technology (BSIT)",
    place: "Our Lady of Fatima University – Quezon City", location: "Quezon City, Philippines", color: "yellow",
    detail: "Four-year degree encompassing software development, relational database systems, networking, and systems administration.",
    highlights: [
      "Built grounded proficiency in Python programming, SQL databases, and Git version control.",
      "Completed hands-on coursework in systems analysis, web development, and information security.",
      "Successfully defended graduation capstone project in IoT robotics and AI image detection.",
    ],
    tags: ["Software Engineering", "Python", "SQL", "Networking", "Database Systems"],
  },
];

export default function Timeline() {
  return (
    <section id="journey" className="section-space scroll-mt-20">
      <div className="section-wrap grid gap-9 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="section-title">Experience, education, and the work between.</h2>
          <p className="section-intro mt-4">A timeline of enterprise IT support, capstone robotics, and my degree at Our Lady of Fatima University.</p>
        </div>
        <ol className="journey-bricks">
          {milestones.map((item) => (
            <li key={item.type} className={`journey-brick journey-brick--${item.color}`}>
              <div className="journey-brick__date">
                <p>{item.date}</p>
                <span>{item.type}</span>
              </div>
              <div className="journey-brick__content">
                {item.type === "Work Experience" ? (
                  <div className="journey-company">
                    <span className="journey-company__logo">
                      <Image src={concentrixLogo} alt="Concentrix logo" width={124} height={22} className="h-auto w-28 sm:w-32" />
                    </span>
                    <div className="min-w-0">
                      <p className="journey-company__name">{item.place}</p>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {item.type === "Higher Education" && <Image src={olfuLogo} alt="Our Lady of Fatima University crest" width={44} height={44} className="h-11 w-11 shrink-0 rounded-md border border-[var(--border)] bg-white object-contain p-1" />}
                    <h3>{item.title}</h3>
                  </div>
                )}
                <p className="journey-brick__place">{item.type === "Work Experience" ? item.location : `${item.place} · ${item.location}`}</p>
                <p className="journey-brick__detail">{item.detail}</p>
                <ul className="journey-highlights">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <ul className="journey-tags" aria-label={`${item.type} topics`}>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
