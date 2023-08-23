import { useEffect,useState } from 'react'
import {BasicNewsFeeds} from '../../modules/api/Newsfeed'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
//import {makeStyles} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import IconButton from '@mui/material/IconButton';
import retrieveNewsFromSource from '../../modules/cache/cacheNews'
import StocksDropDown from '../../components/StocksDropDown'
import Delay from '../../components/Delay'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SelectionStocks from './SelectionStocks'

const index = (props) =>{

    const [feedData,setfeedData] = useState([])
    const [origfeedData,setOrigfeedData] = useState([])
    const [sortType,setSortType] = useState("dt")
    const [filterRemove,setFilterRemove] = useState(true)
    const [listOfStks,setListOfStks] = useState(null)
    const [singleStk,setSingleStk] = useState(null)
    const [colorAssigned,setColorAssigned] = useState(null)
    const [showStks,setShowStks] = useState(false)

    useEffect( () =>{
        if (props.stocks){
            setColorAssigned(assignColor(props.stocks))
            setListOfStks(props.stocks)
            processMultipleStks(props.stocks.slice(0,20),1000)
        }
    },[props.stocks])

    const  getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
             color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const assignColor = (inpStks) => 
        inpStks.map(item => {
            let retval ={}
            retval.stock = item
            retval.color = getRandomColor()
            return retval 
            }
    )

    const processMultipleStks = async (arrStks,wait) => {
        await Delay(500)
        for (let i=0;i<arrStks.length;i++) {
            getNewsForStock(arrStks[i]).then(newsRes => addToList(newsRes)
                                                        .then(retval => sortNews())
                                                            .catch(error => console.log("ERROR in sorting News",error))
                                                        .then(retval => commitFeed())
                                                        )                                                        
                .catch(error => console.log("ERROR in processMultipleStks",arrStks[i],error))

            i%2 === 0 ? await Delay(wait) : null
        }
        
    }

    const getNewsForStock = async (stkSym) => {
        let cacheKey = "NEWS_CACHE_KEY_" + stkSym
        return retrieveNewsFromSource(cacheKey,{stock:stkSym})
    }

    const addToList = async (objNews) => feedData.push(...objNews)

    const sortNews = async () =>{
        if (sortType === "dt"){
            feedData.sort((a,b) => new Date(b.date) - new Date(a.date))
        }
    }

    const filterNews = async (stkSym) => {
        setfeedData([...feedData.filter(item => item.stock === stkSym)])
        setFilterRemove(false)
        setSingleStk(stkSym)
    }

    const commitFeed = async () => {setfeedData([...feedData]),setOrigfeedData([...feedData])}

    const removeStks = async (lstToRemove) => setfeedData([...origfeedData.filter(item => !lstToRemove.includes(item.stock))])
    
    return(
            <>
               
                {
                    feedData ? 
                    <>
                    {
                        showStks? 
                        <div style={{marginBottom:"10px"}}>
                            <SelectionStocks stocks={colorAssigned} removeStocksFromNews={removeStks} showSts={setShowStks}/>
                        </div>    : null                
                    }
                    <Grid container direction="row" alignItems="stretch">
                        {feedData.map((item,indx) => (
                            <Grid item  md={6} lg={4} xl={4} sm={6} xs={6}>
                                <Paper elevation={0} sx={{height: "100%", display: "flex",width:"100%"}}>
                                    <fieldset className="newsClip">
                                        {filterRemove ? 
                                                <legend style={{float:"right",border:"1px solid", marginLeft:"5px",
                                                                borderColor:colorAssigned?.filter(clrs => clrs.stock === item.stock)[0]?.color,
                                                                color:colorAssigned?.filter(clrs => clrs.stock === item.stock)[0]?.color,
                                                                borderRadius:"5px"}}>
                                                    <a href="javascript:void();" onClick={() => {setShowStks(true),removeStks(listOfStks.filter(stk => stk !== item.stock))}}> {item.stock}</a>
                                                </legend> 
                                        : null }
                                        <a href={item.link} target="_blank">{item.title}</a>
                                    </fieldset> 
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    </>
                    : <Image src={myGif} alt="wait" height={30} width={30} />
                }
                {
                    /**
                <div style={{position:"fixed",float:"left"}}>
                    <StocksDropDown key={singleStk} stocks={listOfStks} 
                        callBackStockChange={getSingleStockNews} selStock={singleStk}>
                    </StocksDropDown>
                    <IconButton disabled={filterRemove}>
                        <FilterListOffIcon onClick={removeFilter}></FilterListOffIcon>
                    </IconButton>
                </div>
                 */
                }
            </>    
    )
}

export default index
