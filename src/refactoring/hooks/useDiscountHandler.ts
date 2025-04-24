import { Product, Discount } from '../../types';
import { useState } from 'react';

export const useDiscountHandler = () => {
    const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

    const handleAddDiscount = (
        productId: string,
        products: Product[],
        editingProduct: Product | null,
        onProductUpdate: (updatedProduct: Product) => void,
        setEditingProduct: (product: Product) => void
    ) => {
        const updatedProduct = products.find((p) => p.id === productId);
        if (updatedProduct && editingProduct) {
            const newProduct = {
                ...updatedProduct,
                discounts: [...updatedProduct.discounts, newDiscount],
            };
            onProductUpdate(newProduct);
            setEditingProduct(newProduct);
            setNewDiscount({ quantity: 0, rate: 0 });
        }
    };

    const handleRemoveDiscount = (
        productId: string,
        index: number,
        products: Product[],
        onProductUpdate: (updatedProduct: Product) => void,
        setEditingProduct: (product: Product) => void
    ) => {
        const updatedProduct = products.find((p) => p.id === productId);
        if (updatedProduct) {
            const newProduct = {
                ...updatedProduct,
                discounts: updatedProduct.discounts.filter((_, i) => i !== index),
            };
            onProductUpdate(newProduct);
            setEditingProduct(newProduct);
        }
    };

    return {
        newDiscount,
        setNewDiscount,
        handleAddDiscount,
        handleRemoveDiscount,
    };
};
