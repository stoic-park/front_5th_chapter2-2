import { Product } from '../../../types';

type CartItemInfoProps = {
    product: Product;
    quantity: number;
    appliedDiscount: number;
    dicountPercentage: number;
};

export const CartItemInfo = ({ product, quantity, appliedDiscount, dicountPercentage }: CartItemInfoProps) => {
    return (
        <div>
            <span className="font-semibold">{product.name}</span>
            <br />
            <span className="text-sm text-gray-600">
                {product.price}원 x {quantity}
                {appliedDiscount > 0 && <span className="text-green-600 ml-1">{dicountPercentage}% 할인 적용</span>}
            </span>
        </div>
    );
};
