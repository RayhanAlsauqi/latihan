"use client"
import { useEffect, useState } from "react"

interface Product {
  id: number
  title: string
  description: string
}

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params
  const [product, setProduct] = useState<Product | null>(null)

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.log(error, "error while fetching data")
    }
  }

  useEffect(() => {
    fetchProductDetails()
  },[productId])

  if(!product){
    return(
      <div>
        <h2>Product not found</h2>
      </div>
    )
  }

  return (
    <div className="bg-slate-500 w-96 text-center my-20 p-10 mx-20">
      <h1>
        <b>Product Details of: </b> {product.title}
      </h1>
      <hr />
      <br />
      <h2>
        <b>Product Id: </b>{product.id}
      </h2>
      <br />
      <h2>
        <b>Product name:</b> {product.id}
      </h2>
      <br />
      <h2>
        <b>Product Description:</b>:{product.description}
      </h2>
    </div>
  )
}