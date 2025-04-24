import { Coupon } from '../../types';
import { useState } from 'react';

export const useCouponHandler = () => {
    const [newCoupon, setNewCoupon] = useState<Coupon>({
        name: '',
        code: '',
        discountType: 'percentage',
        discountValue: 0,
    });

    const handleAddCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
        onCouponAdd(newCoupon);
        setNewCoupon({
            name: '',
            code: '',
            discountType: 'percentage',
            discountValue: 0,
        });
    };

    return {
        newCoupon,
        setNewCoupon,
        handleAddCoupon,
    };
};
