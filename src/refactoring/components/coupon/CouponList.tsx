import { useCouponContext } from '../../provider/CouponProvider';
import { CouponListItem } from './CouponListItem';
export const CouponList = () => {
    const { coupons } = useCouponContext();

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
            <div className="space-y-2">
                {coupons.map((coupon, index) => (
                    <CouponListItem key={index} coupon={coupon} index={index} />
                ))}
            </div>
        </div>
    );
};
