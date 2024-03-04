import Sectors from './Sectors'
import Grid from '@mui/material/Grid';
import axios from "axios";
import LatestPatterns from './LatestPatterns'
import StreamStockPrice from '../../components/StreamStockPrice'

const index = ({sectors}) =>{

     return (
        <div style={{marginLeft:"10px"}}>
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            style={{height:"100%"}}
        >
          <Grid xs={12} sm={12} md={9} lg={9} xl={9}>
                <LatestPatterns></LatestPatterns>
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={3} xl={3}>
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

