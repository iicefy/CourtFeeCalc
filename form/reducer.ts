import { ActionType, FormType } from "./type";

export const reducer = (state: FormType, action: ActionType): FormType => {
  switch (action.type) {
    case "UPDATE_PRICE_FORM":
      return {
        ...state,
        priceForm: action.payload,
        stage: 1,
      };

    case "UPDATE_PLAYER_FORM":
      return {
        ...state,
        playerForm: action.payload,
        stage: 2,
      };

    case "BACK_TO_PRICE_FORM":
      return {
        ...state,
        stage: 0,
        playerForm: initialState.playerForm,
      };

    case "BACK_TO_PLAYER_FORM":
      return {
        ...state,
        stage: 1,
      };

    default:
      return state;
  }
};

export const initialState: FormType = {
  stage: 0,
  priceForm: {
    pricePerHour: null,
    startTime: "",
    endTime: "",
  },
  playerForm: {
    player: [],
  },
};
