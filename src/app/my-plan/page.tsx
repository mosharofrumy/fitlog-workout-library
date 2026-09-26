"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Clock, Flame, Star, X, Check } from "lucide-react";
import { Workout } from "@/types/workout";

export default function MyPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const tabQuery = searchParams.get("tab");
  const activeTab: "today" | "saved" = tabQuery === "saved" ? "saved" : "today";

  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isClient, setIsClient] = useState(false);
 
  const loadStoredData = () => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      setPlanWorkouts(storedPlan ? JSON.parse(storedPlan) : []);
      setSavedWorkouts(storedSaved ? JSON.parse(storedSaved) : []);
    } catch (error) {
      console.error("Failed to parse workouts from localStorage", error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadStoredData();

    const handlePlanUpdate = () => loadStoredData();
    const handleSavedUpdate = () => loadStoredData();

    window.addEventListener("fitlog:plan-updated", handlePlanUpdate);
    window.addEventListener("fitlog:saved-updated", handleSavedUpdate);

    return () => {
      window.removeEventListener("fitlog:plan-updated", handlePlanUpdate);
      window.removeEventListener("fitlog:saved-updated", handleSavedUpdate);
    };
  }, []);

  const currentList = activeTab === "today" ? planWorkouts : savedWorkouts;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [currentList, sortBy]);

  const totalExercises = sortedList.length;

  const totalMinutes = useMemo(() => {
    return currentList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  }, [currentList]);

  const totalCalories = useMemo(() => {
    return currentList.reduce(
      (acc, curr) => acc + (curr.caloriesBurned || 0),
      0,
    );
  }, [currentList]);

  const handleTabChange = (tab: "today" | "saved") => {
    router.push(`/my-plan?tab=${tab}`, { scroll: false });
  };

  const handleMarkAsDone = (id: string | number) => {
    const updatedPlan = planWorkouts.filter((item) => item.id !== id);
    setPlanWorkouts(updatedPlan);
    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));
    window.dispatchEvent(new Event("fitlog:plan-updated"));

    toast.success("Workout logged -- nice work!", {
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleRemove = (id: string | number) => {
    if (activeTab === "today") {
      const updatedPlan = planWorkouts.filter((item) => item.id !== id);
      setPlanWorkouts(updatedPlan);
      localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));
      window.dispatchEvent(new Event("fitlog:plan-updated"));

      toast.info("Removed from Today's Plan", {
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      const updatedSaved = savedWorkouts.filter((item) => item.id !== id);
      setSavedWorkouts(updatedSaved);
      localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));
      window.dispatchEvent(new Event("fitlog:saved-updated"));

      toast.info("Removed from saved", {
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  if (!isClient) {
    return <div className="min-h-screen bg-[#0c0d10]" />;
  }

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-wider text-white sm:text-4xl">
            MY PLAN
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12141a]">
          <div className="border-r border-gray-800/80 p-5 sm:p-6">
            <p className="text-xs font-semibold text-gray-400 sm:text-sm">
              Exercises
            </p>
            <p className="mt-2 text-2xl font-black text-[#ccff00] sm:text-4xl">
              {totalExercises}
            </p>
          </div>

          <div className="border-r border-gray-800/80 p-5 sm:p-6">
            <p className="text-xs font-semibold text-gray-400 sm:text-sm">
              Minutes
            </p>
            <p className="mt-2 text-2xl font-black text-white sm:text-4xl">
              {totalMinutes}
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold text-gray-400 sm:text-sm">
              Calories
            </p>
            <p className="mt-2 text-2xl font-black text-white sm:text-4xl">
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="inline-flex rounded-xl border border-gray-800 bg-[#12141a] p-1">
            <button
              onClick={() => handleTabChange("today")}
              className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === "today"
                  ? "bg-gray-950 text-lime-300 shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => handleTabChange("saved")}
              className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === "saved"
                  ? " bg-gray-950 text-lime-300 shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-400 sm:text-sm">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "duration" | "calories" | "rating")
              }
              className="cursor-pointer rounded-xl border border-gray-800 bg-[#12141a] px-4 py-2 text-xs font-semibold text-white outline-none focus:border-[#ccff00] sm:text-sm"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          {sortedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800/80 bg-[#12141a] px-6 py-20 text-center">
              <h3 className="text-base font-black tracking-wider text-white uppercase sm:text-lg">
                NOTHING HERE YET
              </h3>
              <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="mt-6 rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:text-sm"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedList.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-800/80 bg-[#12141a] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-800">
                      <Image
                        src={workout.image || "/placeholder.jpg"}
                        alt={workout.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                        {workout.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-400">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex items-center gap-4 text-xs font-medium text-gray-300">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
                          {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 text-[#ccff00]" />
                          {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <Link
                      href={`/exercise/${workout.id}`}
                      className="rounded-full border border-gray-700 bg-transparent px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => handleMarkAsDone(workout.id)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95"
                      >
                        <Check className="h-4 w-4" />
                        Mark as Done
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="cursor-pointer p-1 text-gray-400 transition-colors hover:text-white"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
