import { useEffect,useState } from "react"
import {getAllImages} from '../../modules/api/UserImages'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import WaitingForResonse from '../../components/WaitingForResponse'
import SpeedDialComp from './SpeedDialComp'


const MosaicView = () =>{
    const listOfVariants = ["masonry","quilted","woven"]
    const [variant,setVariant] = useState(0)
    const [colsForImages,setColsForImages] = useState(5)
    const [imageUrls,setImageUrls] = useState(null)
    const [waiting,setWaiting] = useState(true)

    useEffect(() =>{
        retrieveImages()
    },[])

    const retrieveImages = () =>{
        getAllImages().then(resp => {setImageUrls(resp),setWaiting(false)})
    }

    const addColumns = () => setColsForImages(colsForImages + 1)
    const redColumns = () => setColsForImages(colsForImages - 1)
    const changeVariant = () => variant === listOfVariants.length ? setVariant(0) : setVariant(variant + 1)

    return (
          <div className="Imagegallery">
              <ImageList key={colsForImages} variant={listOfVariants[variant||0]} cols={colsForImages} gap={8} >
                  {!waiting && imageUrls && imageUrls.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        src={`${item}`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
            </ImageList>
            <SpeedDialComp plusOne={addColumns} reduceOne={redColumns} changeMode={changeVariant}></SpeedDialComp>
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
        </div>
    )
}

export default MosaicView