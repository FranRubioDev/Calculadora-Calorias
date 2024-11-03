import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import { ActivityT } from "../types";
import { ActivityActionsT } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActionsT>;
};

const initialState: ActivityT = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<ActivityT>(initialState);

  const handleChage = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    console.log(isNumberField);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;

    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", paypload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChage}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Ej. Comida, Cena, Gimnasio, Surfear..."
          value={activity.name}
          onChange={handleChage}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Nº Calorias. Ej. 250"
          value={activity.calories}
          onChange={handleChage}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
