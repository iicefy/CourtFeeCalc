import * as yup from "yup";

const playerSchema = yup.object({
  name: yup.string().required(),
  time: yup.array().of(yup.string()).required(),
});

export const schema = yup.object({
  player: yup.array().of(playerSchema).required(),
});

export type PlayerFormType = yup.InferType<typeof schema>;
export const defaultValues: PlayerFormType = {
  player: [],
};
