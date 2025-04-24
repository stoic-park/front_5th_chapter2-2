import { Discount } from '../../../types';
import { convertToPercentage } from '../../hooks/utils/commonUtils';

type DiscountListProps = {
    discounts: Discount[];
};

export const DiscountList = ({ discounts }: DiscountListProps) => (
    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
        {discounts.map((discount, index) => (
            <li key={index}>
                {discount.quantity}개 이상: {convertToPercentage(discount.rate)}% 할인
            </li>
        ))}
    </ul>
);
