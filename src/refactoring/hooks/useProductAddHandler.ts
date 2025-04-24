import { Product } from '../../types';
import { useState } from 'react';

export const useProductAddHandler = () => {
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        stock: 0,
        discounts: [],
    });

    const handleAddNewProduct = (onProductAdd: (newProduct: Product) => void) => {
        const productWithId = { ...newProduct, id: Date.now().toString() };
        onProductAdd(productWithId);
        setNewProduct({
            name: '',
            price: 0,
            stock: 0,
            discounts: [],
        });
        setShowNewProductForm(false);
    };

    return {
        showNewProductForm,
        setShowNewProductForm,
        newProduct,
        setNewProduct,
        handleAddNewProduct,
    };
};
