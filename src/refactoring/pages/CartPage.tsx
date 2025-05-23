import { ProductList } from '../components/product/ProductList.tsx';
import { CartList } from '../components/cart/CartList.tsx';
import { ApplyCoupon } from '../components/coupon/ApplyCoupon.tsx';
import { OrderSummary } from '../components/order/OrderSummary.tsx';

export const CartPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">장바구니</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 상품 목록 컴포지션 */}
                <ProductList />
                {/* 장바구니 내역 컴포지션 */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
                    <CartList />
                    <ApplyCoupon />
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};
