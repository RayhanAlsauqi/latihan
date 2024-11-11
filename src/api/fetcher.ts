const baseUrl = "https://fakestoreapi.com"


interface FetcherResponse<T> {
  data: T
  error: string | null
}

interface CacheOptions extends RequestInit {
  cache?: RequestCache; // Menambahkan properti cache
}

export async function fetcher<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  cacheOptions: CacheOptions = { cache: "force-cache" },
  revalidateOptions?: { revalidate: number },
  body?: unknown
): Promise<FetcherResponse<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  const options: RequestInit = {
    method,
    headers,
    ...cacheOptions
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (revalidateOptions && cacheOptions?.cache !== "no-store") {
    options.next = { revalidate: revalidateOptions.revalidate };
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "An error occured")
    }
    const data = await response.json()
    return { data, error: null }
  } catch (error: unknown) {
    return { data: null as T, error: (error as Error).message }
  }
}