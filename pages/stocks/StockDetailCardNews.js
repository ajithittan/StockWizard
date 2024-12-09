import { useEffect,useState} from "react"
import retrieveNewsFromSource from '../../modules/cache/cacheNews'
import Grid from '@mui/material/Grid';
import Link from "next/link"; 
import Typography from '@mui/material/Typography';
 
const StockDetailCardNews = (props) =>{
    const [feedData,setfeedData] = useState(null)
    const [newsLimit,setNewsLimit] = useState(10)
    const [dispLmt,setDispLmt] = useState(5)

    useEffect(() =>{
        if(props.stock){
            getNewsForStock(props.stock)
        }
    },[props.stock])

    const getNewsForStock = async (stkSym) => {
        let cacheKey = "NEWS_CACHE_KEY_" + stkSym
        retrieveNewsFromSource(cacheKey,{stock:stkSym,limit:newsLimit||5}).then(retval =>{
            if (retval && retval.length > 0){setfeedData(retval)}
        })
    }

    const getContentToFit = (inpNews,index) =>{
        if (index < dispLmt){
            const date = new Date(inpNews?.date);
            const formattedDateTime = date.toLocaleString('en-US', {
                month: 'short', 
                day: 'numeric',
                hour: 'numeric', 
                minute: 'numeric'
              }); 
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography  variant="caption">
                        <Link href={inpNews?.link || '/'} target="_blank">{formattedDateTime} - {inpNews?.title}</Link>
                    </Typography>
                </Grid> 
            )    
        }
    }

    return (
        <>
        <Grid direction="row" container style={{ overflow: 'auto'}}>
            {
                feedData?.map((inp,indx) => getContentToFit(inp,indx))
            }      
        </Grid>
        <a onClick={() => setDispLmt(100)} href="#"><Typography style={{color:"blue"}} variant="caption">Show All</Typography></a>
        </>
    )
}

export default StockDetailCardNews