import { ActivityT } from "../types";

export type ActivityActionsT = {
  type: "save-activity";
  paypload: { newActivity: ActivityT };
};

type ActivityStateT = {
  activities: ActivityT[];
};

export const initialState: ActivityStateT = {
  activities: [],
};

export const activityReducer = (
  state: ActivityStateT = initialState,
  action: ActivityActionsT
) => {
  if (action.type === "save-activity") {
    // Aquí el código para controlar la lógica para actualizar el state

    return {
      ...state,
      activities: [...state.activities, action.paypload.newActivity],
    };
  }
};
