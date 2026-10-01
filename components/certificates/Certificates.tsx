"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  /** Only set where the completion date is documented on the credential itself. */
  date?: string;
  issuerLogo?: string;
  issuerKind?: "text";
  file: string;
};

const certificates: Certificate[] = [
  { title: "AI Ready ASEAN Programme", issuer: "ASEAN Foundation", issuerLogo: "/certificate-issuers/aseanfoundation.png", file: "AI Ready ASEAN Programme_Certificate.pdf" },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy", issuerLogo: "/certificate-issuers/cisco.svg", file: "CCNA_netacad.pdf" },
  { title: "Cyber Threat Management", issuer: "Cisco Networking Academy", issuerLogo: "/certificate-issuers/cisco.svg", file: "Cyber_Threat_Management_certificate_nbrocacurva4013qc-student-fatima-edu-ph_ce33c3ba-7822-4257-a5f8-bfec59b81447.pdf" },
  { title: "Data Science Essentials with Python", issuer: "Cisco Networking Academy · DICT–ITU DTC Initiative", issuerLogo: "/certificate-issuers/cisco.svg", file: "Data_Science_Essentials_with_Python_certificate_nbrocacurva4013qc-student-fatima-edu-ph_f9a03843-32d2-439d-b985-6319b9c8be1a.pdf" },
  { title: "Data Science Essentials with Python", issuer: "Cisco Networking Academy · DICT–ITU DTC Initiative", issuerLogo: "/certificate-issuers/cisco.svg", file: "DataScienceEssentialswithPythonv120251016-31-zc0akd.pdf" },
  { title: "Introduction to GitHub Version Control", issuer: "Ethel Programming Computer Programming Services", issuerKind: "text", file: "Github_version_control.pdf" },
  { title: "The Internet of Things (IoT): Connecting the Future", issuer: "Ethel Programming Computer Programming Services", issuerKind: "text", file: "Gold-Blue-Modern-Achievement-Certificate-15 (1).pdf" },
  { title: "Intermediate Python for Developers", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Intermediate Python for Developers.pdf" },
  { title: "Intermediate Python", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Intermediate Python.pdf" },
  { title: "Introduction to Data Literacy", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to Data Literacy.pdf" },
  { title: "Introduction to Embeddings with the OpenAI API", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to Embeddings with the OpenAI.pdf" },
  { title: "Introduction to Python for Developers", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to Python for Developers.pdf" },
  { title: "Introduction to Python", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to Python.pdf" },
  { title: "Introduction to Snowflake", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to Snowflake.pdf" },
  { title: "Introduction to SQL", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Introduction to SQL.pdf" },
  { title: "LLMOps Concepts", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "LLMOps Concepts.pdf" },
  { title: "IT Specialist: Networking", issuer: "CertNexus", issuerLogo: "/certificate-issuers/certnexus.png", file: "NETWORKING_CERT.pdf" },
  { title: "Networking Devices and Initial Configuration", issuer: "Cisco Networking Academy", issuerLogo: "/certificate-issuers/cisco.svg", file: "Networking_Devices_and_Initial_Configuration_Badge.pdf" },
  { title: "Network Technician Career Path", issuer: "Cisco Networking Academy", issuerLogo: "/certificate-issuers/cisco.svg", file: "NetworkTechnicianCareerPathUpdate20250502-25-nebw6u.pdf" },
  { title: "Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", date: "July 2026", issuerLogo: "/certificate-issuers/microsoft.svg", file: "Niel Arthur B. Rocacurva.pdf" },
  { title: "Prompt Engineering with the OpenAI API", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Prompt Engineering with the OpenAI API.pdf" },
  { title: "IT Specialist: Python", issuer: "CertNexus", issuerLogo: "/certificate-issuers/certnexus.png", file: "PYTHON_CERT.pdf" },
  { title: "Software Engineering Principles in Python", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Software Engineering Principles in Python.pdf" },
  { title: "Working with Hugging Face", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Working with Hugging Face.pdf" },
  { title: "Working with the OpenAI API", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Working with the OpenAI API.pdf" },
  { title: "Working with the OpenAI Responses API", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Working with the OpenAI Responses API.pdf" },
  { title: "Writing Efficient Python Code", issuer: "DataCamp", issuerLogo: "/certificate-issuers/datacamp.svg", file: "Writing Efficient Python Code.pdf" },
];

function CertificateIssuer({ certificate }: { certificate: Certificate }) {
  if (certificate.issuerKind === "text") {
    return <span className="certificate-issuer-wordmark" aria-hidden="true">Ethel<br />Programming</span>;
  }

  return certificate.issuerLogo ? (
    <Image
      src={certificate.issuerLogo}
      alt=""
      width={certificate.issuer === "ASEAN Foundation" ? 132 : 44}
      height={36}
      className={`certificate-issuer-logo${certificate.issuer === "ASEAN Foundation" ? " certificate-issuer-logo--wide" : ""}`}
      loading="lazy"
    />
  ) : null;
}

function useCertificatesPerPage() {
  // Read once on mount, then track the breakpoint so the page size matches the
  // column count the grid will actually render.
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const mobile = window.matchMedia("(max-width: 639px)");

    const update = () => {
      if (mobile.matches) setPerPage(2);
      else if (query.matches) setPerPage(6);
      else setPerPage(4);
    };

    update();
    query.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return perPage;
}

export default function Certificates() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const perPage = useCertificatesPerPage();
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(certificates.length / perPage));
  // Shrinking the viewport can leave the reader past the last page.
  const safePage = Math.min(page, totalPages - 1);
  const visible = certificates.slice(safePage * perPage, safePage * perPage + perPage);

  // Returning to the top of the section keeps the new group in view on tall screens.
  const goToPage = (next: number) => {
    setPage(Math.max(0, Math.min(next, totalPages - 1)));
    gridRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  const closeViewer = () => dialogRef.current?.close();

  return (
    <section id="certificates" className="section-space scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="section-wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">05 · Certificates</p>
            <h2 className="section-title mt-3">Certificates</h2>
          </div>
          <p className="section-intro">
            {certificates.length} completed courses, certifications, and learning events. Select any certificate to view it.
          </p>
        </div>

        <div className="certificate-grid" ref={gridRef}>
          {visible.map((certificate) => (
            <button
              className="certificate-card"
              type="button"
              key={certificate.file}
              onClick={() => setSelected(certificate)}
              aria-label={`View certificate: ${certificate.title}, issued by ${certificate.issuer}`}
            >
              <span className="certificate-card__issuer-row">
                <span className={`certificate-card__mark${certificate.issuer === "ASEAN Foundation" ? " certificate-card__mark--wide" : ""}`}><CertificateIssuer certificate={certificate} /></span>
                <span className="certificate-card__issuer">{certificate.issuer}</span>
              </span>
              <span className="certificate-card__title">{certificate.title}</span>
              {certificate.date && <span className="certificate-card__date">{certificate.date}</span>}
              <span className="certificate-card__action">View certificate <span aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="certificate-pager" aria-label="Certificate pages">
            <button
              type="button"
              className="certificate-pager__button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 0}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Previous
            </button>

            <p className="certificate-pager__status" role="status" aria-live="polite">
              <span className="certificate-pager__count">{safePage + 1} / {totalPages}</span>
              <span className="certificate-pager__range">
                Showing {safePage * perPage + 1}–{Math.min((safePage + 1) * perPage, certificates.length)} of {certificates.length}
              </span>
            </p>

            <button
              type="button"
              className="certificate-pager__button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage >= totalPages - 1}
            >
              Next <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>

      {selected && (
        <dialog
          className="certificate-viewer"
          ref={dialogRef}
          aria-labelledby="certificate-viewer-title"
          onClose={() => setSelected(null)}
          onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }}
        >
          <div className="certificate-viewer__header">
            <div className="min-w-0">
              <h3 id="certificate-viewer-title" className="certificate-viewer__title">{selected.title}</h3>
              <p className="certificate-viewer__issuer">{selected.issuer}{selected.date ? ` · ${selected.date}` : ""}</p>
            </div>
            <button className="certificate-viewer__close" type="button" onClick={closeViewer} aria-label="Close certificate viewer">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <iframe
            className="certificate-viewer__document"
            title={`${selected.title} certificate PDF`}
            src={`/certificates/${encodeURIComponent(selected.file)}#view=FitH`}
          />
          <p className="certificate-viewer__fallback">
            If the document does not appear, <a href={`/certificates/${encodeURIComponent(selected.file)}`} target="_blank" rel="noreferrer">open the PDF in a new tab</a>.
          </p>
        </dialog>
      )}
    </section>
  );
}
