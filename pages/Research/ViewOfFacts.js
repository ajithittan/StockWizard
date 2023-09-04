import { useState,useEffect } from 'react'
import {getFullCompanyFacts} from '../../modules/api/StockDetails'
import CompanyFacts from './CompanyFacts'
import WaitingForResonse from '../../components/WaitingForResponse'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

const ViewOfFacts = (props) =>{
    const [compFacts,setCompFacts] = useState(null)
    const [waiting,setWaiting] = useState(true) 
    const [keyToContent,setKeyToContent] = useState(null)
    const [defYears, setDefYears] = useState(2)

    useEffect (() =>{
        if(props.stock && defYears){
            selStock(props.stock,defYears)
        }
    },[props.stock,defYears])

    const handleYearChange = () => defYears === "ALL" ? setDefYears(2) : setDefYears("ALL")

    const getSwitchComp = () => <Switch name="All" onChange={handleYearChange}/> 

    const selStock = (stk,years) => {
        setWaiting(true)
        getFullCompanyFacts(stk,years).then(retval => {if (retval)
        {
          console.log("retval",retval)
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
                <Tab label={getSwitchComp()}></Tab>
              </Tabs>
              {keyToContent && compFacts ? <CompanyFacts facts={compFacts.filter(item => item[keyToContent])[0][keyToContent]} 
                                category={keyToContent}></CompanyFacts> : null}
            </Box>
            : null
        }   
        </>
    )

}

export default ViewOfFacts