import { CartListItem } from './CartListItem';
import { useCartContext } from '../../provider';

export const CartList = () => {
    const { cart } = useCartContext();

    return (
        <div className="space-y-2">
            {cart.map((item) => (
                <CartListItem key={item.product.id} item={item} />
            ))}
        </div>
    );
};
