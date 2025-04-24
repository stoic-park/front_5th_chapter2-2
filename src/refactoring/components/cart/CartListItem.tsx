import { CartItemInfo } from './CartItemInfo';
import { QuantityControls } from './QuantityControls';
import { RemoveButton } from './RemoveButton';
import { useCartContext } from '../../provider';
import { getAppliedDiscount, getMaxDiscountPercentage } from '../../hooks/utils/discountUtils';
import { CartItem } from '../../../types';

export const CartListItem = ({ item }: { item: CartItem }) => {
    const { updateQuantity, removeFromCart } = useCartContext();

    // 계산 로직
    const appliedDiscount = getAppliedDiscount(item);
    const dicountPercentage = getMaxDiscountPercentage(item.product.discounts);

    return (
        <div className="flex justify-between items-center bg-white p-3 rounded shadow">
            <CartItemInfo
                product={item.product}
                quantity={item.quantity}
                appliedDiscount={appliedDiscount}
                dicountPercentage={dicountPercentage}
            />
            <QuantityControls quantity={item.quantity} onUpdateQuantity={updateQuantity} productId={item.product.id} />
            <RemoveButton onRemoveFromCart={removeFromCart} productId={item.product.id} />
        </div>
    );
};
