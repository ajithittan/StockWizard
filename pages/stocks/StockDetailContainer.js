import { useEffect, useState,useRef } from "react";
import StockDetailCard from './StockDetailCard'
import Grid from '@mui/material/Grid';
import AddPositions from './AddPositions'
import {StockPriceV2} from '../../modules/api/StockMaster'
import { useSelector, useDispatch} from 'react-redux'
import {ADD_TO_QUOTES} from '../../redux/reducers/streamingQuotesSlice'
import ModalBox from '../../components/ModalBox'

const index = (props) =>{
    const dispatch = useDispatch()
    const [stocks,setStocks] = useState(null)
    const [stkQuotes,setStkQuote] = useState(null)
    const {dashboardsector} = useSelector((state) => state.dashboardlayout)
    const {dashboardstocks} = useSelector((state) => state.dashboardlayout)
    const {dashboardoptions} = useSelector((state) => state.dashboardlayout)
    const ref = useRef()
    const refModal = useRef()
    const [showModal,setShowModal] = useState(false)
    const [modalStock,setModalStock] = useState(null)

    useEffect(() =>{
        if (dashboardstocks){
            getStkQuotes(dashboardstocks)
        }
    },[dashboardstocks])

    const removeFromList = (stkSym) => setStocks([...stocks.filter(stk => stk !==stkSym)])

    const getStkQuotes = async (stocks) => {
        StockPriceV2(stocks).then(res => {
            if (res && res.length > 0 ){
                setStocks([...res.map(item => item.symbol)])
                dispatch(ADD_TO_QUOTES(res))
            }      
        })
    }

    const openInModal = (stock) =>{
        setShowModal(true)
        setModalStock(stock)
    }

    const getModalContent = () =>{
        return (
            <StockDetailCard ref={refModal} key={modalStock} stock={modalStock} remove={removeFromList}>
            </StockDetailCard>
        )
    }

    return (
        <>
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
        >
        {

            dashboardstocks?.map(item => <Grid xs={12} sm={12} md={6} lg={4} xl={3} ref={ref}>
                                        <StockDetailCard ref={ref} key={item} stock={item} openinModal={openInModal}>
                                        </StockDetailCard>
                                </Grid>) 
        }
        {showModal ? 
            <Grid xs={10} sm={10} md={10} lg={10} xl={10} ref={refModal}>
                <ModalBox ref={refModal} content={getModalContent("AAPL")} onClose={() => setShowModal(false)} />
            </Grid> 
        : null}
        {dashboardsector ? null : dashboardoptions["addstks"] ? <AddPositions initialSetOfStocks={stocks}></AddPositions> : null}
      </Grid>
      </>
  )
}

export default index