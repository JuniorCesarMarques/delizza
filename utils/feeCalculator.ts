export function feeCalculator(distanceKm: number) {
  if (distanceKm <= 2) return 5;
  if (distanceKm <= 5) return 8;
  if (distanceKm <= 8) return 12;
  if (distanceKm <= 12) return 16;

  throw new Error("Fora da área");
}
