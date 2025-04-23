type ProductDisplayProps = {
    name: string;
    price: number;
};

export const ProductDisplay = ({ name, price }: ProductDisplayProps) => (
    <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-600">{price.toLocaleString()}원</span>
    </div>
);
