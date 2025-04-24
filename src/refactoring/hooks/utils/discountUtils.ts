import { Discount, CartItem } from '../../../types';
import { convertToPercentage } from './commonUtils';

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
        if (quantity >= discount.quantity) {
            appliedDiscount = Math.max(appliedDiscount, discount.rate);
        }
    }
    return appliedDiscount;
};

export const getMaxDiscountPercentage = (discounts: Discount[]): number => {
    return convertToPercentage(getMaxDiscount(discounts));
};
