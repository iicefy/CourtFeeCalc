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
                })();
            }}
        >
            <div className="space-y-4">
                <h1 className="text-xl font-bold">Court Calculater</h1>
                <div className="space-y-2 mb-4">
                    <Label htmlFor="input-01">Price per hour.</Label>
                    <Input placeholder="Input number" type="number" {...form.register("pricePerHour")} />
                </div>
                <div className="space-y-2 mb-4">
                    <div className="flex gap-2">
                        <FormField control={form.control} name='startTime' render={({ field }) => {
                            return (
                                <TimeSelect
                                    type="start"
                                    onChange={(value) =>
                                        form.setValue('startTime', value)
                                    }
                                    value={field.value}
                                />
                            )
                        }} />

                        <FormField control={form.control} name='endTime' render={({ field }) => {
                            return (
                                <TimeSelect
                                    type="end"
                                    onChange={(value) =>
                                        form.setValue('endTime', value)
                                    }
                                    value={field.value}
                                />
                            )
                        }} />
                    </div>
                </div>

                <Button variant={'default'} type='submit'>Next</Button>
            </div>
        </form>
    )
}

export default PriceForm;