import { Product } from '../../../types';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
    products: Product[];
    cart: { product: Product; quantity: number }[];
    onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, onAddToCart }: ProductListProps) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
            <div className="space-y-2">
                {products.map((product) => {
                    return <ProductListItem key={product.id} product={product} cart={cart} onAddToCart={onAddToCart} />;
                })}
            </div>
        </div>
    );
};
