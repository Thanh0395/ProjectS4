import axios from "axios";

export const GetProduct = async () => {
    const data = await axios.get("http://localhost:5013/api/Recipe/")
    return data.data.data
}