import { useMemo } from "react";
import type { ActivityT } from "../types"
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
    activities :ActivityT[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {
  
  
  
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [activities])
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned , [activities])


    return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen Calorías</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
            calories={caloriesConsumed}
            text="Ingeridas"

        />

<CalorieDisplay
            calories={caloriesBurned}
            text="Quemadas"

        />

        <CalorieDisplay
            calories={netCalories}
            text="Balance"

        />

        </div>

    
    
    
    </>
  )
}