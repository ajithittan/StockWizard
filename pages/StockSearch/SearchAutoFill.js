import Autocomplete from '@mui/material/Autocomplete';
import {useSelector,useDispatch} from 'react-redux'
import {getSearchParamsFromText} from '../../modules/api/StockIndicators'
import {ADD_TO_AUTO_FILL,ADD_QUERY_TO_SEARCH} from '../../redux/reducers/stockSearchAdvSlice'
import TextField from '@mui/material/TextField';

const SearchAutoFill = () => {
    const dispatch = useDispatch()
    const {searchautofill} = useSelector((state) => state.stocksearchddv)

    const handleChange = (event,newvalue) =>{
        if (event.target.value){
            parseQuery(event.target.value)
        }else{
            if (newvalue){dispatch(ADD_QUERY_TO_SEARCH(newvalue))}
        }
    }

    const parseQuery = async (inpTxt) =>{
        getSearchParamsFromText(inpTxt).then(retval => {
          if (retval){
            let addQuery = {}
            addQuery['label']=inpTxt
            addQuery['query']=retval[0]
            dispatch(ADD_QUERY_TO_SEARCH(addQuery))
            dispatch(ADD_TO_AUTO_FILL(addQuery))
          }
        })
    }

    return (
        <>
            <Autocomplete
                freeSolo
                options={searchautofill}
                getOptionLabel={option => option.label || option}
                renderInput={(params) => <TextField {...params} label="Query Me" />}
                freeSolo={true}
                onChange={handleChange}
            />
        </>
      );
}

export default SearchAutoFill