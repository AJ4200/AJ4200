import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FaCertificate,
  FaExternalLinkAlt,
  FaFingerprint,
  FaUniversity,
} from "react-icons/fa";
import { certificationsData } from "@/data/certifications";
import CertificationCard from "./Certifications/CertificationCard";

const certifications = certificationsData.filter(
  (certification, index, all) =>
    index ===
    all.findIndex(
      (candidate) =>
        candidate.name === certification.name &&
        candidate.issuingAuthority === certification.issuingAuthority &&
        candidate.dateEarned === certification.dateEarned,
    ),
);

const Certifications: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = certifications[selectedIndex];

  return (
    <section className="py-14 lg:py-20">
      <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
        <div>
          <span className="portfolio-kicker">03 / Learning record</span>
          <h2 className="portfolio-section-title">
            Credential
            <span>wall.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-white/50 lg:justify-self-end">
          Formal checkpoints from the learning path. Select a credential from
          the archive to inspect its issuer, date, and available verification
          record.
        </p>
      </div>

      <div className="certification-layout">
        <div className="certification-wall">
          {certifications.map((certification, index) => (
            <CertificationCard
              certification={certification}
              index={index}
              isActive={selectedIndex === index}
              key={`${certification.name}-${index}`}
              onSelect={() => setSelectedIndex(index)}
            />
          ))}
        </div>

        <div className="certification-viewer">
          <div className="certification-viewer-bar">
            <span>
              <FaFingerprint />
              Credential viewer
            </span>
            <strong>
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(certifications.length).padStart(2, "0")}
            </strong>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, rotateY: -5, y: 10 }}
              initial={{ opacity: 0, rotateY: 5, y: 10 }}
              key={`${selected.name}-${selectedIndex}`}
              transition={{ duration: 0.35 }}
            >
              <div className="certification-document">
                <div className="certification-seal">
                  <FaCertificate />
                </div>
                <span>Certificate of completion</span>
                <h3>{selected.name}</h3>
                <p>This credential was issued to document completed study.</p>
                <div className="certification-signature">
                  <span>
                    <FaUniversity />
                    {selected.issuingAuthority}
                  </span>
                  <span>{selected.dateEarned}</span>
                </div>
              </div>

              <div className="certification-viewer-footer">
                <div>
                  <span>Issuing authority</span>
                  <strong>{selected.issuingAuthority}</strong>
                </div>
                {selected.link ? (
                  <a
                    href={selected.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Verify credential
                    <FaExternalLinkAlt />
                  </a>
                ) : (
                  <span className="certification-unavailable">
                    Verification link unavailable
                  </span>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
