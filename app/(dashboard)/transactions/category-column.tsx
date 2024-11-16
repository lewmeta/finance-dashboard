import { useOpenCategory } from "@/features/categories/hooks/use-open-category";


type Props = {
    category: string | null;
    categoryId: string | null; 
};

export const CategoryColumn = ({
    category,
    categoryId
}: Props) => {
    const { onOpen: onOpenAccount } = useOpenCategory();

    const onClick = () => {
        onOpenAccount(categoryId!)
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center cursor-pointer hover:underline"
        >
            {category}
        </div>
    )
}