import { useEffect, useState} from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {getSearchParamsFromText} from '../../modules/api/StockIndicators'


export default function SearchAssist(props) {
  const [collectQry,setCollectQry] = useState([])
  const [parseQry,setParseQry] = useState([])
  const [nonstd,setNonStd] = useState(null)


  useEffect(() =>{
    if (nonstd){
        parseQuery(nonstd)
    }
  },[nonstd])

  const parseQuery = (inpTxt) =>{
    getSearchParamsFromText(inpTxt).then(retval => {
      console.log("get values from backend",retval,inpTxt)
      if (retval){
        props.addToQuery(initval => [...initval,retval[0]])
      }
    })
  }

  const handleChange = (event, newValue) => {
      if (event.target.value) {setNonStd(event.target.value)}
      else{
        props.addToQuery([...newValue.map(item => item.query)])
      }
      setCollectQry([...newValue])
      let nonStandardQry = newValue.filter(item => !item.query)
      setParseQry(initval => [...initval,...nonStandardQry])
  }

  return (
    <Stack margin={0.5} sx={{ width: "98vw" }}>
      <Autocomplete
        multiple
        options={top20querys}
        getOptionLabel={option => option.label}
        defaultValue={[]}
        freeSolo
        renderTags={(value, getTagProps) =>
            collectQry.map((option,index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
                    option.label ? 
                        <Chip color='primary' variant="outlined" label={option.label || option} key={key} {...tagProps} /> : 
                        <Chip color='secondary' variant="outlined" label={option} key={key} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Query Me"
          />
        )}
        onChange={handleChange}
      />
      </Stack>
  );
}

const top20querys = [
  {label: 'close < 50D Moving Avg', query:{type:"close",param:0,op:"<",val:"SMA_50"}},
  {label: '200 day SMA > 50 day SMA' , query:{type:"SMA",param:200,op:">",val:"SMA_50"}},
  {label: '200 day SMA > close' , query:{type:"SMA",param:200,op:">",val:"close"}},
  {label: '14 Day RSI < 30' , query:{type:"rsi",param:14,op:"<",val:30}},
  {label: '14 Day RSI > 80' , query:{type:"rsi",param:14,op:">",val:80}},
  {label: 'Large Caps' , query:{type:"mcap",param:0,op:">",val:10000000000}},
  {label: 'Mid Caps' , query:{type:"mcap",param:0,op:"bet",val:[2000000000 , 10000000000]}},
  {label: 'Small Caps' , query:{type:"mcap",param:0,op:"<",val:2000000000}},
];