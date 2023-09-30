import { useEffect,useState } from "react"
import {getMasterListOfCompanyFacts} from '../../modules/api/StockDetails'
import { useSelector,useDispatch} from 'react-redux'
import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import {updCompanyStats} from '../../redux/reducers/companyStatsSlice'

const CompanyFacts = () => {
    const dispatch = useDispatch()
    let {companystats} = useSelector((state) => state.companystats)
    const [allFacts,setAllFacts] = useState(null)

    useEffect(() =>{
        getMasterListOfCompanyFacts().then(retval => {
                setAllFacts(removeSelectedOptions(Object.keys(retval).sort()))
            }
        )
    },[companystats])

    const removeSelectedOptions = (inpVals) =>{
        return inpVals.filter(val => !companystats?.map(item => item.type).includes(val))
    }

    const addNewDataFeed = (e) =>{
        let tempval = {...companystats[0]}
        tempval["type"] = e
        dispatch(updCompanyStats(tempval))
    }

    const cardStyle = {
        textAlign: 'center',
        rounded: true,
        backgroundColor: '#F0F8FF',
        opacity: 0.8,
        margin: 'auto',
        paddingBottom:"5%",
        height: '100%'
    };
    
        return (
            <>
            {
                <Card style={cardStyle} >
                    <CardHeader subheader = {"Click to add more Stats"}
                                style={{cursor:"pointer"}}
                    />
                    <CardContent>
                        <Grid
                            container
                            wrap='wrap'
                            >
                            {allFacts?.map((data) => {
                                return (
                                    <div style={{marginRight:"5px"}}>
                                    <Chip
                                    variant={"outlined"}
                                    label={data}
                                    color= {"primary"}
                                    size="small"
                                    cursor="pointer"
                                    onClick={() => addNewDataFeed(data)}
                                    />
                                    </div>
                                );
                            })}
                        </Grid>
                    </CardContent>
                </Card>
            }
            </>
        )

}

export default CompanyFacts