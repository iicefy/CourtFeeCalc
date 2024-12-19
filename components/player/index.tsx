"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ControllerRenderProps } from "react-hook-form";
import { Slider } from "../ui/slider";
import { cn, findIndexOfTime, findPeriodTime } from "@/lib/utils";

export default function TimeSlider({ field, timeStart, timeEnd }: {
    field: ControllerRenderProps<{
        player: {
            time: (string | undefined)[];
            name: string;
        }[];
    }, `player.${number}.time`>
    timeStart: string;
    timeEnd: string;
}) {
    const skipInterval = 2;
    const period = findPeriodTime(timeStart, timeEnd)
    const defaultStart = findIndexOfTime(period, field.value[0]);
    const defaultEnd = findIndexOfTime(period, field.value[1]);

    return (
        <div>
            <Slider
                defaultValue={[defaultStart, defaultEnd]}
                max={period.length - 1}
                onValueChange={(e) => {
                    field.onChange(e.map((value) => period[value]));
                }}
                minStepsBetweenThumbs={1}
            />

            <span
                className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
                aria-hidden="true"
            >
                {period.map((value, i) => (
                    <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
                        <span
                            className={cn("h-1 w-px bg-muted-foreground/70", i % skipInterval !== 0 && "h-0.5")}
                        />
                        <span className={cn(i % skipInterval !== 0 && "opacity-0")}>{value}</span>
                    </span>
                ))}
            </span>
        </div>
    );
}

const PlayerCard = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="p-4 rounded-md border w-full space-y-4">
            {children}
        </div>
    );
}

const PlayerContainer = ({ children }: {
    children: React.ReactNode;
}) => {

    return (
        <div className="flex flex-col gap-2 w-full">
            {children}
        </div>
    );
}

const PlayerInput = ({ onAddUser }: {
    onAddUser: (name: string) => void;
}) => {
    const [name, setName] = useState<string>('');

    const handleAddUser = () => {
        onAddUser(name);
        setName('');
    }

    return (
        <div className="space-y-2 mb-4">
            <Label htmlFor="input-01">Add Players.</Label>
            <div className="flex gap-2">
                <Input placeholder="Input name" value={name} onChange={(e) => setName(e.target.value)} />
                <Button variant={'outline'} type='button' onClick={handleAddUser}>Add Player</Button>
            </div>
        </div >
    )
}

export {
    PlayerCard,
    PlayerContainer,
    PlayerInput
};