import { useState,useEffect, useRef } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stocks from '../stocks'
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import CompanyStockPrice from '../stocks/CompanyStockPrice'
import CompanyDetails from '../stocks/CompanyDetails'
import CompanyQtrPerf from '../stocks/CompanyQtrPerf'
import { CSSTransition } from 'react-transition-group';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignContent:'center',
  overflow:"scroll",
  color: theme.palette.text.secondary,
  margin:"100px"
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignContent:'center',
  height: "25vh",
  overflow:"scroll",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  overflow:"scroll",
  height: "90vh",
  color: theme.palette.text.secondary,
}));

const DashBoard = (initialSetUpItems) => {

  const [showSingleStkDetails,setshowSingleStkDetails] = useState(false)
  const [singleStk,setsingleStk] = useState(null)
  const nodeRef = useRef(null);
  const companyNodeRef = useRef(null);
  const companyStkPrcRef = useRef(null);
  const feedtypes = [3,4,2,6]

  const [callbacks,setcallbacks] = useState(null)

  useEffect(() =>{
    let tempCallBcks = []
    tempCallBcks.push({type:"SINGLE_STOCK",fn:hideAllStocksAndShowDetails})
    setcallbacks([...tempCallBcks])
  },[])

  const hideAllStocksAndShowDetails = (stksym,state) => {
    console.log("hideAllStocksAndShowDetails",stksym,state)
    setsingleStk(stksym)
    setshowSingleStkDetails(state)
  }

  //{showSingleStkDetails? <SingleStock /> : null }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.5} direction={{ xs: 'column', sm: 'row' }} rowSpacing={1} columnSpacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={0.5} direction="column" rowSpacing={1}>
            <Grid item xs={12}>
              <Item1>
                    {showSingleStkDetails ? null :  <Stocks />}
                    <Grid container spacing={1.5} direction="row" rowSpacing={1} justifyContent="space-evenly" 
                        marginTop="5px" marginRight="5px" >
                        <Grid item xs={3.5} backgroundColor={showSingleStkDetails ? "#EAFFF1" : null} borderRadius="5px">
                        <CSSTransition
                              in={showSingleStkDetails}
                              nodeRef={nodeRef}
                              timeout={200}
                              classNames="stockDetails"
                              unmountOnExit
                            > 
                            <div className="stockDetails" ref={nodeRef}><CompanyDetails stock={singleStk}/></div>
                          </CSSTransition>
                        </Grid>
                        <Grid item xs={3.5} backgroundColor={showSingleStkDetails ? "#EAFFF1" : null} borderRadius="5px">
                        <CSSTransition
                              in={showSingleStkDetails}
                              nodeRef={companyStkPrcRef}
                              timeout={400}
                              classNames="stockDetails"
                              unmountOnExit
                            > 
                            <div className="stockDetails" ref={companyStkPrcRef}><CompanyStockPrice stock={singleStk}/></div>
                          </CSSTransition>
                        </Grid>
                        <Grid item xs={3.5} backgroundColor={showSingleStkDetails ? "#EAFFF1" : null} borderRadius="5px">
                        <CSSTransition
                              in={showSingleStkDetails}
                              nodeRef={companyNodeRef}
                              timeout={600}
                              classNames="stockDetails"
                              unmountOnExit
                            > 
                            <div className="stockDetails" ref={companyNodeRef}><CompanyQtrPerf stock={singleStk}/></div>
                          </CSSTransition>
                        </Grid>
                    </Grid>                        
              </Item1>
            </Grid>
            <Grid sx={{width: "90%" , height: "60vh", marginLeft:"5%", marginTop:"2%" }}>
              <ChartsForDashBoard allCallBacks={callbacks}/>
            </Grid>   
           </Grid>
        </Grid>
        <Grid item xs={3} >
        <Item2>{showSingleStkDetails ? 
                    <Newsfeeds stock={singleStk} key={singleStk} /> : 
                    <Newsfeeds feedtype={JSON.stringify(feedtypes)}/>}
        </Item2>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard