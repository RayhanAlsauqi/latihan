import Axios from "@/lib/axios.instance";


type LoginUserPayload = {
  username: string;
  password: string;
};


export async function loginUser(payload: LoginUserPayload) {
  try {
    const response = await Axios.post("/auth/login", payload)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function fetchWithAuth(url: string) {
  try {
    const response = await Axios.get(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}