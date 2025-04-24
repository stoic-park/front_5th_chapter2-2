import { createContext, useContext } from 'react';
import { Coupon } from '../../types';
import { useCoupons } from '../hooks/useCoupon';

interface CouponContextType {
    coupons: Coupon[];
    addCoupon: (coupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: React.ReactNode }) => {
    // FIXME: 초기값 추가
    const { coupons, addCoupon } = useCoupons([]);

    return <CouponContext.Provider value={{ coupons, addCoupon }}>{children}</CouponContext.Provider>;
};

export const useCouponContext = () => {
    const context = useContext(CouponContext);
    if (!context) throw new Error('CouponContext is not found');
    return context;
};
