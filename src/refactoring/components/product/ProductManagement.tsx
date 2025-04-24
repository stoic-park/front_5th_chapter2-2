import { useProductAddHandler } from '../../hooks/useProductAddHandler';
import { ProductManagementList } from './ProductManagementList';
import { NewProductAddForm } from './NewProductAddForm';

export const ProductManagement = () => {
    const { showNewProductForm, setShowNewProductForm } = useProductAddHandler();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
            {/* 새 상품 추가 버튼 */}
            <button
                onClick={() => setShowNewProductForm(!showNewProductForm)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
                {showNewProductForm ? '취소' : '새 상품 추가'}
            </button>
            {/* 새 상품 추가 폼 */}
            {showNewProductForm && <NewProductAddForm />}
            {/* 상품 목록 */}
            <ProductManagementList />
        </div>
    );
};
