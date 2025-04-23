import { CartItem, Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks';
import { ProductList } from '../components/product/ProductList.tsx';
import { CartList } from '../components/cart/CartList.tsx';
import { ApplyCoupon } from '../components/coupon/ApplyCoupon.tsx';
import { OrderSummary } from '../components/order/OrderSummary.tsx';

interface CartPageProps {
    products: Product[];
    coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
    const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart();

    // 계산
    const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
        return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
    };

    //FIXME: 컴포넌트 분리하면서 여기서는 사용하지 안헥 됐다
    // const getRemainingStock = (product: Product) => {
    //     const cartItem = cart.find((item) => item.product.id === product.id);
    //     return product.stock - (cartItem?.quantity || 0);
    // };

    // 외부의 영향을 받지 않도록 수정
    const getRemainingStock = (product: Product, cartItems: CartItem[]) => {
        const cartItem = cartItems.find((item) => item.product.id === product.id);
        return product.stock - (cartItem?.quantity || 0);
    };

    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

    //FIXME: 컴포넌트 분리하면서 여기서는 사용하지 안헥 됐다
    const getAppliedDiscount = (item: CartItem) => {
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">장바구니</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 상품 목록 컴포지션 */}
                <ProductList products={products} cart={cart} onAddToCart={addToCart} />
                {/* 장바구니 내역 컴포지션 */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
                    <CartList cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart} />
                    <ApplyCoupon coupons={coupons} selectedCoupon={selectedCoupon} onApplyCoupon={applyCoupon} />
                    <OrderSummary
                        totalBeforeDiscount={totalBeforeDiscount}
                        totalDiscount={totalDiscount}
                        totalAfterDiscount={totalAfterDiscount}
                    />
                </div>
            </div>
        </div>
    );
};
