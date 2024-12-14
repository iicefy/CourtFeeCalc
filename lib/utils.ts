import { PlayerFormType } from "@/form/player/playerFormSchema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTimeArray() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedTime = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
      times.push(formattedTime);
    }
  }
  return times;
}

export const findIndexOfTime = (period: string[], time?: string) => {
  if (!time) {
    return 0;
  }

  return period.indexOf(time);
};

export function findPeriodTime(startTime: string, endTime: string) {
  const timeArray = generateTimeArray();
  const start = findIndexOfTime(timeArray, startTime);
  const end = findIndexOfTime(timeArray, endTime);
  return timeArray.slice(start, end + 1);
}

export function findHoursAmount(startTime: string, endTime: string) {
  const timeArray = findPeriodTime(startTime, endTime);
  return (timeArray.length - 1) / 2;
}

export function calculatePrice(
  players: PlayerFormType["player"],
  timePeriod: ReturnType<typeof findPeriodTime>
) {
  const playerPeriod = players.map((player) => {
    return findPeriodTime(player.time[0] || "", player.time[1] || "");
  });

  const playerInPeriod: Record<string, number> = timePeriod.reduce(
    (acc, time, i, arr) => {
      if (i === 0) {
        return acc;
      }

      const previousTime = arr[i - 1];

      return {
        ...acc,
        [previousTime]: playerPeriod.filter(
          (period) => period.includes(time) && period.includes(previousTime)
        ).length,
      };
    },
    {}
  );

  const pricePerHour = 100;
  const pricePerPeriod = pricePerHour / 2;

  playerPeriod.forEach((period) => {
    console.log(period);
  });

  const playerPrice = playerPeriod.map((period) => {
    return period.reduce((acc, time, index) => {
      if (index === period.length - 1) {
        return acc;
      }

      if (!playerInPeriod[time]) {
        return acc;
      }

      return acc + pricePerPeriod / playerInPeriod[time];
    }, 0);
  });

  return playerPrice;
}
