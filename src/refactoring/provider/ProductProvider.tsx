import { createContext, useContext } from 'react';
import { Product } from '../../types';
import { useProducts } from '../hooks/useProduct';

interface ProductContextType {
    products: Product[];
    updateProduct: (product: Product) => void;
    addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    // FIXME: 초기값 추가
    const { products, updateProduct, addProduct } = useProducts([]);

    return (
        <ProductContext.Provider value={{ products, updateProduct, addProduct }}>{children}</ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('ProductContext is not found');
    return context;
};
