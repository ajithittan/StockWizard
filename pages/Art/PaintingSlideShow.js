import { useEffect, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {getAllImages} from '../../modules/api/UserImages'

const PaintingSlideShow = (props) =>{

  const [Paintings,setPaintings] = useState(null)
  const [selectedImg,setSelectedImg] = useState(null)

  useEffect(() => {
    if(props.allPaintings){
      getPaintings(props.allPaintings)
    }
  },[props.allPaintings])

  useEffect(() =>{
    setSelectedImg(props.imageSel)
  },[props.imageSel])
  

  const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

  const unsplashLink = (id, format,width, height) =>
    `https://res.cloudinary.com/dnhhmbzqx/image/upload/v1679764493/${id}.${format}`;
    //`https://res.cloudinary.com/dnhhmbzqx/image/upload/v1679764493/${id}.${format}/${width}x${height}`;

    const getPaintings = (allImages) => {
      let retval = allImages.map((photo) => {
      
        const width = breakpoints[0];
        const height = (photo.height / photo.width) * width;
  
        return {
          src: unsplashLink(photo.id,photo.format, width, height),
          id: photo.id,
          width,
          height,
          images: breakpoints.map((breakpoint) => {
            const height = Math.round((photo.height / photo.width) * breakpoint);
            return {
              src: unsplashLink(photo.id, photo.format,breakpoint, height),
              width: breakpoint,
              height,
            };
          }),
        };
      })
      setPaintings(retval)
    }

    const getIndexOfImg = () =>{
      if (Paintings){
        return Paintings.map(function (x) { return x.id; }).indexOf(selectedImg);
      }
    }

    return (
         <div>
           <Lightbox slides={Paintings} open={props.show} close={props.slideOff} index={getIndexOfImg()}/>;
         </div>
    )
}

export default PaintingSlideShow


