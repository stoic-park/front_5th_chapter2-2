// components/cart/RemoveButton.tsx
type RemoveButtonProps = {
    onRemoveFromCart: (productId: string) => void;
    productId: string;
};

export const RemoveButton = ({ onRemoveFromCart, productId }: RemoveButtonProps) => (
    <button
        onClick={() => onRemoveFromCart(productId)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
        삭제
    </button>
);
