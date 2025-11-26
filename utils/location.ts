export const STORE_LOCATION = {
  lat: -23.3584346,
  lng: -47.8611875,
};

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Raio médio da Terra em KM
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function calculateDeliveryFee(distanceKm: number) {
  if (distanceKm <= 1) return 3; // 0–1 km
  if (distanceKm <= 3) return 5; // 1–3 km
  if (distanceKm <= 6) return 8; // 3–6 km
  return 12; // acima de 6 km
}

