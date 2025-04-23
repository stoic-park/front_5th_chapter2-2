import { Product } from '../../../types';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
    products: Product[];
    cart: { product: Product; quantity: number }[];
    onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, onAddToCart }: ProductListProps) => {
    const getRemainingStock = (product: Product) => {
        const cartItem = cart.find((item) => item.product.id === product.id);
        return product.stock - (cartItem?.quantity || 0);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
            <div className="space-y-2">
                {products.map((product) => {
                    const remainingStock = getRemainingStock(product);
                    return (
                        <ProductListItem
                            key={product.id}
                            product={product}
                            remainingStock={remainingStock}
                            onAddToCart={onAddToCart}
                        />
                    );
                })}
            </div>
        </div>
    );
};
