import {useSelector,useDispatch} from 'react-redux'
import {ADD_MULTIPLE_QUERIES_SEARCH,delSavedQuery} from '../../redux/reducers/stockSearchAdvSlice'
import Chip from '@mui/material/Chip';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const SavedSearchQueries = () =>{
    const dispatch = useDispatch()
    const {searchsavedquery} = useSelector((state) => state.stocksearchddv)

    return (
        searchsavedquery?.map(item => {
            return (
                <Chip
                marginLeft={1.2}
                variant={"outlined"}
                marginLeft={1}
                label={item.label}
                color= {"primary"}
                size={"medium"}
                cursor="pointer"
                onClick={() => {dispatch(ADD_MULTIPLE_QUERIES_SEARCH(JSON.parse(item["query"])))}}
                onDelete={() => {dispatch(delSavedQuery(item))}}
                deleteIcon={<DeleteOutlinedIcon />}
                />
            )
        })  
    )
}

export default SavedSearchQueries