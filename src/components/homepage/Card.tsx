import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

interface CardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: CardProps) {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-[#12141a] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/50 hover:shadow-lg hover:shadow-lime-300/5"
    >
      <div>
        <div className="relative h-52 w-full overflow-hidden rounded-xl bg-gray-900">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {workout.muscleGroups?.map((muscle) => (
            <span
              key={muscle}
              className="rounded-md bg-lime-300 px-2 py-0.5 text-[10px] font-medium text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-oswald mt-2.5 text-xl font-bold uppercase text-white transition-colors">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-gray-400">{workout.equipment}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-gray-800/80 pt-2 text-xs text-gray-300">
        <span className="flex items-center gap-1.5 font-medium">
          <Clock className="h-3.5 w-3.5 text-lime-300" /> {workout.duration} min
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <Flame className="h-3.5 w-3.5 text-lime-300" />{" "}
          {workout.caloriesBurned} kcal
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <Star className="h-3.5 w-3.5 text-lime-300" /> {workout.rating}
        </span>
      </div>
    </Link>
  );
}
