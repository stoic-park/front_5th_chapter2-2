import { Discount } from '../../../types';
import { DiscountList } from './DiscountList';
type DiscountDisplayProps = {
    maxDiscountPercentage: number;
    discounts: Discount[];
};

export const DiscountDisplay = ({ maxDiscountPercentage, discounts }: DiscountDisplayProps) => (
    <>
        {discounts.length > 0 && (
            <span className="ml-2 font-medium text-blue-600">최대 {maxDiscountPercentage}% 할인</span>
        )}
        <DiscountList discounts={discounts} />
    </>
);
