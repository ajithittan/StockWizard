import axios from "axios";

const getAllImages = async () =>{
    let url = "/api/allimages"
    const data = await axios.get(url)
    return data.data
}

export {getAllImages}