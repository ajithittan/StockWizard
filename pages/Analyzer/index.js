import { useEffect, useState } from "react"
import Sectors from './Sectors'
import Grid from '@mui/material/Grid';
import axios from "axios";
import LatestPatterns from './LatestPatterns'
import StreamStockPrice from '../../components/StreamStockPrice'
import SpeedDialComp from './SpeedDialComp'
import StockAnalyzerList from './StockAnalyzerList'

const index = ({sectors}) =>{

    const [tpOfList, setTpOfList] = useState(null)

    useEffect(() =>{
      if(!tpOfList){
        setTpOfList("LP")
      }
    },[])

    const getDispComponent = () =>{
      const compList = {"LP": <LatestPatterns />,"SL" : <StockAnalyzerList />}
      return compList[tpOfList]
    }

     return (
        <div style={{marginLeft:"10px"}}>
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            style={{height:"100%"}}
        >
          <Grid xs={12} sm={12} md={9} lg={10} xl={10}>
              {getDispComponent()}
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={2} xl={2}>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                align="stretch"
            >
            {

                sectors?.map(item => 
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Sectors key={item.sector} sector={item.sector} stocks={item.stocks}></Sectors>
                      </Grid>) 
            }
          </Grid>
        </Grid>
      </Grid>
      <StreamStockPrice></StreamStockPrice>
      <SpeedDialComp onsettype={setTpOfList}></SpeedDialComp>
      </div>
  )
}

export async function getServerSideProps({ req, res }) {
    const returnval = await axios.get(process.env.SECTORS_URL, {
      withCredentials: true,
      headers: {
          Cookie: req.headers.cookie
      }
    });
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=360, stale-while-revalidate=59'
    )
    const data = await returnval.data;
    return {props: { sectors:data }}
  }

export default index

