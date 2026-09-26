import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getWorkoutById, getWorkouts } from "@/api/workout";
import WorkoutActions from "@/components/actions/WorkoutAction";

interface ExercisePageProps {
  params: Promise<{ id: string }>;
}

export default async function ExerciseDetailPage({
  params,
}: ExercisePageProps) {
  const { id } = await params;

  const [workout, workouts] = await Promise.all([
    getWorkoutById(id),
    getWorkouts(),
  ]);

  if (!workout) {
    notFound();
  }

  const currentIndex = workouts.findIndex(
    (item) => Number(item.id) === Number(workout.id),
  );

  const prevWorkout = currentIndex > 0 ? workouts[currentIndex - 1] : null;
  const nextWorkout =
    currentIndex < workouts.length - 1 ? workouts[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[#090a0f] px-5 py-6 text-white">
      <div className="relative mx-auto w-full max-w-[925px]">
       
        <Link
          href="/"
          aria-label="Close"
          className="absolute -right-[8px] -top-[10px] z-30 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#343740] bg-[#15171d] text-white transition-all hover:border-[#555963] hover:bg-[#20232b] hover:text-white"
        >
          <X className="h-[17px] w-[17px]" />
        </Link>

        {prevWorkout && (
          <Link
            href={`/exercise/${prevWorkout.id}`}
            aria-label="Previous workout"
            className="absolute -left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-black/80 text-gray-300 opacity-40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gray-500 hover:bg-gray-500 hover:text-white hover:opacity-70 sm:-left-7"
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
        )}

        {nextWorkout && (
          <Link
            href={`/exercise/${nextWorkout.id}`}
            aria-label="Next workout"
            className="absolute -right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-black/80 text-gray-300 opacity-40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gray-500 hover:bg-gray-500 hover:text-white hover:opacity-70 sm:-right-7"
          >
            <ChevronRight className="h-6 w-6" />
          </Link>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[34px]">
         
          <div className="w-full">
            <div className="relative h-[670px] w-full overflow-hidden rounded-[14px] bg-[#1a1c21]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

       
          <div className="flex h-[670px] w-full flex-col justify-between">
       
            <div>
             
              <h1 className="font-oswald text-[32px] font-normal uppercase leading-[38px] tracking-[0.2px] text-white">
                {workout.name}
              </h1>

         
              <p className="mt-[8px] text-[13px] leading-[19px] text-[#b1b3bb]">
                {workout.description}
              </p>

     
              <div className="mt-[13px] flex flex-wrap gap-[7px]">
                {workout.muscleGroups?.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-[11px] py-[4px] text-[12px] font-medium leading-[13px] text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="mt-[19px] overflow-hidden rounded-[14px] border border-[#292c33] bg-[#1a1c22]">
                <SpecRow label="EQUIPMENT" value={workout.equipment} />
                <SpecRow label="DIFFICULTY" value={workout.difficulty} />
                <SpecRow label="SETS" value={String(workout.sets)} />
                <SpecRow label="REPS" value={workout.reps} />
                <SpecRow label="DURATION" value={`${workout.duration} min`} />
                <SpecRow
                  label="CALORIES"
                  value={`${workout.caloriesBurned} kcal`}
                />
                <SpecRow
                  label="RATING"
                  value={String(workout.rating)}
                  last
                />
              </div>

           
              <section className="mt-[27px]">
                <h2 className="font-oswald text-[21px] font-normal uppercase leading-[26px] tracking-[0.2px] text-white">
                  INSTRUCTIONS
                </h2>

                <ol className="mt-[11px] space-y-[10px] text-[13px] leading-[18px] text-white">
                  {workout.instructions?.map((step, index) => (
                    <li key={index} className="flex items-start gap-[7px]">
                      <span className="shrink-0 font-medium text-white">
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex h-[40px] items-center justify-between px-[13px] ${
        !last ? "border-b border-[#292c33]" : ""
      }`}
    >
     
      <span className="font-oswald text-[11px] font-normal uppercase leading-none text-white">
        {label}
      </span>

     
      <span className="text-[13px] font-normal leading-none text-white">
        {value}
      </span>
    </div>
  );
}