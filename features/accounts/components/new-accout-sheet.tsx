'use client'

import {
    SheetHeader,
    SheetDescription,
    SheetContent,
    SheetTitle,
    Sheet
} from "@/components/ui/sheet"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"

export const NewAccountSheet = () => {
    const {isOpen, onClose} = useNewAccount()
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="space-y-4">
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}