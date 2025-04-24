import { ProductListItem } from './ProductListItem';
import { useProductContext } from '../../provider';

export const ProductList = () => {
    const { products } = useProductContext();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
            <div className="space-y-2">
                {products.map((product) => {
                    return <ProductListItem key={product.id} product={product} />;
                })}
            </div>
        </div>
    );
};
