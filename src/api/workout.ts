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

  const result = await res.json();
  return Array.isArray(result) ? result : result.data || [];
};

export const getWorkoutById = async (
  id: string | number,
): Promise<Workout | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (res.ok) {
      const result = await res.json();
      return result.data || result;
    }
  } catch (error) {
    console.error("Single fetch failed, falling back to array filter:", error);
  }

  const workouts = await getWorkouts();
  return workouts.find((item) => Number(item.id) === Number(id));
};
