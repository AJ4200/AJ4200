import React from "react";

interface Certification {
  name: string;
  issuingAuthority: string;
  dateEarned: string;
  link: string;
  imageUrl: string;
}

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
}) => {
  return (
    <div className="certification-card bg-acrylic-lime-blur p-4 rounded-md shadow-lg">
      <img
        src={certification.imageUrl}
        alt={certification.name}
        className="w-full h-auto mb-4 rounded-md"
      />
      <div className="certification-details">
        <h3 className="text-lg font-semibold mb-2">{certification.name}</h3>
        <p className="text-sm mb-2">{certification.issuingAuthority}</p>
        <p className="text-xs mb-2">{`Date Earned: ${certification.dateEarned}`}</p>
        <a
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-acrylic-lime hover:text-acrylic-lime-dark transition duration-300"
        >
          View Certification
        </a>
      </div>
    </div>
  );
};

export default CertificationCard;
