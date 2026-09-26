"use client";
import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";
import { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
 
  const handleAddToPlan = () => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");

      const plan: Workout[] = storedPlan ? JSON.parse(storedPlan) : [];

      const alreadyExists = plan.some((item) => item.id === workout.id);

      if (alreadyExists) {
        toast.info("This workout is already in today's plan.");

        return;
      }

      const updatedPlan = [...plan, workout];

      localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

      window.dispatchEvent(
        new CustomEvent("fitlog:plan-updated", {
          detail: {
            count: updatedPlan.length,
          },
        }),
      );

      toast.success("Workout added to today's plan!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add workout.");
    }
  };

  const handleSaveForLater = () => {
    try {
      const storedSaved = localStorage.getItem("fitlog-saved");

      const saved: Workout[] = storedSaved ? JSON.parse(storedSaved) : [];

      const alreadyExists = saved.some((item) => item.id === workout.id);

      if (alreadyExists) {
        toast.info("This workout is already saved.");

        return;
      }

      const updatedSaved = [...saved, workout];

      localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));

      window.dispatchEvent(
        new CustomEvent("fitlog:saved-updated", {
          detail: {
            count: updatedSaved.length,
          },
        }),
      );
      toast.success("Workout saved for later!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save workout.");
    }
  };

  return (
    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleAddToPlan}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-black transition-all duration-200 hover:brightness-80 active:scale-[0.98]"
      >
        <CalendarPlus className="h-4 w-4" />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={handleSaveForLater}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-600 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-transparent hover:bg-gray-800 active:scale-[0.98]"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}
