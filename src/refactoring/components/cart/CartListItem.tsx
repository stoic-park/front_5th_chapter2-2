import { CartItem } from '../../../types.ts';
import { CartItemInfo } from './CartItemInfo';
import { QuantityControls } from './QuantityControls';
import { RemoveButton } from './RemoveButton';
import { getAppliedDiscount, getMaxDiscountPercentage } from '../../hooks/utils/discountUtils';

interface CartListItemProps {
    item: CartItem;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveFromCart: (productId: string) => void;
}

export const CartListItem = ({ item, onUpdateQuantity, onRemoveFromCart }: CartListItemProps) => {
    //FIXME: 컨텍스트 빼주기
    // const { getAppliedDiscount, getMaxDiscountPercentage } = useCartContext();

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
            <QuantityControls
                quantity={item.quantity}
                onUpdateQuantity={onUpdateQuantity}
                productId={item.product.id}
            />
            <RemoveButton onRemoveFromCart={onRemoveFromCart} productId={item.product.id} />
        </div>
    );
};
