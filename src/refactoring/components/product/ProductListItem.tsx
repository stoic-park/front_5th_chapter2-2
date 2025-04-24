import { Product } from '../../../types';
import { getMaxDiscountPercentage } from '../../hooks/utils/discountUtils';
import { getRemainingStock } from '../../hooks/utils/cartUtils';
import { ProductDisplay } from './ProductDisplay';
import { DiscountDisplay } from './DiscountDisplay';
import { StockDisplay } from './StockDisplay';
import { AddToCartButton } from './AddToCartButton';
import { useCartContext } from '../../provider';

interface ProductListItemProps {
    product: Product;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
    const { cart, addToCart } = useCartContext();

    // 계산 로직
    const maxDiscountPercentage = getMaxDiscountPercentage(product.discounts);
    const remainingStock = getRemainingStock(product, cart);

    return (
        <div key={product.id} data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
            <ProductDisplay name={product.name} price={product.price} />
            <StockDisplay remainingStock={remainingStock} />
            <DiscountDisplay maxDiscountPercentage={maxDiscountPercentage} discounts={product.discounts} />
            <AddToCartButton remainingStock={remainingStock} onAddToCart={addToCart} product={product} />
        </div>
    );
};
