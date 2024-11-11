import { create } from "zustand";
import { Product } from "@/app/type/products.type";
import { fetcher } from "@/api/fetcher";

type ProductState = {
    products: Product[]
    loading: boolean;
    currentProduct: Product | null
    error: string | null;
    fetchProducts: () => Promise<void>
    // addProduct: (newProduct: Omit<Product, 'id'>) => Promise<void>
}

export const useStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetcher<Product[]>('/products', "GET", { cache: "force-cache" }, { revalidate: 60 })
            if (response.error) {
                set({ error: response.error, loading: false })
            } else {
                set({ products: response.data, loading: false })
            }
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Error fetching products', loading: false })
        }
    },




}))