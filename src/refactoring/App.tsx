import { CartPage } from './pages/CartPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { ProductProvider, CouponProvider, CartProvider } from './provider';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { initialProducts } from './constants/product';
import { initialCoupons } from './constants/coupon';

// TODO:
// 1. 배포
// 2. 제출
// 3. 테스트 코드 작성
// 4. PR 작성

const App = () => {
    const { isAdmin, setIsAdmin } = useAuth();

    const { setLocalStorage } = useLocalStorage();
    setLocalStorage('products', initialProducts);
    setLocalStorage('coupons', initialCoupons);

    return (
        <ProductProvider initialProducts={initialProducts}>
            <CouponProvider initialCoupons={initialCoupons}>
                <CartProvider>
                    <div className="min-h-screen bg-gray-100">
                        <nav className="bg-blue-600 text-white p-4">
                            <div className="container mx-auto flex justify-between items-center">
                                <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
                                <button
                                    onClick={() => setIsAdmin(!isAdmin)}
                                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                                >
                                    {isAdmin ? '장바구니 페이지로' : '관리자 페이지로'}
                                </button>
                            </div>
                        </nav>
                        <main className="container mx-auto mt-6">{isAdmin ? <AdminPage /> : <CartPage />}</main>
                    </div>
                </CartProvider>
            </CouponProvider>
        </ProductProvider>
    );
};

export default App;
