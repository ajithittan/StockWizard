import MosaicView from './MosaicView'
import MasonryView from './MasonryView'
import WaitingForResonse from '../../components/WaitingForResponse'
import SpeedDialComp from './SpeedDialComp'
import { useEffect,useState } from "react"
import {getAllImages} from '../../modules/api/UserImages'
import PaintingSlideShow from './PaintingSlideShow'

const URL_WEB_SOCKET = 'ws://localhost:5551/';

const index = () =>{
    const listOfVariants = ["MasonryView","MosaicView","MosaicQuiltted","MosaicWoven"]
    const [imageUrls,setImageUrls] = useState(null)
    const [colsForImages,setColsForImages] = useState(5)
    const [width,setWidth] = useState("30vw")
    const [height,setHeight] = useState("30vw")
    const [variant,setVariant] = useState(0)
    const [waiting,setWaiting] = useState(true)
    const [slideShow,setSlideShow] = useState(false)
    const [selectedImage,setSelectedImage] = useState(null)

    const [ws, setWs] = useState(null);
    const [trades, setTrades] = useState([]);
    /** 
    useEffect(() => {
      const wsClient = new WebSocket(URL_WEB_SOCKET);
      
      wsClient.onopen = () => {
        
        setWs(wsClient);
        wsClient.send(JSON.stringify("hahaha"));
      };
      wsClient.onclose = () => console.log('ws closed');
      return () => {
        wsClient.close();
      };
    }, []);
    **/
    
    useEffect(() =>{
        retrieveImages()
    },[])

    const retrieveImages = () => getAllImages().then(resp => {setImageUrls(resp);setWaiting(false)})
    const addColumns = () => setColsForImages(colsForImages + 1)
    const redColumns = () => setColsForImages(colsForImages - 1)
    const changeVariant = () => variant === listOfVariants.length - 1 ? setVariant(0) : setVariant(variant + 1)
    const setSlideShowOn = () => setSlideShow(true)
    const setSlideShowOff = () => setSlideShow(false)
    const setClickedImage = (pubId) => setSelectedImage(pubId)

    const allVariants = () =>{
        let variants = []
        variants.push(<MasonryView key={colsForImages} content={imageUrls} columns={colsForImages} width={0} height={0} slideShow={setSlideShowOn} clickedImage={setClickedImage}></MasonryView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="masonry" slideShow={setSlideShowOn} clickedImage={setClickedImage}></MosaicView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="quilted" slideShow={setSlideShowOn} clickedImage={setClickedImage}></MosaicView>)
        variants.push(<MosaicView key={colsForImages} content={imageUrls} columns={colsForImages} type="woven" slideShow={setSlideShowOn} clickedImage={setClickedImage}></MosaicView>)
        return variants
    }

    const getImageView = () => allVariants()[variant]

    return (
        <div className="Imagegallery">
            {slideShow ? <PaintingSlideShow show={true} slideOff={setSlideShowOff} imageSel={selectedImage} allPaintings={imageUrls}></PaintingSlideShow> : getImageView()}
            {waiting ? <WaitingForResonse></WaitingForResonse> : null}
            <SpeedDialComp plusOne={addColumns} reduceOne={redColumns} changeMode={changeVariant}></SpeedDialComp>
        </div>
    )
}

export default index