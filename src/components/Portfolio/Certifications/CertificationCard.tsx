import { FaCertificate } from "react-icons/fa";
import type { Certification } from "@/data/certifications";

interface CertificationCardProps {
  certification: Certification;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <button
      aria-pressed={isActive}
      className={`certification-card ${isActive ? "is-active" : ""}`}
      onClick={onSelect}
      type="button"
    >
      <span className="certification-card-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <FaCertificate />
      <span className="certification-card-copy">
        <strong>{certification.name}</strong>
        <small>{certification.issuingAuthority}</small>
        <i>{certification.dateEarned}</i>
      </span>
    </button>
  );
};

export default CertificationCard;
