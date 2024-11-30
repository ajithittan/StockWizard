import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import {useSelector,useDispatch} from 'react-redux'
import {REMOVE_QUERY_FROM_SEARCH} from '../../redux/reducers/stockSearchAdvSlice'
import {saveStockAlertQuery} from '../../modules/api/UserAlerts'
import Button from '@mui/material/Button';

export default function SearchAssist(props) {
  const dispatch = useDispatch()
  const {searchquery} = useSelector((state) => state.stocksearchddv)

  const removeQuery = (inpQry) =>{
    dispatch(REMOVE_QUERY_FROM_SEARCH(inpQry))
  }

  const saveAlert = () =>{
    if(searchquery && searchquery.length > 0){
      saveStockAlertQuery(searchquery).then(res => console.log("return from store",res))
    }
  }

  return (
    <Grid marginLeft={1} container>
      <Grid item margin={0.2}><Button variant="contained" onClick={saveAlert}>Save Query</Button></Grid>
      {
        searchquery?.map(item => 
          <Grid item margin={0.2}>      
                <Chip
                  sx={{
                    maxWidth:"250px"
                  }}
                  variant={"outlined"}
                  label={item.label}
                  color= {"success"}
                  size={"small"}
                  cursor="pointer"
                  onDelete={() =>{removeQuery(item)}}
                />
          </Grid>
        )
      }                  
    </Grid>
  );
}
