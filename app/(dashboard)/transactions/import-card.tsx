import { useSetState } from 'react-use';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { ImportTable } from './import-table';
import { convertAmountToMiliunits } from '@/lib/utils';
import { format, parse } from 'date-fns';


type Props = {
    data: string[][]; // A matrix of strings;
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

interface SelectedColumnsState {
    [key: string]: string | null;
};

const dateFormat = "yyyy-MM-dd HH:mm:ss";
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

    const onTableHeaderSelectedChange = (
        columnIndex: number,
        value: string | null,
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        })

    }

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transfromedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);
                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                });

                return transfromedRow.every((item) => item === null)
                    ? []
                    : transfromedRow;
            }).filter((row) => row.length > 0)
        }

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = cell;
                }

                return acc;
            }, {})
        });

        console.log({ arrayOfData: arrayOfData })
        const formattedData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMiliunits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }))

        console.log({ formattedData: formattedData })
    }
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
                        <Button
                            disabled={progress < requiredFields.length}
                            onClick={handleContinue}
                            className="w-full lg:w-auto"
                        >
                            Continue ({progress} / {requiredFields.length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeaderSelectedChange={onTableHeaderSelectedChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}