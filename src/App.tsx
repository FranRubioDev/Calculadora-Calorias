import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);


  //Guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities) )
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0 , [state.activities])


  return (
    <>
      <header className="bg-[#e5b53b] py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>
          <button
          className="bg-gray-700 hover:bg-orange-600 p-2 font-bold uppercase text-white cursor-pointer rounded text-sm disabled:opacity-30"
          disabled={!canRestartApp()}
          onClick={() => dispatch({type: 'restart-app'})}
          >
            Reiniciar APP
          </button>
        </div>
      </header>

      <section className="bg-[url('/img/bg-image.avif')] bg-cover bg-center py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
          dispatch={dispatch}
          state={state}
          
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>


      <section className="p-10 mx-auto max-w-4xl">

        <ActivityList
          activities={state.activities}
          dispatch={dispatch} 
        
        />


      </section>



    </>
  );
}

export default App;
