import { NewCouponAddForm } from './NewCouponAddForm';
import { CouponList } from './CouponList';

export const CouponManagement = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
            <div className="bg-white p-4 rounded shadow">
                {/* 쿠폰 추가 폼 */}
                <NewCouponAddForm />
                {/* 쿠폰 목록 */}
                <CouponList />
            </div>
        </div>
    );
};
