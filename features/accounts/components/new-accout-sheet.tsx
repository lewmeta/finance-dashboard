'use client'

import { z } from 'zod'

import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { AccountForm } from "@/features/accounts/components/account-form"
import { insertAccountSchema } from '@/db/schema'
import { useCreateAccount } from '@/features/accounts/hooks/use-create-account'

import {
    SheetHeader,
    SheetDescription,
    SheetContent,
    SheetTitle,
    Sheet
} from "@/components/ui/sheet"

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
       mutation.mutate(values, {
        onSuccess: () => {
            onClose();
        },
       });
    };


    const { isOpen, onClose } = useNewAccount()
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="space-y-4 text-start">
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: ''
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}