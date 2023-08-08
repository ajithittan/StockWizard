import { useEffect, useState } from 'react' 
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const SelectionStocks = (props) => {
  const [stocks,setStocks] = useState(null)
  let [remove,setRemove] = useState([])

  useEffect(() =>{
    if(props.stocks){
      setStocks(props.stocks)
    }
  },[props.stocks])

  const handleClick = (stk) => {
    remove.includes(stk) ? remove=remove.filter(item => item !== stk) : remove.push(stk)
    setRemove([...remove])
    props.removeStocksFromNews(remove)
  };

  return (
    <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
      {
        stocks?.map(item => 
          <Chip label={item.stock} 
              variant= {remove.includes(item.stock) ? "outlined" : ""}  
              onClick={() => handleClick(item.stock)}  
              sx={{color:item?.color}}
              //sx={{backgroundColor: remove.includes(item.stock) ? null : item?.color, minWidth:"20px"}}
          />)
      }
        <IconButton>
            <CloseFullscreenIcon onClick={ () => props.showSts(false)} />
        </IconButton>
        <IconButton>
            <RestartAltIcon onClick={ () => {props.showSts(false),props.removeStocksFromNews([])}}/>
        </IconButton>
    </Stack>
  );
}

export default SelectionStocks