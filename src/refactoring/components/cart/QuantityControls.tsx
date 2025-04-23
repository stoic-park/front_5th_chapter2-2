// components/cart/QuantityControls.tsx
type QuantityControlsProps = {
    quantity: number;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    productId: string;
};

export const QuantityControls = ({ quantity, onUpdateQuantity, productId }: QuantityControlsProps) => (
    <div>
        <button
            onClick={() => onUpdateQuantity(productId, quantity - 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
            -
        </button>
        <button
            onClick={() => onUpdateQuantity(productId, quantity + 1)}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
            +
        </button>
    </div>
);
