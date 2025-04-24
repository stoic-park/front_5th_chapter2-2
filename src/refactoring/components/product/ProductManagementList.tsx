import { useProductContext } from '../../provider/ProductProvider';
import { ProductManagementListItem } from './ProductManagementListItem';

export const ProductManagementList = () => {
    const { products } = useProductContext();

    return (
        <div className="space-y-2">
            {products.map((product, index) => (
                // 상품 목록 아이템
                <ProductManagementListItem key={product.id} product={product} index={index} />
            ))}
        </div>
    );
};
