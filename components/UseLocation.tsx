"use client";

import { useEffect, useState } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DeliveryResult {
  distanceKm: number;
  deliveryFee: number;
}

export interface UseLocationProps {
  onLocation: (coords: Coordinates) => void;
}

export default function UseLocation({ onLocation }: UseLocationProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        onLocation(coords);
      },
      (err) => {
        setError("Permissão negada para acessar a localização.");
      }
    );
  }, []);

  return (
    <div className="text-sm text-red-500 mt-2">
      {error}
    </div>
  );
}
