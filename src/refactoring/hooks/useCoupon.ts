import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  return { coupons, addCoupon: (newCoupon: Coupon) => {
    setCoupons([...coupons, newCoupon]);
  } };
};
