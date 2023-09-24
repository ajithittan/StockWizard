import { useEffect, useState } from 'react';
import {getCompanyKeyStats} from '../../modules/api/StockDetails'
import CompanyRevenue from './CompanyRevenue'
import myGif from "../../public/loading-loading-forever.gif"
import Image from 'next/image';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {delCompanyStats} from '../../redux/reducers/companyStatsSlice'
import {useDispatch} from 'react-redux'

const CompanyDetailsContainer = (props) =>{
    const dispatch = useDispatch()
    const [inpVals,setInpVals] = useState(null)
    let [wait,setWait] = useState(true)
    const [showNoData,setShowNoData] = useState(false)

    useEffect(() =>{
        if (props){
            getCompanyKeyStats(props.type,props.stock,props.limit,
                props.period).then(retval => {
                    if (retval && retval.length > 0){
                        setInpVals(retval)
                    }else{
                        setShowNoData(true)
                    }
                    setWait(false)
                }
            )
        }
    },[props])

    const getHeader = (type) =>{
        const header = 
            {"revenue":"Revenue", "operatingincome":"Operating Income", "income":"Net Income/Loss","costofgoodsandservices":"Cost of Goods and Services",
            "earningspershare":"Earning Per Share","assets" : "Assets","cashandcasheqv":"Cash In Hand","dividends":"Dividends",
            "grossprofit":"Gross Profit"}
        return header[type] || type

    }

    const cardStyle = {
    textAlign: 'center',
    rounded: true,
    backgroundColor: '#F0F8FF',
    opacity: 0.8,
    margin: 'auto',
    paddingBottom:"5%",
    opacity: showNoData? "0.5" : "1.0",
    height: '100%'
    };

    const removeItemFromList = (delTp) => dispatch(delCompanyStats(delTp))

    return (
        <>
        {
            wait && !inpVals ? 
                <Image src={myGif} alt="wait" height={100} width={100} /> : 
                <>
                <Card style={cardStyle} >
                    <CardHeader subheader = {getHeader(props.type)}
                                style={{cursor:"pointer"}}
                    />
                    <CardContent>
                        {showNoData ? <div><p>NO DATA</p></div> :<CompanyRevenue inpData={inpVals} period={props.period}/>}
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={() => removeItemFromList(props.type)}/>
                        </IconButton>
                </CardActions>
                </Card>
            </>
        }
        </>
    )

}

export default CompanyDetailsContainer