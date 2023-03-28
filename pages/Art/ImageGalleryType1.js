import { useEffect, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Inline from "yet-another-react-lightbox/plugins/inline";

const ImageGalleryType1 = (props) =>{

    const [images, setImages] = useState(null)
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState("top");
    const [width, setWidth] = useState(120);
    const [height, setHeight] = useState(80);
    const [border, setBorder] = useState(1);
    const [borderRadius, setBorderRadius] = useState(4);
    const [padding, setPadding] = useState(4);
    const [gap, setGap] = useState(16);
    const [preload, setPreload] = useState(2);
    const [showToggle, setShowToggle] = useState(false);

    useEffect(() => {
      if(props.content){
        formatAndSetImages(props.content)
      }
    },[props.content])

    const formatAndSetImages = (inpImages) =>{
      console.log("formattedimg",inpImages)
      let formattedimg = inpImages.map((item,index) => {return {'key':index,'src':item,'thumbnail':item}})
      setImages([...formattedimg])
    }

    return (
         <div>
           {images ? 
             <>
               <Lightbox
                 open={true}
                 close={() => setOpen(false)}
                 slides={images}
                 carousel={{ preload }}
                 plugins={[Thumbnails]}
                 thumbnails={{
                   position,
                   width,
                   height,
                   border,
                   borderRadius,
                   padding,
                   gap,
                   showToggle
                 }}
               />
             </>
            : null}
         </div>
    )
}

export default ImageGalleryType1


