import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);


  return {
    products,
    // 어드빈 페이지 - 제품 수정 
    updateProduct: (updatedProduct: Product) => {
      setProducts(products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ));
    },
    addProduct: (newProduct: Product) => {
      console.log("🚀 ~ useProducts ~ newProduct", newProduct)
      setProducts([...products, newProduct]);
    },
  };
};
