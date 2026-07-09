export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
};

export const brandName = "Hassan Masood";
export const brandTagline = "Sr AI/ML Engineer";
export const brandEmail = "hassan.masood@email.com";
export const brandPhone = "+92 300 0000000";
export const brandLinkedIn = "https://linkedin.com/in/hassan-masood";
export const brandLocation = "Lahore, Pakistan";