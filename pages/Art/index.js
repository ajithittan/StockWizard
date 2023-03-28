import MosaicView from './MosaicView'
import MasonryView from './MasonryView'
import PhotoAlbumView from './PhotoAlbumView'
import WaitingForResonse from '../../components/WaitingForResponse'
import SpeedDialComp from './SpeedDialComp'
import { useEffect,useState } from "react"
import {getAllImages} from '../../modules/api/UserImages'

const index = () =>{
    const listOfVariants = ["MasonryView","MosaicView","MosaicQuiltted","MosaicWoven"]
    const [imageUrls,setImageUrls] = useState(null)
    const [colsForImages,setColsForImages] = useState(5)
    const [width,setWidth] = useState("30vw")
    const [height,setHeight] = useState("30vw")
    const [variant,setVariant] = useState(0)
    const [waiting,setWaiting] = useState(true)
    
    useEffect(() =>{
        retrieveImages()
    },[])

    const retrieveImages = () => getAllImages().then(resp => {setImageUrls(resp);setWaiting(false)})
    const addColumns = () => setColsForImages(colsForImages + 1)
    const redColumns = () => setColsForImages(colsForImages - 1)
    const changeVariant = () => variant === listOfVariants.length - 1 ? setVariant(0) : setVariant(variant + 1)

    const allVariants = () =>{
        let variants = []
        variants.push(<MasonryView key={colsForImages} content={imageUrls} columns={colsForImages} width={width} height={height}></MasonryView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="masonry"></MosaicView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="quilted"></MosaicView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="woven"></MosaicView>)
        //variants.push(<PhotoAlbumView key={imageUrls} content={imageUrls} columns={colsForImages} ></PhotoAlbumView>)
        return variants
    }

    const getImageView = () => allVariants()[variant]

    return (
        <div className="Imagegallery">
            {getImageView()}
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            <SpeedDialComp plusOne={addColumns} reduceOne={redColumns} changeMode={changeVariant}></SpeedDialComp>
        </div>
    )
}

export default index