import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen, within, renderHook } from '@testing-library/react';
import { CartPage } from '../../refactoring/pages/CartPage';
import { AdminPage } from '../../refactoring/pages/AdminPage';
import { ProductProvider, CouponProvider, CartProvider } from '../../refactoring/provider';
import { CartItem, Product, Discount, Coupon } from '../../types';
import { getRemainingStock } from '../../refactoring/hooks/utils/cartUtils';
import {
    getMaxDiscount,
    getAppliedDiscount,
    getMaxDiscountPercentage,
} from '../../refactoring/hooks/utils/discountUtils';
import { useToggleAccordionHandler } from '../../refactoring/hooks/useToggleAccordionHandler';
import { useDiscountHandler } from '../../refactoring/hooks/useDiscountHandler';
import { vi } from 'vitest';

const mockProducts: Product[] = [
    {
        id: 'p1',
        name: '상품1',
        price: 10000,
        stock: 20,
        discounts: [{ quantity: 10, rate: 0.1 }],
    },
    {
        id: 'p2',
        name: '상품2',
        price: 20000,
        stock: 20,
        discounts: [{ quantity: 10, rate: 0.15 }],
    },
    {
        id: 'p3',
        name: '상품3',
        price: 30000,
        stock: 20,
        discounts: [{ quantity: 10, rate: 0.2 }],
    },
];
const mockCoupons: Coupon[] = [
    {
        name: '5000원 할인 쿠폰',
        code: 'AMOUNT5000',
        discountType: 'amount',
        discountValue: 5000,
    },
    {
        name: '10% 할인 쿠폰',
        code: 'PERCENT10',
        discountType: 'percentage',
        discountValue: 10,
    },
];

const TestAdminPage = () => {
    return (
        <ProductProvider initialProducts={mockProducts}>
            <CouponProvider initialCoupons={mockCoupons}>
                <CartProvider>
                    <AdminPage />
                </CartProvider>
            </CouponProvider>
        </ProductProvider>
    );
};

