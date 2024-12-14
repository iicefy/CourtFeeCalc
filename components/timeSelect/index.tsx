import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateTimeArray } from "@/lib/utils";

export default function TimeSelect({ type, onChange, value }: { type: 'start' | 'end', onChange: (value: string) => void, value: string }) {
    const timeArray = generateTimeArray();
    return (
        <div className="space-y-2">
            <Label htmlFor="select-03">{type === "start" ? "Start time" : "End time"}</Label>
            <div className="group relative">
                <Select onValueChange={(value) => onChange(value)} value={value}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Input time" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            timeArray.map((time, index) => (
                                <SelectItem key={index} value={time}>{time}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
