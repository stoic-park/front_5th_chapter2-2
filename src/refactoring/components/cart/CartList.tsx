import { CartItem } from '../../../types.ts';
import { CartListItem } from './CartListItem';

interface CartListProps {
    cart: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveFromCart: (productId: string) => void;
}

export const CartList = ({ cart, onUpdateQuantity, onRemoveFromCart }: CartListProps) => {
    return (
        <div className="space-y-2">
            {cart.map((item) => (
                <CartListItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveFromCart={onRemoveFromCart}
                />
            ))}
        </div>
    );
};
