import { Star, StarHalf } from "lucide-react";

export function isNumericRating(r: string | null | undefined): boolean {
  return !!r && /^[0-9]+[.,]?[0-9]*$/.test(r.trim());
}

export function parseNumericRating(r: string): number {
  const normalized = r.replace(",", ".").trim();
  const num = parseFloat(normalized);
  if (isNaN(num)) return 0;
  return Math.max(0, Math.min(5, num));
}

export function getRatingColor(r: string | null | undefined) {
  if (!r) return "text-zinc-500";
  const lower = r.toLowerCase();
  if (lower.includes("positive")) return "text-green-500";
  if (lower.includes("mixed")) return "text-yellow-500";
  if (lower.includes("negative")) return "text-red-500";
  return "text-zinc-800";
}

export function renderStars(value: number) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (value >= i + 1) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      );
    } else if (value >= i + 0.5) {
      stars.push(
        <StarHalf key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      );
    }
  }
  return <div className="flex items-center space-x-0.5">{stars}</div>;
}
