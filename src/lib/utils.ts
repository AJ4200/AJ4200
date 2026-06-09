// Function to calculate age based on birth year
export function calculateAge(birthYear: number): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
}
