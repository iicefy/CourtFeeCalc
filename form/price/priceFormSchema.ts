import { findIndexOfTime, generateTimeArray } from "@/lib/utils";
import * as yup from "yup";

export const schema = yup
  .object({
    pricePerHour: yup
      .number()
      .required()
      .nullable()
      .test("price", "Price invalid", (value) => {
        if (!value) return false;
        return value > 0;
      }),
    startTime: yup
      .string()
      .required()
      .test("start", "Start time invalid", (value, ctx) => {
        if (!value) return false;
        const timePeriod = generateTimeArray();
        const indexStartTime = findIndexOfTime(timePeriod, value);
        const indexEndTime = findIndexOfTime(timePeriod, ctx.parent.endTime);
        return indexStartTime < indexEndTime;
      }),
    endTime: yup
      .string()
      .required()
      .test("end", "End time invalid", (value, ctx) => {
        if (!value) return false;
        const timePeriod = generateTimeArray();
        const indexStartTime = findIndexOfTime(
          timePeriod,
          ctx.parent.startTime
        );
        const indexEndTime = findIndexOfTime(timePeriod, value);
        return indexStartTime < indexEndTime;
      }),
  })
  .required();

export type PriceFormType = yup.InferType<typeof schema>;

export const defaultValues: PriceFormType = {
  pricePerHour: null,
  startTime: "",
  endTime: "",
};
