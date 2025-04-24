import { useProductContext } from '../../provider/ProductProvider';
import { useProductAddHandler } from '../../hooks/useProductAddHandler';
import { ProductManagementList } from './ProductManagementList';

// 상품관리
export const ProductManagement = () => {
    const { addProduct } = useProductContext();

    const { showNewProductForm, setShowNewProductForm, newProduct, setNewProduct, handleAddNewProduct } =
        useProductAddHandler();

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
            {showNewProductForm && (
                <div className="bg-white p-4 rounded shadow mb-4">
                    <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
                    <div className="mb-2">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            상품명
                        </label>
                        <input
                            id="productName"
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                            가격
                        </label>
                        <input
                            id="productPrice"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
                            재고
                        </label>
                        <input
                            id="productStock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={() => handleAddNewProduct(addProduct)}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        추가
                    </button>
                </div>
            )}
            {/* 상품 목록 */}
            <ProductManagementList />
        </div>
    );
};
