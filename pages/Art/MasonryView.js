import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { useEffect,useState } from "react"

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const MasonryView = (props) => {

  const [imgContent,setImgContent] = useState(null)
  const [colCount,setColCount] = useState(4)

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

  const handleImageClick = (imgId) =>{
    console.log("item.id",imgId)
    props.clickedImage(imgId)
    props.slideShow()
  }

  return (
    <Box>
      <Masonry columns={{lg:colCount, md: colCount-1, xs: colCount-3, sm: colCount-2 }} spacing={2}>
        {imgContent && imgContent.map((item, index) => (
          <div key={index} style={{cursor:"pointer"}}>
            <img
              src={`${item.url}?w=162&auto=format`}
              srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
              //alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
              onClick={() => handleImageClick(item.id)}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}

export default MasonryView