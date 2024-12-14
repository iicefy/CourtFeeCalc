import { FormType } from "@/form/type";
import { calculatePrice, findPeriodTime } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

const Summary = ({ appState, onBack }: {
    appState: FormType,
    onBack: () => void
}) => {
    const periodTime = findPeriodTime(appState.priceForm.startTime, appState.priceForm.endTime)
    const costPerPlayer = calculatePrice(appState.playerForm.player, periodTime)
    const playerCost = appState.playerForm.player.map((player, index) => {
        return {
            name: player.name,
            cost: costPerPlayer[index].toFixed(2)
        }
    })

    if (!playerCost.length) {
        return null
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Summary</h1>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Player</TableHead>
                            <TableHead className="text-right">Pay</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {playerCost.map((player, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{player.name}</TableCell>
                                <TableCell className="text-right">{player.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button variant={'default'} type='button' onClick={onBack}>Back</Button>
        </div>
    )
}

export default Summary;