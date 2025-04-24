import { createContext, useContext } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { useCart } from '../hooks/useCart';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    applyCoupon: (coupon: Coupon) => void;
    calculateTotal: () => { totalBeforeDiscount: number; totalAfterDiscount: number; totalDiscount: number };
    selectedCoupon: Coupon | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart();

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('CartContext is not found');
    return context;
};