describe('advanced > ', () => {
    describe('시나리오 테스트 > ', () => {
        test('장바구니 페이지 테스트 > ', async () => {
            render(
                <ProductProvider initialProducts={mockProducts}>
                    <CouponProvider initialCoupons={mockCoupons}>
                        <CartProvider>
                            <CartPage />
                        </CartProvider>
                    </CouponProvider>
                </ProductProvider>
            );
            const product1 = screen.getByTestId('product-p1');
            const product2 = screen.getByTestId('product-p2');
            const product3 = screen.getByTestId('product-p3');
            const addToCartButtonsAtProduct1 = within(product1).getByText('장바구니에 추가');
            const addToCartButtonsAtProduct2 = within(product2).getByText('장바구니에 추가');
            const addToCartButtonsAtProduct3 = within(product3).getByText('장바구니에 추가');

            // 1. 상품 정보 표시
            expect(product1).toHaveTextContent('상품1');
            expect(product1).toHaveTextContent('10,000원');
            expect(product1).toHaveTextContent('재고: 20개');
            expect(product2).toHaveTextContent('상품2');
            expect(product2).toHaveTextContent('20,000원');
            expect(product2).toHaveTextContent('재고: 20개');
            expect(product3).toHaveTextContent('상품3');
            expect(product3).toHaveTextContent('30,000원');
            expect(product3).toHaveTextContent('재고: 20개');

            // 2. 할인 정보 표시
            expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

            // 3. 상품1 장바구니에 상품 추가
            fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

            // 4. 할인율 계산
            expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
            expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
            expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

            // 5. 상품 품절 상태로 만들기
            for (let i = 0; i < 19; i++) {
                fireEvent.click(addToCartButtonsAtProduct1);
            }

            // 6. 품절일 때 상품 추가 안 되는지 확인하기
            expect(product1).toHaveTextContent('재고: 0개');
            fireEvent.click(addToCartButtonsAtProduct1);
            expect(product1).toHaveTextContent('재고: 0개');

            // 7. 할인율 계산
            expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
            expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
            expect(screen.getByText('최종 결제 금액: 180,000원')).toBeInTheDocument();

            // 8. 상품을 각각 10개씩 추가하기
            fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
            fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

            const increaseButtons = screen.getAllByText('+');
            for (let i = 0; i < 9; i++) {
                fireEvent.click(increaseButtons[1]); // 상품2
                fireEvent.click(increaseButtons[2]); // 상품3
            }

            // 9. 할인율 계산
            expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
            expect(screen.getByText('할인 금액: 110,000원')).toBeInTheDocument();
            expect(screen.getByText('최종 결제 금액: 590,000원')).toBeInTheDocument();

            // 10. 쿠폰 적용하기
            const couponSelect = screen.getByRole('combobox');
            fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

            // 11. 할인율 계산
            expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
            expect(screen.getByText('할인 금액: 169,000원')).toBeInTheDocument();
            expect(screen.getByText('최종 결제 금액: 531,000원')).toBeInTheDocument();

            // 12. 다른 할인 쿠폰 적용하기
            fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
            expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
            expect(screen.getByText('할인 금액: 115,000원')).toBeInTheDocument();
            expect(screen.getByText('최종 결제 금액: 585,000원')).toBeInTheDocument();
        });

        test('관리자 페이지 테스트 > ', async () => {
            render(<TestAdminPage />);

            const $product1 = screen.getByTestId('product-1');

            // 1. 새로운 상품 추가
            fireEvent.click(screen.getByText('새 상품 추가'));

            fireEvent.change(screen.getByLabelText('상품명'), { target: { value: '상품4' } });
            fireEvent.change(screen.getByLabelText('가격'), { target: { value: '15000' } });
            fireEvent.change(screen.getByLabelText('재고'), { target: { value: '30' } });

            fireEvent.click(screen.getByText('추가'));

            const $product4 = screen.getByTestId('product-4');

            expect($product4).toHaveTextContent('상품4');
            expect($product4).toHaveTextContent('15000원');
            expect($product4).toHaveTextContent('재고: 30');

            // 2. 상품 선택 및 수정
            fireEvent.click($product1);
            fireEvent.click(within($product1).getByTestId('toggle-button'));
            fireEvent.click(within($product1).getByTestId('modify-button'));

            act(() => {
                fireEvent.change(within($product1).getByDisplayValue('20'), { target: { value: '25' } });
                fireEvent.change(within($product1).getByDisplayValue('10000'), { target: { value: '12000' } });
                fireEvent.change(within($product1).getByDisplayValue('상품1'), { target: { value: '수정된 상품1' } });
            });

            fireEvent.click(within($product1).getByText('수정 완료'));

            expect($product1).toHaveTextContent('수정된 상품1');
            expect($product1).toHaveTextContent('12000원');
            expect($product1).toHaveTextContent('재고: 25');

            // 3. 상품 할인율 추가 및 삭제
            fireEvent.click($product1);
            fireEvent.click(within($product1).getByTestId('modify-button'));

            // 할인 추가
            act(() => {
                fireEvent.change(screen.getByPlaceholderText('수량'), { target: { value: '5' } });
                fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), { target: { value: '5' } });
            });
            fireEvent.click(screen.getByText('할인 추가'));

            expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

            // 할인 삭제
            fireEvent.click(screen.getAllByText('삭제')[0]);
            expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
            expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

            fireEvent.click(screen.getAllByText('삭제')[0]);
            expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
            expect(screen.queryByText('5개 이상 구매 시 5% 할인')).not.toBeInTheDocument();

            // 4. 쿠폰 추가
            fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '새 쿠폰' } });
            fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'NEW10' } });
            fireEvent.change(screen.getByRole('combobox'), { target: { value: 'percentage' } });
            fireEvent.change(screen.getByPlaceholderText('할인 값'), { target: { value: '10' } });

            fireEvent.click(screen.getByText('쿠폰 추가'));

            const $newCoupon = screen.getByTestId('coupon-3');

            expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
        });
    });

    describe('유틸 함수 테스트', () => {
        describe('cartUitls', () => {
            describe('getRemainingStock', () => {
                test('장바구니가 비어있을 때는 전체 재고를 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 10000,
                        stock: 10,
                        discounts: [],
                    };
                    const cartItems: CartItem[] = [];
                    const result = getRemainingStock(product, cartItems);
                    expect(result).toBe(10);
                });

                test('장바구니에 상품이 있을 때는 재고를 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 10000,
                        stock: 10,
                        discounts: [],
                    };
                    const cartItems: CartItem[] = [
                        {
                            product,
                            quantity: 3,
                        },
                    ];
                    const result = getRemainingStock(product, cartItems);
                    expect(result).toBe(7);
                });

                test('상품이 품절일 때는 0을 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 10000,
                        stock: 5,
                        discounts: [],
                    };
                    const cartItems: CartItem[] = [
                        {
                            product,
                            quantity: 5,
                        },
                    ];
                    const result = getRemainingStock(product, cartItems);
                    expect(result).toBe(0);
                });
            });
        });

        describe('discountUtils', () => {
            describe('getMaxDiscount', () => {
                test('할인 조건이 없을 때는 0을 반환한다.', () => {
                    const discounts: { quantity: number; rate: number }[] = [];
                    const result = getMaxDiscount(discounts);
                    expect(result).toBe(0);
                });

                test('할인 조건이 있을 때는 최대 할인율을 반환한다.', () => {
                    const discounts: { quantity: number; rate: number }[] = [
                        { quantity: 10, rate: 0.1 },
                        { quantity: 20, rate: 0.2 },
                    ];
                    const result = getMaxDiscount(discounts);
                    expect(result).toBe(0.2);
                });

                test('할인 조건이 같은 할인율을 가질 때는 최대 할인율을 반환한다.', () => {
                    const discounts: { quantity: number; rate: number }[] = [
                        { quantity: 2, rate: 0.1 },
                        { quantity: 5, rate: 0.1 },
                        { quantity: 10, rate: 0.1 },
                    ];
                    const result = getMaxDiscount(discounts);
                    expect(result).toBe(0.1);
                });
            });

            describe('getAppliedDiscount', () => {
                test('할인 조건이 없을 때는 0을 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 10000,
                        stock: 10,
                        discounts: [
                            { quantity: 5, rate: 0.1 },
                            { quantity: 10, rate: 0.2 },
                        ],
                    };
                    const cartItem: CartItem = {
                        product,
                        quantity: 3,
                    };
                    const result = getAppliedDiscount(cartItem);
                    expect(result).toBe(0);
                });

                test('할인 조건이 있을 때는 적용된 할인율을 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 10000,
                        stock: 10,
                        discounts: [
                            { quantity: 2, rate: 0.1 },
                            { quantity: 5, rate: 0.2 },
                            { quantity: 10, rate: 0.15 },
                        ],
                    };
                    const cartItem: CartItem = {
                        product,
                        quantity: 7,
                    };
                    const result = getAppliedDiscount(cartItem);
                    expect(result).toBe(0.2);
                });

                test('할인 조건이 같은 할인율을 가질 때는 최대 할인율을 반환한다.', () => {
                    const product: Product = {
                        id: '1',
                        name: '상품1',
                        price: 1000,
                        stock: 10,
                        discounts: [
                            { quantity: 2, rate: 0.1 },
                            { quantity: 5, rate: 0.2 },
                        ],
                    };
                    const cartItem: CartItem = {
                        product,
                        quantity: 5,
                    };
                    const result = getAppliedDiscount(cartItem);
                    expect(result).toBe(0.2);
                });
            });

            describe('getMaxDiscountPercentage', () => {
                test('할인 조건이 있을 때는 최대 할인율을 반환한다.', () => {
                    const discounts: Discount[] = [
                        { quantity: 2, rate: 0.1 },
                        { quantity: 5, rate: 0.2 },
                        { quantity: 10, rate: 0.15 },
                    ];
                    const result = getMaxDiscountPercentage(discounts);
                    expect(result).toBe(20);
                });

                test('할인 조건이 없을 때는 0을 반환한다.', () => {
                    const discounts: Discount[] = [];
                    const result = getMaxDiscountPercentage(discounts);
                    expect(result).toBe(0);
                });
            });
        });
    });

    describe('커스텀 훅 테스트', () => {
        describe('useToggleAccordionHandler', () => {
            describe('toggleProductAccordion', () => {
                test('상품 아이디를 클릭하면 상품 아이디가 표시된다.', () => {
                    const { result } = renderHook(() => useToggleAccordionHandler());
                    act(() => {
                        result.current.toggleProductAccordion('1');
                    });
                    expect(result.current.openProductIds.has('1')).toBe(true);
                });
                test('상품 아이디를 한번더 클릭하면 상품 아이디가 사라진다.', () => {
                    const { result } = renderHook(() => useToggleAccordionHandler());
                    act(() => {
                        result.current.toggleProductAccordion('1');
                    });
                    expect(result.current.openProductIds.has('1')).toBe(true);
                    act(() => {
                        result.current.toggleProductAccordion('1');
                    });
                    expect(result.current.openProductIds.has('1')).toBe(false);
                });
            });
        });
        describe('useDiscountHandler', () => {
            describe('setNewDiscount', () => {
                test('새로운 할인 정보를 설정할 수 있다.', () => {
                    const { result } = renderHook(() => useDiscountHandler());
                    const updatedDiscount: Discount = {
                        quantity: 5,
                        rate: 0.1,
                    };
                    act(() => {
                        result.current.setNewDiscount(updatedDiscount);
                    });
                    expect(result.current.newDiscount).toEqual(updatedDiscount);
                });
                test('handleAddDiscount 가 호출되면 새로운 할인 정보를 추가할 수 있다.', () => {
                    const { result } = renderHook(() => useDiscountHandler());
                    const productId = '1';
                    const products: Product[] = [
                        {
                            id: productId,
                            name: '상품 1',
                            price: 1000,
                            stock: 10,
                            discounts: [],
                        },
                    ];
                    const editingProduct: Product = {
                        id: productId,
                        name: '상품 1',
                        price: 1000,
                        stock: 10,
                        discounts: [],
                    };
                    const updateProduct = vi.fn();
                    const setEditingProduct = vi.fn();

                    act(() => {
                        result.current.setNewDiscount({
                            quantity: 5,
                            rate: 0.1,
                        });
                    });

                    act(() => {
                        result.current.handleAddDiscount(
                            productId,
                            products,
                            editingProduct,
                            updateProduct,
                            setEditingProduct
                        );
                    });
                    expect(updateProduct).toHaveBeenCalledTimes(1);
                    expect(updateProduct).toHaveBeenCalledWith(
                        expect.objectContaining({
                            id: productId,
                            discounts: [
                                {
                                    quantity: 5,
                                    rate: 0.1,
                                },
                            ],
                        })
                    );

                    expect(result.current.newDiscount).toEqual({
                        quantity: 0,
                        rate: 0,
                    });
                });
                test('handleRemoveDiscount 가 호출되면 할인 정보를 삭제할 수 있다.', () => {
                    const { result } = renderHook(() => useDiscountHandler());
                    const productId = '1';
                    const discountIndex = 0;
                    const products: Product[] = [
                        {
                            id: productId,
                            name: '상품 1',
                            price: 1000,
                            stock: 10,
                            discounts: [
                                {
                                    quantity: 5,
                                    rate: 0.1,
                                },
                            ],
                        },
                    ];
                    const updateProduct = vi.fn();
                    const setEditingProduct = vi.fn();

                    act(() => {
                        result.current.handleRemoveDiscount(
                            productId,
                            discountIndex,
                            products,
                            updateProduct,
                            setEditingProduct
                        );
                    });

                    // Assert
                    expect(setEditingProduct).toHaveBeenCalledTimes(1);
                    expect(setEditingProduct).toHaveBeenCalledWith(
                        expect.objectContaining({
                            id: productId,
                            discounts: [],
                        })
                    );
                });
            });
        });
    });
});
