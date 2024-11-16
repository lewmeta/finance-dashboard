import { useSetState } from 'react-use';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { ImportTable } from './import-table';


type Props = {
    data: string[][]; // A matrix of strings;
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

interface SelectedColumnsState {
    [key: string]: string | null;
};

const deteFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredFields = [
    "amount",
    "date",
    "payee"
];

export const ImportCard = ({
    data,
    onCancel,
    onSubmit
}: Props) => {
    const [selectedColumns, setSelectedColumns] = useSetState<SelectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-lg line-clamp-1">
                        Import Transaction.
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button
                            onClick={onCancel}
                            size="sm"
                            className="w-full lg:w-auto"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeaderSelectedChange={() => { }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}