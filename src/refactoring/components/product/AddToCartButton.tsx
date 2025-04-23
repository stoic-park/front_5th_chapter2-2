import { Product } from '../../../types';

type AddToCartButtonProps = {
    remainingStock: number;
    onAddToCart: (product: Product) => void;
    product: Product;
};

export const AddToCartButton = ({ remainingStock, onAddToCart, product }: AddToCartButtonProps) => (
    <button
        onClick={() => onAddToCart(product)}
        className={`w-full px-3 py-1 rounded ${
            remainingStock > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={remainingStock <= 0}
    >
        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
    </button>
);
