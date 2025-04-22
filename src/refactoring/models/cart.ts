import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
    const { quantity, product } = item;
    const { price } = product;
    const total = price * quantity;
    const applicableDiscount = getMaxApplicableDiscount(item);
    return total * (1 - applicableDiscount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
    const { quantity, product } = item;
    const { discounts } = product;

    const applicableDiscount = discounts.reduce((maxDiscount, d) => {
        return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
    }, 0);

    return applicableDiscount;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;

    cart.forEach((item) => {
        const { price } = item.product;
        const { quantity } = item;
        totalBeforeDiscount += price * quantity;
        const discount = item.product.discounts.reduce((maxDiscount, d) => {
            return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
        }, 0);
        totalAfterDiscount += price * quantity * (1 - discount);
    });

    let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    // 쿠폰 적용
    if (selectedCoupon) {
        if (selectedCoupon.discountType === 'amount') {
            totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
        } else {
            totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
        }
        totalDiscount = totalBeforeDiscount - totalAfterDiscount;
    }
    return {
        totalBeforeDiscount: Math.round(totalBeforeDiscount),
        totalAfterDiscount: Math.round(totalAfterDiscount),
        totalDiscount: Math.round(totalDiscount),
    };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
    if (newQuantity <= 0) {
        return cart.filter((item) => item.product.id !== productId);
    }

    const updatedCart = cart.map((item) => {
        if (item.product.id === productId) {
            const quantity = item.product.stock >= newQuantity ? newQuantity : item.product.stock;
            return {
                ...item,
                quantity,
            };
        }
        return item;
    });
    return updatedCart;
};
