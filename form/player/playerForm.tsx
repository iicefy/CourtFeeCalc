import TimeSlider, { PlayerCard, PlayerContainer, PlayerInput } from "@/components/player";
import { FormPropsType } from "../type";
import { PlayerFormType, schema } from "./playerFormSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PlayerForm = ({ appState, onSaveForm, onBack }: FormPropsType<PlayerFormType>) => {
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: appState.playerForm
    })

    const { append, fields, remove } = useFieldArray({
        control: form.control,
        name: 'player'
    })

    console.log(form.watch("player"))

    const onAddUser = (name: string) => {
        append({
            name: name, time: [
                appState.priceForm.startTime,
                appState.priceForm.endTime
            ]
        })
    }

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
                                                return (
                                                    <TimeSlider
                                                        field={field}
                                                        timeStart={appState.priceForm.startTime}
                                                        timeEnd={appState.priceForm.endTime}
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

                <div className="flex gap-2">
                    <Button variant={'default'} type='button' onClick={onBack}>Back</Button>
                    <Button variant={'default'} type='submit'>Next</Button>
                </div>
            </div>
        </form>
    )
}

export default PlayerForm;