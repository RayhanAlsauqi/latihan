import { ProductProvider } from "../context/product.context"

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProductProvider>
      <section>
        {children}
      </section>
    </ProductProvider>
  )
}