import { useEffect,useState } from 'react'
import {BasicNewsFeeds} from '../../modules/api/Newsfeed'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'
import {makeStyles} from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import IconButton from '@mui/material/IconButton';
import retrieveNewsFromSource from '../../modules/cache/cacheNews'
import StocksDropDown from '../../components/StocksDropDown'
import Delay from '../../components/Delay'

const index = (props) =>{

    const [feedData,setfeedData] = useState([])
    const [sortType,setSortType] = useState("dt")
    const [filterRemove,setFilterRemove] = useState(true)
    const [listOfStks,setListOfStks] = useState(null)
    const [singleStk,setSingleStk] = useState(null)

    useEffect(async () =>{
        if (props.stocks){
            processMultipleStks(props.stocks.slice(0,20),1000)
            setListOfStks(props.stocks)
        }
    },[props.stocks])

    useEffect(async () =>{
        if (props.feedtype){
            let retval = await BasicNewsFeeds(props.feedtype) 
            setfeedData(retval)
        }
    },[props.feedtype])

    const processMultipleStks = async (arrStks,wait) => {
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

    const createNewList = async (objNews) => {feedData.length = 0 , feedData.push(...objNews)}

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

    const getSingleStockNews = async (stkSym) =>{
        getNewsForStock(stkSym).then(newsRes => createNewList(newsRes)
                               .then(retval => sortNews())
                                    .catch(error => console.log("ERROR in sorting News",error))
                                .then(retval => commitFeed())
        )
        setFilterRemove(false)
    }

    const commitFeed = async () => setfeedData([...feedData])

    const removeFilter = async () => {
        processMultipleStks(listOfStks,0)
        setFilterRemove(true)
        setSingleStk(null)
    }

    const useStyles = makeStyles({
        Bottom: ({ sm }) => ({
            overflow: sm ? "none" : "auto",
            height: sm ? "100%" : "90vw",
            marginBottom:"100px"
        })
      });

    const sm = useMediaQuery("(max-width: 960px)");
    const classes = useStyles({ sm });

    return(
            <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{position:"relative",float:"left",display:"flex",flexDirection:"row",marginBottom:"10px"}}>
                    <StocksDropDown key={singleStk} stocks={listOfStks} 
                        callBackStockChange={getSingleStockNews} selStock={singleStk}>
                    </StocksDropDown>
                    <IconButton disabled={filterRemove}>
                        <FilterListOffIcon onClick={removeFilter}></FilterListOffIcon>
                    </IconButton>
                </div>
                <div className={classes.Bottom}>
                {
                    feedData ? feedData.map((item,indx) => (
                        <fieldset className="newsClip">
                            {filterRemove ? 
                                    <legend className="legendNews">
                                        <a href="#" onClick={() => filterNews(item.stock)}>{item.stock}</a>
                                    </legend> 
                            : null }
                            <a href={item.link} target="_blank">{item.title}</a>
                        </fieldset>    
                    )): <Image src={myGif} alt="wait" height={30} width={30} />
                }
                </div>
            </div>    
    )
}

export default index
