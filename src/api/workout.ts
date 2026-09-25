import type { Workout } from "@/types/workout";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";
const REVALIDATE_TIME = 24 * 3600;

export const getWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch(BASE_URL, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts list");
  }

  return res.json();
};

export const getWorkout = async (id: number): Promise<Workout> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch workout with ID: ${id}`);
  }

  return res.json();
};
