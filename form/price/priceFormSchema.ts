import * as yup from "yup";

export const schema = yup
  .object({
    pricePerHour: yup.number().required().nullable(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
  })
  .required();

export type PriceFormType = yup.InferType<typeof schema>;

export const defaultValues: PriceFormType = {
  pricePerHour: null,
  startTime: "",
  endTime: "",
};
