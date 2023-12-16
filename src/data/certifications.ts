interface Certification {
  name: string;
  issuingAuthority: string;
  dateEarned: string;
  link: string;
  imageUrl: string;
}

const certificationsData: Certification[] = [
  {
    name: "Certified Full Stack Developer",
    issuingAuthority: "Tech Certification Institute",
    dateEarned: "2021-08-15",
    link: "https://example.com/certification1",
    imageUrl: "https://example.com/certification1-image.jpg",
  },
  {
    name: "Advanced TypeScript Certification",
    issuingAuthority: "Code Mastery Academy",
    dateEarned: "2020-12-01",
    link: "https://example.com/certification2",
    imageUrl: "https://example.com/certification2-image.jpg",
  },
  // Add more certifications as needed
];

export { certificationsData };
export type { Certification };
