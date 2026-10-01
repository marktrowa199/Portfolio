import Image from "next/image";
import olfuLogo from "@/components/image/OLFU LOGO.jpg";
import concentrixLogo from "@/components/image/concentrix-logo-trimmed.png";

type Milestone = {
  type: string;
  date: string;
  title: string;
  place: string;
  location: string;
  color: "blue" | "green" | "yellow";
  detail: string;
  highlights: string[];
  tags: string[];
};

const experience: Milestone[] = [
  {
    type: "Work Experience", date: "Feb. 2026 – April 2026", title: "IT Operations Intern",
    place: "Concentrix", location: "Quezon City, Philippines", color: "blue",
    detail: "Enterprise IT support practicum covering workstation deployment, user access provisioning, hardware maintenance, asset lifecycle tracking, and day-to-day support ticket handling.",
    highlights: [
      "Reimaged and deployed Windows operating systems on workstations, preparing units for handover.",
      "Deployed user accounts, credentials, and application access for newly onboarded staff.",
      "Configured VPN access for staff requiring secure remote connectivity to company systems.",
      "Inspected and upgraded desktop units, including component replacement and RAM upgrades.",
      "Maintained IT asset inventory, tagging, and equipment records across the assigned pool.",
      "Processed asset retrieval, return, and transfer requests between users and locations.",
      "Logged, tracked, and resolved IT support tickets within the ticketing system.",
    ],
    tags: ["Device Reimaging", "Account Deployment", "VPN Configuration", "Hardware Upgrades", "RAM Upgrades", "IT Asset Tracking", "Ticketing"],
  },
  {
    type: "Capstone Engineering Project", date: "Dec. 2025", title: "Hardware Integration & AI Support Contributor",
    place: "AGROSENTINEL Project Team", location: "Fatima Robotics Lab", color: "green",
    detail: "IoT and computer-vision based agricultural system for spinach leaf-necrosis detection and automated fungicide spraying, designed to protect agricultural yields.",
    highlights: [
      "Assisted in the development of an agricultural robot with automated fungicide spraying.",
      "Contributed to hardware assembly and integration, including Raspberry Pi 5, ESP32, motor drivers, sensors, and the sprayer.",
      "Helped set up and test robot movement and spraying functionality.",
      "Provided support in training the leaf-necrosis detection model using image data.",
    ],
    tags: ["Raspberry Pi 5", "ESP32", "YOLOv5", "NDVI", "AI Model Training", "Automated Sprayer"],
  },
];

const education: Milestone[] = [
  {
    type: "Higher Education", date: "Graduated: August 2026", title: "Bachelor of Science in Information Technology (BSIT)",
    place: "Our Lady of Fatima University – Quezon City", location: "Quezon City, Philippines", color: "yellow",
    detail: "Four-year degree encompassing software development, relational database systems, networking, and systems administration.",
    highlights: [
      "Built grounded proficiency in Python programming, SQL databases, and Git version control.",
      "Completed hands-on coursework in systems analysis, web development, and information security.",
      "Successfully defended a graduation capstone project in IoT robotics and computer vision.",
    ],
    tags: ["Software Engineering", "Python", "SQL", "Networking", "Database Systems"],
  },
];

function MilestoneList({ items }: { items: Milestone[] }) {
  return (
    <ol className="journey-bricks">
      {items.map((item) => (
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
  );
}

export default function Timeline() {
  return (
    <>
      <section id="experience" className="section-space scroll-mt-20">
        <div className="section-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">01 · Experience</p>
            <h2 className="section-title mt-4">Experience</h2>
            <p className="section-intro mt-4">Work experience and hands-on project work.</p>
          </div>
          <MilestoneList items={experience} />
        </div>
      </section>

      <section id="education" className="section-space scroll-mt-20 border-t border-[var(--border)]">
        <div className="section-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">02 · Education</p>
            <h2 className="section-title mt-4">Education</h2>
            <p className="section-intro mt-4">Academic background and where it started.</p>
          </div>
          <MilestoneList items={education} />
        </div>
      </section>
    </>
  );
}
