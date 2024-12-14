"use client";

import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import PriceForm from "./price/priceForm";
import PlayerForm from "./player/playerForm";
import Summary from "@/components/summary";

const MainForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderForm = () => {
    switch (state.stage) {
      case 0:
        return <PriceForm
          appState={state}
          onSaveForm={(data) => dispatch({
            type: 'UPDATE_PRICE_FORM',
            payload: data
          })}
        />
      case 1:
        return (
          <PlayerForm
            appState={state}
            onSaveForm={(data) => dispatch({
              type: 'UPDATE_PLAYER_FORM',
              payload: data
            })}
            onBack={() => dispatch({ type: 'BACK_TO_PRICE_FORM' })}
          />

        )

      case 2: return <Summary appState={state} onBack={() => {
        dispatch({ type: 'BACK_TO_PLAYER_FORM' })
      }}/>


    }
  }

  return renderForm()
};

export default MainForm;
