import type { CSSProperties } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

interface MenuCardProps {
  number: string;
  label: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  route: string;
  accent: string;
  icon: IconType;
  info: string[];
  className?: string;
  featured?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({
  number,
  label,
  eyebrow,
  description,
  imageUrl,
  route,
  accent,
  icon: Icon,
  info,
  className = "",
  featured = false,
}) => {
  const style = {
    "--card-accent": accent,
  } as CSSProperties;

  return (
    <Link
      aria-label={`Open ${label}`}
      className={`welcome-card group relative isolate flex min-h-64 overflow-hidden border border-white/20 bg-black/45 p-5 text-white shadow-2xl outline-none transition duration-500 hover:-translate-y-1 hover:border-[var(--card-accent)] focus-visible:-translate-y-1 focus-visible:border-[var(--card-accent)] focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] sm:p-6 ${className}`}
      href={route}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-55 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0 group-focus-visible:scale-105 group-focus-visible:opacity-80 group-focus-visible:grayscale-0"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/65 to-black/10 transition duration-500 group-hover:via-black/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--card-accent)] shadow-[0_0_24px_var(--card-accent)] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex w-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-white/60">
            <span style={{ color: accent }}>{number}</span>
            <span>{eyebrow}</span>
          </div>
          <Icon
            aria-hidden="true"
            className="text-xl text-white/60 transition duration-500 group-hover:scale-110 group-hover:text-[var(--card-accent)] group-focus-visible:text-[var(--card-accent)]"
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {info.map((item) => (
              <span
                className="border border-white/15 bg-black/30 px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-white/55 backdrop-blur-sm"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                className={`font-black uppercase leading-none tracking-tight ${
                  featured ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"
                }`}
                style={{
                  color: accent,
                  textShadow: `0 0 24px ${accent}66, 0 2px 2px rgb(0 0 0 / 0.9)`,
                }}
              >
                {label}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                {description}
              </p>
            </div>

            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/30 text-lg transition duration-500 group-hover:rotate-[-35deg] group-hover:border-[var(--card-accent)] group-hover:bg-[var(--card-accent)] group-hover:text-black group-focus-visible:rotate-[-35deg] group-focus-visible:bg-[var(--card-accent)] group-focus-visible:text-black">
              <FaArrowRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
