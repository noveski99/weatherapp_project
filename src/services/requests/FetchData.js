import axios from "axios"
export const FetchData = async (locationURL, setData) => {
    try {
        const response = await axios.get(locationURL);
        setData(response.data)
    } catch (error) {
        console.log(error)
    }
}



/*import axios from "axios"
export const FetchData = async (locationURL,setData) => {
   await axios.get(locationURL).then(async res=>await setData(res.data)).catch(error=>console.log(error))
}
*/