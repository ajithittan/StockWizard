import {useState,useEffect} from "react";
import Checkbox from '@mui/material/Checkbox';
import {useSelector} from 'react-redux'

const SelectionCheckBox = (props) =>{
    
    const [checkstat,setCheckStat] = useState(false)
    const inpvals = useSelector(props.selector)    

    useEffect(() =>{
        if(props.data && inpvals){
            if (inpvals.includes(props.data)){
                setCheckStat(true)
            }else{
                setCheckStat(false)
            }
        }
    },[props.data,inpvals])

    const handleClick = () => props.callbackfn(props.data)
   
       return (
          <Checkbox checked={checkstat} onClick={handleClick}/>
      );
}

export default SelectionCheckBox