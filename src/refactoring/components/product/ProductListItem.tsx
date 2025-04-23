import { Product, CartItem } from '../../../types';
import { getMaxDiscountPercentage } from '../../hooks/utils/discountUtils';
import { getRemainingStock } from '../../hooks/utils/cartUtils';
import { ProductDisplay } from './ProductDisplay';
import { DiscountDisplay } from './DiscountDisplay';
import { StockDisplay } from './StockDisplay';
import { AddToCartButton } from './AddToCartButton';

interface ProductListItemProps {
    product: Product;
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
}

export const ProductListItem = ({ product, cart, onAddToCart }: ProductListItemProps) => {
    const maxDiscountPercentage = getMaxDiscountPercentage(product.discounts);
    const remainingStock = getRemainingStock(product, cart);

    return (
        <div key={product.id} data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
            <ProductDisplay name={product.name} price={product.price} />
            <StockDisplay remainingStock={remainingStock} />
            <DiscountDisplay maxDiscountPercentage={maxDiscountPercentage} discounts={product.discounts} />
            <AddToCartButton remainingStock={remainingStock} onAddToCart={onAddToCart} product={product} />
        </div>
    );
};
