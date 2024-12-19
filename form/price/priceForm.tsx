"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TimeSelect from "@/components/timeSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PriceFormType, schema } from "./priceFormSchema";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormPropsType } from "../type";
import { ErrorMessage } from "@hookform/error-message";

const PriceForm = ({ appState, onSaveForm }: FormPropsType<PriceFormType>) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: appState.priceForm
    })

    return (
        <form
            onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit((data) => {
                    console.log(data);
                    onSaveForm(data);
                })().catch((err) => console.log(err));
            }}
        >
            <div className="space-y-4">
                <div className="space-y-2 mb-4">
                    <Label htmlFor="input-01">Fees per hour.</Label>
                    <div className="flex flex-col gap-2">
                        <Input placeholder="Input number" type="number" {...form.register("pricePerHour")} />
                        <ErrorMessage
                            errors={form.formState.errors}
                            name="pricePerHour"
                            render={() => <span className="text-destructive text-sm">Required</span>}
                        />
                    </div>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name='startTime'
                                render={({ field }) => {
                                    return (
                                        <TimeSelect
                                            type="start"
                                            onChange={(value) =>
                                                form.setValue('startTime', value)
                                            }
                                            value={field.value}
                                        />
                                    )
                                }}
                            />
                            <ErrorMessage
                                errors={form.formState.errors}
                                name="startTime"
                                render={
                                    ({ message }) => <span className="text-destructive text-sm">{message}</span>
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name='endTime'
                                render={({ field }) => {
                                    return (
                                        <TimeSelect
                                            type="end"
                                            onChange={(value) =>
                                                form.setValue('endTime', value)
                                            }
                                            value={field.value}
                                        />
                                    )
                                }}
                            />
                            <ErrorMessage
                                errors={form.formState.errors}
                                name="endTime"
                                render={
                                    ({ message }) => <span className="text-destructive text-sm">{message}</span>
                                }
                            />
                        </div>
                    </div>
                </div>

                <Button variant={'default'} type='submit'>Next</Button>
            </div>
        </form>
    )
}

export default PriceForm;