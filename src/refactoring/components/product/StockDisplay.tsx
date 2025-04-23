type StockDisplayProps = {
    remainingStock: number;
};

export const StockDisplay = ({ remainingStock }: StockDisplayProps) => (
    <div className="text-sm text-gray-500 mb-2">
        <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            재고: {remainingStock}개
        </span>
    </div>
);
