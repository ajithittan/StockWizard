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

    return (
          <div className="Imagegallery">
              <ImageList key={colCount} variant={variantTp} cols={colCount} gap={8} >
                  {imgContent && imgContent.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        src={`${item}?w=162&auto=format`}
                        srcSet={`${item}?w=162&auto=format&dpr=2 2x`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
            </ImageList>
        </div>
    )
}

export default MosaicView