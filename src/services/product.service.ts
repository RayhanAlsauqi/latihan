import Axios from "@/lib/axios.instance";



export async function fetchProducts(url: string) {
  try {
    const response = await Axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}