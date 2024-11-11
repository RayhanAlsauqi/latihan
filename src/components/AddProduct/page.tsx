import { useStore } from "@/store/StoreProducts";
import React, { useEffect, useState } from "react";

export default function AddProduct() {

  const { products, fetchProducts, loading, error } = useStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])



  return (
    <div>
      {
        products.map((product) => (
          <div key={product.id}>
            {product.title} - {product.price}
          </div>
        ))
      }
    </div>
  )
}