import TimeSlider, { PlayerCard, PlayerContainer, PlayerInput } from "@/components/player";
import { FormPropsType } from "../type";
import { PlayerFormType, schema } from "./playerFormSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { findIndexOfTime, findPeriodTime } from "@/lib/utils";

const PlayerForm = ({ appState, onSaveForm, onBack }: FormPropsType<PlayerFormType>) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: appState.playerForm
    })

    const { append, fields, remove } = useFieldArray({
        control: form.control,
        name: 'player'
    })

    const onAddUser = (name: string) => {
        append({
            name: name, time: [
                appState.priceForm.startTime,
                appState.priceForm.endTime
            ]
        })
    }

    const period = findPeriodTime(appState.priceForm.startTime, appState.priceForm.endTime)

    return (
        <form onSubmit={
            (evt) => {
                evt.preventDefault();
                form.handleSubmit((data) => {
                    onSaveForm(data);
                })()
            }
        }>
            <div className="space-y-4">
                <PlayerInput onAddUser={onAddUser} />
                {
                    fields.length !== 0 && (
                        <PlayerContainer>
                            {fields.map((field, index) => {
                                return (
                                    <PlayerCard key={field.id}>
                                        <div className="flex w-full gap-2">
                                            <Input placeholder="Input name" {...form.register(`player.${index}.name`)} />
                                            <Button variant={'destructive'} type='button' onClick={() => {
                                                remove(index)
                                            }}>Remove</Button>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`player.${index}.time`}
                                            render={({ field }) => {

                                                const defaultStart = findIndexOfTime(period, field.value[0] || appState.priceForm.startTime);
                                                const defaultEnd = findIndexOfTime(period, field.value[1] || appState.priceForm.endTime);
                                                const values: number[] = [defaultStart, defaultEnd]

                                                return (
                                                    <TimeSlider
                                                        value={values}
                                                        period={period}
                                                        onChange={(value) => {
                                                            field.onChange(value.map((v) => period[v]))
                                                        }}
                                                    />
                                                )
                                            }}
                                        />
                                    </PlayerCard>
                                )
                            })}
                        </PlayerContainer>
                    )
                }

                <ErrorMessage
                    errors={form.formState.errors}
                    name="player"
                    render={({ message }) => <span className="text-destructive text-sm">{message}</span>}
                />

                <div className="flex gap-2">
                    <Button variant={'default'} type='button' onClick={onBack}>Back</Button>
                    <Button variant={'default'} type='submit'>Next</Button>
                </div>
            </div>
        </form>
    )
}

export default PlayerForm;