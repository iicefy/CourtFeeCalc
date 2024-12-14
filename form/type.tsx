import { PlayerFormType } from "./player/playerFormSchema"
import { PriceFormType } from "./price/priceFormSchema"

export type FormPropsType<T> = {
    onSaveForm: (data: T) => void
    onBack?: () => void
    appState: FormType
}

export type FormType = {
    priceForm: PriceFormType
    stage: number
    playerForm: PlayerFormType
}

export type ActionType = {
    type: "UPDATE_PRICE_FORM";
    payload: PriceFormType
} | {
    type: "UPDATE_PLAYER_FORM";
    payload: PlayerFormType
} | {
    type: "BACK_TO_PRICE_FORM"
} | {
    type: "BACK_TO_PLAYER_FORM"
}