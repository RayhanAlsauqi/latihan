"use client"
import { useRouter } from "next/navigation"
import { useAuthContext } from "../context/auth.context"
import { useProductContext } from "../context/product.context"
import Image from "next/image"
import React from "react"

export default function ProductsList() {
  const { logout, user } = useAuthContext()
  const {
    products,
    isLoading,
    isError,
    setCategoryFilter,
    selectedCategory,
    categories, setPriceOrder,
    selectedPricedOrder
  } = useProductContext()

  const router = useRouter()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value)
  }

  const handlePriceOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceOrder(e.target.value)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {isError.message}</div>

  return (
    <div className=" px-16 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1>Welcome {user?.username || "Guest"} to Products List</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="mb-5">
        <label htmlFor="category" className="mr-2">Filter by category</label>
        <select name="" id="category" value={selectedCategory} onChange={handleCategoryChange}
          className="border p-2  bg-white rounded-md">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="priceOrder">Sort by Price:</label>
        <select
          id="priceOrder"
          value={selectedPricedOrder}
          onChange={handlePriceOrderChange}
          className="border p-2 rounded-md bg-white"
        >
          <option value="asc">Price: Low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>

      <div className="grid grid-cols-3 pt-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:border-gray-700 ">
            <div className="flex justify-center">
              <Image src={product.thumbnail} alt={product.title} width={200} height={160} />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-blue-500 mt-2">{product.price}{""}$</p>
          </div>
        ))}
      </div>
    </div>
  )
}