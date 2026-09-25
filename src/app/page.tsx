import Hero from "@/components/homepage/Hero";
import Excercise from "@/components/workout/Exercise";

import { getWorkouts } from "@/api/workout";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />
      <Excercise workouts={workouts} />
    </main>
  );
}
