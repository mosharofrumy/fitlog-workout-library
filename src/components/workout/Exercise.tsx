
import { Workout } from "@/types/workout";
import WorkoutCard from "../homepage/Card";

interface WorkoutSectionProps {
  workouts: Workout[];
}

export default function Excercise({
  workouts,
}: WorkoutSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Section Heading */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl uppercase font-bold text-white">
          The Library
        </h1>

        <p className="mt-3 text-gray-600">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Workout Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>

    </section>
  );
}