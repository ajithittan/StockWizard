import { useEffect, useState} from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {getSearchParamsFromText} from '../../modules/api/StockIndicators'


export default function SearchAssist(props) {
  const [collectQry,setCollectQry] = useState([])
  const [freeSoloQrys,setFreeSoloQrys] = useState([])
  const [qresToExec,setQresToExec] = useState([])

  const [top20querys,setTop20querys] = useState([
    {label: 'close < 50D Moving Avg', query:{type:"close",param:0,op:"<",val:"SMA_50"}},
    {label: '200 day SMA > 50 day SMA' , query:{type:"SMA",param:200,op:">",val:"SMA_50"}},
    {label: '200 day SMA > close' , query:{type:"SMA",param:200,op:">",val:"close"}},
    {label: '14 Day RSI < 30' , query:{type:"rsi",param:14,op:"<",val:30}},
    {label: '14 Day RSI > 80' , query:{type:"rsi",param:14,op:">",val:80}},
    {label: 'Large Caps' , query:{type:"mcap",param:0,op:">",val:10000000000}},
    {label: 'Mid Caps' , query:{type:"mcap",param:0,op:"bet",val:[2000000000 , 10000000000]}},
    {label: 'Small Caps' , query:{type:"mcap",param:0,op:"<",val:2000000000}},
  ])

  useEffect(() =>{
    let tempqry=[]
    if (qresToExec){ tempqry.push(...qresToExec)}
    if (freeSoloQrys){tempqry.push(...freeSoloQrys.map(item => item.query))}
    props.addToQuery ([...tempqry.filter(item => item)])
  },[qresToExec,freeSoloQrys])

  const parseQuery = async (inpTxt) =>{
    getSearchParamsFromText(inpTxt).then(retval => {
      if (retval){
        //setQresToExec(initval => [...initval,...retval])
        let addQuery = {}
        addQuery['label']=inpTxt
        addQuery['query']=retval[0]
        setFreeSoloQrys([...freeSoloQrys.filter(item => item !== inpTxt),addQuery])
        setTop20querys(initval => [...initval,addQuery])
      }
    })
  }

  const handleChange = (event, newValue) => {
      if(newValue.length===0){
        setQresToExec([])
        setFreeSoloQrys([])
      }
      if (event.target.value) {parseQuery(event.target.value)}
      else{
        //,...freeSoloQrys.map(item => item.query)
        setQresToExec([...newValue.map(item => item.query)].filter(item => item))
      }
      setCollectQry([...newValue])
      let nonStandardQry = newValue.filter(item => !item.query)
      if (nonStandardQry.length > 0){
        let nonstdtoadd = nonStandardQry.filter(item => !freeSoloQrys.map(item => item.label).includes(item))
        if (nonstdtoadd.length > 0){
          setFreeSoloQrys(initval => [...initval.filter(item => nonStandardQry.includes(item.label)),...nonstdtoadd])
        }else{
          setFreeSoloQrys([...freeSoloQrys.filter(item => nonStandardQry.includes(item.label))])
        }  
      }else{
        setFreeSoloQrys([])
      }
  }

  return (
    <>
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
    </>
  );
}
