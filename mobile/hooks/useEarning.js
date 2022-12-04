import { useEffect, useState } from "react";
import { getData } from "./useStorage";

export const calculateEarning = (hourlyEarning, timeInSecondsEllapsed) => {
  return (hourlyEarning / 3600) * timeInSecondsEllapsed;
};

export const useEarning = (timeInSecondsEllapsed, currentEarning = 0) => {
  const [hourlyEarning, setHourlyEarning] = useState(0);

  useEffect(() => {
    const getHourlyEarning = async () => {
      const hourlyEarning = await getData("@hourlyEarning");

      setHourlyEarning(Number(hourlyEarning));
    };

    getHourlyEarning();
  }, []);

  const totalEarning =
    currentEarning + calculateEarning(hourlyEarning, timeInSecondsEllapsed);

  return totalEarning;
};
