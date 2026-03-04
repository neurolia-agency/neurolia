/**
 * NEUROLIA EMPHASIS — "L'Éclat"
 *
 * Text emphasis through warmth and light, not weight.
 * A gleam of warm light passes through terracotta-colored text,
 * like a reflection on heated metal. No bold, no underline.
 *
 * Technique: background-clip: text + animated gradient (background-position).
 * Base color #C45C3B, gleam peak #F5DED2, cycle every 5s.
 *
 * Variants:
 * - "eclat"  — terracotta text with gleam passing through (default)
 * - "trace"  — eclat + Lexend font shift (typographic contrast)
 * - "marque" — terracotta text + vertical bar left (brand DNA)
 *
 * Guidelines:
 * - Use sparingly: 1-2 per section max, on key benefit phrases
 * - Works inline for 3-6 words within body text
 * - prefers-reduced-motion: static terracotta color, no animation
 *
 * CSS: app/globals.css (section "NEUROLIA EMPHASIS — L'Éclat")
 *
 * Usage:
 *   <NrEmphasis>texte important</NrEmphasis>
 *   <NrEmphasis variant="trace">texte clé</NrEmphasis>
 *   <NrEmphasis variant="marque">texte marqué</NrEmphasis>
 */

interface NrEmphasisProps {
  children: React.ReactNode;
  variant?: "eclat" | "trace" | "marque";
  className?: string;
}

export function NrEmphasis({
  children,
  variant = "eclat",
  className = "",
}: NrEmphasisProps) {
  return (
    <em className={`nr-${variant}${className ? ` ${className}` : ""}`}>
      {children}
    </em>
  );
}
