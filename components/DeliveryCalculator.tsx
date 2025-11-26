"use client";

import { useEffect, useState } from "react";
import {
  STORE_LOCATION,
  getDistanceFromLatLonInKm,
  calculateDeliveryFee,
} from "@/utils/location";

export default function DeliveryCalculator({
  onFeeCalculated,
}: {
  onFeeCalculated: (fee: number) => void;
}) {
  const [distance, setDistance] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCalculate() {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Seu navegador não permite pegar a localização.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const dist = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          STORE_LOCATION.lat,
          STORE_LOCATION.lng
        );

        const feeValue = calculateDeliveryFee(dist);

        setDistance(dist);
        setFee(feeValue);
        onFeeCalculated(feeValue);

        setLoading(false);
      },
      () => {
        setError("Não foi possível obter sua localização.");
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    handleCalculate();
  }, []);

  return (
    <p className="mt-1">
      Frete: <strong>R$ {fee}</strong>
    </p>
  );
}
