import { CartItem, Product } from '../../../types';

export const getRemainingStock = (product: Product, cartItems: CartItem[]) => {
    const cartItem = cartItems.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
};
