import { useState,useEffect } from 'react'
import {getFullCompanyFacts} from '../../modules/api/StockDetails'
import CompanyFacts from './CompanyFacts'
import WaitingForResonse from '../../components/WaitingForResponse'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ViewOfFacts = (props) =>{
    const DefaultYears = 5
    const [compFacts,setCompFacts] = useState(null)
    const [waiting,setWaiting] = useState(true) 
    const [keyToContent,setKeyToContent] = useState(null)
    const [defYears, setDefYears] = useState(DefaultYears)
    const [showQtr,setShowQtr] = useState(false)

    useEffect (() =>{
        if(props.stock && defYears){
            selStock(props.stock,defYears)
        }
    },[props.stock,defYears])

    const handleYearChange = () => defYears === "ALL" ? setDefYears(DefaultYears) : setDefYears("ALL")

    const handlShowQuarter = () => {
        if (showQtr === false){
                console.log("show quarter"), 
                setShowQtr(true)
            }else{ 
                console.log("show year"), 
                setShowQtr(false)}
        }

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const getSwitchComp = (inplabel,handleChange) => <FormControlLabel control={<Switch name="All" {...label} onChange={handleChange}/>} 
                                label={inplabel}/> 

    const selStock = (stk,years) => {
        setWaiting(true)
        getFullCompanyFacts(stk,years).then(retval => {if (retval)
        {
          setCompFacts(Object.values(retval))
          setKeyToContent(Object.keys(retval[0])[0])
          setWaiting(false)
        }else{
            setWaiting(false)
            setCompFacts(null)
        }})
    }

    const changeKey = (chngVal) => setKeyToContent(chngVal)

    return(
        <>
        {
            waiting ? <WaitingForResonse /> : null
        }
        <br></br>
        {
            compFacts ? 
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs aria-label="Company Facts">
              {
                    compFacts.map((item,index) => {
                        return(
                            <Tab label={Object.keys(item)[0]} onClick={() => changeKey(Object.keys(item)[0])}></Tab>
                        )
                    }
                )}
                <Tab label={getSwitchComp("Show All",handleYearChange)}></Tab>
                <Tab label={getSwitchComp("Quarter",handlShowQuarter)}></Tab>
              </Tabs>
              {keyToContent && compFacts ? <CompanyFacts key={showQtr} facts={compFacts.filter(item => item[keyToContent])[0][keyToContent]} 
                                category={keyToContent} quarter={showQtr} stock={props.stock}></CompanyFacts> : null}
            </Box>
            : null
        }   
        </>
    )

}

export default ViewOfFacts