import PhotoAlbum from "react-photo-album";
import { useEffect,useState } from "react"

const PhotoAlbumView = (props) => {
    const [imgContent,setImgContent] = useState(null)
    const [colCount,setColCount] = useState(4)
  
    useEffect(()=>{
      if(props.content && props.content.length > 0){
        formatAndSetImages(props.content)
      }
    },[props.content])   

    useEffect(() => {
        if(props.columns){
            setColCount(props.columns)
        }
      },[props.columns])

    const formatAndSetImages = (inpImages) =>{
        let formattedimg = inpImages.map((item,index) => {return {'key':index,'src':item,width: 800, height: 600}})
        setImgContent([...formattedimg])
      }

    return (
        <>
            <PhotoAlbum layout="masonry" photos={imgContent} columns={colCount}/>
        </>
    )
}

export default PhotoAlbumView