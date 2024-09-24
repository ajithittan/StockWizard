import { useEffect,useState } from 'react'
import retrieveNewsFromSource from '../../modules/cache/cacheNews'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SingleNewsCard from './SingleNewsCard'
import WaitingForResonse from '../../components/WaitingForResponse'
import { useSelector} from 'react-redux'

const index = (props) =>{

    const [feedData,setfeedData] = useState([])
    const [newsLimit,setNewsLimit] = useState(10)
    const [origfeedData,setOrigfeedData] = useState([])
    const [singleStk,setSingleStk] = useState(666)
    const [assignedColor,setColorAssigned] = useState(null)
    const {dashboardlayout,loading} = useSelector((state) => state.dashboardlayout)

    useEffect( () =>{
        if (props.stocks){
            setColorAssigned(assignColor(props.stocks))
            //setListOfStks(props.stocks)
            processMultipleStks(props.stocks.slice(0,30))
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

    const processMultipleStks = async (arrStks) => {
        getNewsForStock(arrStks).then(retval => {setfeedData(retval),setOrigfeedData(retval)})
    }

    const getNewsForStock = async (stkSym) => {
        let cacheKey = "NEWS_CACHE_KEY_" + stkSym
        return retrieveNewsFromSource(cacheKey,{stock:stkSym,limit:newsLimit||5})
    }

    const showOnlySelectStock = async (keepInList) => {setSingleStk(keepInList),setfeedData([...origfeedData.filter(item => keepInList === item.stock)])}

    const showAll = async () => {
        setfeedData([...origfeedData]),
        setSingleStk(666)
    }

    const getSize = (inpSize) =>{
        const sizeMap = [{"size":"md","1":3,"2":12,"3":12},
                         {"size":"lg","1":3,"2":4,"3":6},
                         {"size":"xl","1":3,"2":4,"3":6}]

        let currsetofcomp = dashboardlayout.filter(item => item.layoutId === 1)[0]?.compId.length

        return sizeMap.filter(item => item.size === inpSize)[0][String(currsetofcomp)] || 12                
    }
    
    return(
            <>
                {
                    feedData.length > 0 ? 
                    <>
                    <Grid container direction="row" alignItems="stretch" >
                        {feedData.map((item,indx) => (
                            <Grid item  md={getSize("md")} lg={getSize("lg")} xl={getSize("xl")} sm={12} xs={12}>
                                <Paper elevation={0} sx={{height: "100%", display: "flex",width:"100%"}}>
                                    <SingleNewsCard key={item} newscontent={item} 
                                                    onSelectSingleStk={showOnlySelectStock} 
                                                    onShowAll={showAll} selStock={singleStk} 
                                                    color={assignedColor?.filter(color => color.stock===item.stock)[0]?.color}/>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    </>
                    : <WaitingForResonse height={50} width={50}/>
                }
            </>    
    )
}

export default index


