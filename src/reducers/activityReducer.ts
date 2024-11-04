import { ActivityT } from "../types";

export type ActivityActionsT =
    { type: "save-activity", payload: { newActivity: ActivityT } } |
    { type: "set-activeId", payload: { id: ActivityT['id'] } } |
    { type: "delete-activity", payload: { id: ActivityT['id'] } } |
    { type: "restart-app" }

export type ActivityStateT = {
  activities: ActivityT[];
  activeId: ActivityT['id']
};


const localStorageActivities = () :ActivityT[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityStateT = {
  activities: localStorageActivities(),
  activeId: ''
};

export const activityReducer = (
  state: ActivityStateT = initialState,
  action: ActivityActionsT
) => {
  if (action.type === "save-activity") {
    // Aquí el código para controlar la lógica para actualizar el state

    let updatedActivities: ActivityT[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) => activity.id === state.activeId ? action.payload.newActivity : activity );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: ""
    }
  }

  if (action.type === 'set-activeId' ) {
    return {
        ...state,
        activeId: action.payload.id
    } 

  }


  if(action.type === 'delete-activity') {
    return {
      ...state,
      activities: state.activities.filter ( activity =>  activity.id !== action.payload.id  )

     } 
  }

  if(action.type === 'restart-app') {
    return {
      activities: [],
      activeId: ''
    }
  }

  return state

};
