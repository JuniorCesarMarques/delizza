export async function getCoords(address: string) {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(address)}`);
  const data = await res.json();

  return data;
}