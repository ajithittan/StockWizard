import { useEffect,useState } from "react"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const MosaicView = (props) =>{
    const [imgContent,setImgContent] = useState(null)
    const [colCount,setColCount] = useState(4)
    const [variantTp,setVariantTp] = useState("masonry")
  
    useEffect(()=>{
      if(props.content && props.content.length > 0){
          setImgContent(props.content)
      }
    },[props.content])  

    useEffect(() => {
      if(props.columns){
          setColCount(props.columns)
      }
    },[props.columns])

    useEffect(() =>{
      if (props.type){
        setVariantTp(props.type)
      }
    },[props.type])

    const handleImageClick = (imgId) =>{
      props.clickedImage(imgId)
      props.slideShow()
    }

    return (
          <div className="Imagegallery">
              <ImageList key={colCount} variant={variantTp} cols={colCount} gap={8} >
                  {imgContent && imgContent.map((item) => (
                    <ImageListItem key={item} style={{cursor:"pointer"}}>
                      <img
                        src={`${item.url}?w=162&auto=format`}
                        srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
                        loading="lazy"
                        onClick={() => handleImageClick(item.id)}
                      />
                    </ImageListItem>
                  ))}
            </ImageList>
        </div>
    )
}

export default MosaicView